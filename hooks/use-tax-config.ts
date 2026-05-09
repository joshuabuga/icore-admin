'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { TaxConfig, TaxConfigPayload } from '@/types/tax-config';

export function useTaxConfig() {
    const { data, error, isLoading, mutate } = useSWR<TaxConfig>(
        '/api/payments/tax-config',
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        config: data,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useTaxConfigMutations() {
    const updateTaxConfig = async (payload: TaxConfigPayload) => {
        const res = await fetch('/api/payments/tax-config', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(json.error || json.message || `Failed to update tax config (${res.status})`);
        }
        return json;
    };

    return { updateTaxConfig };
}
