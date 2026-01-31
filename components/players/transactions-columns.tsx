"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

import { Transaction } from "@/types/users";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency } from "@/lib/utils/table-utils";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const isCredit = type === "cr";
      return (
        <Badge
          variant={isCredit ? "default" : "secondary"}
          className="flex w-fit items-center gap-1"
        >
          {isCredit ? (
            <ArrowDownLeft className="h-3 w-3" />
          ) : (
            <ArrowUpRight className="h-3 w-3" />
          )}
          {isCredit ? "Credit" : "Debit"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate">{row.getValue("subject")}</span>
    ),
  },
  {
    accessorKey: "value",
    header: "Amount",
    cell: ({ row }) => {
      const type = row.original.type;
      const value = row.getValue("value") as string;
      const isCredit = type === "cr";
      return (
        <span className={isCredit ? "text-green-600" : "text-red-600"}>
          {isCredit ? "+" : "-"}
          {formatCurrency(value)}
        </span>
      );
    },
  },
  {
    accessorKey: "initial_balance",
    header: "Initial Balance",
    cell: ({ row }) => formatCurrency(row.getValue("initial_balance")),
  },
  {
    accessorKey: "final_balance",
    header: "Final Balance",
    cell: ({ row }) => formatCurrency(row.getValue("final_balance")),
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
