"use client";

import { useState } from "react";
import { useWithdrawals } from "@/hooks/use-cashflow";
import { DataTable } from "@/components/shared/data-table";
import { withdrawalsColumns } from "@/components/cashflow/withdrawals-columns";

export default function WithdrawalsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { withdrawals, totalRows, isLoading, error, refetch } = useWithdrawals({
    search: search || undefined,
    page,
    page_size: pageSize,
    sortBy: "id",
    sortDesc: true,
  });

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to load withdrawals
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Withdrawals</h1>
        <p className="text-muted-foreground">
          View all withdrawal transactions (payouts)
        </p>
      </div>

      <DataTable
        columns={withdrawalsColumns}
        data={withdrawals}
        isLoading={isLoading}
        searchPlaceholder="Search by name, phone, or M-Pesa ID..."
        showDateFilter={false}
        mobileHiddenColumns={["mpesa_transaction_id", "method", "details"]}
        tabletHiddenColumns={["details"]}
        serverSide={true}
        totalRows={totalRows}
        page={page}
        pageSize={pageSize}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onPageChange={setPage}
        onPageSizeChange={(value) => {
          setPageSize(value);
          setPage(1);
        }}
      />
    </div>
  );
}
