import { UseFormReturn } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CampaignFormData } from '@/lib/schemas/editor-schemas'

interface CampaignMessageCardProps {
    form: UseFormReturn<CampaignFormData>
}

export function CampaignMessageCard({ form }: CampaignMessageCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Message Configuration</CardTitle>
                <CardDescription>
                    Configure the message details for this campaign
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="message.amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount (KES)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message.name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter contact name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message.phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+254712345678" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}
