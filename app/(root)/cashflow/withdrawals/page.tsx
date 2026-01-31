"use client";

import { useWithdrawals } from "@/hooks/use-cashflow";
import { DataTable } from "@/components/shared/data-table";
import { withdrawalsColumns } from "@/components/cashflow/withdrawals-columns";

export default function WithdrawalsPage() {
  const { withdrawals, isLoading, error, refetch } = useWithdrawals();

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
        dateColumn="created_at"
        showDateFilter={true}
        mobileHiddenColumns={["mpesa_transaction_id", "method", "details"]}
        tabletHiddenColumns={["details"]}
      />
    </div>
  );
}
