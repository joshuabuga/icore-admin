'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { DailyFlowEntry, PayinsGraphResponse, UsersGraphResponse } from '@/types/analytics';

interface DateRange {
    startDate?: string;  // YYYY-MM-DD
    endDate?: string;    // YYYY-MM-DD
}

function getDefaultDateRange(): { startDate: string; endDate: string } {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
    };
}

export function usePayinsPerDay({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<PayinsGraphResponse>(
        `/api/analytics?type=payins&created_at_after=${start}&created_at_before=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    return { data, isLoading, error };
}

export function useUsersPerDay({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<UsersGraphResponse>(
        `/api/analytics?type=users&created_at_after=${start}&created_at_before=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    return { data, isLoading, error };
}

export function useDailyFlow({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<DailyFlowEntry[]>(
        `/api/analytics?type=daily-flow&start_date=${start}&end_date=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    return { data, isLoading, error };
}
