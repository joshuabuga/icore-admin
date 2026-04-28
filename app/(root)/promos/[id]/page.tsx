import PromoForm from '@/components/promotions/PromoForm';

export default async function EditPromoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PromoForm promoId={Number(id)} />;
}
