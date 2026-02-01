import BatchPayments from "@/components/payments/table/batch-table";

export default function Page() {
    return (
        <main className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Payment Batches</h2>
                    <p className="text-muted-foreground">
                        Manage and view all payment batches and their approval status.
                    </p>
                </div>
            </div>
            <BatchPayments/>
        </main>
    )
}