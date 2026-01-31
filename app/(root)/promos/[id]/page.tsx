import PromoEditor from "@/components/shared/editor/PromoEditor";


export default async function EditPromoPage({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    if (!id) {
        return <div>Loading...</div>;
    }
    return (
        <main className="flex-1 space-y-4 p-8 pt-6">
            <PromoEditor task="edit" itemId={id} />
        </main>
    )
}
