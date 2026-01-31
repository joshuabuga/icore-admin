"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Payin } from "@/types/payins";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency, formatPhone } from "@/lib/utils/table-utils";

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "default" | "secondary" | "destructive"> = {
    processed: "default",
    pending: "secondary",
    failed: "destructive",
  };

  const labels: Record<string, string> = {
    processed: "Processed",
    pending: "Pending",
    failed: "Failed",
  };

  return (
    <Badge variant={variants[status] || "secondary"}>
      {labels[status] || status}
    </Badge>
  );
}

export const depositsColumns: ColumnDef<Payin>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => row.getValue("full_name") || "-",
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
      <span className="font-medium text-green-600">
        +{formatCurrency(row.getValue("amount"))}
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
    accessorKey: "transaction_ref",
    header: "Reference",
    cell: ({ row }) => (
      <span className="font-mono text-xs">
        {row.getValue("transaction_ref") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
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
    accessorKey: "short_code",
    header: "Short Code",
    cell: ({ row }) => (
      <span className="font-mono">{row.getValue("short_code")}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => formatDateTime(row.getValue("created_at")),
  },
];
