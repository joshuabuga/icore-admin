'use client';

import Link from 'next/link';
import { GameStatsSummary } from '@/types/games';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface TrackedGameCardProps {
    game: GameStatsSummary;
}

function StatPill({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex flex-col items-center rounded-lg bg-muted/50 px-3 py-2 text-center">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="mt-0.5 text-sm font-semibold">{value}</span>
        </div>
    );
}

export function TrackedGameCard({ game }: TrackedGameCardProps) {
    const ggr = parseFloat(game.ggr);
    const ggrPositive = ggr >= 0;

    return (
        <Link href={`/games/${game.identifier}`} className="block">
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500" />

                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <CardTitle className="text-base line-clamp-1">{game.name}</CardTitle>
                            <span className="text-xs text-muted-foreground font-mono">{game.identifier}</span>
                        </div>
                        <Badge variant={game.is_offered ? 'default' : 'secondary'}>
                            {game.is_offered ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <StatPill label="Total Bets" value={game.total_bets.toLocaleString()} />
                        <StatPill label="Total Wins" value={game.total_wins.toLocaleString()} />
                        <StatPill
                            label="Bet Amount"
                            value={`KES ${parseFloat(game.total_bet_amount).toLocaleString()}`}
                        />
                        <StatPill
                            label="Win Amount"
                            value={`KES ${parseFloat(game.total_win_amount).toLocaleString()}`}
                        />
                    </div>

                    <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center gap-1.5">
                            {ggrPositive ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">
                                GGR:{' '}
                                <span className={ggrPositive ? 'text-green-600' : 'text-red-500'}>
                                    KES {Math.abs(ggr).toLocaleString()}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>{game.unique_players} players</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
