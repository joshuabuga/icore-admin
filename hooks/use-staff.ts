'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { UserRole, Permissions } from '@/prisma/db/generated/client';

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    permissions: Permissions[];
}

export interface CreateStaffData {
    id: string;
    name: string;
    email: string;
    role?: UserRole;
    permissions?: string[];
}

export interface UpdateStaffData {
    name?: string;
    email?: string;
    role?: UserRole;
    permissions?: string[];
}

export function useStaff() {
    const { data, error, isLoading, mutate } = useSWR<StaffMember[]>(
        '/api/staff',
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        staff: data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useStaffMember(id: string | null) {
    const { data, error, isLoading, mutate } = useSWR<StaffMember>(
        id ? `/api/staff/${id}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        staffMember: data || null,
        isLoading,
        error,
        refetch: mutate,
    };
}

function isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
}

export function useStaffMutations() {
    const { trigger: createStaff, isMutating: isCreating } = useSWRMutation(
        '/api/staff',
        async (url: string, { arg }: { arg: CreateStaffData }) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg),
            });
            if (!isSuccessStatus(res.status)) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || `Failed to create staff member (${res.status})`);
            }
            return res.json();
        }
    );

    const { trigger: updateStaff, isMutating: isUpdating } = useSWRMutation(
        '/api/staff',
        async (url: string, { arg }: { arg: { id: string; data: UpdateStaffData } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg.data),
            });
            if (!isSuccessStatus(res.status)) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || `Failed to update staff member (${res.status})`);
            }
            return res.json();
        }
    );

    const { trigger: deleteStaff, isMutating: isDeleting } = useSWRMutation(
        '/api/staff',
        async (url: string, { arg }: { arg: { id: string } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'DELETE',
            });
            if (!isSuccessStatus(res.status)) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || `Failed to delete staff member (${res.status})`);
            }
            return res.json();
        }
    );

    return {
        createStaff,
        updateStaff,
        deleteStaff,
        isCreating,
        isUpdating,
        isDeleting,
    };
}