import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    credentials: JSON.parse(process.env.GCP_JSON_KEY || '{}'),
});

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'tucheze-admin-uploads';
const bucket = storage.bucket(BUCKET_NAME);

export interface FileUploadResult {
    success: boolean;
    publicUrl?: string;
    fileName?: string;
    filePath?: string;
    error?: string;
}

/**
 * Uploads a file to Google Cloud Storage
 * @param file - The file to upload (File object or Buffer)
 * @param folder - The folder path in the bucket (e.g., 'csv/uploads')
 * @param fileName - Optional custom filename, otherwise generates unique name
 * @param contentType - Optional content type override
 * @returns Promise with the public URL or error
 */
export async function uploadFile(
    file: File | Buffer,
    folder: string = 'files',
    fileName?: string,
    contentType?: string
): Promise<FileUploadResult> {
    try {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);

        let finalFileName: string;
        let buffer: Buffer;
        let mimeType: string;

        if (file instanceof File) {
            const extension = file.name.split('.').pop() || 'bin';
            finalFileName = fileName || `${timestamp}-${randomString}.${extension}`;
            buffer = Buffer.from(await file.arrayBuffer());
            mimeType = contentType || file.type || 'application/octet-stream';
        } else {
            finalFileName = fileName || `${timestamp}-${randomString}`;
            buffer = file;
            mimeType = contentType || 'application/octet-stream';
        }

        const filePath = `${folder}/${finalFileName}`;
        const blob = bucket.file(filePath);

        await blob.save(buffer, {
            metadata: {
                contentType: mimeType,
            },
        });

        // Make the file publicly accessible
        await blob.makePublic();

        const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${filePath}`;

        return {
            success: true,
            publicUrl,
            fileName: finalFileName,
            filePath,
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to upload file',
        };
    }
}

/**
 * Uploads a CSV file for batch payments
 * @param file - The CSV file
 * @param batchNo - Optional batch number for organizing files
 */
export async function uploadCSV(
    file: File | Buffer,
    batchNo?: string
): Promise<FileUploadResult> {
    const folder = batchNo
        ? `csv/batches/${batchNo}`
        : 'csv/uploads';
    return uploadFile(file, folder, undefined, 'text/csv');
}

/**
 * Deletes a file from Google Cloud Storage
 * @param fileUrl - The public URL or file path to delete
 */
export async function deleteFile(fileUrl: string): Promise<boolean> {
    try {
        const urlPrefix = `https://storage.googleapis.com/${BUCKET_NAME}/`;
        const filePath = fileUrl.startsWith(urlPrefix)
            ? fileUrl.replace(urlPrefix, '')
            : fileUrl;

        await bucket.file(filePath).delete();
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
}

/**
 * Gets a signed URL for temporary access to a private file
 * @param filePath - The file path in the bucket
 * @param expiresInMinutes - URL expiration time (default 60 minutes)
 */
export async function getSignedFileUrl(
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

/**
 * Lists files in a specific folder
 * @param folder - The folder path to list
 * @param maxResults - Maximum number of results (default 100)
 */
export async function listFiles(
    folder: string,
    maxResults: number = 100
): Promise<string[]> {
    try {
        const [files] = await bucket.getFiles({
            prefix: folder,
            maxResults,
        });
        return files.map(file => file.name);
    } catch (error) {
        console.error('Error listing files:', error);
        return [];
    }
}

/**
 * Checks if a file exists in the bucket
 * @param filePath - The file path to check
 */
export async function fileExists(filePath: string): Promise<boolean> {
    try {
        const [exists] = await bucket.file(filePath).exists();
        return exists;
    } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
    }
}