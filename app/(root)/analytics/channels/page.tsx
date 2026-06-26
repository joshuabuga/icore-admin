"use client";

import { useMemo, useState } from "react";
import { useChannelRegistrations, useChannelPlays } from "@/hooks/use-analytics-dashboards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
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
    if (!dateStr) return "";
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });
}

function formatKES(amount: number) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

const COLORS = {
    web: "hsl(217, 91%, 60%)",
    sms: "hsl(142, 71%, 45%)",
    ussd: "hsl(25, 95%, 53%)",
    telegram: "hsl(199, 89%, 48%)",
    whatsapp: "hsl(160, 60%, 45%)",
    service: "hsl(280, 67%, 55%)",
};

const registrationsConfig = {
    web: { label: "Web", color: COLORS.web },
    sms: { label: "SMS", color: COLORS.sms },
    ussd: { label: "USSD", color: COLORS.ussd },
    telegram: { label: "Telegram", color: COLORS.telegram },
    whatsapp: { label: "WhatsApp", color: COLORS.whatsapp },
    service: { label: "Service", color: COLORS.service },
} satisfies ChartConfig;

const playsConfig = {
    web_bets: { label: "Web Bets", color: COLORS.web },
    sms_bets: { label: "SMS Bets", color: COLORS.sms },
    ussd_bets: { label: "USSD Bets", color: COLORS.ussd },
    telegram_bets: { label: "Telegram Bets", color: COLORS.telegram },
    whatsapp_bets: { label: "WhatsApp Bets", color: COLORS.whatsapp },
} satisfies ChartConfig;

function ChartSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-[350px] w-full" />
        </div>
    );
}

function ChartError({ message }: { message: string }) {
    return (
        <div className="rounded-md border border-destructive p-8 text-center text-destructive">
            {message}
        </div>
    );
}

export default function ChannelPerformancePage() {
    const [preset, setPreset] = useState<DatePreset>("30");
    const { startDate, endDate } = useMemo(() => getDateRange(preset), [preset]);

    const { data: regData, isLoading: regLoading, error: regError } = useChannelRegistrations({ startDate, endDate });
    const { data: playData, isLoading: playLoading, error: playError } = useChannelPlays({ startDate, endDate });

    // Format registration data for rendering
    const formattedRegData = useMemo(() => {
        if (!Array.isArray(regData)) return [];
        return [...regData].reverse().map((e) => ({
            ...e,
            label: formatDateLabel(e.date),
        }));
    }, [regData]);

    // Format plays data for rendering
    const formattedPlayData = useMemo(() => {
        if (!Array.isArray(playData)) return [];
        return [...playData].reverse().map((e) => ({
            ...e,
            total_stakes_num: Number(e.total_stakes),
            web_stakes_num: Number(e.web_stakes),
            sms_stakes_num: Number(e.sms_stakes),
            ussd_stakes_num: Number(e.ussd_stakes),
            telegram_stakes_num: Number(e.telegram_stakes),
            whatsapp_stakes_num: Number(e.whatsapp_stakes),
            label: formatDateLabel(e.date),
        }));
    }, [playData]);

    // Aggregate lifetime totals in the preset range
    const aggregateTotals = useMemo(() => {
        const totals = {
            registrations: { web: 0, sms: 0, ussd: 0, telegram: 0, whatsapp: 0, service: 0, total: 0 },
            plays: {
                web_bets: 0, web_stakes: 0,
                sms_bets: 0, sms_stakes: 0,
                ussd_bets: 0, ussd_stakes: 0,
                telegram_bets: 0, telegram_stakes: 0,
                whatsapp_bets: 0, whatsapp_stakes: 0,
                total_bets: 0, total_stakes: 0
            }
        };

        if (Array.isArray(regData)) {
            regData.forEach((day) => {
                totals.registrations.web += day.web || 0;
                totals.registrations.sms += day.sms || 0;
                totals.registrations.ussd += day.ussd || 0;
                totals.registrations.telegram += day.telegram || 0;
                totals.registrations.whatsapp += day.whatsapp || 0;
                totals.registrations.service += day.service || 0;
                totals.registrations.total += day.total || 0;
            });
        }

        if (Array.isArray(playData)) {
            playData.forEach((day) => {
                totals.plays.web_bets += day.web_bets || 0;
                totals.plays.web_stakes += Number(day.web_stakes || 0);
                totals.plays.sms_bets += day.sms_bets || 0;
                totals.plays.sms_stakes += Number(day.sms_stakes || 0);
                totals.plays.ussd_bets += day.ussd_bets || 0;
                totals.plays.ussd_stakes += Number(day.ussd_stakes || 0);
                totals.plays.telegram_bets += day.telegram_bets || 0;
                totals.plays.telegram_stakes += Number(day.telegram_stakes || 0);
                totals.plays.whatsapp_bets += day.whatsapp_bets || 0;
                totals.plays.whatsapp_stakes += Number(day.whatsapp_stakes || 0);
                totals.plays.total_bets += day.total_bets || 0;
                totals.plays.total_stakes += Number(day.total_stakes || 0);
            });
        }

        return totals;
    }, [regData, playData]);

    // Build pie datasets for easy visual distribution representation
    const regPieData = useMemo(() => {
        const { web, sms, ussd, telegram, whatsapp, service } = aggregateTotals.registrations;
        return [
            { name: "Web", value: web, color: COLORS.web },
            { name: "SMS", value: sms, color: COLORS.sms },
            { name: "USSD", value: ussd, color: COLORS.ussd },
            { name: "Telegram", value: telegram, color: COLORS.telegram },
            { name: "WhatsApp", value: whatsapp, color: COLORS.whatsapp },
            { name: "Service", value: service, color: COLORS.service },
        ].filter(d => d.value > 0);
    }, [aggregateTotals]);

    const playBetsPieData = useMemo(() => {
        const { web_bets, sms_bets, ussd_bets, telegram_bets, whatsapp_bets } = aggregateTotals.plays;
        return [
            { name: "Web", value: web_bets, color: COLORS.web },
            { name: "SMS", value: sms_bets, color: COLORS.sms },
            { name: "USSD", value: ussd_bets, color: COLORS.ussd },
            { name: "Telegram", value: telegram_bets, color: COLORS.telegram },
            { name: "WhatsApp", value: whatsapp_bets, color: COLORS.whatsapp },
        ].filter(d => d.value > 0);
    }, [aggregateTotals]);

    const playStakesPieData = useMemo(() => {
        const { web_stakes, sms_stakes, ussd_stakes, telegram_stakes, whatsapp_stakes } = aggregateTotals.plays;
        return [
            { name: "Web", value: web_stakes, color: COLORS.web },
            { name: "SMS", value: sms_stakes, color: COLORS.sms },
            { name: "USSD", value: ussd_stakes, color: COLORS.ussd },
            { name: "Telegram", value: telegram_stakes, color: COLORS.telegram },
            { name: "WhatsApp", value: whatsapp_stakes, color: COLORS.whatsapp },
        ].filter(d => d.value > 0);
    }, [aggregateTotals]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Channel Performance</h1>
                    <p className="text-muted-foreground">
                        Analyze user acquisitions and ticket play behavior across different access channels
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

            <Tabs defaultValue="registrations" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="registrations">Acquisitions (Registrations)</TabsTrigger>
                    <TabsTrigger value="plays">Engagement (Plays & Stakes)</TabsTrigger>
                </TabsList>

                {/* --- REGISTRATIONS TAB --- */}
                <TabsContent value="registrations" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Total Signups</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{aggregateTotals.registrations.total.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card style={{ borderLeft: `3px solid ${COLORS.web}` }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Web Channel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{aggregateTotals.registrations.web.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card style={{ borderLeft: `3px solid ${COLORS.sms}` }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">SMS Channel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{aggregateTotals.registrations.sms.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card style={{ borderLeft: `3px solid ${COLORS.ussd}` }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">USSD Channel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{aggregateTotals.registrations.ussd.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card style={{ borderLeft: `3px solid ${COLORS.telegram}` }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Telegram</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{aggregateTotals.registrations.telegram.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card style={{ borderLeft: `3px solid ${COLORS.whatsapp}` }}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">WhatsApp</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{aggregateTotals.registrations.whatsapp.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Daily Acquisitions by Channel</CardTitle>
                                <CardDescription>User signups trend per platform over the selected range</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {regLoading ? <ChartSkeleton /> : regError ? (
                                    <ChartError message="Failed to load daily acquisitions data." />
                                ) : (
                                    <ChartContainer config={registrationsConfig} className="h-[350px] w-full">
                                        <BarChart data={formattedRegData} margin={{ top: 10 }}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend verticalAlign="bottom" height={36} />
                                            <Bar dataKey="web" stackId="a" fill={COLORS.web} radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="sms" stackId="a" fill={COLORS.sms} radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="ussd" stackId="a" fill={COLORS.ussd} radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="telegram" stackId="a" fill={COLORS.telegram} radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="whatsapp" stackId="a" fill={COLORS.whatsapp} radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="service" stackId="a" fill={COLORS.service} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Acquisitions Distribution</CardTitle>
                                <CardDescription>Percentage share of signups per platform</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center min-h-[350px]">
                                {regLoading ? <ChartSkeleton /> : regError ? (
                                    <ChartError message="Failed to load acquisition distribution." />
                                ) : regPieData.length === 0 ? (
                                    <div className="text-muted-foreground text-sm">No acquisitions recorded in this range</div>
                                ) : (
                                    <>
                                        <div className="h-[240px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={regPieData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                        labelLine={false}
                                                    >
                                                        {regPieData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip formatter={(value) => `${value} signups`} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 w-full text-xs mt-4">
                                            {regPieData.map((entry) => (
                                                <div key={entry.name} className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                                    <span className="font-medium">{entry.name}:</span>
                                                    <span className="text-muted-foreground ml-auto">
                                                        {((entry.value / aggregateTotals.registrations.total) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- ENGAGEMENT / PLAYS TAB --- */}
                <TabsContent value="plays" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Total Plays (Bets)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{aggregateTotals.plays.total_bets.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Total Stakes Volume</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatKES(aggregateTotals.plays.total_stakes)}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Average Bet Ticket</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {aggregateTotals.plays.total_bets > 0
                                        ? formatKES(aggregateTotals.plays.total_stakes / aggregateTotals.plays.total_bets)
                                        : "KES 0"
                                    }
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Top Engagement Channel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">
                                    {(() => {
                                        const channels = [
                                            { name: "Web", value: aggregateTotals.plays.web_bets },
                                            { name: "SMS", value: aggregateTotals.plays.sms_bets },
                                            { name: "USSD", value: aggregateTotals.plays.ussd_bets },
                                            { name: "Telegram", value: aggregateTotals.plays.telegram_bets },
                                            { name: "WhatsApp", value: aggregateTotals.plays.whatsapp_bets },
                                        ];
                                        const top = channels.reduce((max, c) => c.value > max.value ? c : max, { name: "None", value: -1 });
                                        return top.value > 0 ? `${top.name} (${((top.value / aggregateTotals.plays.total_bets) * 100).toFixed(0)}%)` : "N/A";
                                    })()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Play Volume (Bets)</CardTitle>
                                <CardDescription>Count of ticket plays processed per channel</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {playLoading ? <ChartSkeleton /> : playError ? (
                                    <ChartError message="Failed to load daily plays data." />
                                ) : (
                                    <ChartContainer config={playsConfig} className="h-[350px] w-full">
                                        <BarChart data={formattedPlayData} margin={{ top: 10 }}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend verticalAlign="bottom" height={36} />
                                            <Bar dataKey="web_bets" stackId="a" name="Web Bets" fill={COLORS.web} />
                                            <Bar dataKey="sms_bets" stackId="a" name="SMS Bets" fill={COLORS.sms} />
                                            <Bar dataKey="ussd_bets" stackId="a" name="USSD Bets" fill={COLORS.ussd} />
                                            <Bar dataKey="telegram_bets" stackId="a" name="Telegram Bets" fill={COLORS.telegram} />
                                            <Bar dataKey="whatsapp_bets" stackId="a" name="WhatsApp Bets" fill={COLORS.whatsapp} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Stakes Volume (KES)</CardTitle>
                                <CardDescription>Total value of bet stakes placed per channel</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {playLoading ? <ChartSkeleton /> : playError ? (
                                    <ChartError message="Failed to load daily stakes data." />
                                ) : (
                                    <ChartContainer config={playsConfig} className="h-[350px] w-full">
                                        <BarChart data={formattedPlayData} margin={{ top: 10 }}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatKES(Number(value))} />} />
                                            <Legend verticalAlign="bottom" height={36} />
                                            <Bar dataKey="web_stakes_num" stackId="a" name="Web KES" fill={COLORS.web} />
                                            <Bar dataKey="sms_stakes_num" stackId="a" name="SMS KES" fill={COLORS.sms} />
                                            <Bar dataKey="ussd_stakes_num" stackId="a" name="USSD KES" fill={COLORS.ussd} />
                                            <Bar dataKey="telegram_stakes_num" stackId="a" name="Telegram KES" fill={COLORS.telegram} />
                                            <Bar dataKey="whatsapp_stakes_num" stackId="a" name="WhatsApp KES" fill={COLORS.whatsapp} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ChartContainer>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bets Share</CardTitle>
                                <CardDescription>Percentage distribution of total plays</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center min-h-[250px]">
                                {playLoading ? <ChartSkeleton /> : playError ? (
                                    <ChartError message="Failed to load bets share." />
                                ) : playBetsPieData.length === 0 ? (
                                    <div className="text-muted-foreground text-sm">No plays recorded in this range</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie
                                                data={playBetsPieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={65}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                labelLine={false}
                                            >
                                                {playBetsPieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value} bets`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Stakes Share</CardTitle>
                                <CardDescription>Percentage distribution of total cash stakes</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center min-h-[250px]">
                                {playLoading ? <ChartSkeleton /> : playError ? (
                                    <ChartError message="Failed to load stakes share." />
                                ) : playStakesPieData.length === 0 ? (
                                    <div className="text-muted-foreground text-sm">No plays recorded in this range</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie
                                                data={playStakesPieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={65}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                labelLine={false}
                                            >
                                                {playStakesPieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => formatKES(Number(value))} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Channel Standings</CardTitle>
                                <CardDescription>Detailed metrics breakdown for current range</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Web", bets: aggregateTotals.plays.web_bets, stakes: aggregateTotals.plays.web_stakes, color: COLORS.web },
                                        { name: "SMS", bets: aggregateTotals.plays.sms_bets, stakes: aggregateTotals.plays.sms_stakes, color: COLORS.sms },
                                        { name: "USSD", bets: aggregateTotals.plays.ussd_bets, stakes: aggregateTotals.plays.ussd_stakes, color: COLORS.ussd },
                                        { name: "Telegram", bets: aggregateTotals.plays.telegram_bets, stakes: aggregateTotals.plays.telegram_stakes, color: COLORS.telegram },
                                        { name: "WhatsApp", bets: aggregateTotals.plays.whatsapp_bets, stakes: aggregateTotals.plays.whatsapp_stakes, color: COLORS.whatsapp },
                                    ].map((channel) => (
                                        <div key={channel.name} className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                                                <span className="font-semibold text-sm">{channel.name}</span>
                                            </div>
                                            <div className="text-right text-xs">
                                                <div className="font-bold">{channel.bets.toLocaleString()} plays</div>
                                                <div className="text-muted-foreground">{formatKES(channel.stakes)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
