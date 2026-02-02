'use client';

import Image from 'next/image';
import { Game } from '@/types/games';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Gamepad2, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onToggleOffered: (game: Game) => void;
  onEdit: (game: Game) => void;
  isUpdating?: boolean;
}

export function GameCard({ game, onToggleOffered, onEdit, isUpdating }: GameCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onEdit(game)}
    >
      <div className="aspect-video relative overflow-hidden bg-muted">
        {game.thumbnail ? (
          <Image
            src={game.thumbnail}
            alt={game.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gamepad2 className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-1" title={game.name}>
            {game.name}
          </CardTitle>
          <Badge variant={game.status === 'Active' ? 'default' : 'secondary'}>
            {game.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-xs">
            {game.provider}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {game.type}
          </Badge>
          <Badge variant={game.category === 'casino' ? 'secondary' : 'default'} className="text-xs">
            {game.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            <span>Priority: {game.priority}</span>
          </div>
        </div>

        <div
          className="flex items-center justify-between pt-2 border-t"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm font-medium">Offered to players</span>
          <Switch
            checked={game.is_offered}
            onCheckedChange={() => onToggleOffered(game)}
            disabled={isUpdating}
            size="sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
