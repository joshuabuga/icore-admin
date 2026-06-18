import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

export async function GET(request: Request) {
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
        if (!hasPermission(user.role, userPerms, PERMISSIONS.GAMES_READ)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const game = searchParams.get('game');

        if (game) {
            // Single game daily stats
            const startDate = searchParams.get('start_date') || '';
            const endDate = searchParams.get('end_date') || '';
            const result = await adminConsole.fetchGameStats(game, startDate, endDate);
            return NextResponse.json(result);
        } else {
            // All tracked games summary list
            const result = await adminConsole.fetchTrackedGames();
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error('Error fetching game stats:', error);
        return NextResponse.json({ error: 'Failed to fetch game stats' }, { status: 500 });
    }
}
