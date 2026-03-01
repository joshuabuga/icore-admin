import { NextRequest, NextResponse } from 'next/server';
import { Payments } from '@/types/crediting';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.BATCHES_PROCESS)) {
            return NextResponse.json(
                { message: 'Forbidden. You do not have permission to process batches.' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { particulars, recipients, total_amount, batch_no, csv } = body;

        // Validate required fields
        if (
            !particulars ||
            !recipients ||
            !Array.isArray(recipients) ||
            recipients.length === 0
        ) {
            return NextResponse.json(
                {
                    message:
                        'Missing required fields: particulars and recipients are required',
                },
                { status: 400 }
            );
        }

        // Validate recipients structure
        for (const recipient of recipients) {
            if (
                !recipient.name ||
                !recipient.phoneNumber ||
                !recipient.amount
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Invalid recipient data: name, phoneNumber, and amount are required for each recipient',
                    },
                    { status: 400 }
                );
            }
        }

        // Generate batch ID and number
        const batchId = `batch_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        const batchNumber = `BATCH${Date.now()}`;
        const totalAmount =
            total_amount ||
            recipients.reduce((sum, r) => sum + Number(r.amount), 0);

        console.log('Processing batch payment:', {
            id: batchId,
            batch_no: batchNumber,
            total_amount: totalAmount,
            recipients_count: recipients.length,
        });

        // Save the batch to the database with customers
        await prisma.batch.create({
            data: {
                id: batchId,
                batch_no: batchNumber,
                particulars: particulars.trim(),
                status: 'PENDING',
                csv: csv || '',
                total_amount: totalAmount,
                date_initiated: new Date(),
                recipients: {
                    create: recipients.map(r => ({
                        name: r.name,
                        phoneNumber: r.phoneNumber,
                        amount: Number(r.amount),
                    })),
                },
            },
            include: {
                recipients: true,
            },
        });

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Batch payment initiated successfully',
            batch_no: batchNumber,
            id: batchId,
            total_amount: totalAmount,
            recipients_count: recipients.length,
            status: 'PENDING',
        });
    } catch (error) {
        console.error('Error processing batch payment:', error);
        return NextResponse.json(
            {
                message: 'Internal server error while processing batch payment',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

//  Get all batch payments
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.BATCHES_READ)) {
            return NextResponse.json(
                { message: 'Forbidden. You do not have permission to view batches.' },
                { status: 403 }
            );
        }

        const batches = await prisma.batch.findMany({
            include: {
                recipients: true,
                approvedBy: {
                    select: { name: true, email: true, role: true },
                },
            },
            orderBy: {
                date_initiated: 'desc',
            },
        });

        const mapped = batches.map(batch => ({
            ...batch,
            approved_by: batch.approvedBy
                ? { name: batch.approvedBy.name || batch.approvedBy.email, role: batch.approvedBy.role }
                : null,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        console.error('Error fetching batch payments:', error);
        return NextResponse.json(
            {
                message: 'Internal server error while fetching batch payments',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
