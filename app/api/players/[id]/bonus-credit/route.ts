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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_CREDIT)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to credit players.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { msisdn, amount, subject, description, playerName, sendSms } = body;

        if (!msisdn || !amount || !subject || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: msisdn, amount, subject, and description are required.' },
                { status: 400 }
            );
        }

        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 50000) {
            return NextResponse.json(
                { error: 'Amount must be between 1 and 50,000.' },
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

        const creditResponse = await paymentProcessor.bonusCreditUser({
            msisdn,
            amount: parsedAmount,
            subject,
            description,
        });

        const isSuccess = creditResponse.data?.bonus_balance !== undefined;

        let smsStatus = 'Not sent';
        if (isSuccess && sendSms) {
            try {
                smsStatus = await paymentProcessor.sendSMS({
                    phone: msisdn,
                    amount: parsedAmount,
                    name: playerName || '',
                    promo: subject,
                });
            } catch (smsError) {
                smsStatus = `SMS failed: ${smsError instanceof Error ? smsError.message : 'Unknown error'}`;
                console.error('SMS failed after successful bonus credit:', smsError);
            }
        }

        try {
            await prisma.creditLog.create({
                data: {
                    playerId: id,
                    msisdn,
                    amount: parsedAmount,
                    subject,
                    description,
                    walletType: 'bonus',
                    status: isSuccess ? 'CREDITED' : 'FAILED',
                    creditResponse: creditResponse.data,
                    smsStatus,
                    errorMessage: isSuccess ? undefined : 'Bonus credit API returned an error',
                    creditedById: userId,
                },
            });
        } catch (logError) {
            console.error('CreditLog write failed (credit may still have succeeded):', logError);
        }

        if (!isSuccess) {
            return NextResponse.json(
                {
                    error: 'Bonus credit API returned an error.',
                    credit_response: creditResponse.data,
                },
                { status: 502 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Successfully credited bonus wallet for ${msisdn} with ${parsedAmount}`,
            player_id: id,
            sms_status: smsStatus,
            bonus_balance: creditResponse.data.bonus_balance,
            amount_credited: creditResponse.data.amount_credited,
        });
    } catch (error) {
        console.error('Error crediting bonus wallet:', error);
        return NextResponse.json(
            {
                error: 'Failed to credit bonus wallet',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
