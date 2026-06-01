import { NextRequest, NextResponse } from 'next/server';
import { whatsapp } from '@/lib/admin-console/whatsapp';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
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

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_WHATSAPP)) {
            return NextResponse.json(
                { message: 'Forbidden. You do not have permission to send WhatsApp messages.' },
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

        await whatsapp.sendMessage(phone, message);

        return NextResponse.json({ success: true, message: 'WhatsApp message sent' });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return NextResponse.json(
            {
                message: 'Failed to send WhatsApp message',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
