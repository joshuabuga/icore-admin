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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.CASHFLOW_READ)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to view cashflow.' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'deposits';

        const params: FetchParams = {
            search: searchParams.get('search') || undefined,
            page_size: searchParams.get('page_size') ? parseInt(searchParams.get('page_size')!) : undefined,
            page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
            sortBy: searchParams.get('sortBy') || undefined,
            sortDesc: searchParams.get('sortDesc') === 'true' ? true : searchParams.get('sortDesc') === 'false' ? false : undefined,
            wallet_id: searchParams.get('wallet_id') || undefined,
        };

        if (type === 'withdrawals') {
            const result = await adminConsole.fetchWithdrawals(params);
            return NextResponse.json(result);
        } else if (type === 'transactions') {
            const result = await adminConsole.fetchUserTransactions(params);
            return NextResponse.json(result);
        } else {
            const result = await adminConsole.fetchDeposits(params);
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error('Error fetching cashflow:', error);
        return NextResponse.json(
            { error: 'Failed to fetch cashflow data' },
            { status: 500 }
        );
    }
}
