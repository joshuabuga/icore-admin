'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher, fetcherWithParams, mutationFetcher } from '@/lib/fetcher';
import { UserListItem, UserDetail, Transaction } from '@/types/users';

export interface PlayersParams {
    search?: string;
    page_size?: number;
    page?: number;
    sortBy?: string;
    sortDesc?: boolean;
}

export interface TransactionsParams extends PlayersParams {
    wallet_id?: string;
}

export function usePlayers(params?: PlayersParams) {
    const queryString = params
        ? '?' + new URLSearchParams(
            Object.entries(params)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [k, String(v)])
        ).toString()
        : '';

    const { data, error, isLoading, mutate } = useSWR<UserListItem[]>(
        `/api/players${queryString}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        players: data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function usePlayer(id: string | null) {
    const { data, error, isLoading, mutate } = useSWR<UserDetail>(
        id ? `/api/players/${id}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        player: data || null,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function usePlayerTransactions(params: TransactionsParams) {
    const queryString = '?' + new URLSearchParams(
        Object.entries({ ...params, type: 'transactions' })
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
    ).toString();

    const { data, error, isLoading, mutate } = useSWR<{ type: string; data: Transaction[] }>(
        `/api/cashflow${queryString}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        transactions: data?.data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function usePlayerMutations() {
    const { trigger: updatePlayer, isMutating: isUpdating } = useSWRMutation(
        '/api/players',
        async (url: string, { arg }: { arg: { id: string; data: Partial<UserDetail> } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg.data),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to update player');
            }
            return res.json();
        }
    );

    const { trigger: deletePlayer, isMutating: isDeleting } = useSWRMutation(
        '/api/players',
        async (url: string, { arg }: { arg: { id: string } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to delete player');
            }
            return res.json();
        }
    );

    return {
        updatePlayer,
        deletePlayer,
        isUpdating,
        isDeleting,
    };
}
