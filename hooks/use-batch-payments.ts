'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/lib/fetcher';
import { Payments, ProcessingResult } from '@/types/crediting';

export interface CreateBatchInput {
    particulars: string;
    recipients: {
        name: string;
        phoneNumber: string;
        amount: number;
    }[];
}

export interface ApproveBatchInput {
    batchId: string;
}

interface BatchWithRecipients extends Payments {
    recipients: {
        id: string;
        name: string;
        phoneNumber: string;
        amount: number;
    }[];
}

interface ApproveResponse {
    success: boolean;
    message: string;
    results: ProcessingResult[];
    summary: {
        total: number;
        successful: number;
        failed: number;
    };
}

export function useBatchPayments() {
    const { data, error, isLoading, mutate } = useSWR<BatchWithRecipients[]>(
        '/api/process-batch-payment',
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        batches: data || [],
        isLoading,
        error,
        refetch: mutate,
    };
}

export function useBatchMutations() {
    const { trigger: createBatch, isMutating: isCreating } = useSWRMutation(
        '/api/process-batch-payment',
        async (url: string, { arg }: { arg: CreateBatchInput }) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to create batch');
            }
            return res.json();
        }
    );

    const { trigger: approveBatch, isMutating: isApproving } = useSWRMutation(
        '/api/approve-payment',
        async (url: string, { arg }: { arg: ApproveBatchInput }) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arg),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to approve batch');
            }
            return res.json() as Promise<ApproveResponse>;
        }
    );

    return {
        createBatch,
        approveBatch,
        isCreating,
        isApproving,
    };
}
