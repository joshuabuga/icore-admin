'use client';

import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { LayoutGrid, List, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { useGames, useGameMutations } from '@/hooks/use-games';
import { useIsMobile } from '@/hooks/use-mobile';
import { Game, GameDetail } from '@/types/games';
import { DataTable } from '@/components/shared/data-table';
import { GamesGrid } from '@/components/games/games-grid';
import { EditGameDialog } from '@/components/games/edit-game-dialog';
import { createGameColumns, GameActionHandlers } from '@/components/games/columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function GamesPage() {
  // View mode state
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const isMobile = useIsMobile();
  const effectiveView = isMobile ? 'grid' : viewMode;

  // Server-side pagination state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Edit dialog state
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch games
  const { games, totalRows, isLoading, error, refetch } = useGames({
    search: search || undefined,
    page,
    page_size: pageSize,
    sortBy: 'priority',
    sortDesc: true,
  });

  const { updateGame, uploadThumbnail, isUpdating } = useGameMutations();

  // Calculate pagination values
  const pageCount = Math.ceil(totalRows / pageSize);

  // Handle toggle is_offered
  const handleToggleOffered = useCallback(
    async (game: Game) => {
      try {
        await updateGame({
          id: game.id.toString(),
          data: { is_offered: !game.is_offered },
        });
        toast.success(
          game.is_offered
            ? `${game.name} is no longer offered to players`
            : `${game.name} is now offered to players`
        );
        refetch();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to update game');
      }
    },
    [updateGame, refetch]
  );

  // Handle edit game
  const handleEdit = useCallback((game: Game) => {
    setEditingGame(game);
    setEditDialogOpen(true);
  }, []);

  // Handle save edit
  const handleSaveEdit = useCallback(
    async (id: string, data: Partial<GameDetail>, thumbnailFile?: File) => {
      try {
        await updateGame({ id, data });
        if (thumbnailFile) {
          await uploadThumbnail(id, thumbnailFile);
        }
        toast.success('Game updated successfully');
        setEditDialogOpen(false);
        setEditingGame(null);
        refetch();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to update game');
      }
    },
    [updateGame, uploadThumbnail, refetch]
  );

  // Action handlers for table view
  const actionHandlers: GameActionHandlers = useMemo(
    () => ({
      onToggleOffered: handleToggleOffered,
      onEdit: handleEdit,
      isUpdating,
    }),
    [handleToggleOffered, handleEdit, isUpdating]
  );

  const columns = useMemo(() => createGameColumns(actionHandlers), [actionHandlers]);

  // Handle search with debounce
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Failed to load games</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
          <button onClick={() => refetch()} className="mt-4 text-sm text-primary underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
          <p className="text-muted-foreground">Manage games catalog and visibility</p>
        </div>

        {/* View Toggle - hidden on mobile */}
        {!isMobile && (
          <div className="flex items-center gap-1 rounded-lg border p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </Button>
          </div>
        )}
      </div>

      {/* Conditional rendering based on view mode */}
      {effectiveView === 'table' ? (
        <DataTable
          columns={columns}
          data={games}
          isLoading={isLoading}
          searchPlaceholder="Search games by name, provider..."
          showDateFilter={false}
          mobileHiddenColumns={['type', 'category', 'priority']}
          tabletHiddenColumns={['is_offered']}
          serverSide={true}
          totalRows={totalRows}
          page={page}
          pageSize={pageSize}
          onSearchChange={handleSearchChange}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />
      ) : (
        <>
          {/* Search and Results count for Grid View */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search games by name, provider..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">{totalRows} game(s)</div>
          </div>

          {/* Games Grid */}
          <GamesGrid
            games={games}
            isLoading={isLoading}
            onToggleOffered={handleToggleOffered}
            onEdit={handleEdit}
            isUpdating={isUpdating}
          />

          {/* Pagination for Grid View */}
          {!isLoading && games.length > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="hidden text-sm text-muted-foreground sm:block">
                Page {page} of {pageCount || 1}
              </div>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                {/* Mobile pagination */}
                <div className="flex items-center gap-1 sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>
                  <span className="px-2 text-sm text-muted-foreground">
                    {page}/{pageCount || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pageCount}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Desktop pagination */}
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Per page</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className="h-8 w-[70px] rounded border border-input bg-background px-2 text-sm"
                    >
                      {[12, 24, 36, 48].map((ps) => (
                        <option key={ps} value={ps}>
                          {ps}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPage(1)}
                      disabled={page <= 1}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= pageCount}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPage(pageCount)}
                      disabled={page >= pageCount}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Edit Game Dialog */}
      <EditGameDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        game={editingGame}
        onSave={handleSaveEdit}
        isLoading={isUpdating}
      />
    </div>
  );
}
