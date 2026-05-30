import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { paymentProcessor } from '@/lib/admin-console/paymentProcessor';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_DEBIT)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to debit players.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { msisdn, amount, subject, description } = body;

        if (!msisdn || !amount || !subject || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: msisdn, amount, subject, and description are required.' },
                { status: 400 }
            );
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount < 0.01 || parsedAmount > 99999.99) {
            return NextResponse.json(
                { error: 'Amount must be between 0.01 and 99,999.99.' },
                { status: 400 }
            );
        }

        if (subject.length > 128) {
            return NextResponse.json(
                { error: 'Subject must be 128 characters or less.' },
                { status: 400 }
            );
        }

        if (description.length > 150) {
            return NextResponse.json(
                { error: 'Description must be 150 characters or less.' },
                { status: 400 }
            );
        }

        const debitResponse = await paymentProcessor.bonusDebitUser({
            msisdn,
            amount: parsedAmount.toFixed(2),
            subject,
            description,
        });

        await prisma.debitLog.create({
            data: {
                playerId: id,
                msisdn,
                amount: parsedAmount,
                subject,
                description,
                walletType: 'bonus',
                status: debitResponse.ok ? 'DEBITED' : 'FAILED',
                debitResponse: debitResponse.data,
                errorMessage: debitResponse.ok ? undefined : (debitResponse.data?.error || 'Bonus debit API returned an error'),
                debitedById: userId,
            },
        });

        if (!debitResponse.ok) {
            const errorData = debitResponse.data;
            const errorMessage = errorData?.error
                || (typeof errorData === 'object' ? Object.entries(errorData).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('; ') : 'Bonus debit failed');

            return NextResponse.json(
                {
                    error: errorMessage,
                    bonus_balance: errorData?.bonus_balance,
                    requested: errorData?.requested,
                    debit_response: errorData,
                },
                { status: debitResponse.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Successfully debited bonus wallet for ${msisdn} by ${parsedAmount.toFixed(2)}`,
            player_id: id,
            bonus_balance: debitResponse.data?.bonus_balance,
            amount_debited: debitResponse.data?.amount_debited,
        });
    } catch (error) {
        console.error('Error debiting bonus wallet:', error);
        return NextResponse.json(
            {
                error: 'Failed to debit bonus wallet',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
