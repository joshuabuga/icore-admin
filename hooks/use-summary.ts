'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Summary } from '@/types/summary';

export function useSummary() {
    const { data, error, isLoading, mutate } = useSWR<Summary>(
        '/api/summary',
        fetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: 60000,
        }
    );

    return {
        summary: data || null,
        isLoading,
        error,
        refetch: mutate,
    };
}
