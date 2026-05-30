import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { paymentProcessor } from '@/lib/admin-console/paymentProcessor';
import { BonusBulkCreditItem } from '@/types/crediting';

export async function POST(request: NextRequest) {
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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.BATCHES_PROCESS)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to process batch payments.' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { items } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required field: items must be a non-empty array.' },
                { status: 400 }
            );
        }

        for (const item of items) {
            if (!item.msisdn || !item.amount || !item.subject) {
                return NextResponse.json(
                    { error: 'Each item requires msisdn, amount, and subject.' },
                    { status: 400 }
                );
            }
        }

        const bulkResponse = await paymentProcessor.bonusBulkCredit({ items });

        if (!bulkResponse.ok) {
            return NextResponse.json(
                { error: 'Bonus bulk credit API returned an error.', details: bulkResponse.data },
                { status: bulkResponse.status }
            );
        }

        // Log successful credits for audit trail
        const successfulItems = bulkResponse.data.results
            .filter(r => r.status === 'ok')
            .map(r => {
                const item = items.find((i: BonusBulkCreditItem) => i.msisdn === r.msisdn);
                return {
                    playerId: '',
                    msisdn: r.msisdn,
                    amount: item?.amount ?? 0,
                    subject: item?.subject ?? '',
                    description: item?.description ?? item?.subject ?? '',
                    walletType: 'bonus',
                    status: 'CREDITED' as const,
                    creditResponse: r as never,
                    smsStatus: 'Not sent',
                    creditedById: userId,
                };
            });

        if (successfulItems.length > 0) {
            await prisma.creditLog.createMany({ data: successfulItems });
        }

        return NextResponse.json({
            success: true,
            results: bulkResponse.data.results,
            credited: bulkResponse.data.credited,
            total: bulkResponse.data.total,
        });
    } catch (error) {
        console.error('Error processing bonus bulk credit:', error);
        return NextResponse.json(
            {
                error: 'Failed to process bonus bulk credit',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
