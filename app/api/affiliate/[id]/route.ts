import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

async function getAuthedUser(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        include: { permissions: true },
    });
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

        const user = await getAuthedUser(userId);
        if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 401 });

        const userPerms = user.permissions.map(p => p.permission);
        if (!hasPermission(user.role, userPerms, PERMISSIONS.AFFILIATE_READ)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const { id } = await params;
        const result = await adminConsole.fetchAffiliate(id);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching affiliate:', error);
        return NextResponse.json({ error: 'Failed to fetch affiliate' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

        const user = await getAuthedUser(userId);
        if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 401 });

        const userPerms = user.permissions.map(p => p.permission);
        if (!hasPermission(user.role, userPerms, PERMISSIONS.AFFILIATE_WRITE)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json();
        const result = await adminConsole.patchAffiliate(id, body);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating affiliate:', error);
        return NextResponse.json({ error: 'Failed to update affiliate' }, { status: 500 });
    }
}
