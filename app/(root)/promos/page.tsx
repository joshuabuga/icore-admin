import PromoEditor from "@/components/shared/editor/PromoEditor";

export default function CreatePromoPage() {
    return (
        <main className="flex-1 space-y-4 p-8 pt-6">
            <PromoEditor task="create" />
        </main>
    )
}
