'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { ShortCode, TPayPagination, ProviderConfig, UpdateProviderConfigPayload, UpdateCredentialsPayload, AccountBalanceData } from '@/types/tpay';

interface ShortcodesResponse {
    data: ShortCode[];
    pagination: TPayPagination;
    message: string;
}

interface ProviderConfigResponse {
    data: ProviderConfig;
    message: string;
    status: boolean;
}

export function useShortcodes() {
    const { data, error, isLoading, mutate } = useSWR<ShortcodesResponse>(
        '/api/tpay/shortcodes',
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        shortcodes: data?.data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useProviderConfig() {
    const { data, error, isLoading, mutate } = useSWR<ProviderConfigResponse>(
        '/api/tpay/provider-config',
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        config: data?.data,
        isLoading,
        error,
        refetch: mutate,
    };
}

function isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
}

export function useProviderConfigMutations() {
    const updateProviderConfig = async (payload: UpdateProviderConfigPayload) => {
        const res = await fetch('/api/tpay/provider-config', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!isSuccessStatus(res.status)) {
            throw new Error(json.error || json.message || `Failed to update provider config (${res.status})`);
        }
        return json;
    };

    return { updateProviderConfig };
}

interface AccountBalanceApiResponse {
    data: {
        status_code: string;
        message: string;
        data: AccountBalanceData;
    };
    message: string;
    status: boolean;
}

export function useAccountBalance() {
    const { data, error, isLoading, mutate } = useSWR<AccountBalanceApiResponse>(
        '/api/tpay/account-balance',
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        balance: data?.data?.data,
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useMoveFundsMutation() {
    const moveFunds = async (amount: string) => {
        const res = await fetch('/api/tpay/move-funds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount }),
        });
        const json = await res.json().catch(() => ({}));
        if (!isSuccessStatus(res.status)) {
            throw new Error(json.error || json.detail || `Failed to move funds (${res.status})`);
        }
        return json;
    };

    return { moveFunds };
}

export function useShortcodeMutations() {
    const updateCredentials = async (id: number, payload: UpdateCredentialsPayload) => {
        const res = await fetch(`/api/tpay/shortcodes/${id}/credentials`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!isSuccessStatus(res.status)) {
            throw new Error(json.error || json.message || `Failed to update credentials (${res.status})`);
        }
        return json;
    };

    return { updateCredentials };
}
