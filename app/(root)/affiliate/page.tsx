"use client";

import { useState } from "react";
import { useAffiliates, useAffiliateSummary } from "@/hooks/use-affiliate";
import { DataTable } from "@/components/shared/data-table";
import { createAffiliatesColumns } from "@/components/affiliate/affiliates-columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/table-utils";

export default function AffiliatePage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { summary } = useAffiliateSummary();
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

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    { label: "Active Affiliates", value: summary?.total_active != null ? String(summary.total_active) : "—" },
                    { label: "Total Paid Out", value: summary ? formatCurrency(summary.total_commission_paid_out) : "—" },
                    { label: "Total Pending", value: summary ? formatCurrency(summary.total_pending) : "—" },
                    { label: "Players Referred", value: summary?.total_players_referred != null ? String(summary.total_players_referred) : "—" },
                ].map(stat => (
                    <Card key={stat.label}>
                        <CardHeader className="pb-1 pt-4">
                            <CardTitle className="text-xs font-medium text-muted-foreground">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <p className="text-lg font-bold">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <DataTable
                columns={createAffiliatesColumns(refetch)}
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
                mobileHiddenColumns={["total_commission", "total_ggr", "pending_balance", "created_at"]}
                tabletHiddenColumns={["total_ggr", "created_at"]}
            />
        </div>
    );
}
