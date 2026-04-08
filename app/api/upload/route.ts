import { NextRequest, NextResponse } from 'next/server';
import {uploadFile, uploadImage, uploadCSV, uploadPromoImage, generateSignedUploadUrl} from '@/lib/storage';
import { requireAuth, requireAnyPermission, isAuthError, PERMISSIONS } from '@/lib/api-auth';


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type'); // 'promo-main', 'promo-carousel', etc.

        // Check permission based on upload type
        const isPromoUpload = type === 'promo-main' || type === 'promo-carousel';
        const authResult = isPromoUpload
            ? await requireAuth(PERMISSIONS.PROMOS_WRITE)
            : await requireAnyPermission([PERMISSIONS.PROMOS_WRITE, PERMISSIONS.BATCHES_READ, PERMISSIONS.PLAYERS_WRITE]);
        if (isAuthError(authResult)) return authResult;

        const fileName = searchParams.get('fileName');
        const contentType = searchParams.get('contentType');
        const promoId = searchParams.get('promoId');
        const folder = searchParams.get('folder');

        if (!fileName || !contentType) {
            return NextResponse.json(
                { error: 'fileName and contentType are required' },
                { status: 400 }
            );
        }

        let uploadFolder: string;
        switch (type) {
            case 'promo-main':
                uploadFolder = promoId ? `promos/${promoId}/main` : 'promos/main';
                break;
            case 'promo-carousel':
                uploadFolder = promoId ? `promos/${promoId}/carousel` : 'promos/carousel';
                break;
            default:
                uploadFolder = folder || 'images';
                break;
        }

        const result = await generateSignedUploadUrl(uploadFolder, fileName, contentType);

        if (!result) {
            return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload URL API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const type = formData.get('type') as string | null; // 'image', 'csv', 'promo-main', 'promo-carousel', or 'file'

        // Check permission based on upload type
        const isPromoUpload = type === 'promo-main' || type === 'promo-carousel';
        const isCsvUpload = type === 'csv';
        let authResult;
        if (isPromoUpload) {
            authResult = await requireAuth(PERMISSIONS.PROMOS_WRITE);
        } else if (isCsvUpload) {
            authResult = await requireAuth(PERMISSIONS.BATCHES_READ);
        } else {
            authResult = await requireAnyPermission([PERMISSIONS.PROMOS_WRITE, PERMISSIONS.BATCHES_READ, PERMISSIONS.PLAYERS_WRITE]);
        }
        if (isAuthError(authResult)) return authResult;

        const file = formData.get('file') as File | null;
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