import { UseFormReturn } from 'react-hook-form'
import { Plus, Minus, Clock, Target, Trophy } from 'lucide-react'
import { useState } from 'react'

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

export function PromoContentCard({ form }: PromoContentCardProps) {
    const [qualificationCriteria, setQualificationCriteria] = useState<string[]>(
        form.getValues('info.qualificationCriteria') || ['']
    )
    const [gameTypes, setGameTypes] = useState<string[]>(
        form.getValues('info.gameTypes') || []
    )

    const addCriteria = () => {
        const newCriteria = [...qualificationCriteria, '']
        setQualificationCriteria(newCriteria)
        form.setValue('info.qualificationCriteria', newCriteria)
    }

    const removeCriteria = (index: number) => {
        const newCriteria = qualificationCriteria.filter((_, i) => i !== index)
        setQualificationCriteria(newCriteria)
        form.setValue('info.qualificationCriteria', newCriteria)
    }

    const updateCriteria = (index: number, value: string) => {
        const newCriteria = [...qualificationCriteria]
        newCriteria[index] = value
        setQualificationCriteria(newCriteria)
        form.setValue('info.qualificationCriteria', newCriteria)
    }

    const toggleGameType = (gameType: string) => {
        const currentTypes = form.getValues('info.gameTypes') || []
        const newTypes = currentTypes.includes(gameType)
            ? currentTypes.filter(type => type !== gameType)
            : [...currentTypes, gameType]
        setGameTypes(newTypes)
        form.setValue('info.gameTypes', newTypes)
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
                    <div className="space-y-2">
                        <Label>Action Type</Label>
                        <Input
                            placeholder="e.g., deposit, play, bet"
                            value={form.watch('info.action') || ''}
                            onChange={(e) => form.setValue('info.action', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Promo URL</Label>
                        <Input
                            placeholder="/promos/promo-name"
                            value={form.watch('info.url') || ''}
                            onChange={(e) => form.setValue('info.url', e.target.value)}
                        />
                    </div>
                </div>

                {/* Rich Content */}
                <div className="space-y-2">
                    <Label>Rich Content (HTML)</Label>
                    <Textarea
                        placeholder="Enter the detailed HTML content for the promo page..."
                        className="min-h-[200px] font-mono text-sm"
                        value={form.watch('info.content') || ''}
                        onChange={(e) => form.setValue('info.content', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        You can use HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; etc.
                    </p>
                </div>

                {/* Qualification Criteria */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Qualification Criteria
                        </Label>
                        <Button type="button" size="sm" onClick={addCriteria}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    {qualificationCriteria.map((criteria, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                placeholder="e.g., Deposit Ksh 500 and above"
                                value={criteria}
                                onChange={(e) => updateCriteria(index, e.target.value)}
                            />
                            {qualificationCriteria.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeCriteria(index)}
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
                        {['crash', 'sports', 'virtual', 'casino', 'slots'].map((gameType) => (
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
                <div className="space-y-2">
                    <Label>Minimum Odds (if applicable)</Label>
                    <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 3.0"
                        value={form.watch('info.minimumOdds') || ''}
                        onChange={(e) => form.setValue('info.minimumOdds', parseFloat(e.target.value) || undefined)}
                    />
                </div>

                {/* Prizes Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                    <Label className="flex items-center gap-2 text-base font-medium">
                        <Trophy className="h-4 w-4" />
                        Prize Information
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm">Max Amount (KES)</Label>
                            <Input
                                type="number"
                                placeholder="500"
                                value={form.watch('info.prizes.maxAmount') || ''}
                                onChange={(e) => form.setValue('info.prizes.maxAmount', parseInt(e.target.value) || undefined)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">Max Winnings (KES)</Label>
                            <Input
                                type="number"
                                placeholder="2000"
                                value={form.watch('info.prizes.maxWinnings') || ''}
                                onChange={(e) => form.setValue('info.prizes.maxWinnings', parseInt(e.target.value) || undefined)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">Daily Winners</Label>
                            <Input
                                type="number"
                                placeholder="50"
                                value={form.watch('info.prizes.dailyWinners') || ''}
                                onChange={(e) => form.setValue('info.prizes.dailyWinners', parseInt(e.target.value) || undefined)}
                            />
                        </div>
                    </div>
                </div>

                {/* Time Restrictions */}
                <div className="space-y-4 p-4 border rounded-lg">
                    <Label className="flex items-center gap-2 text-base font-medium">
                        <Clock className="h-4 w-4" />
                        Time Restrictions (Optional)
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm">Start Time</Label>
                            <Input
                                type="time"
                                value={(() => {
                                    const time = form.watch('info.timeRestrictions.startTime');
                                    if (time instanceof Date) {
                                        return time.toTimeString().slice(0, 5);
                                    }
                                    return time || '';
                                })()}
                                onChange={(e) => {
                                    const timeValue = e.target.value;
                                    if (timeValue) {
                                        const today = new Date();
                                        const [hours, minutes] = timeValue.split(':');
                                        const date = new Date(today.setHours(parseInt(hours), parseInt(minutes), 0, 0));
                                        form.setValue('info.timeRestrictions.startTime', date);
                                    } else {
                                        form.setValue('info.timeRestrictions.startTime', timeValue as any);
                                    }
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">End Time</Label>
                            <Input
                                type="time"
                                value={(() => {
                                    const time = form.watch('info.timeRestrictions.endTime');
                                    if (time instanceof Date) {
                                        return time.toTimeString().slice(0, 5);
                                    }
                                    return time || '';
                                })()}
                                onChange={(e) => {
                                    const timeValue = e.target.value;
                                    if (timeValue) {
                                        const today = new Date();
                                        const [hours, minutes] = timeValue.split(':');
                                        const date = new Date(today.setHours(parseInt(hours), parseInt(minutes), 0, 0));
                                        form.setValue('info.timeRestrictions.endTime', date);
                                    } else {
                                        form.setValue('info.timeRestrictions.endTime', timeValue as any);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Set daily time windows when the promo is active (e.g., 07:00 - 11:00)
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
