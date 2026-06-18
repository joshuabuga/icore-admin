'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Ticket, Trophy } from 'lucide-react';
import {
    Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, Legend,
} from 'recharts';
import { useGameStats } from '@/hooks/use-games';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

type DatePreset = '7' | '30' | '90';

function getDateRange(preset: DatePreset) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - Number(preset));
    return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        day: 'numeric', month: 'short',
    });
}

function StatCard({
    label, value, sub, positive,
}: {
    label: string; value: string; sub?: string; positive?: boolean;
}) {
    return (
        <Card>
            <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`mt-1 text-2xl font-bold ${positive === false ? 'text-red-500' : positive === true ? 'text-green-600' : ''}`}>
                    {value}
                </p>
                {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
            </CardContent>
        </Card>
    );
}

const betsWinsConfig: ChartConfig = {
    total_bets: { label: 'Bets', color: 'hsl(217, 91%, 60%)' },
    total_wins: { label: 'Wins', color: 'hsl(142, 71%, 45%)' },
};

const amountsConfig: ChartConfig = {
    total_bet_amount: { label: 'Bet Amount', color: 'hsl(217, 91%, 60%)' },
    total_win_amount: { label: 'Win Amount', color: 'hsl(25, 95%, 53%)' },
};

const ggrConfig: ChartConfig = {
    ggr: { label: 'GGR', color: 'hsl(280, 67%, 55%)' },
};

export default function GameDetailPage() {
    const { code } = useParams<{ code: string }>();
    const router = useRouter();
    const [preset, setPreset] = useState<DatePreset>('30');
    const { startDate, endDate } = getDateRange(preset);

    const { stats, isLoading, error } = useGameStats({
        game: code,
        startDate,
        endDate,
    });

    const chartData = (stats?.daily ?? [])
        .slice()
        .reverse()
        .map(d => ({
            ...d,
            date: formatDate(d.date),
            total_bet_amount: parseFloat(d.total_bet_amount),
            total_win_amount: parseFloat(d.total_win_amount),
            ggr: parseFloat(d.ggr),
        }));

    const summary = stats?.summary;
    const ggr = summary ? parseFloat(summary.ggr) : 0;

    return (
        <div className="space-y-6">
            {/* Back + header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isLoading ? <Skeleton className="h-7 w-40" /> : (stats?.game.name ?? code)}
                        </h1>
                        {stats && (
                            <Badge variant={stats.game.is_offered ? 'default' : 'secondary'}>
                                {stats.game.is_offered ? 'Active' : 'Inactive'}
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{code}</p>
                </div>

                {/* Date range selector */}
                <Select value={preset} onValueChange={v => setPreset(v as DatePreset)}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                    Failed to load stats. {error.message}
                </div>
            )}

            {/* Summary stat cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i}><CardContent className="pt-4"><Skeleton className="h-16 w-full" /></CardContent></Card>
                    ))
                ) : summary ? (
                    <>
                        <StatCard label="Total Bets" value={summary.total_bets.toLocaleString()} />
                        <StatCard label="Total Wins" value={summary.total_wins.toLocaleString()} />
                        <StatCard
                            label="Total Bet Amount"
                            value={`KES ${parseFloat(summary.total_bet_amount).toLocaleString()}`}
                        />
                        <StatCard
                            label="Total Win Amount"
                            value={`KES ${parseFloat(summary.total_win_amount).toLocaleString()}`}
                        />
                        <StatCard
                            label="GGR"
                            value={`KES ${Math.abs(ggr).toLocaleString()}`}
                            sub={ggr >= 0 ? 'House profit' : 'House loss'}
                            positive={ggr >= 0}
                        />
                    </>
                ) : null}
            </div>

            {/* Bets vs Wins chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Daily Bets vs Wins</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <Skeleton className="h-56 w-full" />
                    ) : (
                        <ChartContainer config={betsWinsConfig} className="h-56 w-full">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="total_bets" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="total_wins" fill="hsl(142, 71%, 45%)" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            {/* Amounts chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Daily Bet Amount vs Win Amount (KES)</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <Skeleton className="h-56 w-full" />
                    ) : (
                        <ChartContainer config={amountsConfig} className="h-56 w-full">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="total_bet_amount" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="total_win_amount" fill="hsl(25, 95%, 53%)" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            {/* GGR line chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Daily GGR (KES)</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <Skeleton className="h-48 w-full" />
                    ) : (
                        <ChartContainer config={ggrConfig} className="h-48 w-full">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line
                                    type="monotone"
                                    dataKey="ggr"
                                    stroke="hsl(280, 67%, 55%)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
