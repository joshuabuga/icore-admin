import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { user } = await request.json();
    const email: string = user?.primaryEmailAddress?.emailAddress ?? '';

    // Enforce allowlist at the API layer too
    const allowedEmails = process.env.ALLOWED_EMAILS
        ? process.env.ALLOWED_EMAILS.split(',').map((e: string) => e.trim().toLowerCase())
        : null;
    if (allowedEmails && !allowedEmails.includes(email.toLowerCase())) {
        return NextResponse.json({ error: 'Not authorized to access this application' }, { status: 403 });
    }

    try {
        const userData = await prisma.user.upsert({
            where: { id: user?.id },
            update: {},  // existing users: no changes, just return the record
            create: {
                id: user?.id,
                email,
                name: `${user?.firstName} ${user?.lastName}`,
                role: 'user',
            },
        });
        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
