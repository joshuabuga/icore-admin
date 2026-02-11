import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    credentials: JSON.parse(process.env.GCP_JSON_KEY || '{}'),
});

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'gonga-frontend';
const bucket = storage.bucket(BUCKET_NAME);

export interface UploadResult {
    success: boolean;
    publicUrl?: string;
    fileName?: string;
    error?: string;
}

/**
 * Uploads an image to Google Cloud Storage
 * @param file - The file to upload (File object or Buffer)
 * @param folder - The folder path in the bucket (e.g., 'promos/images')
 * @param fileName - Optional custom filename, otherwise generates unique name
 * @returns Promise with the public URL or error
 */
export async function uploadImage(
    file: File | Buffer,
    folder: string = 'images',
    fileName?: string
): Promise<UploadResult> {
    try {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);

        let finalFileName: string;
        let buffer: Buffer;
        let contentType: string;

        if (file instanceof File) {
            const extension = file.name.split('.').pop() || 'jpg';
            finalFileName = fileName || `${timestamp}-${randomString}.${extension}`;
            buffer = Buffer.from(await file.arrayBuffer());
            contentType = file.type || 'image/jpeg';
        } else {
            finalFileName = fileName || `${timestamp}-${randomString}.jpg`;
            buffer = file;
            contentType = 'image/jpeg';
        }

        const filePath = `${folder}/${finalFileName}`;
        const blob = bucket.file(filePath);

        await blob.save(buffer, {
            metadata: {
                contentType,
                cacheControl: 'public, max-age=31536000',
            },
            // With uniform bucket-level access, public visibility is controlled
            // by the bucket's IAM policy, not per-object ACLs
            predefinedAcl: undefined,
        });

        const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${filePath}`;

        return {
            success: true,
            publicUrl,
            fileName: finalFileName,
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to upload image',
        };
    }
}

/**
 * Uploads a promo image (main or carousel)
 * @param file - The image file
 * @param type - 'main' or 'carousel'
 * @param promoId - Optional promo ID for organizing files
 */
export async function uploadPromoImage(
    file: File | Buffer,
    type: 'main' | 'carousel',
    promoId?: string
): Promise<UploadResult> {
    const folder = promoId
        ? `promos/${promoId}/${type}`
        : `promos/${type}`;
    return uploadImage(file, folder);
}

/**
 * Deletes an image from Google Cloud Storage
 * @param fileUrl - The public URL or file path to delete
 */
export async function deleteImage(fileUrl: string): Promise<boolean> {
    try {
        // Extract the file path from the URL
        const urlPrefix = `https://storage.googleapis.com/${BUCKET_NAME}/`;
        const filePath = fileUrl.startsWith(urlPrefix)
            ? fileUrl.replace(urlPrefix, '')
            : fileUrl;

        await bucket.file(filePath).delete();
        return true;
    } catch (error) {
        console.error('Error deleting image:', error);
        return false;
    }
}

/**
 * Gets a signed URL for temporary access to a private image
 * @param filePath - The file path in the bucket
 * @param expiresInMinutes - URL expiration time (default 60 minutes)
 */
export async function getSignedImageUrl(
    filePath: string,
    expiresInMinutes: number = 60
): Promise<string | null> {
    try {
        const [url] = await bucket.file(filePath).getSignedUrl({
            action: 'read',
            expires: Date.now() + expiresInMinutes * 60 * 1000,
        });
        return url;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return null;
    }
}