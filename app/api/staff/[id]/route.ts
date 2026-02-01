import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        const { id } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

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

        const staff = await prisma.user.findUnique({
            where: { id },
            include: { permissions: true },
        });

        if (!staff) {
            return NextResponse.json(
                { error: 'Staff member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(staff);
    } catch (error) {
        console.error('Error fetching staff member:', error);
        return NextResponse.json(
            { error: 'Failed to fetch staff member' },
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
        const { id } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

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
        const { name, email, role, permissions } = body;

        // Update user in a transaction
        const updatedUser = await prisma.$transaction(async (tx) => {
            // Update basic user info
            const user = await tx.user.update({
                where: { id },
                data: {
                    ...(name && { name }),
                    ...(email && { email }),
                    ...(role && { role }),
                },
            });

            // If permissions are provided, replace all permissions
            if (permissions !== undefined) {
                // Delete existing permissions
                await tx.permissions.deleteMany({
                    where: { user_id: id },
                });

                // Create new permissions
                if (permissions.length > 0) {
                    await tx.permissions.createMany({
                        data: permissions.map((permission: string) => ({
                            user_id: id,
                            permission,
                        })),
                    });
                }
            }

            // Return user with updated permissions
            return tx.user.findUnique({
                where: { id },
                include: { permissions: true },
            });
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating staff member:', error);
        return NextResponse.json(
            { error: 'Failed to update staff member' },
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
        const { id } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Prevent self-deletion
        if (userId === id) {
            return NextResponse.json(
                { error: 'Cannot delete your own account' },
                { status: 400 }
            );
        }

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

        // Delete user (permissions will be cascade deleted)
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting staff member:', error);
        return NextResponse.json(
            { error: 'Failed to delete staff member' },
            { status: 500 }
        );
    }
}