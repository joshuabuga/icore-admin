import BatchPayments from "@/components/payments/table/batch-table";

export default function Page() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Payment Batches</h1>
                <p className="text-muted-foreground">
                    Manage and view all payment batches and their approval status.
                </p>
            </div>
            <BatchPayments />
        </div>
    );
}
