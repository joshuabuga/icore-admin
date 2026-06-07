import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

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

    // Fetch user details from Clerk server-side — don't trust the request body for auth checks
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const email = clerkUser.emailAddresses
        .find(e => e.id === clerkUser.primaryEmailAddressId)
        ?.emailAddress ?? '';

    // Enforce allowlist
    const allowedEmails = process.env.ALLOWED_EMAILS
        ? process.env.ALLOWED_EMAILS.split(',').map((e: string) => e.trim().toLowerCase())
        : null;
    if (allowedEmails && !allowedEmails.includes(email.toLowerCase())) {
        return NextResponse.json({ error: 'Not authorized to access this application' }, { status: 403 });
    }

    const { user } = await request.json();

    try {
        const userData = await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: {
                id: userId,
                email,
                name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
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
