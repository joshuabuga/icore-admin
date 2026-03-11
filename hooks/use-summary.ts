'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Summary } from '@/types/summary';

export function useSummary(date?: string) {
    const key = date ? `/api/summary?date=${date}` : '/api/summary';
    const { data, error, isLoading, mutate } = useSWR<Summary>(
        key,
        fetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: date ? 0 : 60000,
        }
    );

    return {
        summary: data || null,
        isLoading,
        error,
        refetch: mutate,
    };
}
