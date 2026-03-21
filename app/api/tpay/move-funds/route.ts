import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { tpayClient } from '@/lib/tpay/client';

export async function POST(request: NextRequest) {
    try {
        const { userId, getToken } = await auth();
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
        if (!hasPermission(user.role, userPerms, PERMISSIONS.TPAY_WRITE)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const token = await getToken();
        if (!token) {
            return NextResponse.json({ error: 'Failed to get auth token.' }, { status: 401 });
        }

        const body = await request.json();
        if (!body.amount) {
            return NextResponse.json({ error: 'Amount is required.' }, { status: 400 });
        }

        console.log('[TPay] Move funds request:', { amount: body.amount });
        const result = await tpayClient.moveFunds(token, { amount: body.amount });
        console.log('[TPay] Move funds response:', JSON.stringify(result, null, 2));
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error moving funds:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to move funds' },
            { status: 500 }
        );
    }
}
