'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { Game, GameDetail } from '@/types/games';

export interface GamesParams {
    search?: string;
    page_size?: number;
    page?: number;
    sortBy?: string;
    sortDesc?: boolean;
}

export function useGames(params?: GamesParams) {
    const queryString = params
        ? '?' + new URLSearchParams(
            Object.entries(params)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [k, String(v)])
        ).toString()
        : '';

    const { data, error, isLoading, mutate } = useSWR<Game[]>(
        `/api/games${queryString}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        games: data || [],
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
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to update game');
            }
            return res.json();
        }
    );

    return {
        updateGame,
        isUpdating,
    };
}
