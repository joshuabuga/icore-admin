import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole, FetchParams } from '@/lib/admin-console/console';

export async function GET(request: Request) {
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

        const { searchParams } = new URL(request.url);
        const params: FetchParams = {
            search: searchParams.get('search') || undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
            page_size: searchParams.get('page_size') ? parseInt(searchParams.get('page_size')!) : undefined,
        };

        const result = await adminConsole.fetchAffiliates(params);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching affiliates:', error);
        return NextResponse.json({ error: 'Failed to fetch affiliates' }, { status: 500 });
    }
}
