"use client";

import { useMemo, useCallback } from "react";
import { toast } from "sonner";

import { usePlayers, usePlayerMutations } from "@/hooks/use-players";
import { DataTable } from "@/components/shared/data-table";
import {
  createPlayerColumns,
  PlayerActionHandlers,
} from "@/components/players/columns";
import { UserListItem } from "@/types/users";

export default function PlayersPage() {
  const { players, isLoading, error, refetch } = usePlayers();
  const { updatePlayer, isUpdating } = usePlayerMutations();

  // Action handlers
  const handleToggleActive = useCallback(
    async (player: UserListItem) => {
      try {
        await updatePlayer({
          id: String(player.id),
          data: { is_active: !player.is_active },
        });
        toast.success(
          player.is_active
            ? `${player.name || player.msisdn} has been suspended`
            : `${player.name || player.msisdn} has been activated`
        );
        refetch();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update player status"
        );
      }
    },
    [updatePlayer, refetch]
  );

  const handleTogglePayout = useCallback(
    async (player: UserListItem) => {
      try {
        await updatePlayer({
          id: String(player.id),
          data: { is_payout_locked: !player.is_payout_locked },
        });
        toast.success(
          player.is_payout_locked
            ? `Payout enabled for ${player.name || player.msisdn}`
            : `Payout disabled for ${player.name || player.msisdn}`
        );
        refetch();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update payout status"
        );
      }
    },
    [updatePlayer, refetch]
  );

  const actionHandlers: PlayerActionHandlers = useMemo(
    () => ({
      onToggleActive: handleToggleActive,
      onTogglePayout: handleTogglePayout,
      isUpdating,
    }),
    [handleToggleActive, handleTogglePayout, isUpdating]
  );

  const columns = useMemo(
    () => createPlayerColumns(actionHandlers),
    [actionHandlers]
  );

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to load players
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 text-sm text-primary underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Players</h1>
        <p className="text-muted-foreground">
          Manage player accounts and access
        </p>
      </div>

      <DataTable
        columns={columns}
        data={players}
        isLoading={isLoading}
        searchPlaceholder="Search players by name, phone, or ID..."
        dateColumn="created_at"
        showDateFilter={true}
        mobileHiddenColumns={["mno", "platform", "bonus", "last_login"]}
        tabletHiddenColumns={["bets", "is_payout_locked"]}
      />
    </div>
  );
}
