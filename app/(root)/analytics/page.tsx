"use client";

import { useMemo, useState } from "react";
import { usePayinsPerDay, useUsersPerDay, useDailyFlow } from "@/hooks/use-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function getMonthRange(year: number, month: number) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
    };
}

function formatMonthLabel(year: number, month: number) {
    return new Date(year, month).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
}

function fillDailyData(
    labels: string[],
    values: number[],
    startDate: string,
    endDate: string,
    valueKey: string
) {
    const dataMap = new Map<string, number>();
    labels.forEach((label, i) => {
        dataMap.set(label, values[i] || 0);
    });

    const result: Record<string, string | number>[] = [];
    const current = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");

    while (current <= end) {
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, "0");
        const d = String(current.getDate()).padStart(2, "0");
        const dateStr = `${y}-${m}-${d}`;
        result.push({
            date: dateStr,
            label: current.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
            [valueKey]: dataMap.get(dateStr) || 0,
        });
        current.setDate(current.getDate() + 1);
    }

    return result;
}

const payinsChartConfig = {
    amount: {
        label: "Amount (KES)",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const usersChartConfig = {
    count: {
        label: "Registrations",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

const dailyFlowChartConfig = {
    deposits: {
        label: "Deposits",
        color: "var(--chart-1)",
    },
    withdrawals: {
        label: "Withdrawals",
        color: "var(--chart-3)",
    },
    net_flow: {
        label: "Net Flow",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export default function AnalyticsPage() {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());

    const { startDate, endDate } = useMemo(
        () => getMonthRange(year, month),
        [year, month]
    );

    const {
        data: payinsData,
        isLoading: payinsLoading,
        error: payinsError,
    } = usePayinsPerDay({ startDate, endDate });

    const {
        data: usersData,
        isLoading: usersLoading,
        error: usersError,
    } = useUsersPerDay({ startDate, endDate });

    const {
        data: dailyFlowData,
        isLoading: dailyFlowLoading,
        error: dailyFlowError,
    } = useDailyFlow({ startDate, endDate });

    const payinsChartData = useMemo(() => {
        if (!payinsData?.graph_data) return [];
        return fillDailyData(
            payinsData.graph_data.payin_labels,
            payinsData.graph_data.payins_graph_data,
            startDate,
            endDate,
            "amount"
        );
    }, [payinsData, startDate, endDate]);

    const usersChartData = useMemo(() => {
        if (!usersData?.graph_data) return [];
        return fillDailyData(
            usersData.graph_data.user_labels,
            usersData.graph_data.users_graph_data,
            startDate,
            endDate,
            "count"
        );
    }, [usersData, startDate, endDate]);

    const dailyFlowChartData = useMemo(() => {
        if (!dailyFlowData) return [];
        return dailyFlowData.map((entry) => ({
            ...entry,
            label: new Date(entry.date + "T00:00:00").toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
            }),
        }));
    }, [dailyFlowData]);

    function goToPreviousMonth() {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    }

    function goToNextMonth() {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                    Daily deposits, user registration trends, and cash flow
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[160px] text-center">
                    {formatMonthLabel(year, month)}
                </span>
                <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <Tabs defaultValue="deposits-users">
                <TabsList>
                    <TabsTrigger value="deposits-users">Deposits & Users</TabsTrigger>
                    <TabsTrigger value="daily-flow">Daily Flow</TabsTrigger>
                </TabsList>

                <TabsContent value="deposits-users" className="space-y-6">
                    {/* Deposits Per Day */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Deposits Per Day</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {payinsLoading ? (
                                <Skeleton className="h-[350px] w-full" />
                            ) : payinsError ? (
                                <div className="rounded-md border border-destructive p-8 text-center text-destructive">
                                    Failed to load deposits data. Please try again.
                                </div>
                            ) : (
                                <ChartContainer config={payinsChartConfig} className="h-[350px] w-full">
                                    <BarChart data={payinsChartData} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            fontSize={12}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            fontSize={12}
                                            tickFormatter={(value: number) =>
                                                `${(value / 1000).toFixed(0)}k`
                                            }
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value) =>
                                                        `KES ${Number(value).toLocaleString()}`
                                                    }
                                                />
                                            }
                                        />
                                        <Bar
                                            dataKey="amount"
                                            fill="var(--color-amount)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* User Registrations Per Day */}
                    <Card>
                        <CardHeader>
                            <CardTitle>User Registrations Per Day</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {usersLoading ? (
                                <Skeleton className="h-[350px] w-full" />
                            ) : usersError ? (
                                <div className="rounded-md border border-destructive p-8 text-center text-destructive">
                                    Failed to load user registration data. Please try again.
                                </div>
                            ) : (
                                <ChartContainer config={usersChartConfig} className="h-[350px] w-full">
                                    <BarChart data={usersChartData} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            fontSize={12}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            fontSize={12}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value) =>
                                                        `${Number(value).toLocaleString()} users`
                                                    }
                                                />
                                            }
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="var(--color-count)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="daily-flow">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Cash Flow</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {dailyFlowLoading ? (
                                <Skeleton className="h-[350px] w-full" />
                            ) : dailyFlowError ? (
                                <div className="rounded-md border border-destructive p-8 text-center text-destructive">
                                    Failed to load daily flow data. Please try again.
                                </div>
                            ) : (
                                <ChartContainer config={dailyFlowChartConfig} className="h-[400px] w-full">
                                    <BarChart data={dailyFlowChartData} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            fontSize={12}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            fontSize={12}
                                            tickFormatter={(value: number) =>
                                                `${(value / 1000).toFixed(0)}k`
                                            }
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    labelFormatter={(label) => `${label}`}
                                                    indicator="dot"
                                                    formatter={(value, name) => {
                                                        const labels: Record<string, string> = {
                                                            deposits: "Deposits",
                                                            withdrawals: "Withdrawals",
                                                            net_flow: "Net Flow",
                                                        };
                                                        const colors: Record<string, string> = {
                                                            deposits: "var(--color-deposits)",
                                                            withdrawals: "var(--color-withdrawals)",
                                                            net_flow: "var(--color-net_flow)",
                                                        };
                                                        const key = String(name);
                                                        return (
                                                            <div className="flex w-full items-center gap-2">
                                                                <div
                                                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                                                    style={{ backgroundColor: colors[key] }}
                                                                />
                                                                <span className="text-muted-foreground">
                                                                    {labels[key] || key}
                                                                </span>
                                                                <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                                                                    KES {Number(value).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                        <Legend
                                            verticalAlign="top"
                                            align="right"
                                            iconType="square"
                                            iconSize={12}
                                            wrapperStyle={{ paddingBottom: 16 }}
                                            formatter={(value: string) => {
                                                const labels: Record<string, string> = {
                                                    deposits: "Deposits",
                                                    withdrawals: "Withdrawals",
                                                    net_flow: "Net Flow",
                                                };
                                                return labels[value] || value;
                                            }}
                                        />
                                        <Bar
                                            dataKey="deposits"
                                            fill="var(--color-deposits)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="withdrawals"
                                            fill="var(--color-withdrawals)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="net_flow"
                                            fill="var(--color-net_flow)"
                                            radius={[4, 4, 0, 0]}
                                        />
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
