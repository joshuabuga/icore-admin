import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 401 });
        }

        const userPerms = user.permissions.map(p => p.permission);
        if (!hasPermission(user.role, userPerms, PERMISSIONS.TAX_CONFIG_READ)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const data = await adminConsole.fetchTaxConfig();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching tax config:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch tax config' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 401 });
        }

        const userPerms = user.permissions.map(p => p.permission);
        if (!hasPermission(user.role, userPerms, PERMISSIONS.TAX_CONFIG_WRITE)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const body = await request.json();
        const data = await adminConsole.updateTaxConfig(body);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating tax config:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update tax config' },
            { status: 500 }
        );
    }
}
