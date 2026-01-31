import { UseFormReturn } from 'react-hook-form'
import { FileText, Eye, Code, Wand2 } from 'lucide-react'
import { useState } from 'react'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { PromoFormData } from '@/lib/schemas/editor-schemas'

interface TermsAndConditionsCardProps {
    form: UseFormReturn<PromoFormData>
}

export function TermsAndConditionsCard({ form }: TermsAndConditionsCardProps) {
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

    // Template generators for common T&C sections
    const generateDepositCashbackTemplate = () => {
        const template = `<p><strong>Deposit Cashback – Terms and Conditions</strong></p>

<h3><strong>Promotion:</strong></h3>
<p>Deposit <strong>Ksh ${form.getValues('amount') || 500} and above</strong> and receive a <strong>10% Deposit Cashback</strong>.</p>

<h3><strong>1. Eligibility for Cashback</strong></h3>
<ul>
<li>Cashback applies only to deposits of <strong>Ksh ${form.getValues('amount') || 500} and above</strong>.</li>
<li>Cashback is calculated based on the total amount wagered above <strong>Ksh ${form.getValues('amount') || 500}</strong>.</li>
<li>Only stakes of <strong>Ksh ${form.getValues('amount') || 500} or more</strong> qualify for cashback.</li>
<li>To receive cashback, players must wager their deposits with <strong>minimum odds of ${form.getValues('info.minimumOdds') || '3.0'}</strong> on applicable games.</li>
</ul>

<h3><strong>2. Free Bet Activation</strong></h3>
<ul>
<li>To activate the cashback, players must wager it at <strong>odds of ${form.getValues('info.minimumOdds') || '3.0'}</strong>.</li>
<li>Cashback is available for selected game types only.</li>
</ul>

<h3><strong>3. Limits on Cashback and Winnings</strong></h3>
<ul>
<li>The maximum cashback that can be awarded is <strong>Ksh ${form.getValues('info.prizes.maxAmount') || '500'}</strong>.</li>
<li>The maximum winnings from cashback free bets is capped at <strong>Ksh ${form.getValues('info.prizes.maxWinnings') || '2,000'}</strong>.</li>
</ul>

<h3><strong>4. General Terms</strong></h3>
<ul>
<li>Tucheze reserves the right to amend, suspend, or terminate this promotion at any time without prior notice.</li>
<li>Cashback bonuses are subject to Tucheze's general Terms and Conditions.</li>
</ul>`
        form.setValue('terms_and_conditions', template)
    }

    const generateTimeBasedTemplate = () => {
        const startTime = form.getValues('info.timeRestrictions.startTime') || '07:00'
        const endTime = form.getValues('info.timeRestrictions.endTime') || '11:00'
        const dailyWinners = form.getValues('info.prizes.dailyWinners') || '50'
        const prizeAmount = form.getValues('amount') || '500'

        const template = `<p><strong>${form.getValues('title') || 'Time-Based Promotion'}</strong></p>

<h3><strong>Promotion Period</strong></h3>
<ul>
<li>Runs daily between <strong>${startTime} and ${endTime}</strong>.</li>
<li>Tucheze reserves the right to extend or modify the campaign.</li>
</ul>

<h3><strong>How to Qualify</strong></h3>
<ul>
<li>Deposit <strong>Ksh ${form.getValues('amount') || '100'} or more</strong>.</li>
<li>Place a bet between <strong>${startTime} and ${endTime}</strong>.</li>
<li><strong>To win:</strong>
<ul>
<li><strong>Crash Games</strong> – achieve a total of <strong>1.5x</strong>.</li>
<li><strong>Sports & Virtual Games</strong> – achieve cumulative odds of <strong>${form.getValues('info.minimumOdds') || '2.5'}+</strong>.</li>
</ul>
</li>
</ul>

<h3><strong>Prizes</strong></h3>
<ul>
<li><strong>${dailyWinners} winners daily!</strong> 🎉</li>
<li>Each winner gets <strong>Ksh ${prizeAmount}</strong>.</li>
<li>Winnings are credited to your Tucheze account within <strong>24 hours</strong>.</li>
<li>The more you play, the higher your chances!</li>
</ul>

<h3><strong>Eligibility</strong></h3>
<ul>
<li>Open to all <strong>registered Tucheze users</strong> who meet the criteria.</li>
</ul>

<h3><strong>Terms</strong></h3>
<ul>
<li>Subject to Tucheze's standard terms & conditions.</li>
<li>Tucheze may amend, suspend, or terminate the promotion without prior notice.</li>
<li>In case of disputes, Tucheze's decision is final.</li>
<li>Participation implies full acceptance of these terms.</li>
</ul>`
        form.setValue('terms_and_conditions', template)
    }

    const generateBasicTemplate = () => {
        const template = `<p><strong>${form.getValues('title') || 'Promotion'} – Terms and Conditions</strong></p>

<h3><strong>1. Eligibility</strong></h3>
<ul>
<li>Open to all registered Tucheze users.</li>
<li>Minimum deposit/bet requirements apply.</li>
</ul>

<h3><strong>2. How to Participate</strong></h3>
<ul>
<li>Follow the qualification criteria outlined in the promotion.</li>
<li>Ensure all requirements are met within the promotion period.</li>
</ul>

<h3><strong>3. Prizes and Rewards</strong></h3>
<ul>
<li>Prize amounts and limits are clearly specified.</li>
<li>Winnings will be credited within 24 hours of qualification.</li>
</ul>

<h3><strong>4. General Terms</strong></h3>
<ul>
<li>Tucheze reserves the right to modify or terminate this promotion.</li>
<li>Standard terms and conditions apply.</li>
<li>Decision of Tucheze management is final in case of disputes.</li>
</ul>`
        form.setValue('terms_and_conditions', template)
    }

    const formatHtml = (html: string) => {
        // Basic HTML formatting - could be enhanced with a proper formatter
        return html
            .replace(/></g, '>\n<')
            .replace(/(<\/[^>]+>)(<[^\/])/g, '$1\n$2')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Terms & Conditions
                </CardTitle>
                <CardDescription>
                    Create detailed terms and conditions with HTML formatting
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Template Generators */}
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Wand2 className="h-4 w-4" />
                        Quick Templates
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={generateDepositCashbackTemplate}
                        >
                            Deposit Cashback
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={generateTimeBasedTemplate}
                        >
                            Time-Based Promo
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={generateBasicTemplate}
                        >
                            Basic Template
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        These templates use data from other form fields. Fill out the promo details first for better templates.
                    </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant={viewMode === 'edit' ? 'default' : 'outline'}
                        onClick={() => setViewMode('edit')}
                        className="gap-2"
                    >
                        <Code className="h-4 w-4" />
                        Edit HTML
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant={viewMode === 'preview' ? 'default' : 'outline'}
                        onClick={() => setViewMode('preview')}
                        className="gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        Preview
                    </Button>
                </div>

                {/* Content Editor/Preview */}
                {viewMode === 'edit' ? (
                    <FormField
                        control={form.control}
                        name="terms_and_conditions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Terms & Conditions (HTML)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter terms and conditions with HTML formatting..."
                                        className="min-h-[400px] font-mono text-sm"
                                        {...field}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <p>You can use HTML tags:</p>
                                    <p><code>&lt;h3&gt;&lt;strong&gt;Title&lt;/strong&gt;&lt;/h3&gt;</code> for headings</p>
                                    <p><code>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</code> for lists</p>
                                    <p><code>&lt;strong&gt;Text&lt;/strong&gt;</code> for bold text</p>
                                    <p><code>&lt;p&gt;Paragraph&lt;/p&gt;</code> for paragraphs</p>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : (
                    <div className="space-y-2">
                        <Label>Preview</Label>
                        <div
                            className="border rounded-lg p-4 min-h-[400px] bg-background overflow-auto"
                            dangerouslySetInnerHTML={{
                                __html: form.watch('terms_and_conditions') || '<p class="text-muted-foreground">No content to preview</p>'
                            }}
                        />
                    </div>
                )}

                {/* HTML Formatting Helper */}
                {viewMode === 'edit' && form.watch('terms_and_conditions') && (
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                            const formatted = formatHtml(form.getValues('terms_and_conditions') || '')
                            form.setValue('terms_and_conditions', formatted)
                        }}
                    >
                        Format HTML
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
