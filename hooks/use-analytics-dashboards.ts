'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import {
    DailyFTDVolume,
    DailyNewUsersFTD,
    DailyStakesWinnings,
    HourlyActiveUsers,
    HourlyRegistration,
    TopGame,
} from '@/types/analytics';

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

export function useHourlyRegistrations() {
    const { data, error, isLoading } = useSWR<HourlyRegistration[]>(
        '/api/analytics/dashboards?type=hourly-registrations',
        fetcher,
        { revalidateOnFocus: false }
    );
    return { data, isLoading, error };
}

export function useHourlyActiveUsers() {
    const { data, error, isLoading } = useSWR<HourlyActiveUsers[]>(
        '/api/analytics/dashboards?type=hourly-active-users',
        fetcher,
        { revalidateOnFocus: false }
    );
    return { data, isLoading, error };
}

export function useDailyStakesWinnings({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<DailyStakesWinnings[]>(
        `/api/analytics/dashboards?type=daily-stakes-winnings&start_date=${start}&end_date=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );
    return { data, isLoading, error };
}

export function useDailyNewUsersFTD({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<DailyNewUsersFTD[]>(
        `/api/analytics/dashboards?type=daily-new-users-ftd&start_date=${start}&end_date=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );
    return { data, isLoading, error };
}

export function useDailyFTDVolume({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<DailyFTDVolume[]>(
        `/api/analytics/dashboards?type=daily-ftd-volume&start_date=${start}&end_date=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );
    return { data, isLoading, error };
}

export function useTopGames({ startDate, endDate }: DateRange = {}) {
    const defaults = getDefaultDateRange();
    const start = startDate || defaults.startDate;
    const end = endDate || defaults.endDate;

    const { data, error, isLoading } = useSWR<TopGame[]>(
        `/api/analytics/dashboards?type=top-games&start_date=${start}&end_date=${end}`,
        fetcher,
        { revalidateOnFocus: false }
    );
    return { data, isLoading, error };
}
