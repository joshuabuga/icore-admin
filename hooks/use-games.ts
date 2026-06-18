'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { Game, GameDetail, GameStatsSummary, GameStatsResponse } from '@/types/games';

export interface GamesParams {
    search?: string;
    page_size?: number;
    page?: number;
    sortBy?: string;
    sortDesc?: boolean;
}

interface GamesResponse {
    data: Game[];
    totalRows: number;
}

function isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
}

export function useGames(params: GamesParams = {}) {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());

    const queryString = `?${searchParams.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<GamesResponse>(
        `/api/games${queryString}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        games: data?.data || [],
        totalRows: data?.totalRows || 0,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useGameMutations() {
    const { trigger: updateGame, isMutating: isUpdating } = useSWRMutation(
        '/api/games',
        async (url: string, { arg }: { arg: { id: string; data: Partial<GameDetail> } }) => {
            const res = await fetch(`${url}/${arg.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg.data),
            });
            if (!isSuccessStatus(res.status)) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || `Failed to update game (${res.status})`);
            }
            return res.json();
        }
    );

    const uploadThumbnail = async (id: string, file: File) => {
        const formData = new FormData();
        formData.append('thumbnail', file);
        const res = await fetch(`/api/games/${id}/thumbnail`, {
            method: 'POST',
            body: formData,
        });
        if (!isSuccessStatus(res.status)) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.error || `Failed to upload thumbnail (${res.status})`);
        }
        return res.json();
    };

    return {
        updateGame,
        uploadThumbnail,
        isUpdating,
    };
}

export function useTrackedGames() {
    const { data, error, isLoading, mutate } = useSWR<GameStatsSummary[]>(
        '/api/games/game-stats',
        fetcher,
        { revalidateOnFocus: false }
    );
    return { trackedGames: data || [], isLoading, error, refetch: mutate };
}

interface GameStatsParams {
    game: string;
    startDate: string;
    endDate: string;
}

export function useGameStats({ game, startDate, endDate }: GameStatsParams) {
    const params = new URLSearchParams({ game, start_date: startDate, end_date: endDate });
    const { data, error, isLoading } = useSWR<GameStatsResponse>(
        game ? `/api/games/game-stats?${params.toString()}` : null,
        fetcher,
        { revalidateOnFocus: false }
    );
    return { stats: data || null, isLoading, error };
}
