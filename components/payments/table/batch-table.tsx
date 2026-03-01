"use client";

import { useBatchPayments } from "@/hooks/use-batch-payments";
import { DataTable } from "@/components/shared/data-table";
import { batchColumns } from "@/components/payments/batch-columns";

export default function BatchPayments() {
    const { batches, isLoading, error, refetch } = useBatchPayments();

    if (error) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-destructive">
                        Failed to load batch payments
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {error instanceof Error ? error.message : "An error occurred"}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="mt-4 text-sm text-primary underline"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <DataTable
            columns={batchColumns}
            data={batches}
            isLoading={isLoading}
            searchPlaceholder="Search by batch number, particulars..."
            showDateFilter={true}
            dateColumn="date_initiated"
            mobileHiddenColumns={["particulars", "approved_by", "date_initiated"]}
            tabletHiddenColumns={["approved_by"]}
        />
    );
}
