'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Payin } from '@/types/payins';
import { Payout } from '@/types/payouts';

export interface CashflowParams {
    search?: string;
    page_size?: number;
    page?: number;
    sortBy?: string;
    sortDesc?: boolean;
}

interface DepositsResponse {
    data: Payin[];
    totalRows: number;
}

interface WithdrawalsResponse {
    data: Payout[];
    totalRows: number;
}

export function useDeposits(params: CashflowParams = {}) {
    const searchParams = new URLSearchParams({ type: 'deposits' });
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<DepositsResponse>(
        `/api/cashflow${queryString}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        deposits: data?.data || [],
        totalRows: data?.totalRows || 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useWithdrawals(params: CashflowParams = {}) {
    const searchParams = new URLSearchParams({ type: 'withdrawals' });
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<WithdrawalsResponse>(
        `/api/cashflow${queryString}`,
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

export function useCashflow(params?: CashflowParams) {
    const deposits = useDeposits(params);
    const withdrawals = useWithdrawals(params);

    return {
        deposits: deposits.deposits,
        depositsTotalRows: deposits.totalRows,
        withdrawals: withdrawals.withdrawals,
        withdrawalsTotalRows: withdrawals.totalRows,
        isLoading: deposits.isLoading || withdrawals.isLoading,
        error: deposits.error || withdrawals.error,
        refetchDeposits: deposits.refetch,
        refetchWithdrawals: withdrawals.refetch,
    };
}
