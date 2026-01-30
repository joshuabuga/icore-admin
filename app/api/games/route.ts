import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole, FetchParams } from '@/lib/admin-console/console';

export async function OPTIONS() {
    return new NextResponse(null, { status: 200 });
}

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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.GAMES_READ)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to view games.' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const params: FetchParams = {
            search: searchParams.get('search') || undefined,
            page_size: searchParams.get('page_size') ? parseInt(searchParams.get('page_size')!) : undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
            sortBy: searchParams.get('sortBy') || undefined,
            sortDesc: searchParams.get('sortDesc') === 'true' ? true : searchParams.get('sortDesc') === 'false' ? false : undefined,
        };

        const games = await adminConsole.fetchGames(params);
        return NextResponse.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json(
            { error: 'Failed to fetch games' },
            { status: 500 }
        );
    }
}
