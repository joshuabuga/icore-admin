import { NextResponse } from 'next/server';
import { requireAuth, isAuthError, PERMISSIONS } from '@/lib/api-auth';

export async function GET() {
    const authResult = await requireAuth(PERMISSIONS.BONUS_READ);
    if (isAuthError(authResult)) return authResult;

    return NextResponse.json({ message: 'Bonus engine API - coming soon' });
}
