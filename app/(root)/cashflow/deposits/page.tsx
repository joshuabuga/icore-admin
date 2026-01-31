"use client";

import { useDeposits } from "@/hooks/use-cashflow";
import { DataTable } from "@/components/shared/data-table";
import { depositsColumns } from "@/components/cashflow/deposits-columns";

export default function DepositsPage() {
  const { deposits, isLoading, error, refetch } = useDeposits();

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
        dateColumn="created_at"
        showDateFilter={true}
        mobileHiddenColumns={["transaction_ref", "short_code", "method"]}
        tabletHiddenColumns={["short_code"]}
      />
    </div>
  );
}
