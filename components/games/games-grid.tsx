'use client';

import { Game, GameStatsSummary } from '@/types/games';
import { GameCard } from './game-card';
import { TrackedGameCard } from './tracked-game-card';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Gamepad2 } from 'lucide-react';

interface GamesGridProps {
  games: Game[];
  isLoading: boolean;
  onToggleOffered: (game: Game) => void;
  onEdit: (game: Game) => void;
  isUpdating?: boolean;
  trackedGames?: GameStatsSummary[];
}

export function GamesGrid({
  games,
  isLoading,
  onToggleOffered,
  onEdit,
  isUpdating,
  trackedGames = [],
}: GamesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Separate boxgame records from casino games
  const trackedCodes = new Set(trackedGames.map(g => g.identifier));
  const casinoGames = games.filter(g => !trackedCodes.has(g.code));

  const totalCount = casinoGames.length + trackedGames.length;

  if (totalCount === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Gamepad2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No games found</h3>
          <p className="text-muted-foreground text-center">
            Try adjusting your search or filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tracked games section (wallet-stats-enabled) */}
      {trackedGames.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Tracked Games ({trackedGames.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {trackedGames.map(g => (
              <TrackedGameCard key={g.identifier} game={g} />
            ))}
          </div>
        </div>
      )}

      {/* Casino / other games section */}
      {casinoGames.length > 0 && (
        <div className="space-y-3">
          {trackedGames.length > 0 && (
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Casino &amp; Other Games ({casinoGames.length})
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {casinoGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onToggleOffered={onToggleOffered}
                onEdit={onEdit}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
