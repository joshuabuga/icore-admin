"use client";

import { useMemo, useState } from "react";
import {
    useHourlyRegistrations,
    useDailyNewUsersFTD,
} from "@/hooks/use-analytics-dashboards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
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

function formatHourLabel(isoStr: string) {
    const d = new Date(isoStr);
    return d.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
}

const registrationsConfig = {
    new_users: { label: "Registrations", color: "hsl(217, 91%, 60%)" },
} satisfies ChartConfig;

const newVsFtdConfig = {
    new_users: { label: "New Users", color: "hsl(217, 91%, 60%)" },
    ftd_count: { label: "First-Time Depositors", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig;

const hourlyRegConfig = {
    new_users: { label: "New Users", color: "hsl(25, 95%, 53%)" },
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

export default function GrowthPage() {
    const [preset, setPreset] = useState<DatePreset>("30");
    const { startDate, endDate } = useMemo(() => getDateRange(preset), [preset]);

    const { data: newUsersFtdData, isLoading: newUsersFtdLoading, error: newUsersFtdError } = useDailyNewUsersFTD({ startDate, endDate });
    const { data: hourlyRegData, isLoading: hourlyRegLoading, error: hourlyRegError } = useHourlyRegistrations();

    const registrationsChartData = useMemo(() => {
        if (!newUsersFtdData) return [];
        return newUsersFtdData.map((e) => ({ ...e, label: formatDateLabel(e.date) }));
    }, [newUsersFtdData]);

    const newVsFtdChartData = useMemo(() => {
        if (!newUsersFtdData) return [];
        return newUsersFtdData.map((e) => ({ ...e, label: formatDateLabel(e.date) }));
    }, [newUsersFtdData]);

    const hourlyRegChartData = useMemo(() => {
        if (!hourlyRegData) return [];
        return hourlyRegData.map((e) => ({ ...e, label: formatHourLabel(e.hour) }));
    }, [hourlyRegData]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Growth</h1>
                    <p className="text-muted-foreground">
                        User registrations, first-time depositors, and signup trends
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

            <Tabs defaultValue="registrations">
                <TabsList>
                    <TabsTrigger value="registrations">Registrations</TabsTrigger>
                    <TabsTrigger value="new-vs-ftd">New vs First-Time Depositors</TabsTrigger>
                    <TabsTrigger value="hourly-registrations">Hourly Registrations</TabsTrigger>
                </TabsList>

                {/* User Registrations per Day */}
                <TabsContent value="registrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Registrations per Day</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {newUsersFtdLoading ? <ChartSkeleton /> : newUsersFtdError ? (
                                <ChartError message="Failed to load registration data." />
                            ) : (
                                <ChartContainer config={registrationsConfig} className="h-[400px] w-full">
                                    <BarChart data={registrationsChartData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${Number(value).toLocaleString()} users`} />} />
                                        <Bar dataKey="new_users" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* New vs First-Time Depositors */}
                <TabsContent value="new-vs-ftd">
                    <Card>
                        <CardHeader>
                            <CardTitle>New vs First-Time Depositors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {newUsersFtdLoading ? <ChartSkeleton /> : newUsersFtdError ? (
                                <ChartError message="Failed to load new vs FTD data." />
                            ) : (
                                <ChartContainer config={newVsFtdConfig} className="h-[400px] w-full">
                                    <BarChart data={newVsFtdChartData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(value, name) => {
                                            const labels: Record<string, string> = { new_users: "New Users", ftd_count: "First-Time Depositors" };
                                            const colors: Record<string, string> = { new_users: "hsl(217, 91%, 60%)", ftd_count: "hsl(142, 71%, 45%)" };
                                            const key = String(name);
                                            return (
                                                <div className="flex w-full items-center gap-2">
                                                    <div className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: colors[key] }} />
                                                    <span className="text-muted-foreground">{labels[key] || key}</span>
                                                    <span className="ml-auto font-mono font-medium tabular-nums text-foreground">{Number(value).toLocaleString()}</span>
                                                </div>
                                            );
                                        }} />} />
                                        <Legend verticalAlign="top" align="right" iconType="square" iconSize={12} wrapperStyle={{ paddingBottom: 16 }} formatter={(v: string) => ({ new_users: "New Users", ftd_count: "First-Time Depositors" }[v] || v)} />
                                        <Bar dataKey="new_users" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="ftd_count" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Hourly Registrations (24h) */}
                <TabsContent value="hourly-registrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hourly New User Registrations (24h)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {hourlyRegLoading ? <ChartSkeleton /> : hourlyRegError ? (
                                <ChartError message="Failed to load hourly registration data." />
                            ) : (
                                <ChartContainer config={hourlyRegConfig} className="h-[400px] w-full">
                                    <BarChart data={hourlyRegChartData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${Number(value).toLocaleString()} users`} />} />
                                        <Bar dataKey="new_users" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
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
