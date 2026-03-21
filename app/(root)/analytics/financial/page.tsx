"use client";

import { useMemo, useState } from "react";
import { useDailyFlow } from "@/hooks/use-analytics";
import { useDailyStakesWinnings, useDailyFTDVolume } from "@/hooks/use-analytics-dashboards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, Cell } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

function formatDateLabel(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });
}

const depositsWithdrawalsConfig = {
    deposits: { label: "Deposits", color: "hsl(142, 71%, 45%)" },
    withdrawals: { label: "Withdrawals", color: "hsl(0, 84%, 60%)" },
} satisfies ChartConfig;

const netCashFlowConfig = {
    net_flow: { label: "Net Cash Flow", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig;

const stakesWinningsConfig = {
    total_stakes: { label: "Stakes", color: "hsl(217, 91%, 60%)" },
    total_winnings: { label: "Winnings", color: "hsl(25, 95%, 53%)" },
} satisfies ChartConfig;

const ftdVolumeConfig = {
    total_deposit_amount: { label: "Total Deposits", color: "hsl(217, 91%, 60%)" },
    ftd_amount: { label: "FTD Volume", color: "hsl(280, 67%, 55%)" },
} satisfies ChartConfig;

function ChartSkeleton() {
    return <Skeleton className="h-[350px] w-full" />;
}

function ChartError({ message }: { message: string }) {
    return (
        <div className="rounded-md border border-destructive p-8 text-center text-destructive">
            {message}
        </div>
    );
}

function DualBarTooltip({ value, name, labelsMap, colorsMap, currency = true }: {
    value: number;
    name: string;
    labelsMap: Record<string, string>;
    colorsMap: Record<string, string>;
    currency?: boolean;
}) {
    const key = String(name);
    return (
        <div className="flex w-full items-center gap-2">
            <div className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: colorsMap[key] }} />
            <span className="text-muted-foreground">{labelsMap[key] || key}</span>
            <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                {currency ? `KES ${Number(value).toLocaleString()}` : Number(value).toLocaleString()}
            </span>
        </div>
    );
}

export default function FinancialFlowPage() {
    const [preset, setPreset] = useState<DatePreset>("30");
    const { startDate, endDate } = useMemo(() => getDateRange(preset), [preset]);

    const { data: dailyFlowData, isLoading: dailyFlowLoading, error: dailyFlowError } = useDailyFlow({ startDate, endDate });
    const { data: stakesData, isLoading: stakesLoading, error: stakesError } = useDailyStakesWinnings({ startDate, endDate });
    const { data: ftdVolumeData, isLoading: ftdVolumeLoading, error: ftdVolumeError } = useDailyFTDVolume({ startDate, endDate });

    const depositsWithdrawalsData = useMemo(() => {
        if (!dailyFlowData) return [];
        return dailyFlowData.map((e) => ({ ...e, label: formatDateLabel(e.date) }));
    }, [dailyFlowData]);

    const netCashFlowData = useMemo(() => {
        if (!dailyFlowData) return [];
        return dailyFlowData.map((e) => ({
            date: e.date,
            label: formatDateLabel(e.date),
            net_flow: e.net_flow,
            fill: e.net_flow >= 0 ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)",
        }));
    }, [dailyFlowData]);

    const stakesChartData = useMemo(() => {
        if (!stakesData) return [];
        return stakesData.map((e) => ({ ...e, label: formatDateLabel(e.date) }));
    }, [stakesData]);

    const ftdVolumeChartData = useMemo(() => {
        if (!ftdVolumeData) return [];
        return ftdVolumeData.map((e) => ({ ...e, label: formatDateLabel(e.date) }));
    }, [ftdVolumeData]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Financial Flow</h1>
                    <p className="text-muted-foreground">
                        Deposits, withdrawals, stakes, winnings, and FTD trends
                    </p>
                </div>
                <Select value={preset} onValueChange={(v) => setPreset(v as DatePreset)}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Tabs defaultValue="deposits-withdrawals">
                <TabsList>
                    <TabsTrigger value="deposits-withdrawals">Deposits vs Withdrawals</TabsTrigger>
                    <TabsTrigger value="net-cash-flow">Net Cash Flow</TabsTrigger>
                    <TabsTrigger value="stakes-winnings">Stakes vs Winnings</TabsTrigger>
                    <TabsTrigger value="ftd-volume">FTD vs Deposits</TabsTrigger>
                </TabsList>

                {/* Deposits vs Withdrawals */}
                <TabsContent value="deposits-withdrawals">
                    <Card>
                        <CardHeader>
                            <CardTitle>Deposits vs Withdrawals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {dailyFlowLoading ? <ChartSkeleton /> : dailyFlowError ? (
                                <ChartError message="Failed to load deposits vs withdrawals data." />
                            ) : (
                                <ChartContainer config={depositsWithdrawalsConfig} className="h-[400px] w-full">
                                    <BarChart data={depositsWithdrawalsData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                                        <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(value, name) => (
                                            <DualBarTooltip value={Number(value)} name={String(name)}
                                                labelsMap={{ deposits: "Deposits", withdrawals: "Withdrawals" }}
                                                colorsMap={{ deposits: "hsl(142, 71%, 45%)", withdrawals: "hsl(0, 84%, 60%)" }}
                                            />
                                        )} />} />
                                        <Legend verticalAlign="top" align="right" iconType="square" iconSize={12} wrapperStyle={{ paddingBottom: 16 }} formatter={(v: string) => ({ deposits: "Deposits", withdrawals: "Withdrawals" }[v] || v)} />
                                        <Bar dataKey="deposits" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="withdrawals" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Net Cash Flow */}
                <TabsContent value="net-cash-flow">
                    <Card>
                        <CardHeader>
                            <CardTitle>Net Cash Flow</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {dailyFlowLoading ? <ChartSkeleton /> : dailyFlowError ? (
                                <ChartError message="Failed to load net cash flow data." />
                            ) : (
                                <ChartContainer config={netCashFlowConfig} className="h-[400px] w-full">
                                    <BarChart data={netCashFlowData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => `KES ${Number(value).toLocaleString()}`} />} />
                                        <Bar dataKey="net_flow" radius={[4, 4, 0, 0]}>
                                            {netCashFlowData.map((entry, index) => (
                                                <Cell key={index} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Stakes vs Winnings */}
                <TabsContent value="stakes-winnings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stakes vs Winnings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stakesLoading ? <ChartSkeleton /> : stakesError ? (
                                <ChartError message="Failed to load stakes vs winnings data." />
                            ) : (
                                <ChartContainer config={stakesWinningsConfig} className="h-[400px] w-full">
                                    <BarChart data={stakesChartData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                                        <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(value, name) => (
                                            <DualBarTooltip value={Number(value)} name={String(name)}
                                                labelsMap={{ total_stakes: "Stakes", total_winnings: "Winnings" }}
                                                colorsMap={{ total_stakes: "hsl(217, 91%, 60%)", total_winnings: "hsl(25, 95%, 53%)" }}
                                            />
                                        )} />} />
                                        <Legend verticalAlign="top" align="right" iconType="square" iconSize={12} wrapperStyle={{ paddingBottom: 16 }} formatter={(v: string) => ({ total_stakes: "Stakes", total_winnings: "Winnings" }[v] || v)} />
                                        <Bar dataKey="total_stakes" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="total_winnings" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* FTD Volume vs Deposits */}
                <TabsContent value="ftd-volume">
                    <Card>
                        <CardHeader>
                            <CardTitle>FTD Volume vs Deposits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {ftdVolumeLoading ? <ChartSkeleton /> : ftdVolumeError ? (
                                <ChartError message="Failed to load FTD volume data." />
                            ) : (
                                <ChartContainer config={ftdVolumeConfig} className="h-[400px] w-full">
                                    <BarChart data={ftdVolumeChartData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                                        <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(value, name) => (
                                            <DualBarTooltip value={Number(value)} name={String(name)}
                                                labelsMap={{ total_deposit_amount: "Total Deposits", ftd_amount: "FTD Volume" }}
                                                colorsMap={{ total_deposit_amount: "hsl(217, 91%, 60%)", ftd_amount: "hsl(280, 67%, 55%)" }}
                                            />
                                        )} />} />
                                        <Legend verticalAlign="top" align="right" iconType="square" iconSize={12} wrapperStyle={{ paddingBottom: 16 }} formatter={(v: string) => ({ total_deposit_amount: "Total Deposits", ftd_amount: "FTD Volume" }[v] || v)} />
                                        <Bar dataKey="total_deposit_amount" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="ftd_amount" fill="hsl(280, 67%, 55%)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
