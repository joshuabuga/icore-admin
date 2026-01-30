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
    type: 'deposits';
    data: Payin[];
}

interface WithdrawalsResponse {
    type: 'withdrawals';
    data: Payout[];
}

export function useDeposits(params?: CashflowParams) {
    const searchParams = new URLSearchParams({ type: 'deposits' });
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined) searchParams.set(k, String(v));
        });
    }

    const { data, error, isLoading, mutate } = useSWR<DepositsResponse>(
        `/api/cashflow?${searchParams.toString()}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        deposits: data?.data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useWithdrawals(params?: CashflowParams) {
    const searchParams = new URLSearchParams({ type: 'withdrawals' });
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined) searchParams.set(k, String(v));
        });
    }

    const { data, error, isLoading, mutate } = useSWR<WithdrawalsResponse>(
        `/api/cashflow?${searchParams.toString()}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        withdrawals: data?.data || [],
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
        withdrawals: withdrawals.withdrawals,
        isLoading: deposits.isLoading || withdrawals.isLoading,
        error: deposits.error || withdrawals.error,
        refetchDeposits: deposits.refetch,
        refetchWithdrawals: withdrawals.refetch,
    };
}
