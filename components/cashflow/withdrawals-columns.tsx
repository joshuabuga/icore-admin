"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";

import { Payout } from "@/types/payouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatCurrency, formatPhone } from "@/lib/utils/table-utils";

function PayoutStatusBadge({ status, details }: { status: number; details?: string }) {
  const isReversed = details?.startsWith("Reversed:");

  if (isReversed) {
    return <Badge variant="destructive">Reversed</Badge>;
  }

  const variants: Record<number, "default" | "secondary" | "destructive"> = {
    0: "secondary",
    1: "default",
    2: "destructive",
  };

  const labels: Record<number, string> = {
    0: "Pending",
    1: "Success",
    2: "Failed",
  };

  return (
    <Badge variant={variants[status] ?? "secondary"}>
      {labels[status] ?? `Status ${status}`}
    </Badge>
  );
}

function RetryButton({ payout }: { payout: Payout }) {
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/players/${payout.user}/withdrawals/${payout.id}/requeue`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Requeue failed");
      toast.success(data.message || "Payout requeued");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Requeue failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={handleRetry}
      disabled={loading}
    >
      <RotateCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
      Retry
    </Button>
  );
}

export const withdrawalsColumns: ColumnDef<Payout>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name") || "-",
  },
  {
    accessorKey: "msisdn",
    header: "Phone",
    cell: ({ row }) => formatPhone(row.getValue("msisdn")),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium text-red-600">
        -{formatCurrency(row.getValue("amount"))}
      </span>
    ),
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("transaction_id")}</span>
    ),
  },
  {
    accessorKey: "mpesa_transaction_id",
    header: "M-Pesa ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">
        {row.getValue("mpesa_transaction_id") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <PayoutStatusBadge
        status={row.getValue("status")}
        details={row.getValue("details")}
      />
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <Badge variant="outline" className="uppercase">
        {row.getValue("method")}
      </Badge>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => {
      const details = row.getValue("details") as string;
      return (
        <span className="max-w-[200px] truncate text-muted-foreground">
          {details || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => formatDateTime(row.getValue("created_at")),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const payout = row.original;
      const isPending = payout.status === 0 && !payout.mpesa_transaction_id;
      if (!isPending) return null;
      return <RetryButton payout={payout} />;
    },
  },
];
