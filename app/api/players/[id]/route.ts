import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole, FetchParams } from '@/lib/admin-console/console';

export async function OPTIONS() {
    return new NextResponse(null, { status: 200 });
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found.' },
                { status: 401 }
            );
        }

        const userPerms = user.permissions.map(p => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_READ)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to view players.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const player = await adminConsole.fetchUser(id);
        return NextResponse.json(player);
    } catch (error) {
        console.error('Error fetching player:', error);
        return NextResponse.json(
            { error: 'Failed to fetch player' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found.' },
                { status: 401 }
            );
        }

        const userPerms = user.permissions.map(p => p.permission);
        const { id } = await params;
        const body = await request.json();

        // Check granular permissions based on which fields are being updated
        const fieldPermissions: Record<string, string> = {
            is_wagering_exempt: PERMISSIONS.PLAYERS_EXEMPTION,
            daily_withdrawal_limit: PERMISSIONS.PLAYERS_DAILY_LIMIT,
        };

        for (const field of Object.keys(body)) {
            const requiredPerm = fieldPermissions[field];
            if (requiredPerm) {
                if (!hasPermission(user.role, userPerms, requiredPerm)) {
                    return NextResponse.json(
                        { error: `Forbidden. You do not have permission to update '${field}'.` },
                        { status: 403 }
                    );
                }
            }
        }

        // For all other fields, require general players:write
        const granularFields = new Set(Object.keys(fieldPermissions));
        const hasOtherFields = Object.keys(body).some(f => !granularFields.has(f));
        if (hasOtherFields && !hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_WRITE)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to update players.' },
                { status: 403 }
            );
        }

        const updatedPlayer = await adminConsole.patchUser(id, body);
        return NextResponse.json(updatedPlayer);
    } catch (error) {
        console.error('Error updating player:', error);
        return NextResponse.json(
            { error: 'Failed to update player' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found.' },
                { status: 401 }
            );
        }

        const userPerms = user.permissions.map(p => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_WRITE)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to delete players.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        await adminConsole.deleteUser(id);
        return NextResponse.json({ success: true, message: 'Player deleted successfully' });
    } catch (error) {
        console.error('Error deleting player:', error);
        return NextResponse.json(
            { error: 'Failed to delete player' },
            { status: 500 }
        );
    }
}
