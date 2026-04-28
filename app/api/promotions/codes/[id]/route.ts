import { NextResponse } from 'next/server';
import { requireAuth, isAuthError, PERMISSIONS } from '@/lib/api-auth';
import { adminConsole } from '@/lib/admin-console/console';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
    if (isAuthError(authResult)) return authResult;

    const { id } = await params;
    const body = await request.json();
    const data = await adminConsole.updatePromoCode(Number(id), body);
    return NextResponse.json(data);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
    if (isAuthError(authResult)) return authResult;

    const { id } = await params;
    await adminConsole.deletePromoCode(Number(id));
    return new NextResponse(null, { status: 204 });
}
