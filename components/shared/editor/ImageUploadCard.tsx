import { UseFormReturn } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PromoFormData } from '@/lib/schemas/editor-schemas';
import Image from 'next/image';

interface ImageUploadCardProps {
    form: UseFormReturn<PromoFormData>;
    handleImageUpload: (file: File, type: 'image' | 'carouselImage') => void;
    removeImage: (type: 'image' | 'carouselImage') => void;
}

export function ImageUploadCard({
    form,
    handleImageUpload,
    removeImage,
}: ImageUploadCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>
                    Upload images for your promo. Images will be resized
                    automatically.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Main Image */}
                    <div className="space-y-3">
                        <Label>Main Image</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                            {form.watch('image') ? (
                                <div className="relative">
                                    <Image
                                        src={form.watch('image')}
                                        width={500}
                                        height={300}
                                        alt="Main image preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeImage('image')}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <div className="mt-4">
                                        <Label
                                            htmlFor="image-upload"
                                            className="cursor-pointer">
                                            <span className="mt-2 block text-sm font-medium text-muted-foreground">
                                                Click to upload main image
                                            </span>
                                        </Label>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={e => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file)
                                                    handleImageUpload(
                                                        file,
                                                        'image'
                                                    );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Carousel Image */}
                    <div className="space-y-3">
                        <Label>Carousel Image</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                            {form.watch('carouselImage') ? (
                                <div className="relative">
                                    <Image
                                        src={form.watch('carouselImage')}
                                        width={500}
                                        height={300}
                                        alt="Carousel image preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() =>
                                            removeImage('carouselImage')
                                        }>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <div className="mt-4">
                                        <Label
                                            htmlFor="carousel-upload"
                                            className="cursor-pointer">
                                            <span className="mt-2 block text-sm font-medium text-muted-foreground">
                                                Click to upload carousel image
                                            </span>
                                        </Label>
                                        <input
                                            id="carousel-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={e => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file)
                                                    handleImageUpload(
                                                        file,
                                                        'carouselImage'
                                                    );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
