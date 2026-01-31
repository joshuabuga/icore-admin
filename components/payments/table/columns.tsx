'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Payments } from "@/types/crediting";
import { Badge } from "@/components/ui/badge";
import { ViewRecipientsDialog } from "@/components/payments/ViewRecipientsDialog";
import { format } from "date-fns";

export const columns: ColumnDef<Payments>[] = [
    {
        accessorKey: 'batch_no',
        header: 'Batch No',
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue('batch_no')}</span>
        ),
    },
    {
        accessorKey: 'particulars',
        header: 'Particulars',
    },
    {
        accessorKey: 'total_amount',
        header: 'Total Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('total_amount'))
            return <span className="font-medium">KES {amount.toLocaleString()}</span>
        },
    },
    {
        accessorKey: 'recipients',
        header: 'Recipients',
        cell: ({ row }) => {
            const recipients = row.getValue('recipients') as Payments['recipients']
            return <span className="text-muted-foreground">{recipients.length} people</span>
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <Badge
                    variant={status === 'APPROVED' ? 'default' : status === 'PENDING' ? 'secondary' : 'destructive'}
                    className="capitalize"
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'date_initiated',
        header: 'Date Initiated',
        cell: ({ row }) => {
            const date = row.getValue('date_initiated') as Date
            return format(date, 'MMM dd, yyyy')
        },
    },
    {
        accessorKey: 'approved_by',
        header: 'Approved By',
        cell: ({ row }) => {
            const approvedBy = row.getValue('approved_by') as Payments['approved_by']
            if (!approvedBy) {
                return <span className="text-muted-foreground">Pending</span>
            }
            return (
                <div className="text-sm">
                    <p className="font-medium">{approvedBy.name}</p>
                    <p className="text-muted-foreground capitalize">{approvedBy.role}</p>
                </div>
            )
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return <ViewRecipientsDialog payment={row.original} />
        },
    },
]
