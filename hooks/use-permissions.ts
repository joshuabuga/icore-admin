'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { UserRole } from '@/prisma/db/generated/client';
import {
    PERMISSIONS,
    ROLE_PERMISSIONS,
    hasPermission as checkPermission,
    hasAnyPermission as checkAnyPermission,
    hasAllPermissions as checkAllPermissions,
    getEffectivePermissions,
} from '@/lib/permissions';

interface UserPermissionsResponse {
    role: UserRole;
    permissions: string[];
}

export function usePermissions() {
    const { data, error, isLoading } = useSWR<UserPermissionsResponse>(
        '/api/auth/permissions',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );

    const role = data?.role || 'user';
    const userPermissions = data?.permissions || [];

    const hasPermission = (permission: string): boolean => {
        if (!data) return false;
        return checkPermission(role, userPermissions, permission);
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        if (!data) return false;
        return checkAnyPermission(role, userPermissions, permissions);
    };

    const hasAllPermissions = (permissions: string[]): boolean => {
        if (!data) return false;
        return checkAllPermissions(role, userPermissions, permissions);
    };

    const effectivePermissions = data
        ? getEffectivePermissions(role, userPermissions)
        : [];

    return {
        role,
        userPermissions,
        effectivePermissions,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        isLoading,
        error,
        PERMISSIONS,
    };
}
