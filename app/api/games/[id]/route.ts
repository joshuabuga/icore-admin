import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

export async function OPTIONS() {
    return new NextResponse(null, { status: 200 });
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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.GAMES_WRITE)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to update games.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const updatedGame = await adminConsole.updateGame(id, body);
        return NextResponse.json(updatedGame);
    } catch (error) {
        console.error('Error updating game:', error);
        return NextResponse.json(
            { error: 'Failed to update game' },
            { status: 500 }
        );
    }
}
