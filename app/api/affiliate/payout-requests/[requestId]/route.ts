import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { adminConsole } from '@/lib/admin-console/console';

export async function PATCH(req: Request, { params }: { params: Promise<{ requestId: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });
        if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 401 });

        const userPerms = user.permissions.map(p => p.permission);
        if (!hasPermission(user.role, userPerms, PERMISSIONS.AFFILIATE_WRITE)) {
            return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
        }

        const { requestId } = await params;
        const body = await req.json();
        const { action, notes } = body;

        if (!['approve', 'reject'].includes(action)) {
            return NextResponse.json({ error: 'action must be "approve" or "reject".' }, { status: 400 });
        }

        const result = await adminConsole.patchAffiliatePayoutRequest(requestId, action, notes, userId);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error processing payout request:', error);
        const message = error instanceof Error ? error.message : 'Failed to process payout request';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
