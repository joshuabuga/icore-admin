'use client'

import { columns } from "@/components/payments/table/columns";
import { DataTable } from "@/components/payments/table/data-table";
import {useEffect, useState} from "react";
import {Payments} from "@/types/crediting";

export default function BatchPayments () {
    const [ payments, setPayments ] = useState<Payments[]>([]);
    useEffect(() => {
        const fetchPayments = async () => {
            const payments = await fetch('/api/process-batch-payment');
            const data = await payments.json();
            setPayments(data);
        };
        fetchPayments();
    }, []);
    return (
        <DataTable columns={columns} data={ payments } />
    )
}
