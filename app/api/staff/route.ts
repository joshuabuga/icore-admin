import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check permissions
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!currentUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userPermissions = currentUser.permissions.map(p => p.permission);
        if (!hasPermission(currentUser.role, userPermissions, PERMISSIONS.STAFF_READ)) {
            return NextResponse.json(
                { error: 'Permission denied' },
                { status: 403 }
            );
        }

        // Fetch all staff users
        const staff = await prisma.user.findMany({
            include: {
                permissions: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return NextResponse.json(staff);
    } catch (error) {
        console.error('Error fetching staff:', error);
        return NextResponse.json(
            { error: 'Failed to fetch staff' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check permissions
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!currentUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userPermissions = currentUser.permissions.map(p => p.permission);
        if (!hasPermission(currentUser.role, userPermissions, PERMISSIONS.STAFF_WRITE)) {
            return NextResponse.json(
                { error: 'Permission denied' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id, name, email, role, permissions } = body;

        if (!id || !name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields: id, name, email' },
                { status: 400 }
            );
        }

        // Create user with permissions
        const newUser = await prisma.user.create({
            data: {
                id,
                name,
                email,
                role: role || 'user',
                permissions: permissions?.length > 0 ? {
                    create: permissions.map((permission: string) => ({
                        permission,
                    })),
                } : undefined,
            },
            include: {
                permissions: true,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating staff:', error);
        return NextResponse.json(
            { error: 'Failed to create staff member' },
            { status: 500 }
        );
    }
}