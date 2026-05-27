'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import type { Promo, PromoRules } from '@/types/promotions';
import { PROMO_TYPES, BONUS_AWARD_TYPES, DAYS_OF_WEEK } from '@/types/promotions';

interface Props {
    promoId?: number;
}

const EMPTY: Partial<Promo> = {
    name: '',
    promotion_type: '',
    description: '',
    bonus_amount: '0',
    bonus_awards_type: 'fixed',
    bonus_award_ratio: '0',
    min_claim_payin: '100',
    min_claim_odds: '0',
    min_claim_stake: '100',
    active_from: null,
    active_to: null,
    rules: {},
    max_uses_total: null,
    is_deleted: false,
};

const MNO_OPTIONS = ['safaricom', 'airtel'];

export default function PromoForm({ promoId }: Props) {
    const router = useRouter();
    const isEdit = Boolean(promoId);

    const [form, setForm] = useState<Partial<Promo>>(EMPTY);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        if (!promoId) return;
        fetch(`/api/promotions/${promoId}`)
            .then(async r => {
                if (!r.ok) throw new Error('Not found');
                return r.json();
            })
            .then(json => {
                const promo = json && typeof json === 'object' && 'data' in json ? json.data : json;
                setForm({ ...EMPTY, ...promo, rules: { ...(promo?.rules ?? {}) } });
                setLoading(false);
            })
            .catch(() => { toast.error('Failed to load promo'); setLoading(false); });
    }, [promoId]);

    const set = (field: keyof Promo, value: unknown) =>
        setForm(f => ({ ...f, [field]: value }));

    const setRule = (key: keyof PromoRules, value: unknown) =>
        setForm(f => ({ ...f, rules: { ...f.rules, [key]: value } }));

    const toggleDay = (day: number) => {
        const days = form.rules?.active_days_of_week ?? [];
        setRule('active_days_of_week',
            days.includes(day) ? days.filter(d => d !== day) : [...days, day].sort()
        );
    };

    const toggleMno = (mno: string) => {
        const mnos = form.rules?.valid_mnos ?? [];
        setRule('valid_mnos',
            mnos.includes(mno) ? mnos.filter(m => m !== mno) : [...mnos, mno]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...form,
            rules: {
                ...form.rules,
                active_days_of_week: form.rules?.active_days_of_week?.length
                    ? form.rules.active_days_of_week : undefined,
                valid_mnos: form.rules?.valid_mnos?.length
                    ? form.rules.valid_mnos : undefined,
            },
        };

        try {
            const res = await fetch(
                isEdit ? `/api/promotions/${promoId}` : '/api/promotions',
                {
                    method: isEdit ? 'PATCH' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw err;
            }
            const json = await res.json();
            const saved: Promo = json && typeof json === 'object' && 'data' in json ? json.data : json;
            toast.success(isEdit ? 'Promo updated' : 'Promo created');
            router.push(`/promos/${saved.id}`);
        } catch (err: any) {
            const msg = err && typeof err === 'object'
                ? Object.entries(err)
                    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
                    .join(' | ')
                : 'Save failed';
            toast.error(msg);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const isFixed = form.bonus_awards_type !== 'ratio';

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/promos">
                    <Button variant="ghost" size="icon" type="button">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Promo' : 'New Promo'}</h1>
                    <p className="text-sm text-muted-foreground">
                        {isEdit ? 'Update bonus rules and eligibility' : 'Define bonus rules for registration or deposits'}
                    </p>
                </div>
                {isEdit && (
                    <Link href={`/promos/${promoId}/codes`}>
                        <Button variant="outline" type="button" className="gap-2">
                            <Tag className="h-4 w-4" />
                            Manage Codes
                        </Button>
                    </Link>
                )}
                <Button type="submit" disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                </Button>
            </div>

            {/* Identity */}
            <Card>
                <CardHeader>
                    <CardTitle>Identity</CardTitle>
                    <CardDescription>Name and type of this promotion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Internal Name *</Label>
                            <Input
                                id="name"
                                required
                                placeholder="e.g. Welcome free bet"
                                value={form.name ?? ''}
                                onChange={e => set('name', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Used in SMS and logs. Should match CMS promo name.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Promotion Type *</Label>
                            <Select
                                required
                                value={form.promotion_type ?? ''}
                                onValueChange={v => set('promotion_type', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type…" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROMO_TYPES.map(t => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={2}
                            placeholder="Brief description for admin reference"
                            value={form.description ?? ''}
                            onChange={e => set('description', e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Reward */}
            <Card>
                <CardHeader>
                    <CardTitle>Reward</CardTitle>
                    <CardDescription>How much and in what form the bonus is awarded</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Award Type</Label>
                            <Select
                                value={form.bonus_awards_type ?? 'fixed'}
                                onValueChange={v => set('bonus_awards_type', v)}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {BONUS_AWARD_TYPES.map(t => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {isFixed ? (
                            <div className="space-y-2">
                                <Label htmlFor="bonus_amount">Fixed Amount (KES)</Label>
                                <Input
                                    id="bonus_amount"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={form.bonus_amount ?? '0'}
                                    onChange={e => set('bonus_amount', e.target.value)}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="bonus_award_ratio">Ratio (0.10 = 10%)</Label>
                                    <Input
                                        id="bonus_award_ratio"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        value={form.bonus_award_ratio ?? '0'}
                                        onChange={e => set('bonus_award_ratio', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bonus_amount">Cap (KES)</Label>
                                    <Input
                                        id="bonus_amount"
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        placeholder="0 = no cap"
                                        value={form.bonus_amount ?? '0'}
                                        onChange={e => set('bonus_amount', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">Maximum bonus per award. e.g. 1000 caps Karibu at KES 1,000.</p>
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
                <CardHeader>
                    <CardTitle>Eligibility Thresholds</CardTitle>
                    <CardDescription>Minimum requirements for a user to qualify</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="min_claim_payin">Min Deposit (KES)</Label>
                        <Input
                            id="min_claim_payin"
                            type="number"
                            min={0}
                            value={form.min_claim_payin ?? '100'}
                            onChange={e => set('min_claim_payin', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="min_claim_stake">Min Stake (KES)</Label>
                        <Input
                            id="min_claim_stake"
                            type="number"
                            min={0}
                            value={form.min_claim_stake ?? '100'}
                            onChange={e => set('min_claim_stake', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="min_claim_odds">Min Odds</Label>
                        <Input
                            id="min_claim_odds"
                            type="number"
                            min={0}
                            step="0.01"
                            value={form.min_claim_odds ?? '0'}
                            onChange={e => set('min_claim_odds', e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
                <CardHeader>
                    <CardTitle>Schedule & Caps</CardTitle>
                    <CardDescription>When this promo is valid and how many times it can be used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="active_from">Active From</Label>
                            <DateTimePicker
                                id="active_from"
                                value={form.active_from ?? null}
                                onChange={v => set('active_from', v)}
                                placeholder="No start date"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="active_to">Active To</Label>
                            <DateTimePicker
                                id="active_to"
                                value={form.active_to ?? null}
                                onChange={v => set('active_to', v)}
                                placeholder="No end date"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 max-w-xs">
                        <Label htmlFor="max_uses_total">Global Use Cap</Label>
                        <Input
                            id="max_uses_total"
                            type="number"
                            min={0}
                            placeholder="Leave blank for unlimited"
                            value={form.max_uses_total ?? ''}
                            onChange={e => set('max_uses_total', e.target.value ? Number(e.target.value) : null)}
                        />
                        <p className="text-xs text-muted-foreground">Total uses across all users. Blank = unlimited.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Dynamic Rules */}
            <Card>
                <CardHeader>
                    <CardTitle>Eligibility Rules</CardTitle>
                    <CardDescription>
                        Fine-grained conditions checked at claim time. Leave unset to allow all.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* First deposit */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">First Deposit Only</p>
                            <p className="text-xs text-muted-foreground">Only award on the user's very first deposit</p>
                        </div>
                        <Switch
                            checked={form.rules?.requires_first_deposit ?? false}
                            onCheckedChange={v => setRule('requires_first_deposit', v)}
                        />
                    </div>

                    <Separator />

                    {/* Min account age */}
                    <div className="space-y-2 max-w-xs">
                        <Label htmlFor="min_age">Min Account Age (days)</Label>
                        <Input
                            id="min_age"
                            type="number"
                            min={0}
                            placeholder="0 = no restriction"
                            value={form.rules?.min_account_age_days ?? ''}
                            onChange={e => setRule('min_account_age_days', e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>

                    <Separator />

                    {/* Per-user limits */}
                    <div className="grid grid-cols-2 gap-4 max-w-xl">
                        <div className="space-y-2">
                            <Label htmlFor="max_uses_per_user">Max Uses Per User</Label>
                            <Input
                                id="max_uses_per_user"
                                type="number"
                                min={0}
                                placeholder="Blank = unlimited"
                                value={form.rules?.max_uses_per_user ?? ''}
                                onChange={e => setRule('max_uses_per_user', e.target.value ? Number(e.target.value) : undefined)}
                            />
                            <p className="text-xs text-muted-foreground">Lifetime cap per user. e.g. 1 for one-time bonuses.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cooldown_hours">Cooldown (hours)</Label>
                            <Input
                                id="cooldown_hours"
                                type="number"
                                min={0}
                                placeholder="Blank = no cooldown"
                                value={form.rules?.cooldown_hours ?? ''}
                                onChange={e => setRule('cooldown_hours', e.target.value ? Number(e.target.value) : undefined)}
                            />
                            <p className="text-xs text-muted-foreground">Lockout window after award. 24 = once per day.</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Time-of-day window */}
                    <div className="space-y-2">
                        <p className="font-medium text-sm">Time of Day Window</p>
                        <p className="text-xs text-muted-foreground">
                            Local hours (0-23). Leave blank to allow any time. Example: Early Bird = before 10.
                        </p>
                        <div className="grid grid-cols-2 gap-4 max-w-xl">
                            <div className="space-y-2">
                                <Label htmlFor="after_hour">After Hour (≥)</Label>
                                <Input
                                    id="after_hour"
                                    type="number"
                                    min={0}
                                    max={23}
                                    placeholder="e.g. 18 for after 6pm"
                                    value={form.rules?.after_hour ?? ''}
                                    onChange={e => setRule('after_hour', e.target.value !== '' ? Number(e.target.value) : undefined)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="before_hour">Before Hour (&lt;)</Label>
                                <Input
                                    id="before_hour"
                                    type="number"
                                    min={0}
                                    max={23}
                                    placeholder="e.g. 10 for before 10am"
                                    value={form.rules?.before_hour ?? ''}
                                    onChange={e => setRule('before_hour', e.target.value !== '' ? Number(e.target.value) : undefined)}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Valid MNOs */}
                    <div className="space-y-3">
                        <p className="font-medium text-sm">Valid Networks</p>
                        <p className="text-xs text-muted-foreground">Leave all unchecked to allow any network</p>
                        <div className="flex gap-3">
                            {MNO_OPTIONS.map(mno => {
                                const active = form.rules?.valid_mnos?.includes(mno) ?? false;
                                return (
                                    <button
                                        key={mno}
                                        type="button"
                                        onClick={() => toggleMno(mno)}
                                        className="capitalize"
                                    >
                                        <Badge variant={active ? 'default' : 'outline'}>
                                            {mno}
                                        </Badge>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <Separator />

                    {/* Active days */}
                    <div className="space-y-3">
                        <p className="font-medium text-sm">Active Days of Week</p>
                        <p className="text-xs text-muted-foreground">Leave all unchecked to allow any day</p>
                        <div className="flex gap-2">
                            {DAYS_OF_WEEK.map(({ value, label }) => {
                                const active = form.rules?.active_days_of_week?.includes(value) ?? false;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => toggleDay(value)}
                                    >
                                        <Badge variant={active ? 'default' : 'outline'} className="w-10 justify-center">
                                            {label}
                                        </Badge>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Danger zone (edit only) */}
            {isEdit && (
                <Card className="border-destructive/40">
                    <CardHeader>
                        <CardTitle className="text-destructive">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Soft Delete</p>
                                <p className="text-xs text-muted-foreground">Marks the promo inactive without removing it</p>
                            </div>
                            <Switch
                                checked={form.is_deleted ?? false}
                                onCheckedChange={v => set('is_deleted', v)}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </form>
    );
}
