import { ProcessingResult, CreditRequest, SMSRequest } from '@/types/crediting';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import {paymentProcessor} from "@/lib/admin-console/paymentProcessor";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        // Fetch user with permissions for authorization check
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found.' },
                { status: 401 }
            );
        }

        const userPerms = user.permissions.map((p: { permission: string; }) => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.BATCHES_APPROVE)) {
            return NextResponse.json(
                { message: 'Forbidden. You do not have permission to approve batches.' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { batch_no, user_name } = body;

        // Validate required fields
        if (!batch_no || !user_name) {
            return NextResponse.json(
                {
                    message:
                        'Missing required fields: batch_no and user_name are required',
                },
                { status: 400 }
            );
        }

        console.log('Processing batch payment:', {
            batch_no,
            user_name,
            userId,
        });

        const batch = await prisma.batch.findFirst({
            where: { batch_no },
            include: { recipients: true },
        });

        if (!batch) {
            return NextResponse.json(
                { message: `Batch with batch number ${batch_no} not found` },
                { status: 404 }
            );
        }

        if (batch.status !== 'PENDING') {
            return NextResponse.json(
                {
                    message: `Batch ${batch_no} cannot be approved. Current status: ${batch.status}. Only PENDING batches can be approved.`,
                },
                { status: 400 }
            );
        }

        // Update batch status to PROCESSING
        await prisma.batch.update({
            where: { id: batch.id },
            data: {
                status: 'PROCESSING',
                date_approved: new Date(),
                approvedById: userId,
            },
        });

        const processingResults: ProcessingResult[] = [];
        let successfulCredits = 0;
        let failedCredits = 0;

        // Process each recipient
        for (const recipient of batch.recipients) {
            try {
                // Prepare credit request
                const creditRequest: CreditRequest = {
                    msisdn: recipient.phoneNumber,
                    amount: recipient.amount,
                    subject: batch.particulars,
                    description: batch.particulars,
                };

                // Credit the user
                const creditResponse = await paymentProcessor.creditUser(
                    creditRequest
                );
                const isSuccess = creditResponse?.status?.code === 201;

                let smsStatus = 'Failed to credit';

                // Send SMS if crediting was successful
                if (isSuccess) {
                    try {
                        const smsRequest: SMSRequest = {
                            phone: recipient.phoneNumber,
                            amount: recipient.amount,
                            name: recipient.name,
                            promo: batch.particulars,
                        };

                        smsStatus = await paymentProcessor.sendSMS(smsRequest);
                        successfulCredits++;

                        // Log success (matching Python script output format)
                        console.log(
                            `✓ ${recipient.phoneNumber} | ${creditResponse?.status?.code} | ${smsStatus}`
                        );
                    } catch (smsError) {
                        smsStatus = `SMS failed: ${smsError}`;
                        successfulCredits++; // Still count as success since credit worked

                        console.log(
                            `⚠ ${recipient.phoneNumber} | ${creditResponse?.status?.code} | ${smsStatus}`
                        );
                    }
                } else {
                    failedCredits++;
                    console.log(
                        `✗ ${recipient.phoneNumber} | ${
                            creditResponse?.status?.code || 'Error'
                        } | Failed to credit`
                    );
                }

                const result: ProcessingResult = {
                    user_id: recipient.phoneNumber,
                    status: isSuccess ? 'CREDITED' : 'FAILED',
                    sms_status: smsStatus,
                    credit_response: creditResponse,
                    error_message: isSuccess
                        ? undefined
                        : 'Credit API returned error',
                };

                processingResults.push(result);

                // Log to processing log
                await prisma.processingLog.create({
                    data: {
                        batchId: batch.id,
                        msisdn: recipient.phoneNumber,
                        amount: recipient.amount,
                        status:
                            result.status === 'CREDITED'
                                ? 'CREDITED'
                                : 'FAILED',
                        creditResponse: creditResponse,
                        smsStatus: smsStatus,
                        errorMessage: result.error_message,
                    },
                });

                // Add small delay to avoid overwhelming APIs
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                failedCredits++;
                const errorResult: ProcessingResult = {
                    user_id: recipient.phoneNumber,
                    status: 'FAILED',
                    sms_status: 'Processing Error',
                    error_message:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                };

                processingResults.push(errorResult);

                // Log error to processing log
                await prisma.processingLog.create({
                    data: {
                        batchId: batch.id,
                        msisdn: recipient.phoneNumber,
                        amount: recipient.amount,
                        status: 'FAILED',
                        errorMessage: errorResult.error_message,
                    },
                });

                console.error(
                    `Error processing recipient ${recipient.phoneNumber}:`,
                    error
                );
            }
        }

        // Determine final batch status
        let finalStatus: 'COMPLETED' | 'FAILED' | 'PARTIALLY_COMPLETED';
        if (successfulCredits === batch.recipients.length) {
            finalStatus = 'COMPLETED';
        } else if (successfulCredits === 0) {
            finalStatus = 'FAILED';
        } else {
            finalStatus = 'PARTIALLY_COMPLETED';
        }

        // Update final batch status
        await prisma.batch.update({
            where: { id: batch.id },
            data: {
                status: finalStatus,
            },
        });

        // Return success response
        return NextResponse.json({
            success: true,
            message: `Batch payment processing completed. ${successfulCredits} of ${batch.recipients.length} recipients credited successfully.`,
            batch_no: batch.batch_no,
            status: finalStatus,
            summary: {
                total_recipients: batch.recipients.length,
                successful_credits: successfulCredits,
                failed_credits: failedCredits,
                success_rate: `${Math.round(
                    (successfulCredits / batch.recipients.length) * 100
                )}%`,
            },
            processing_results: processingResults,
        });
    } catch (error) {
        console.error('Error processing batch:', error);
        return NextResponse.json(
            {
                message: 'Internal server error while processing batch payment',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
