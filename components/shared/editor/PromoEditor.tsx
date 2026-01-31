'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Upload, X, Save, Plus } from 'lucide-react';
import { useUserStore } from '@/stores/UserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { promoSchema, PromoFormData } from '@/lib/schemas/editor-schemas';
import { cn } from '@/lib/utils';
import { Promos } from '@/types/crediting';
import { PromoContentCard } from './PromoContentCard';
import { TermsAndConditionsCard } from './TermsAndConditionsCard';
import { toast } from 'sonner';
import { useUpload } from '@/hooks/useUpload';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PromoEditorProps {
    task: 'create' | 'edit';
    itemId?: string;
}

// Helper function to get default promo values
function getPromoDefaults(existingData?: Promos | null): PromoFormData {
    return existingData
        ? {
              title: existingData.title || '',
              description: existingData.description || '',
              carouselImage: existingData.carousel_image || '',
              image: existingData.image || '',
              start: new Date(existingData.start),
              end: new Date(existingData.end),
              terms_and_conditions: existingData.terms_and_conditions || '',
              amount: existingData.amount,
              is_active: existingData.is_active,
              info: {
                  action: existingData.info.action || '',
                  url: existingData.info.url || '',
                  content: existingData.info.content || '',
                  qualificationCriteria: existingData.info
                      .qualificationCriteria || [''],
                  prizes: {
                      maxAmount: existingData.info.prizes.maxAmount || 0,
                      maxWinnings: existingData.info.prizes.maxWinnings || 0,
                      dailyWinners: existingData.info.prizes.dailyWinners || 0,
                  },
                  gameTypes: [],
                  minimumOdds: existingData.info.minimumOdds || 0,
                  timeRestrictions: {
                      startTime: existingData.info.timeRestrictions.startTime!,
                      endTime: existingData.info.timeRestrictions.endTime!,
                  },
              },
          }
        : {
              title: '',
              description: '',
              carouselImage: '',
              image: '',
              start: new Date(),
              end: new Date(),
              terms_and_conditions: '',
              amount: 0,
              is_active: false,
              info: {
                  action: '',
                  url: '',
                  content: '',
                  qualificationCriteria: [''],
                  prizes: {
                      maxAmount: undefined,
                      maxWinnings: undefined,
                      dailyWinners: undefined,
                  },
                  gameTypes: [],
                  minimumOdds: undefined,
                  timeRestrictions: {
                      startTime: undefined,
                      endTime: undefined,
                  },
              },
          };
}

export default function PromoEditor({ task, itemId }: PromoEditorProps) {
    const { user } = useUser();
    const isEdit = task === 'edit';
    const [existingData, setExistingData] = useState<Promos | null>(null);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const { currentUser, fetchUser } = useUserStore();
    const router = useRouter();

    const { uploadPromoImage, uploading: imageUploading } = useUpload();

    const form = useForm<PromoFormData>({
        resolver: zodResolver(promoSchema),
        defaultValues: getPromoDefaults(null),
    });

    // Fetch existing promo data when in edit mode
    useEffect(() => {
        const fetchExistingPromo = async () => {
            if (isEdit && itemId) {
                setDataLoading(true);
                try {
                    const data = await fetchPromoById(itemId);
                    setExistingData(data);
                    form.reset(getPromoDefaults(data));
                } catch (error) {
                    console.error('Error fetching promo:', error);
                    toast.error('Failed to load promo data');
                } finally {
                    setDataLoading(false);
                }
            }
        };
        fetchUser(user?.id || '');
        fetchExistingPromo();
    }, [isEdit, itemId, form]);

    useEffect(() => {
        if (existingData) {
            form.reset(getPromoDefaults(existingData));
        }
    }, [existingData, form]);

    const handleImageUpload = async (
        file: File,
        type: 'image' | 'carouselImage'
    ) => {
        setLoading(true);
        const toastId = toast.loading(`Uploading ${type === 'image' ? 'main' : 'carousel'} image...`);

        // Upload to Google Cloud Storage via API
        const imageType = type === 'image' ? 'main' : 'carousel';
        const result = await uploadPromoImage(file, imageType, itemId);

        setLoading(false);

        if (result.success && result.publicUrl) {
            // Update form with the public URL
            form.setValue(type, result.publicUrl);

            toast.success(
                `${type === 'image' ? 'Main image' : 'Carousel image'} uploaded successfully!`,
                { id: toastId }
            );
        } else {
            console.error('Error uploading image:', result.error);
            toast.error(
                `Failed to upload ${type === 'image' ? 'main image' : 'carousel image'}`,
                { id: toastId }
            );
        }
    };

    const removeImage = (type: 'image' | 'carouselImage') => {
        form.setValue(type, '');
        toast.success(
            `${type === 'image' ? 'Main image' : 'Carousel image'} removed`
        );
    };

    const onSubmit = async (data: PromoFormData) => {
        try {
            console.log('Promo form submitted:', { task, data });
            if (
                currentUser?.role === 'marketing' ||
                currentUser?.role === 'admin'
            ) {
                console.log('User is authorized to create/edit promos');
            } else {
                toast.error(
                    'You do not have permission to perform this action.'
                );
                return null;
            }
            if (isEdit) {
                console.log(`Updating promo with ID:`, itemId);
                const response = await fetch(`/api/promos/${itemId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(
                        `Error updating promo: ${
                            errorData.message || 'Unknown error'
                        }`
                    );
                    console.error('Error updating promo:', errorData);
                }

                if (response.ok) {
                    const successData = await response.json();
                    toast.success(
                        `Promo updated successfully: ${successData.id}`
                    );
                    console.log('Promo updated successfully:', successData);
                }
            } else {
                console.log(`Creating new promo`);
                const response = await fetch(`/api/promos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(
                        `Error creating promo: ${
                            errorData.message || 'Unknown error'
                        }`
                    );
                    console.error('Error creating promo:', errorData);
                }

                if (response.ok) {
                    const successData = await response.json();
                    toast.success(
                        `Promo created successfully: ${successData.id}`
                    );
                    router.push('/promos/saved');
                    console.log('Promo created successfully:', successData);
                }
            }
        } catch (error) {
            toast.error(`Error submitting promo form: ${error}`);
            console.error('Error submitting promo form:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEdit ? 'Edit' : 'Create'} Promo
                    </h1>
                    <p className="text-muted-foreground">
                        {isEdit
                            ? 'Update the details for this promo'
                            : 'Create a new promo for your marketing campaigns'}
                    </p>
                </div>
            </div>

            {/* Show loading state while fetching data in edit mode */}
            {dataLoading && isEdit ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <div className="h-6 bg-muted rounded animate-pulse" />
                                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-10 bg-muted rounded animate-pulse" />
                                <div className="h-20 bg-muted rounded animate-pulse" />
                                <div className="h-16 bg-muted rounded animate-pulse" />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="h-6 bg-muted rounded animate-pulse" />
                                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-10 bg-muted rounded animate-pulse" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-10 bg-muted rounded animate-pulse" />
                                    <div className="h-10 bg-muted rounded animate-pulse" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Basic Information Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>
                                        Enter the basic details for your promo
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter promo title"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter promo description"
                                                        className="resize-none"
                                                        rows={4}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="is_active"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Active Status
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Make this promo active
                                                        and visible to users
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Promo Details Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Promo Details</CardTitle>
                                    <CardDescription>
                                        Configure the specific details for this
                                        promo
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Amount (KES) - Optional
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={e =>
                                                            field.onChange(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ) || undefined
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="start"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        Start Date
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={
                                                                        'outline'
                                                                    }
                                                                    className={cn(
                                                                        'w-full pl-3 text-left font-normal',
                                                                        !field.value &&
                                                                            'text-muted-foreground'
                                                                    )}>
                                                                    {field.value ? (
                                                                        format(
                                                                            field.value,
                                                                            'PPP'
                                                                        )
                                                                    ) : (
                                                                        <span>
                                                                            Pick
                                                                            a
                                                                            date
                                                                        </span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    field.value
                                                                }
                                                                onSelect={
                                                                    field.onChange
                                                                }
                                                                disabled={date =>
                                                                    date <
                                                                    new Date(
                                                                        new Date().setHours(
                                                                            0,
                                                                            0,
                                                                            0,
                                                                            0
                                                                        )
                                                                    )
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="end"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>
                                                        End Date
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={
                                                                        'outline'
                                                                    }
                                                                    className={cn(
                                                                        'w-full pl-3 text-left font-normal',
                                                                        !field.value &&
                                                                            'text-muted-foreground'
                                                                    )}>
                                                                    {field.value ? (
                                                                        format(
                                                                            field.value,
                                                                            'PPP'
                                                                        )
                                                                    ) : (
                                                                        <span>
                                                                            Pick
                                                                            a
                                                                            date
                                                                        </span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    field.value
                                                                }
                                                                onSelect={
                                                                    field.onChange
                                                                }
                                                                disabled={date => {
                                                                    const startDate =
                                                                        form.getValues(
                                                                            'start'
                                                                        );
                                                                    return startDate
                                                                        ? date <=
                                                                              startDate
                                                                        : date <
                                                                              new Date();
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Enhanced Content Section */}
                        <PromoContentCard form={form} />

                        {/* Enhanced Terms & Conditions Section */}
                        <TermsAndConditionsCard form={form} />

                        {/* Image Upload Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>
                                    Upload images for your promo. Recommended
                                    sizes: Main image (3155 x 1333), Carousel
                                    image (7034 x 1333). Images will be resized
                                    automatically.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Main Image */}
                                    <div className="space-y-3">
                                        <Label>Main Image (3155 x 1333)</Label>
                                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                                            {form.watch('image') ? (
                                                <div className="relative">
                                                    <Image
                                                        src={form.watch(
                                                            'image'
                                                        )}
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
                                                        onClick={() =>
                                                            removeImage('image')
                                                        }>
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
                                                                Click to upload
                                                                main image
                                                            </span>
                                                        </Label>
                                                        <input
                                                            id="image-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={e => {
                                                                const file =
                                                                    e.target
                                                                        .files?.[0];
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
                                        <Label>
                                            Carousel Image (7034 x 1333)
                                        </Label>
                                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                                            {form.watch('carouselImage') ? (
                                                <div className="relative">
                                                    <Image
                                                        src={form.watch(
                                                            'carouselImage'
                                                        )}
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
                                                            removeImage(
                                                                'carouselImage'
                                                            )
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
                                                                Click to upload
                                                                carousel image
                                                            </span>
                                                        </Label>
                                                        <input
                                                            id="carousel-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={e => {
                                                                const file =
                                                                    e.target
                                                                        .files?.[0];
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

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="gap-2"
                                disabled={loading || imageUploading}>
                                {isEdit ? (
                                    <Save className="h-4 w-4" />
                                ) : (
                                    <Plus className="h-4 w-4" />
                                )}
                                {imageUploading ? 'Uploading...' : isEdit ? 'Update' : 'Create'} Promo
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}
async function fetchPromoById(itemId: string): Promise<Promos> {
    const response = await fetch(`/api/promos/${itemId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch promo');
    }
    const data = await response.json();

    // Map database fields to match our Promos type
    return {
        ...data,
        terms_and_conditions:
            data.term_and_conditions || data.terms_and_conditions,
        start: new Date(data.start),
        end: data.end ? new Date(data.end) : new Date(),
    };
}
