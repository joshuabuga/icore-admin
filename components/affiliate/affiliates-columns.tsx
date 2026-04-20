"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, MoreHorizontal, Settings } from "lucide-react";
import { AffiliateListItem } from "@/types/affiliate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditAffiliateDialog } from "@/components/affiliate/edit-affiliate-dialog";
import { formatCurrency, formatPhone, formatDateTime } from "@/lib/utils/table-utils";

function AffiliateStatusBadge({ status }: { status: AffiliateListItem['status'] }) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        active: "default",
        inactive: "secondary",
        suspended: "destructive",
    };
    return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
}

function AffiliateActionsCell({ affiliate, onRefetch }: { affiliate: AffiliateListItem; onRefetch: () => void }) {
    const router = useRouter();
    const [editOpen, setEditOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/affiliate/${affiliate.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditAffiliateDialog
                affiliate={affiliate}
                onDone={onRefetch}
                open={editOpen}
                onOpenChange={setEditOpen}
                hideTrigger
            />
        </>
    );
}

export function createAffiliatesColumns(onRefetch: () => void): ColumnDef<AffiliateListItem>[] {
    return [
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
        accessorKey: "total_ggr",
        header: "Total GGR",
        cell: ({ row }) => formatCurrency(row.getValue("total_ggr")),
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
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <AffiliateActionsCell affiliate={row.original} onRefetch={onRefetch} />
        ),
    },
    ];
}
