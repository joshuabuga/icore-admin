import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

// Handle preflight OPTIONS requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
    });
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        // Fetch user with permissions for authorization check
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

        const userPerms = user.permissions.map((p: { permission: string; }) => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.PROMOS_WRITE)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to create promos.' },
                { status: 403 }
            );
        }

        const body = await request.json();

        // Map the form field names to match Prisma schema
        const promoData = {
            title: body.title,
            description: body.description,
            carousel_image: body.carouselImage,
            image: body.image,
            start: new Date(body.start),
            end: body.end ? new Date(body.end) : null,
            term_and_conditions: body.terms_and_conditions,
            amount: body.amount,
            is_active: body.is_active,
            info: body.info,
            uploaded_by_id: userId,
        };

        const promo = await prisma.promo.create({
            data: promoData,
        });
        return NextResponse.json(promo);
    } catch (error) {
        console.error('Error creating promo:', error);
        return NextResponse.json(
            { error: 'Failed to create promo' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const promos = await prisma.promo.findMany();
        return NextResponse.json(promos);
    } catch (error) {
        console.error('Error fetching promos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch promos' },
            { status: 500 }
        );
    }
}
