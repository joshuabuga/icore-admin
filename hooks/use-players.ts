'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { UserListItem, UserDetail, Transaction } from '@/types/users';
import { Payin } from '@/types/payins';
import { Payout } from '@/types/payouts';

export interface PlayersParams {
    search?: string;
    page_size?: number;
    page?: number;
    sortBy?: string;
    sortDesc?: boolean;
    date_after?: string;   // ISO date string (start date)
    date_before?: string;  // ISO date string (end date)
}

export interface TransactionsParams extends PlayersParams {
    wallet_id?: string;
}

interface PlayersResponse {
    data: UserListItem[];
    totalRows: number;
}

export function usePlayers(params: PlayersParams = {}) {
    // Build query string with defaults
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());
    if (params.date_after) searchParams.set('date_after', params.date_after);
    if (params.date_before) searchParams.set('date_before', params.date_before);

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<PlayersResponse>(
        `/api/players${queryString}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        players: data?.data || [],
        totalRows: data?.totalRows || 0,
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

interface TransactionsResponse {
    data: Transaction[];
    totalRows: number;
}

export function usePlayerTransactions(params: TransactionsParams) {
    const searchParams = new URLSearchParams({ type: 'transactions' });
    if (params.wallet_id) searchParams.set('wallet_id', params.wallet_id);
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());
    if (params.date_after) searchParams.set('date_after', params.date_after);
    if (params.date_before) searchParams.set('date_before', params.date_before);

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<TransactionsResponse>(
        params.wallet_id ? `/api/cashflow${queryString}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        transactions: data?.data || [],
        totalRows: data?.totalRows || 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

interface DepositsResponse {
    data: Payin[];
    totalRows: number;
}

export function usePlayerDeposits(playerId: string | null, params: PlayersParams = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());
    if (params.date_after) searchParams.set('date_after', params.date_after);
    if (params.date_before) searchParams.set('date_before', params.date_before);

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<DepositsResponse>(
        playerId ? `/api/players/${playerId}/deposits${queryString}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );
    console.log(data)
    return {
        deposits: data?.data || [],
        totalRows: data?.totalRows || 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

interface WithdrawalsResponse {
    data: Payout[];
    totalRows: number;
}

export function usePlayerWithdrawals(playerId: string | null, params: PlayersParams = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());
    if (params.date_after) searchParams.set('date_after', params.date_after);
    if (params.date_before) searchParams.set('date_before', params.date_before);

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<WithdrawalsResponse>(
        playerId ? `/api/players/${playerId}/withdrawals${queryString}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        withdrawals: data?.data || [],
        totalRows: data?.totalRows || 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

function isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
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
            if (!isSuccessStatus(res.status)) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || `Failed to update player (${res.status})`);
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
            if (!isSuccessStatus(res.status)) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || `Failed to delete player (${res.status})`);
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
