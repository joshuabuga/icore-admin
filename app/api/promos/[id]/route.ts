import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 200,
    });
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const promo = await prisma.promo.findUnique({
            where: { id },
        });

        if (!promo) {
            return NextResponse.json(
                { error: 'Promo not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(promo);
    } catch (error) {
        console.error('Error fetching promo:', error);
        return NextResponse.json(
            { error: 'Failed to fetch promo' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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
                { error: 'Forbidden. You do not have permission to update promos.' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id } = await params;

        // Build update data object with all possible fields
        const updateData: Record<string, unknown> = {};
        if (body.title !== undefined) updateData.title = body.title;
        if (body.description !== undefined)
            updateData.description = body.description;
        if (body.amount !== undefined) updateData.amount = body.amount;
        if (body.is_active !== undefined) updateData.is_active = body.is_active;
        if (body.start !== undefined) updateData.start = new Date(body.start);
        if (body.end !== undefined)
            updateData.end = body.end ? new Date(body.end) : null;
        if (body.term_and_conditions !== undefined)
            updateData.term_and_conditions = body.term_and_conditions;
        if (body.info !== undefined) updateData.info = body.info;
        if (body.carousel_image !== undefined)
            updateData.carousel_image = body.carousel_image;
        if (body.image !== undefined) updateData.image = body.image;
        if (body.uploaded_by_id !== undefined)
            updateData.uploaded_by_id = body.uploaded_by_id;

        const updatedPromo = await prisma.promo.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedPromo);
    } catch (error) {
        console.error('Error updating promo:', error);
        return NextResponse.json(
            { error: 'Failed to update promo' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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
                { error: 'Forbidden. You do not have permission to delete promos.' },
                { status: 403 }
            );
        }

        const { id } = await params;

        const deletedPromo = await prisma.promo.delete({
            where: { id },
        });

        return NextResponse.json({
            message: 'Promo deleted successfully',
            id: deletedPromo.id,
        });
    } catch (error) {
        console.error('Error deleting promo:', error);
        return NextResponse.json(
            { error: 'Failed to delete promo' },
            { status: 500 }
        );
    }
}
