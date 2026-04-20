"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAffiliate, useAffiliateCommissionAnalytics } from "@/hooks/use-affiliate";
import { formatCurrency, formatPhone, formatDateTime } from "@/lib/utils/table-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ApprovePayoutDialog } from "@/components/affiliate/approve-payout-dialog";
import { EditAffiliateDialog } from "@/components/affiliate/edit-affiliate-dialog";
import { AffiliateCommission, AffiliatePayoutRequest } from "@/types/affiliate";

type DatePreset = "7" | "30" | "90";

function getDateRange(preset: DatePreset) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - Number(preset));
    return {
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
    };
}

const commissionChartConfig = {
    commission_amount: { label: "Commission (KES)", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig;

function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
        active: "default",
        available: "default",
        approved: "default",
        paid: "default",
        inactive: "secondary",
        pending: "secondary",
        suspended: "destructive",
        rejected: "destructive",
        failed: "destructive",
    };
    return <Badge variant={variants[status] ?? "secondary"}>{status}</Badge>;
}

export default function AffiliateDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { affiliate, isLoading, error, refetch } = useAffiliate(id);
    const [preset, setPreset] = useState<DatePreset>("30");
    const { startDate, endDate } = useMemo(() => getDateRange(preset), [preset]);
    const { data: analyticsData, isLoading: analyticsLoading } = useAffiliateCommissionAnalytics(id, startDate, endDate);

    const chartData = useMemo(() =>
        analyticsData.map(e => ({
            ...e,
            label: new Date(e.date + "T00:00:00").toLocaleDateString("en-US", { day: "numeric", month: "short" }),
            commission_amount: parseFloat(e.commission_amount),
        })),
        [analyticsData],
    );

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (error || !affiliate) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-destructive">Affiliate not found</h2>
                    <Link href="/affiliate" className="mt-4 text-sm text-primary underline">
                        Back to affiliates
                    </Link>
                </div>
            </div>
        );
    }

    const players = affiliate.players ?? [];
    const commissions = affiliate.commissions ?? [];
    const payoutRequests = affiliate.payout_requests ?? [];
    const pendingPayouts = payoutRequests.filter(r => r.status === "pending");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link href="/affiliate" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="size-5" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {formatPhone(affiliate.msisdn)}
                    </h1>
                    <p className="text-muted-foreground font-mono text-sm">{affiliate.affiliate_code}</p>
                </div>
                <StatusBadge status={affiliate.status} />
                <EditAffiliateDialog affiliate={affiliate} onDone={refetch} />
            </div>

            {/* Wallet stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    { label: "Pending", value: formatCurrency(affiliate.wallet?.pending_balance) },
                    { label: "Available", value: formatCurrency(affiliate.wallet?.available_balance) },
                    { label: "Paid Out", value: formatCurrency(affiliate.wallet?.paid_out_balance) },
                    { label: "Total Earned", value: formatCurrency(String(affiliate.total_commission)) },
                ].map(stat => (
                    <Card key={stat.label}>
                        <CardHeader className="pb-1 pt-4">
                            <CardTitle className="text-xs font-medium text-muted-foreground">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <p className="text-lg font-bold">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Commission trend chart */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm">Commission Trend</CardTitle>
                    <Select value={preset} onValueChange={(v) => setPreset(v as DatePreset)}>
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    {analyticsLoading ? (
                        <Skeleton className="h-[220px] w-full" />
                    ) : chartData.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">No commission data for this period.</p>
                    ) : (
                        <ChartContainer config={commissionChartConfig} className="h-[220px] w-full">
                            <BarChart data={chartData} margin={{ top: 8 }} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={11} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `KES ${Number(value).toLocaleString()}`} />} />
                                <Bar dataKey="commission_amount" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            {/* Config info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
                    <div><span className="text-muted-foreground">Commission rate:</span> {affiliate.commission_rate}%</div>
                    <div><span className="text-muted-foreground">Model:</span> {affiliate.commission_model}</div>
                    <div><span className="text-muted-foreground">Min payout:</span> {formatCurrency(affiliate.min_payout_amount)}</div>
                    <div><span className="text-muted-foreground">Max payout:</span> {affiliate.max_payout_amount ? formatCurrency(affiliate.max_payout_amount) : "No cap"}</div>
                    <div><span className="text-muted-foreground">Hold days:</span> {affiliate.hold_days ?? "Global default"}</div>
                    <div><span className="text-muted-foreground">Players:</span> {affiliate.total_players}</div>
                    <div><span className="text-muted-foreground">Joined:</span> {formatDateTime(affiliate.created_at)}</div>
                </CardContent>
            </Card>

            {/* Pending payout requests */}
            {pendingPayouts?.length > 0 && (
                <Card className="border-yellow-500/40">
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Pending Payout Requests ({pendingPayouts?.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Requested</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingPayouts?.map((r: AffiliatePayoutRequest) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-mono text-sm">#{r.id}</TableCell>
                                        <TableCell className="font-semibold">{formatCurrency(r.amount)}</TableCell>
                                        <TableCell>{formatDateTime(r.requested_at)}</TableCell>
                                        <TableCell>
                                            <ApprovePayoutDialog request={r} onDone={refetch} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Referred players */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Referred Players ({affiliate.players?.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {affiliate.players?.length === 0 ? (
                        <p className="p-4 text-sm text-muted-foreground">No players yet.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {affiliate.players?.map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell>{formatPhone(p.msisdn)}</TableCell>
                                        <TableCell><StatusBadge status={p.status} /></TableCell>
                                        <TableCell>{formatDateTime(p.created_at)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Commissions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Commission History ({affiliate.commissions?.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {affiliate.commissions?.length === 0 ? (
                        <p className="p-4 text-sm text-muted-foreground">No commissions yet.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Player</TableHead>
                                    <TableHead>GGR</TableHead>
                                    <TableHead>Commission</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {affiliate.commissions?.map((c: AffiliateCommission) => (
                                    <TableRow key={c.id}>
                                        <TableCell>{c.commission_date}</TableCell>
                                        <TableCell>{formatPhone(c.player_msisdn)}</TableCell>
                                        <TableCell>{formatCurrency(c.ggr_amount)}</TableCell>
                                        <TableCell className="font-medium">{formatCurrency(c.commission_amount)}</TableCell>
                                        <TableCell><StatusBadge status={c.status} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* All payout requests history */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">All Payout Requests</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {affiliate.payout_requests?.length === 0 ? (
                        <p className="p-4 text-sm text-muted-foreground">No payout requests yet.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Requested</TableHead>
                                    <TableHead>Processed</TableHead>
                                    <TableHead>Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {affiliate.payout_requests?.map((r: AffiliatePayoutRequest) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-mono text-xs">#{r.id}</TableCell>
                                        <TableCell className="font-semibold">{formatCurrency(r.amount)}</TableCell>
                                        <TableCell><StatusBadge status={r.status} /></TableCell>
                                        <TableCell>{formatDateTime(r.requested_at)}</TableCell>
                                        <TableCell>{formatDateTime(r.processed_at)}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{r.notes || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
