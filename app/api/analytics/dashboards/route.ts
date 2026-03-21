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
        const startDate = searchParams.get('start_date') || '';
        const endDate = searchParams.get('end_date') || '';

        switch (type) {
            case 'hourly-registrations': {
                const result = await adminConsole.fetchHourlyRegistrations();
                return NextResponse.json(result);
            }
            case 'hourly-active-users': {
                const result = await adminConsole.fetchHourlyActiveUsers();
                return NextResponse.json(result);
            }
            case 'daily-stakes-winnings': {
                const result = await adminConsole.fetchDailyStakesWinnings(startDate, endDate);
                return NextResponse.json(result);
            }
            case 'daily-new-users-ftd': {
                const result = await adminConsole.fetchDailyNewUsersFTD(startDate, endDate);
                return NextResponse.json(result);
            }
            case 'daily-ftd-volume': {
                const result = await adminConsole.fetchDailyFTDVolume(startDate, endDate);
                return NextResponse.json(result);
            }
            case 'top-games': {
                const result = await adminConsole.fetchTopGames(startDate, endDate);
                return NextResponse.json(result);
            }
            default:
                return NextResponse.json(
                    { error: 'Invalid type parameter. Use: hourly-registrations, hourly-active-users, daily-stakes-winnings, daily-new-users-ftd, daily-ftd-volume, top-games' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Error fetching dashboard analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard analytics data' },
            { status: 500 }
        );
    }
}
