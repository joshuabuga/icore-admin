'use client';

import { Game } from '@/types/games';
import { GameCard } from './game-card';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Gamepad2 } from 'lucide-react';

interface GamesGridProps {
  games: Game[];
  isLoading: boolean;
  onToggleOffered: (game: Game) => void;
  onEdit: (game: Game) => void;
  isUpdating?: boolean;
}

export function GamesGrid({
  games,
  isLoading,
  onToggleOffered,
  onEdit,
  isUpdating,
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

  if (games.length === 0) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onToggleOffered={onToggleOffered}
          onEdit={onEdit}
          isUpdating={isUpdating}
        />
      ))}
    </div>
  );
}
