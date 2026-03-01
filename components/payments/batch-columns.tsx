"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payments } from "@/types/crediting";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency } from "@/lib/utils/table-utils";
import { ViewRecipientsDialog } from "@/components/payments/ViewRecipientsDialog";

function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        COMPLETED: "default",
        APPROVED: "default",
        PENDING: "secondary",
        PROCESSING: "outline",
        FAILED: "destructive",
        REJECTED: "destructive",
        PARTIALLY_COMPLETED: "outline",
    };

    return (
        <Badge variant={variants[status] || "secondary"} className="capitalize">
            {status.replace("_", " ")}
        </Badge>
    );
}

export const batchColumns: ColumnDef<Payments>[] = [
    {
        accessorKey: "batch_no",
        header: "Batch No",
        cell: ({ row }) => (
            <span className="font-mono text-sm">{row.getValue("batch_no")}</span>
        ),
    },
    {
        accessorKey: "particulars",
        header: "Particulars",
        cell: ({ row }) => row.getValue("particulars") || "-",
    },
    {
        accessorKey: "total_amount",
        header: "Total Amount",
        cell: ({ row }) => (
            <span className="font-medium">
                {formatCurrency(row.getValue("total_amount"))}
            </span>
        ),
    },
    {
        accessorKey: "recipients",
        header: "Recipients",
        cell: ({ row }) => {
            const recipients = row.getValue("recipients") as Payments["recipients"];
            return <span className="text-muted-foreground">{recipients.length} people</span>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
        accessorKey: "date_initiated",
        header: "Date Initiated",
        cell: ({ row }) => formatDateTime(row.getValue("date_initiated")),
    },
    {
        accessorKey: "approved_by",
        header: "Approved By",
        cell: ({ row }) => {
            const approvedBy = row.getValue("approved_by") as Payments["approved_by"];
            if (!approvedBy) {
                return <span className="text-muted-foreground">-</span>;
            }
            return (
                <div className="text-sm">
                    <p className="font-medium">{approvedBy.name}</p>
                    <p className="text-muted-foreground capitalize">{approvedBy.role}</p>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ViewRecipientsDialog payment={row.original} />,
    },
];
