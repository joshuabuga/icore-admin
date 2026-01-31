import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormData, PromoFormData } from '@/lib/schemas/editor-schemas'
import { useUpload } from '@/hooks/useUpload'

interface UseImageUploadProps {
    form: UseFormReturn<CampaignFormData | PromoFormData>
    promoId?: string
}

export function useImageUpload({ form, promoId }: UseImageUploadProps) {
    const [imageFiles, setImageFiles] = useState<{
        image?: File
        carouselImage?: File
    }>({})
    const [previews, setPreviews] = useState<{
        image?: string
        carouselImage?: string
    }>({})

    const { uploadPromoImage, uploading, error } = useUpload()

    const handleImageUpload = (file: File, type: 'image' | 'carouselImage') => {
        setImageFiles(prev => ({ ...prev, [type]: file }))
        // Create preview URL
        const reader = new FileReader()
        reader.onload = (e) => {
            const previewUrl = e.target?.result as string
            setPreviews(prev => ({ ...prev, [type]: previewUrl }))
            form.setValue(type as any, previewUrl)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = (type: 'image' | 'carouselImage') => {
        setImageFiles(prev => ({ ...prev, [type]: undefined }))
        setPreviews(prev => ({ ...prev, [type]: undefined }))
        form.setValue(type as any, '')
    }

    /**
     * Uploads all pending images to cloud storage and returns the public URLs
     * Call this before form submission to get the final URLs
     */
    const uploadPendingImages = async (): Promise<{
        image?: string
        carouselImage?: string
    }> => {
        const uploadedUrls: { image?: string; carouselImage?: string } = {}

        if (imageFiles.image) {
            const result = await uploadPromoImage(imageFiles.image, 'main', promoId)
            if (result.success && result.publicUrl) {
                uploadedUrls.image = result.publicUrl
            }
        }

        if (imageFiles.carouselImage) {
            const result = await uploadPromoImage(imageFiles.carouselImage, 'carousel', promoId)
            if (result.success && result.publicUrl) {
                uploadedUrls.carouselImage = result.publicUrl
            }
        }

        return uploadedUrls
    }

    return {
        imageFiles,
        previews,
        handleImageUpload,
        removeImage,
        uploadPendingImages,
        uploading,
        uploadError: error
    }
}
