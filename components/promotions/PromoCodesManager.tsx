'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    ArrowLeft, Plus, Trash2, Copy, Loader2, ExternalLink,
    CheckCircle2, XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import type { Promo, PromoCode } from '@/types/promotions';

interface Props {
    promoId: number;
}

const EMPTY_CODE = {
    code: '',
    name: '',
    campaign_tag: '',
    bonus_amount_override: '',
    min_deposit: '0',
    max_uses: '',
    max_uses_per_user: 1,
    registration_only: false,
    first_deposit_only: false,
    active_from: '',
    active_to: '',
    is_active: true,
};

export default function PromoCodesManager({ promoId }: Props) {
    const [promo, setPromo] = useState<Promo | null>(null);
    const [codes, setCodes] = useState<PromoCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [editing, setEditing] = useState<PromoCode | null>(null);
    const [form, setForm] = useState<typeof EMPTY_CODE>(EMPTY_CODE);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [promoRes, codesRes] = await Promise.all([
                fetch(`/api/promotions/${promoId}`),
                fetch(`/api/promotions/codes?promo=${promoId}`),
            ]);
            const [promoData, codesData] = await Promise.all([promoRes.json(), codesRes.json()]);
            setPromo(promoData);
            setCodes(Array.isArray(codesData) ? codesData : Array.isArray(codesData.data) ? codesData.data : Array.isArray(codesData.results) ? codesData.results : []);
        } catch {
            toast.error('Failed to load');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, [promoId]);

    const openCreate = () => {
        setEditing(null);
        setForm(EMPTY_CODE);
        setShowDialog(true);
    };

    const openEdit = (code: PromoCode) => {
        setEditing(code);
        setForm({
            code: code.code,
            name: code.name,
            campaign_tag: code.campaign_tag,
            bonus_amount_override: code.bonus_amount_override ?? '',
            min_deposit: code.min_deposit,
            max_uses: code.max_uses != null ? String(code.max_uses) : '',
            max_uses_per_user: code.max_uses_per_user,
            registration_only: code.registration_only,
            first_deposit_only: code.first_deposit_only,
            active_from: code.active_from?.slice(0, 16) ?? '',
            active_to: code.active_to?.slice(0, 16) ?? '',
            is_active: code.is_active,
        });
        setShowDialog(true);
    };

    const set = (field: string, value: unknown) =>
        setForm(f => ({ ...f, [field]: value }));

    const handleSave = async () => {
        setSaving(true);
        const payload = {
            ...form,
            promo: promoId,
            max_uses: form.max_uses ? Number(form.max_uses) : null,
            bonus_amount_override: form.bonus_amount_override || null,
            active_from: form.active_from ? new Date(form.active_from).toISOString() : null,
            active_to: form.active_to ? new Date(form.active_to).toISOString() : null,
        };
        try {
            const url = editing
                ? `/api/promotions/codes/${editing.id}`
                : `/api/promotions/codes`;
            const res = await fetch(url, {
                method: editing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw err;
            }
            toast.success(editing ? 'Code updated' : 'Code created');
            setShowDialog(false);
            load();
        } catch (err: any) {
            const msg = typeof err === 'object'
                ? Object.entries(err).map(([k, v]) => `${k}: ${v}`).join(', ')
                : 'Save failed';
            toast.error(msg);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, code: string) => {
        if (!confirm(`Delete code "${code}"?`)) return;
        try {
            await fetch(`/api/promotions/codes/${id}`, { method: 'DELETE' });
            toast.success('Code deleted');
            setCodes(c => c.filter(x => x.id !== id));
        } catch {
            toast.error('Delete failed');
        }
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success('Copied!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href={`/promos/${promoId}`}>
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Promo Codes</h1>
                    <p className="text-sm text-muted-foreground">
                        {promo?.name} — {codes.length} code{codes.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Button className="gap-2" onClick={openCreate}>
                    <Plus className="h-4 w-4" />
                    New Code
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Codes</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{codes.length}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold text-green-600">{codes.filter(c => c.is_active).length}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Uses</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{codes.reduce((s, c) => s + c.uses_count, 0)}</p></CardContent>
                </Card>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name / Campaign</TableHead>
                            <TableHead>Bonus Override</TableHead>
                            <TableHead>Min Deposit</TableHead>
                            <TableHead>Uses</TableHead>
                            <TableHead>Context</TableHead>
                            <TableHead>Valid</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {codes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                                    No codes yet.{' '}
                                    <button onClick={openCreate} className="underline">Create one.</button>
                                </TableCell>
                            </TableRow>
                        ) : codes.map(c => (
                            <TableRow key={c.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <code className="font-mono font-bold text-sm bg-muted px-1.5 py-0.5 rounded">
                                            {c.code}
                                        </code>
                                        <button onClick={() => copyCode(c.code)} className="text-muted-foreground hover:text-foreground">
                                            <Copy className="h-3 w-3" />
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="font-medium text-sm">{c.name}</p>
                                    {c.campaign_tag && (
                                        <Badge variant="outline" className="text-xs mt-0.5">{c.campaign_tag}</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {c.bonus_amount_override
                                        ? `KES ${Number(c.bonus_amount_override).toLocaleString()}`
                                        : <span className="text-muted-foreground text-xs">From promo</span>}
                                </TableCell>
                                <TableCell>KES {Number(c.min_deposit).toLocaleString()}</TableCell>
                                <TableCell>
                                    {c.uses_count}
                                    {c.max_uses ? ` / ${c.max_uses}` : ''}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        {c.registration_only && <Badge variant="secondary" className="text-xs">Registration</Badge>}
                                        {c.first_deposit_only && <Badge variant="secondary" className="text-xs">First Deposit</Badge>}
                                        {!c.registration_only && !c.first_deposit_only && (
                                            <Badge variant="outline" className="text-xs">Any</Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {c.is_valid
                                        ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        : <XCircle className="h-4 w-4 text-destructive" />}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(c)}>Edit</Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(c.id, c.code)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Create / Edit Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Edit Code' : 'New Promo Code'}</DialogTitle>
                        <DialogDescription>
                            Code is linked to <strong>{promo?.name}</strong>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Code *</Label>
                                <Input
                                    required
                                    placeholder="WELCOME50"
                                    value={form.code}
                                    onChange={e => set('code', e.target.value.toUpperCase())}
                                    className="font-mono uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Name *</Label>
                                <Input
                                    required
                                    placeholder="Welcome 50% bonus"
                                    value={form.name}
                                    onChange={e => set('name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Campaign Tag</Label>
                            <Input
                                placeholder="e.g. sms-aug-2025"
                                value={form.campaign_tag}
                                onChange={e => set('campaign_tag', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Optional label for tracking campaigns</p>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Bonus Override (KES)</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="Leave blank to use promo amount"
                                    value={form.bonus_amount_override}
                                    onChange={e => set('bonus_amount_override', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Min Deposit (KES)</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={form.min_deposit}
                                    onChange={e => set('min_deposit', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Max Uses (total)</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="Blank = unlimited"
                                    value={form.max_uses}
                                    onChange={e => set('max_uses', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Max Uses Per User</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={form.max_uses_per_user}
                                    onChange={e => set('max_uses_per_user', Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <p className="text-sm font-medium">Context Restrictions</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm">Registration Only</p>
                                    <p className="text-xs text-muted-foreground">Code can only be used at sign-up</p>
                                </div>
                                <Switch
                                    checked={form.registration_only}
                                    onCheckedChange={v => {
                                        set('registration_only', v);
                                        if (v) set('first_deposit_only', false);
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm">First Deposit Only</p>
                                    <p className="text-xs text-muted-foreground">Code can only be used on the first deposit</p>
                                </div>
                                <Switch
                                    checked={form.first_deposit_only}
                                    onCheckedChange={v => {
                                        set('first_deposit_only', v);
                                        if (v) set('registration_only', false);
                                    }}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Active From</Label>
                                <Input
                                    type="datetime-local"
                                    value={form.active_from}
                                    onChange={e => set('active_from', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Active To</Label>
                                <Input
                                    type="datetime-local"
                                    value={form.active_to}
                                    onChange={e => set('active_to', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Is Active</Label>
                            <Switch
                                checked={form.is_active}
                                onCheckedChange={v => set('is_active', v)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={saving} className="gap-2">
                            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                            {editing ? 'Save Changes' : 'Create Code'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
