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
            const formData = new FormData();
            formData.set('file', file);
            formData.set('type', type);
            if (folder) formData.set('folder', folder);
            if (promoId) formData.set('promoId', promoId);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                const errorMessage = result.error || 'Upload failed';
                setError(errorMessage);
                options?.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

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