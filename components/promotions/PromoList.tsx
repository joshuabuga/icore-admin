'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2, Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import type { Promo } from '@/types/promotions';

export default function PromoList() {
    const [promos, setPromos] = useState<Promo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/promotions${search ? `?search=${encodeURIComponent(search)}` : ''}`);
            if (!res.ok) throw new Error('Failed to load');
            const json = await res.json();
            const rows = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : Array.isArray(json.results) ? json.results : [];
            setPromos(rows);
        } catch {
            toast.error('Failed to load promotions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, [search]);

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Delete "${name}"? This will soft-delete it and it will no longer be active.`)) return;
        try {
            const res = await fetch(`/api/promotions/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            toast.success('Promotion deleted');
            setPromos(p => p.filter(x => x.id !== id));
        } catch {
            toast.error('Failed to delete');
        }
    };

    const filtered = useMemo(() => {
        if (!search.trim()) return promos;
        const s = search.toLowerCase();
        return promos.filter(p =>
            p.name.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            p.promotion_type.toLowerCase().includes(s)
        );
    }, [promos, search]);

    const active = promos.filter(p => p.is_active).length;
    const withCodes = promos.filter(p => p.max_uses_total !== null).length;

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Promotions</h1>
                    <p className="text-sm text-muted-foreground">Manage bonus rules and promo codes</p>
                </div>
                <Link href="/promos/create">
                    <Button className="gap-2"><Plus className="h-4 w-4" />New Promo</Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{promos.length}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold text-green-600">{active}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Capped</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{withCodes}</p></CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    className="pl-9"
                    placeholder="Search promos…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Bonus</TableHead>
                            <TableHead>Min Deposit</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Uses</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 8 }).map((_, j) => (
                                        <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                                    No promotions found. <Link href="/promos/create" className="underline">Create one.</Link>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map(promo => (
                                <TableRow key={promo.id}>
                                    <TableCell className="font-medium">{promo.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-xs">
                                            {promo.promotion_type.replace(/_/g, ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {promo.bonus_awards_type === 'FIXED'
                                            ? `KES ${Number(promo.bonus_amount).toLocaleString()}`
                                            : `${Number(promo.bonus_award_ratio) * 100}%`}
                                    </TableCell>
                                    <TableCell>KES {Number(promo.min_claim_payin).toLocaleString()}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {promo.active_from
                                            ? `${new Date(promo.active_from).toLocaleDateString()} – ${promo.active_to ? new Date(promo.active_to).toLocaleDateString() : '∞'}`
                                            : 'Always'}
                                    </TableCell>
                                    <TableCell>
                                        {promo.max_uses_total
                                            ? `${promo.uses_count} / ${promo.max_uses_total}`
                                            : <span className="text-muted-foreground">∞</span>}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={promo.is_active ? 'default' : 'secondary'}>
                                            {promo.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/promos/${promo.id}`}>
                                                <Button variant="ghost" size="icon" title="Edit">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/promos/${promo.id}/codes`}>
                                                <Button variant="ghost" size="icon" title="Codes">
                                                    <Tag className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Delete"
                                                onClick={() => handleDelete(promo.id, promo.name)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
