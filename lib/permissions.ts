import { UserRole } from '@/prisma/db/generated/client';

export const PERMISSIONS = {
    // Players
    PLAYERS_READ: 'players:read',
    PLAYERS_WRITE: 'players:write',

    // Finance/Cashflow
    CASHFLOW_READ: 'cashflow:read',
    CASHFLOW_WRITE: 'cashflow:write',

    // Batch Payments
    BATCHES_READ: 'batches:read',
    BATCHES_APPROVE: 'batches:approve',
    BATCHES_PROCESS: 'batches:process',

    // Promos
    PROMOS_READ: 'promos:read',
    PROMOS_WRITE: 'promos:write',

    // Games
    GAMES_READ: 'games:read',
    GAMES_WRITE: 'games:write',

    // Staff Management
    STAFF_READ: 'staff:read',
    STAFF_WRITE: 'staff:write',

    // Dashboard/Summary
    SUMMARY_READ: 'summary:read',

    // Bonus Engine
    BONUS_READ: 'bonus:read',
    BONUS_WRITE: 'bonus:write',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    user: [],

    cs: [
        PERMISSIONS.PLAYERS_READ,
        PERMISSIONS.PLAYERS_WRITE,
        PERMISSIONS.SUMMARY_READ,
        PERMISSIONS.CASHFLOW_READ,
    ],

    marketing: [
        PERMISSIONS.PROMOS_READ,
        PERMISSIONS.PROMOS_WRITE,
        PERMISSIONS.BONUS_READ,
        PERMISSIONS.BONUS_WRITE,
        PERMISSIONS.SUMMARY_READ,
        PERMISSIONS.PLAYERS_READ,
    ],

    finance: [
        PERMISSIONS.CASHFLOW_READ,
        PERMISSIONS.CASHFLOW_WRITE,
        PERMISSIONS.BATCHES_READ,
        PERMISSIONS.BATCHES_APPROVE,
        PERMISSIONS.BATCHES_PROCESS,
        PERMISSIONS.SUMMARY_READ,
        PERMISSIONS.PLAYERS_READ,
    ],

    admin: Object.values(PERMISSIONS).filter(
        p => p !== PERMISSIONS.STAFF_WRITE
    ),

    super_admin: Object.values(PERMISSIONS),
};

/**
 * Check if a user has a specific permission based on their role and individual permissions.
 *
 * @param userRole - The user's role from the UserRole enum
 * @param userPermissions - Array of individual permission strings from the Permissions table
 * @param requiredPermission - The permission string to check for
 * @returns boolean indicating if the user has the required permission
 */
export function hasPermission(
    userRole: UserRole,
    userPermissions: string[],
    requiredPermission: string
): boolean {
    // Super admin always has access
    if (userRole === 'super_admin') return true;

    // Check role's default permissions
    const rolePerms = ROLE_PERMISSIONS[userRole] || [];
    if (rolePerms.includes(requiredPermission)) return true;

    // Check individual permissions (from DB)
    return userPermissions.includes(requiredPermission);
}

/**
 * Check if a user has any of the specified permissions.
 *
 * @param userRole - The user's role from the UserRole enum
 * @param userPermissions - Array of individual permission strings from the Permissions table
 * @param requiredPermissions - Array of permission strings to check for (user needs at least one)
 * @returns boolean indicating if the user has any of the required permissions
 */
export function hasAnyPermission(
    userRole: UserRole,
    userPermissions: string[],
    requiredPermissions: string[]
): boolean {
    return requiredPermissions.some(permission =>
        hasPermission(userRole, userPermissions, permission)
    );
}

/**
 * Check if a user has all of the specified permissions.
 *
 * @param userRole - The user's role from the UserRole enum
 * @param userPermissions - Array of individual permission strings from the Permissions table
 * @param requiredPermissions - Array of permission strings to check for (user needs all)
 * @returns boolean indicating if the user has all of the required permissions
 */
export function hasAllPermissions(
    userRole: UserRole,
    userPermissions: string[],
    requiredPermissions: string[]
): boolean {
    return requiredPermissions.every(permission =>
        hasPermission(userRole, userPermissions, permission)
    );
}

/**
 * Get all effective permissions for a user (role defaults + individual grants).
 *
 * @param userRole - The user's role from the UserRole enum
 * @param userPermissions - Array of individual permission strings from the Permissions table
 * @returns Array of all permission strings the user has access to
 */
export function getEffectivePermissions(
    userRole: UserRole,
    userPermissions: string[]
): string[] {
    if (userRole === 'super_admin') {
        return Object.values(PERMISSIONS);
    }

    const rolePerms = ROLE_PERMISSIONS[userRole] || [];
    const combined = new Set([...rolePerms, ...userPermissions]);
    return Array.from(combined);
}
