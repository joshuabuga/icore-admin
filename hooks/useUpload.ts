import { useState } from 'react';

export interface UploadResponse {
    success: boolean;
    publicUrl?: string;
    fileName?: string;
    error?: string;
}

type UploadType = 'image' | 'csv' | 'promo-main' | 'promo-carousel' | 'file';

interface UseUploadOptions {
    onSuccess?: (result: UploadResponse) => void;
    onError?: (error: string) => void;
}

export function useUpload(options?: UseUploadOptions) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (
        file: File,
        type: UploadType = 'file',
        folder?: string,
        promoId?: string
    ): Promise<UploadResponse> => {
        setUploading(true);
        setError(null);

        try {
            // Step 1: Get a signed upload URL from our API
            const params = new URLSearchParams({
                fileName: file.name,
                contentType: file.type || 'application/octet-stream',
                type,
            });
            if (folder) params.set('folder', folder);
            if (promoId) params.set('promoId', promoId);

            const urlResponse = await fetch(`/api/upload?${params.toString()}`);
            const urlResult = await urlResponse.json();

            if (!urlResponse.ok || !urlResult.signedUrl) {
                const errorMessage = urlResult.error || 'Failed to get upload URL';
                setError(errorMessage);
                options?.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

            // Step 2: Upload the file directly to GCS using the signed URL
            const uploadResponse = await fetch(urlResult.signedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type || 'application/octet-stream',
                },
                body: file,
            });

            if (!uploadResponse.ok) {
                const errorMessage = `Upload failed with status ${uploadResponse.status}`;
                setError(errorMessage);
                options?.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

            const result: UploadResponse = {
                success: true,
                publicUrl: urlResult.publicUrl,
                fileName: urlResult.fileName,
            };

            options?.onSuccess?.(result);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Upload failed';
            setError(errorMessage);
            options?.onError?.(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setUploading(false);
        }
    };

    const uploadImage = (file: File, folder?: string) =>
        upload(file, 'image', folder);

    const uploadCSV = (file: File, batchNo?: string) =>
        upload(file, 'csv', undefined, batchNo);

    const uploadPromoImage = (file: File, type: 'main' | 'carousel', promoId?: string) =>
        upload(file, type === 'main' ? 'promo-main' : 'promo-carousel', undefined, promoId);

    const uploadFile = (file: File, folder?: string) =>
        upload(file, 'file', folder);

    return {
        upload,
        uploadImage,
        uploadCSV,
        uploadPromoImage,
        uploadFile,
        uploading,
        error,
    };
}