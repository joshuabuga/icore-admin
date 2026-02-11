import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { Plus, Minus, Clock, Target, Trophy } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { PromoFormData } from '@/lib/schemas/editor-schemas'

interface PromoContentCardProps {
    form: UseFormReturn<PromoFormData>
}

const GAME_TYPES = ['crash', 'sports', 'virtual', 'casino', 'slots'] as const

export function PromoContentCard({ form }: PromoContentCardProps) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'info.qualificationCriteria' as never,
    })

    const gameTypes = form.watch('info.gameTypes') || []

    const toggleGameType = (gameType: string) => {
        const current = form.getValues('info.gameTypes') || []
        const next = current.includes(gameType)
            ? current.filter(t => t !== gameType)
            : [...current, gameType]
        form.setValue('info.gameTypes', next, { shouldDirty: true })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Promo Content & Information
                </CardTitle>
                <CardDescription>
                    Configure detailed information about how the promo works
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Action & URL */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="info.action"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Action Type</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., deposit, play, bet"
                                        {...field}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Promo URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="/promos/promo-name"
                                        {...field}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Rich Content */}
                <FormField
                    control={form.control}
                    name="info.content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rich Content (HTML)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter the detailed HTML content for the promo page..."
                                    className="min-h-[200px] font-mono text-sm"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                                You can use HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; etc.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Qualification Criteria */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Qualification Criteria
                        </Label>
                        <Button type="button" size="sm" onClick={() => append('' as never)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <FormField
                                control={form.control}
                                name={`info.qualificationCriteria.${index}` as never}
                                render={({ field: inputField }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Deposit Ksh 500 and above"
                                                {...inputField}
                                                value={inputField.value as string || ''}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Game Types */}
                <div className="space-y-3">
                    <Label>Applicable Game Types</Label>
                    <div className="flex flex-wrap gap-2">
                        {GAME_TYPES.map((gameType) => (
                            <Button
                                key={gameType}
                                type="button"
                                size="sm"
                                variant={gameTypes.includes(gameType) ? "default" : "outline"}
                                onClick={() => toggleGameType(gameType)}
                            >
                                {gameType.charAt(0).toUpperCase() + gameType.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Minimum Odds */}
                <FormField
                    control={form.control}
                    name="info.minimumOdds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Minimum Odds (if applicable)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g., 3.0"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Prizes Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                    <Label className="flex items-center gap-2 text-base font-medium">
                        <Trophy className="h-4 w-4" />
                        Prize Information
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="info.prizes.maxAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Max Amount (KES)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="500"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="info.prizes.maxWinnings"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Max Winnings (KES)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="2000"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="info.prizes.dailyWinners"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Daily Winners</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="50"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Time Restrictions */}
                <div className="space-y-4 p-4 border rounded-lg">
                    <Label className="flex items-center gap-2 text-base font-medium">
                        <Clock className="h-4 w-4" />
                        Time Restrictions (Optional)
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="info.timeRestrictions.startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Start Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            value={(() => {
                                                if (field.value instanceof Date) {
                                                    return field.value.toTimeString().slice(0, 5);
                                                }
                                                return String(field.value ?? '');
                                            })()}
                                            onChange={(e) => {
                                                const timeValue = e.target.value;
                                                if (timeValue) {
                                                    const today = new Date();
                                                    const [hours, minutes] = timeValue.split(':');
                                                    const date = new Date(today.setHours(parseInt(hours), parseInt(minutes), 0, 0));
                                                    field.onChange(date);
                                                } else {
                                                    field.onChange(undefined);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="info.timeRestrictions.endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">End Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            value={(() => {
                                                if (field.value instanceof Date) {
                                                    return field.value.toTimeString().slice(0, 5);
                                                }
                                                return String(field.value ?? '');
                                            })()}
                                            onChange={(e) => {
                                                const timeValue = e.target.value;
                                                if (timeValue) {
                                                    const today = new Date();
                                                    const [hours, minutes] = timeValue.split(':');
                                                    const date = new Date(today.setHours(parseInt(hours), parseInt(minutes), 0, 0));
                                                    field.onChange(date);
                                                } else {
                                                    field.onChange(undefined);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Set daily time windows when the promo is active (e.g., 07:00 - 11:00)
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}