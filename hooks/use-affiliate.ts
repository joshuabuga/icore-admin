'use client';

import useSWR, { mutate as globalMutate } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { AffiliateListItem, AffiliateDetail, AffiliatePayoutRequest } from '@/types/affiliate';

export interface AffiliateParams {
    search?: string;
    page?: number;
    page_size?: number;
    status?: string;
}

interface AffiliateListResponse {
    data: AffiliateListItem[];
    totalRows: number;
}

interface PayoutRequestsResponse {
    data: AffiliatePayoutRequest[];
    totalRows: number;
}

export function useAffiliates(params: AffiliateParams = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    if (params.status) searchParams.set('status', params.status);
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('page_size', (params.page_size ?? 10).toString());

    const key = `/api/affiliate?${searchParams}`;
    const { data, error, isLoading, mutate } = useSWR<AffiliateListResponse>(key, fetcher, {
        revalidateOnFocus: false,
    });

    return {
        affiliates: data?.data ?? [],
        totalRows: data?.totalRows ?? 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useAffiliate(id: string | null) {
    const key = id ? `/api/affiliate/${id}` : null;
    const { data, error, isLoading, mutate } = useSWR<AffiliateDetail>(key, fetcher, {
        revalidateOnFocus: false,
    });

    return {
        affiliate: data ?? null,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useAffiliatePayoutRequests(params: AffiliateParams = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    if (params.status) searchParams.set('status', params.status);
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('page_size', (params.page_size ?? 10).toString());

    const key = `/api/affiliate/payout-requests?${searchParams}`;
    const { data, error, isLoading, mutate } = useSWR<PayoutRequestsResponse>(key, fetcher, {
        revalidateOnFocus: false,
    });

    return {
        payoutRequests: data?.data ?? [],
        totalRows: data?.totalRows ?? 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

export async function actionPayoutRequest(id: number, action: 'approve' | 'reject', notes?: string) {
    const res = await fetch(`/api/affiliate/payout-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, notes }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to process payout request');
    }

    // Revalidate payout requests across all param combos
    await globalMutate((key) => typeof key === 'string' && key.startsWith('/api/affiliate'), undefined, { revalidate: true });

    return res.json();
}
