import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, hasAnyPermission, PERMISSIONS } from '@/lib/permissions';
import type { User, Permissions } from '@/prisma/db/generated/client';

type UserWithPermissions = User & { permissions: Permissions[] };

interface AuthResult {
    user: UserWithPermissions;
    userPerms: string[];
}

/**
 * Authenticate the current request and optionally check a required permission.
 * Returns the user and their permission strings on success, or a NextResponse error.
 */
export async function requireAuth(
    requiredPermission?: string
): Promise<AuthResult | NextResponse> {
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

    if (requiredPermission && !hasPermission(user.role, userPerms, requiredPermission)) {
        return NextResponse.json(
            { error: 'Forbidden. You do not have permission to access this resource.' },
            { status: 403 }
        );
    }

    return { user, userPerms };
}

/**
 * Authenticate and require at least one of the given permissions.
 */
export async function requireAnyPermission(
    requiredPermissions: string[]
): Promise<AuthResult | NextResponse> {
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

    if (!hasAnyPermission(user.role, userPerms, requiredPermissions)) {
        return NextResponse.json(
            { error: 'Forbidden. You do not have permission to access this resource.' },
            { status: 403 }
        );
    }

    return { user, userPerms };
}

/**
 * Type guard to check if the result is an error response.
 */
export function isAuthError(result: AuthResult | NextResponse): result is NextResponse {
    return result instanceof NextResponse;
}

export { PERMISSIONS };
