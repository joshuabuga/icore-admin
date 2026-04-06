"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { AffiliateListItem } from "@/types/affiliate";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPhone, formatDateTime } from "@/lib/utils/table-utils";

function AffiliateStatusBadge({ status }: { status: AffiliateListItem['status'] }) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        active: "default",
        inactive: "secondary",
        suspended: "destructive",
    };
    return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
}

export const affiliatesColumns: ColumnDef<AffiliateListItem>[] = [
    {
        accessorKey: "msisdn",
        header: "Phone",
        cell: ({ row }) => (
            <Link href={`/affiliate/${row.original.id}`} className="font-medium text-primary hover:underline">
                {formatPhone(row.getValue("msisdn"))}
            </Link>
        ),
    },
    {
        accessorKey: "affiliate_code",
        header: "Code",
        cell: ({ row }) => (
            <span className="font-mono text-sm">{row.getValue("affiliate_code")}</span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <AffiliateStatusBadge status={row.getValue("status")} />,
    },
    {
        accessorKey: "commission_rate",
        header: "Commission",
        cell: ({ row }) => <span>{row.getValue("commission_rate")}%</span>,
    },
    {
        accessorKey: "total_players",
        header: "Players",
        cell: ({ row }) => row.getValue("total_players") ?? 0,
    },
    {
        accessorKey: "total_commission",
        header: "Total Earned",
        cell: ({ row }) => formatCurrency(row.getValue("total_commission")),
    },
    {
        id: "pending_balance",
        header: "Pending",
        cell: ({ row }) => formatCurrency(row.original.wallet?.pending_balance),
    },
    {
        id: "available_balance",
        header: "Available",
        cell: ({ row }) => (
            <span className="font-medium text-green-600 dark:text-green-400">
                {formatCurrency(row.original.wallet?.available_balance)}
            </span>
        ),
    },
    {
        accessorKey: "created_at",
        header: "Joined",
        cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
];
