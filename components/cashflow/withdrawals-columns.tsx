"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Payout } from "@/types/payouts";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency, formatPhone } from "@/lib/utils/table-utils";

// Payout status badge component
function PayoutStatusBadge({ status }: { status: number }) {
  const variants: Record<number, "default" | "secondary" | "destructive"> = {
    0: "secondary", // pending
    1: "default",   // success
    2: "destructive", // failed
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
    cell: ({ row }) => <PayoutStatusBadge status={row.getValue("status")} />,
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
];
