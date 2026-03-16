"use client";

import { useMemo, useState } from "react";
import { useHourlyActiveUsers, useTopGames } from "@/hooks/use-analytics-dashboards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
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

function formatHourLabel(isoStr: string) {
    const d = new Date(isoStr);
    return d.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
}

const hourlyActiveConfig = {
    active_users: { label: "Active Users", color: "hsl(262, 83%, 58%)" },
} satisfies ChartConfig;

const PIE_COLORS = [
    "hsl(217, 91%, 60%)",
    "hsl(142, 71%, 45%)",
    "hsl(25, 95%, 53%)",
    "hsl(0, 84%, 60%)",
    "hsl(280, 67%, 55%)",
    "hsl(47, 96%, 53%)",
    "hsl(199, 89%, 48%)",
    "hsl(340, 82%, 52%)",
    "hsl(160, 60%, 45%)",
    "hsl(30, 80%, 55%)",
];

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

export default function EngagementPage() {
    const [preset, setPreset] = useState<DatePreset>("30");
    const { startDate, endDate } = useMemo(() => getDateRange(preset), [preset]);

    const { data: hourlyActiveData, isLoading: hourlyActiveLoading, error: hourlyActiveError } = useHourlyActiveUsers();
    const { data: topGamesData, isLoading: topGamesLoading, error: topGamesError } = useTopGames({ startDate, endDate });

    const hourlyActiveChartData = useMemo(() => {
        if (!hourlyActiveData) return [];
        return hourlyActiveData.map((e) => ({ ...e, label: formatHourLabel(e.hour) }));
    }, [hourlyActiveData]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Engagement & Games</h1>
                    <p className="text-muted-foreground">
                        Active user trends and top games by bet volume
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

            <Tabs defaultValue="active-users">
                <TabsList>
                    <TabsTrigger value="active-users">Hourly Active Users</TabsTrigger>
                    <TabsTrigger value="top-games">Top 10 Games</TabsTrigger>
                </TabsList>

                {/* Hourly Active Users (24h) */}
                <TabsContent value="active-users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hourly Active Users (24h)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {hourlyActiveLoading ? <ChartSkeleton /> : hourlyActiveError ? (
                                <ChartError message="Failed to load hourly active users data." />
                            ) : (
                                <ChartContainer config={hourlyActiveConfig} className="h-[400px] w-full">
                                    <LineChart data={hourlyActiveChartData} margin={{ top: 20 }} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${Number(value).toLocaleString()} users`} />} />
                                        <Line type="monotone" dataKey="active_users" stroke="hsl(262, 83%, 58%)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                                    </LineChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Top 10 Games */}
                <TabsContent value="top-games" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top 10 Games by Bet Volume</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {topGamesLoading ? <ChartSkeleton /> : topGamesError ? (
                                    <ChartError message="Failed to load top games data." />
                                ) : (
                                    <ChartContainer config={{}} className="h-[400px] w-full">
                                        <PieChart margin={{ top: 20 }} accessibilityLayer>
                                            <Pie
                                                data={topGamesData || []}
                                                dataKey="total_bet_volume"
                                                nameKey="game_name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                                innerRadius={60}
                                                paddingAngle={2}
                                                label={({ game_name, percent }) => `${game_name} ${(percent * 100).toFixed(0)}%`}
                                                labelLine={true}
                                            >
                                                {(topGamesData || []).map((_entry, index) => (
                                                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value: number) => `KES ${value.toLocaleString()}`} />
                                            <Legend />
                                        </PieChart>
                                    </ChartContainer>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Top Games Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {topGamesLoading ? <ChartSkeleton /> : topGamesError ? (
                                    <ChartError message="Failed to load top games data." />
                                ) : (
                                    <div className="overflow-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">#</th>
                                                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Game</th>
                                                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">Bet Volume</th>
                                                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">Bet Count</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(topGamesData || []).map((game) => (
                                                    <tr key={game.rank} className="border-b last:border-0">
                                                        <td className="py-3 px-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[(game.rank - 1) % PIE_COLORS.length] }} />
                                                                {game.rank}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2 font-medium">{game.game_name}</td>
                                                        <td className="py-3 px-2 text-right font-mono tabular-nums">KES {game.total_bet_volume.toLocaleString()}</td>
                                                        <td className="py-3 px-2 text-right font-mono tabular-nums">{game.bet_count.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
