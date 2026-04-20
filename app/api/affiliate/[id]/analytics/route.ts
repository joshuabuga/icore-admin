import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });
        if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 401 });

        const userPerms = user.permissions.map(p => p.permission);
        if (!hasPermission(user.role, userPerms, PERMISSIONS.AFFILIATE_READ)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const { id } = await params;
        const { searchParams } = new URL(req.url);
        const start_date = searchParams.get('start_date') ?? '';
        const end_date = searchParams.get('end_date') ?? '';

        const result = await adminConsole.fetchAffiliateCommissionAnalytics(id, { start_date, end_date });
        const data = (result as unknown as { data?: unknown })?.data ?? result;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching affiliate commission analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch affiliate commission analytics' }, { status: 500 });
    }
}
