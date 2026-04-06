"use client";

import { useState } from "react";
import { useAffiliatePayoutRequests } from "@/hooks/use-affiliate";
import { DataTable } from "@/components/shared/data-table";
import { payoutRequestsColumns } from "@/components/affiliate/payout-requests-columns";

export default function AffiliatePayoutRequestsPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { payoutRequests, totalRows, isLoading, error, refetch } = useAffiliatePayoutRequests({
        search: search || undefined,
        page,
        page_size: pageSize,
    });

    if (error) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-destructive">Failed to load payout requests</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {error instanceof Error ? error.message : "An error occurred"}
                    </p>
                    <button onClick={() => refetch()} className="mt-4 text-sm text-primary underline">
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Payout Requests</h1>
                <p className="text-muted-foreground">Review and approve affiliate payout requests.</p>
            </div>

            <DataTable
                columns={payoutRequestsColumns}
                data={payoutRequests}
                isLoading={isLoading}
                searchPlaceholder="Search by phone..."
                serverSide={true}
                totalRows={totalRows}
                page={page}
                pageSize={pageSize}
                onSearchChange={(value) => { setSearch(value); setPage(1); }}
                onPageChange={setPage}
                onPageSizeChange={(value) => { setPageSize(value); setPage(1); }}
                mobileHiddenColumns={["processed_at", "transaction_id", "notes"]}
                tabletHiddenColumns={["transaction_id", "notes"]}
            />
        </div>
    );
}
