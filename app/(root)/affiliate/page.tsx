"use client";

import { useState } from "react";
import { useAffiliates } from "@/hooks/use-affiliate";
import { DataTable } from "@/components/shared/data-table";
import { affiliatesColumns } from "@/components/affiliate/affiliates-columns";

export default function AffiliatePage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { affiliates, totalRows, isLoading, error, refetch } = useAffiliates({
        search: search || undefined,
        page,
        page_size: pageSize,
    });

    if (error) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-destructive">Failed to load affiliates</h2>
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
                <h1 className="text-2xl font-bold tracking-tight">Affiliates</h1>
                <p className="text-muted-foreground">All affiliate accounts and their performance.</p>
            </div>

            <DataTable
                columns={affiliatesColumns}
                data={affiliates}
                isLoading={isLoading}
                searchPlaceholder="Search by phone..."
                serverSide={true}
                totalRows={totalRows}
                page={page}
                pageSize={pageSize}
                onSearchChange={(value) => { setSearch(value); setPage(1); }}
                onPageChange={setPage}
                onPageSizeChange={(value) => { setPageSize(value); setPage(1); }}
                mobileHiddenColumns={["total_commission", "pending_balance", "created_at"]}
                tabletHiddenColumns={["created_at"]}
            />
        </div>
    );
}
