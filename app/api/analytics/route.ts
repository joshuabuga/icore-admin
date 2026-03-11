import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

export async function GET(request: Request) {
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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.ANALYTICS_READ)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to view analytics.' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const createdAtAfter = searchParams.get('created_at_after') || '';
        const createdAtBefore = searchParams.get('created_at_before') || '';

        if (type === 'daily-flow') {
            const startDate = searchParams.get('start_date') || '';
            const endDate = searchParams.get('end_date') || '';
            const result = await adminConsole.fetchDailyFlow(startDate, endDate);
            return NextResponse.json(result);
        } else if (type === 'users') {
            const result = await adminConsole.fetchUsersPerDay(createdAtAfter, createdAtBefore);
            return NextResponse.json(result);
        } else {
            const result = await adminConsole.fetchPayinsPerDay(createdAtAfter, createdAtBefore);
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics data' },
            { status: 500 }
        );
    }
}
