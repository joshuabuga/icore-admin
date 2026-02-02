import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import jwt from 'jsonwebtoken';

const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY!;

export async function OPTIONS() {
    return new NextResponse(null, { status: 200 });
}

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found.' },
                { status: 401 }
            );
        }

        const userPerms = user.permissions.map(p => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.SUMMARY_READ)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to view dashboard.' },
                { status: 403 }
            );
        }

        const payload = {
            resource: { dashboard: 4 },
            params: {},
            exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
        };

        const token = jwt.sign(payload, METABASE_SECRET_KEY);

        return NextResponse.json({ token });
    } catch (error) {
        console.error('Error generating Metabase token:', error);
        return NextResponse.json(
            { error: 'Failed to generate Metabase token' },
            { status: 500 }
        );
    }
}
