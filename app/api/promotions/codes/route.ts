import { NextResponse } from 'next/server';
import { requireAuth, isAuthError, PERMISSIONS } from '@/lib/api-auth';
import { adminConsole } from '@/lib/admin-console/console';
import { extractIcoreError } from '@/lib/admin-console/icore-error';

export async function GET(request: Request) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_READ);
    if (isAuthError(authResult)) return authResult;

    try {
        const { searchParams } = new URL(request.url);
        const promo = searchParams.get('promo') ? Number(searchParams.get('promo')) : undefined;
        const search = searchParams.get('search') ?? undefined;

        const data = await adminConsole.getPromoCodes({ promo, search });
        return NextResponse.json(data);
    } catch (err: unknown) {
        const body = err && typeof err === 'object' ? err : { detail: String(err) };
        return NextResponse.json(body, { status: 502 });
    }
}

export async function POST(request: Request) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
    if (isAuthError(authResult)) return authResult;

    try {
        const body = await request.json();
        const data = await adminConsole.createPromoCode(body);
        return NextResponse.json(data, { status: 201 });
    } catch (err: unknown) {
        const body = extractIcoreError(err);
        console.error('[POST /api/promotions/codes] Icore error:', JSON.stringify(body));
        return NextResponse.json(body, { status: 400 });
    }
}
