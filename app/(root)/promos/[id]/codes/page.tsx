import PromoCodesManager from '@/components/promotions/PromoCodesManager';

export default async function PromoCodesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PromoCodesManager promoId={Number(id)} />;
}
