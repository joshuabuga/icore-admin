import { NextResponse } from 'next/server';
import { requireAuth, isAuthError, PERMISSIONS } from '@/lib/api-auth';
import { adminConsole } from '@/lib/admin-console/console';

export async function POST(
    _request: Request,
    { params }: { params: Promise<{ id: string; withdrawalId: string }> }
) {
    const authResult = await requireAuth(PERMISSIONS.CASHFLOW_WRITE);
    if (isAuthError(authResult)) return authResult;

    try {
        const { withdrawalId } = await params;
        const data = await adminConsole.requeuePayout(Number(withdrawalId));
        return NextResponse.json(data);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Requeue failed';
        console.error('[POST /api/players/:id/withdrawals/:withdrawalId/requeue]', message);
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
