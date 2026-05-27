import { NextResponse } from 'next/server';
import { requireAuth, isAuthError, PERMISSIONS } from '@/lib/api-auth';
import { adminConsole } from '@/lib/admin-console/console';
import { extractIcoreError } from '@/lib/admin-console/icore-error';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
    if (isAuthError(authResult)) return authResult;

    try {
        const { id } = await params;
        const body = await request.json();
        const data = await adminConsole.updatePromoCode(Number(id), body);
        return NextResponse.json(data);
    } catch (err: unknown) {
        const body = extractIcoreError(err);
        console.error('[PATCH /api/promotions/codes/:id] Icore error:', JSON.stringify(body));
        return NextResponse.json(body, { status: 400 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
    if (isAuthError(authResult)) return authResult;

    try {
        const { id } = await params;
        await adminConsole.deletePromoCode(Number(id));
        return new NextResponse(null, { status: 204 });
    } catch (err: unknown) {
        return NextResponse.json(extractIcoreError(err), { status: 502 });
    }
}
