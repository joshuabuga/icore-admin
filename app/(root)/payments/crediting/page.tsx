import CreditingSection from "@/components/payments/Credit";

export default function CreditingPage() {
    return (
        <main className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Credit Customers</h2>
                    <p className="text-muted-foreground">
                        Upload CSV files to process batch payments and credit customer accounts.
                    </p>
                </div>
            </div>
            <CreditingSection />
        </main>
    )
}