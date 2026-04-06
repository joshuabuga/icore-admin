"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { AffiliatePayoutRequest } from "@/types/affiliate";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPhone, formatDateTime } from "@/lib/utils/table-utils";
import { ApprovePayoutDialog } from "./approve-payout-dialog";

function PayoutStatusBadge({ status }: { status: AffiliatePayoutRequest['status'] }) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        pending: "secondary",
        approved: "default",
        rejected: "destructive",
        paid: "default",
        failed: "destructive",
    };
    return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
}

export const payoutRequestsColumns: ColumnDef<AffiliatePayoutRequest>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <span className="font-mono text-sm">#{row.getValue("id")}</span>,
    },
    {
        id: "affiliate",
        header: "Affiliate",
        cell: ({ row }) => {
            const req = row.original;
            return (
                <Link
                    href={`/affiliate/${req.affiliate_id}`}
                    className="font-medium hover:underline"
                >
                    {formatPhone(req.affiliate_msisdn)}
                </Link>
            );
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
            <span className="font-semibold">{formatCurrency(row.getValue("amount"))}</span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <PayoutStatusBadge status={row.getValue("status")} />,
    },
    {
        accessorKey: "requested_at",
        header: "Requested",
        cell: ({ row }) => formatDateTime(row.getValue("requested_at")),
    },
    {
        accessorKey: "processed_at",
        header: "Processed",
        cell: ({ row }) => formatDateTime(row.getValue("processed_at")),
    },
    {
        accessorKey: "transaction_id",
        header: "Transaction ID",
        cell: ({ row }) => (
            <span className="font-mono text-xs">{row.getValue("transaction_id") || "-"}</span>
        ),
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => (
            <span className="max-w-[160px] truncate text-muted-foreground text-xs">
                {row.getValue("notes") || "-"}
            </span>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const req = row.original;
            if (req.status !== "pending") return null;
            return <ApprovePayoutDialog request={req} />;
        },
    },
];
