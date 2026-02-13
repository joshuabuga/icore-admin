import { NextRequest, NextResponse } from 'next/server';
import { sms } from '@/lib/admin-console/sms';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

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

        const userPerms = user.permissions.map((p: { permission: string }) => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_WRITE)) {
            return NextResponse.json(
                { message: 'Forbidden. You do not have permission to send SMS.' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { phone, message } = body;

        if (!phone || !message) {
            return NextResponse.json(
                { message: 'Missing required fields: phone and message are required' },
                { status: 400 }
            );
        }

        const result = await sms.sendSMS(phone, message);

        return NextResponse.json({
            success: true,
            message: result,
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return NextResponse.json(
            {
                message: 'Failed to send SMS',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}