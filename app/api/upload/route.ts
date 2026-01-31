import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { uploadFile, uploadImage, uploadCSV, uploadPromoImage } from '@/lib/storage';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const type = formData.get('type') as string | null; // 'image', 'csv', 'promo-main', 'promo-carousel', or 'file'
        const folder = formData.get('folder') as string | null;
        const promoId = formData.get('promoId') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        let result;

        switch (type) {
            case 'promo-main':
                result = await uploadPromoImage(file, 'main', promoId || undefined);
                break;
            case 'promo-carousel':
                result = await uploadPromoImage(file, 'carousel', promoId || undefined);
                break;
            case 'csv':
                result = await uploadCSV(file, promoId || undefined);
                break;
            case 'image':
                result = await uploadImage(file, folder || 'images');
                break;
            case 'file':
            default:
                result = await uploadFile(file, folder || 'files');
                break;
        }

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Upload failed' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            publicUrl: result.publicUrl,
            fileName: result.fileName,
        });
    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}