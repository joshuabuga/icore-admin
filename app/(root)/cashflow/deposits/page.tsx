"use client";

import { useState } from "react";
import { useDeposits } from "@/hooks/use-cashflow";
import { DataTable } from "@/components/shared/data-table";
import { depositsColumns } from "@/components/cashflow/deposits-columns";

export default function DepositsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Convert dates to ISO datetime strings for API (IsoDateTimeFromToRangeFilter expects datetime format)
  const dateAfter = dateRange.from ? `${dateRange.from.toISOString().split('T')[0]}T00:00:00Z` : undefined;
  const dateBefore = dateRange.to ? `${dateRange.to.toISOString().split('T')[0]}T23:59:59Z` : undefined;

  const { deposits, totalRows, isLoading, error, refetch } = useDeposits({
    search: search || undefined,
    page,
    page_size: pageSize,
    sortBy: "id",
    sortDesc: true,
    date_after: dateAfter,
    date_before: dateBefore,
  });

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to load deposits
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
        <h1 className="text-2xl font-bold tracking-tight">Deposits</h1>
        <p className="text-muted-foreground">
          View all deposit transactions (payins)
        </p>
      </div>

      <DataTable
        columns={depositsColumns}
        data={deposits}
        isLoading={isLoading}
        searchPlaceholder="Search by name, phone, or transaction ID..."
        showDateFilter={true}
        mobileHiddenColumns={["transaction_ref", "short_code", "method"]}
        tabletHiddenColumns={["short_code"]}
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
        dateRange={dateRange}
        onDateRangeChange={(range) => {
          setDateRange(range);
          setPage(1);
        }}
      />
    </div>
  );
}
