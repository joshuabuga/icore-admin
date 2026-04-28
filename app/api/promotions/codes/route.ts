import { NextResponse } from 'next/server';
import { requireAuth, isAuthError, PERMISSIONS } from '@/lib/api-auth';
import { adminConsole } from '@/lib/admin-console/console';

export async function GET(request: Request) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_READ);
    if (isAuthError(authResult)) return authResult;

    const { searchParams } = new URL(request.url);
    const promo = searchParams.get('promo') ? Number(searchParams.get('promo')) : undefined;
    const search = searchParams.get('search') ?? undefined;

    const data = await adminConsole.getPromoCodes({ promo, search });
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
    if (isAuthError(authResult)) return authResult;

    const body = await request.json();
    const data = await adminConsole.createPromoCode(body);
    return NextResponse.json(data, { status: 201 });
}
