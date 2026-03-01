"use client";

import { useMemo, useState } from "react";
import { usePayinsPerDay, useUsersPerDay } from "@/hooks/use-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

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
        const dateStr = current.toISOString().split("T")[0];
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
                    Daily payins and user registration trends
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

            {/* Payins Per Day */}
            <Card>
                <CardHeader>
                    <CardTitle>Payins Per Day</CardTitle>
                </CardHeader>
                <CardContent>
                    {payinsLoading ? (
                        <Skeleton className="h-[350px] w-full" />
                    ) : payinsError ? (
                        <div className="rounded-md border border-destructive p-8 text-center text-destructive">
                            Failed to load payins data. Please try again.
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
        </div>
    );
}
