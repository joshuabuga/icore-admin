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

        if (!msisdn || !amount || !subject) {
            return NextResponse.json(
                { error: 'Missing required fields: msisdn, amount, and subject are required.' },
                { status: 400 }
            );
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be a positive number.' },
                { status: 400 }
            );
        }

        const creditResponse = await paymentProcessor.creditUser({
            msisdn,
            amount,
            subject,
            description: description || subject,
        });

        const isSuccess = creditResponse?.status?.code === 201;

        let smsStatus = 'Not sent';
        if (isSuccess && sendSms) {
            try {
                smsStatus = await paymentProcessor.sendSMS({
                    phone: msisdn,
                    amount,
                    name: playerName || '',
                    promo: subject,
                });
            } catch (smsError) {
                smsStatus = `SMS failed: ${smsError instanceof Error ? smsError.message : 'Unknown error'}`;
                console.error('SMS failed after successful credit:', smsError);
            }
        }

        // Log the credit action with the admin user ID for traceability
        await prisma.creditLog.create({
            data: {
                playerId: id,
                msisdn,
                amount,
                subject,
                description: description || subject,
                status: isSuccess ? 'CREDITED' : 'FAILED',
                creditResponse: creditResponse,
                smsStatus,
                errorMessage: isSuccess ? undefined : 'Credit API returned an error',
                creditedById: userId,
            },
        });

        if (!isSuccess) {
            return NextResponse.json(
                {
                    error: 'Credit API returned an error.',
                    credit_response: creditResponse,
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Successfully credited ${msisdn} with ${amount}`,
            player_id: id,
            sms_status: smsStatus,
            credit_response: creditResponse,
        });
    } catch (error) {
        console.error('Error crediting player:', error);
        return NextResponse.json(
            {
                error: 'Failed to credit player',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}