'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Gamepad2 } from 'lucide-react';

import { Game } from '@/types/games';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface GameActionHandlers {
  onToggleOffered: (game: Game) => Promise<void>;
  onEdit: (game: Game) => void;
  isUpdating?: boolean;
}

function GameActionsCell({
  game,
  handlers,
}: {
  game: Game;
  handlers: GameActionHandlers;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleOffered = async () => {
    setIsLoading(true);
    try {
      await handlers.onToggleOffered(game);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={game.is_offered}
        onCheckedChange={handleToggleOffered}
        disabled={isLoading || handlers.isUpdating}
        size="sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handlers.onEdit(game)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit game
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function createGameColumns(handlers: GameActionHandlers): ColumnDef<Game>[] {
  return [
    {
      accessorKey: 'thumbnail',
      header: '',
      cell: ({ row }) => {
        const thumbnail = row.getValue('thumbnail') as string;
        return (
          <div className="w-12 h-12 relative rounded overflow-hidden bg-muted flex-shrink-0">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={row.original.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <span className="font-medium line-clamp-1" title={row.getValue('name')}>
            {row.getValue('name')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'provider',
      header: 'Provider',
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue('provider')}</Badge>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.getValue('type')}</span>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const category = row.getValue('category') as string;
        return (
          <Badge variant={category === 'casino' ? 'secondary' : 'default'}>
            {category}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue('priority')}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={status === 'Active' ? 'default' : 'destructive'}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'is_offered',
      header: 'Offered',
      cell: ({ row }) => {
        const isOffered = row.getValue('is_offered') as boolean;
        return (
          <Badge variant={isOffered ? 'default' : 'secondary'}>
            {isOffered ? 'Yes' : 'No'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <GameActionsCell game={row.original} handlers={handlers} />,
    },
  ];
}
