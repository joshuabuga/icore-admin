'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { Promo } from '@/prisma/db/generated/client';

export interface CreatePromoInput {
    title: string;
    description: string;
    carouselImage: string;
    image: string;
    start: string;
    end?: string;
    terms_and_conditions?: string;
    amount?: number;
    is_active: boolean;
    info?: Record<string, unknown>;
}

export interface UpdatePromoInput extends Partial<CreatePromoInput> {}

export function usePromos() {
    const { data, error, isLoading, mutate } = useSWR<Promo[]>(
        '/api/promos',
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        promos: data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function usePromo(id: string | null) {
    const { data, error, isLoading, mutate } = useSWR<Promo>(
        id ? `/api/promos/${id}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        promo: data || null,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function usePromoMutations() {
    const { trigger: createPromo, isMutating: isCreating } = useSWRMutation(
        '/api/promos',
        async (url: string, { arg }: { arg: CreatePromoInput }) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to create promo');
            }
            return res.json();
        }
    );

    const { trigger: updatePromo, isMutating: isUpdating } = useSWRMutation(
        '/api/promos',
        async (url: string, { arg }: { arg: { id: string; data: UpdatePromoInput } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg.data),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to update promo');
            }
            return res.json();
        }
    );

    const { trigger: deletePromo, isMutating: isDeleting } = useSWRMutation(
        '/api/promos',
        async (url: string, { arg }: { arg: { id: string } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to delete promo');
            }
            return res.json();
        }
    );

    return {
        createPromo,
        updatePromo,
        deletePromo,
        isCreating,
        isUpdating,
        isDeleting,
    };
}
