"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import {MoreHorizontal, Eye, Ban, Wallet, Receipt} from "lucide-react";

import { UserListItem } from "@/types/users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate, formatCurrency, formatPhone } from "@/lib/utils/table-utils";

// Action handlers type
export interface PlayerActionHandlers {
  onToggleActive: (player: UserListItem) => Promise<void>;
  onTogglePayout: (player: UserListItem) => Promise<void>;
  onToggleWageringExemption: (player: UserListItem) => Promise<void>;
  isUpdating?: boolean;
}

// Actions cell component with confirmation dialogs
function PlayerActionsCell({
  player,
  handlers,
}: {
  player: UserListItem;
  handlers: PlayerActionHandlers;
}) {
  const router = useRouter();
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [showWageringDialog, setShowWageringDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuspend = async () => {
    setIsLoading(true);
    try {
      await handlers.onToggleActive(player);
    } finally {
      setIsLoading(false);
      setShowSuspendDialog(false);
    }
  };

  const handleTogglePayout = async () => {
    setIsLoading(true);
    try {
      await handlers.onTogglePayout(player);
    } finally {
      setIsLoading(false);
      setShowPayoutDialog(false);
    }
  };

  const handleToggleWageringExemption = async () => {
    setIsLoading(true);
    try {
      await handlers.onToggleWageringExemption(player);
    } finally {
      setIsLoading(false);
      setShowWageringDialog(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/players/${player.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowSuspendDialog(true)}>
            <Ban className="mr-2 h-4 w-4" />
            {player.is_active ? "Suspend user" : "Activate user"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowPayoutDialog(true)}>
            <Wallet className="mr-2 h-4 w-4" />
            {player.is_payout_locked ? "Enable payout" : "Disable payout"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowWageringDialog(true)}>
            <Receipt className="mr-2 h-4 w-4" />
            {player.is_wagering_exempt ? "Remove exemption" : "Add exemption"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Suspend/Activate Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {player.is_active ? "Suspend User?" : "Activate User?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {player.is_active
                ? `This will suspend ${player.name || player.msisdn} and prevent them from accessing the platform.`
                : `This will reactivate ${player.name || player.msisdn}'s account.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspend}
              disabled={isLoading}
              variant={player.is_active ? "destructive" : "default"}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toggle Payout Dialog */}
      <AlertDialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {player.is_payout_locked ? "Enable Payout?" : "Disable Payout?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {player.is_payout_locked
                ? `This will allow ${player.name || player.msisdn} to withdraw funds from their account.`
                : `This will prevent ${player.name || player.msisdn} from withdrawing funds from their account.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTogglePayout}
              disabled={isLoading}
              variant={player.is_payout_locked ? "default" : "destructive"}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    {/*  Toggle Wagering Exemption Dialog */}
      <AlertDialog open={showWageringDialog} onOpenChange={setShowWageringDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {player.is_wagering_exempt ? "Remove Wagering Exemption?" : "Add Wagering Exemption?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {player.is_wagering_exempt
                ? `This will remove ${player.name || player.msisdn}'s wagering exemption.`
                : `This will add a wagering exemption for ${player.name || player.msisdn}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={handleToggleWageringExemption}
                disabled={isLoading}
                variant={player.is_wagering_exempt ? "default" : "destructive"}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// Create columns with action handlers
export function createPlayerColumns(
  handlers: PlayerActionHandlers
): ColumnDef<UserListItem>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name") || "-",
    },
    {
      accessorKey: "msisdn",
      header: "Phone",
      cell: ({ row }) => formatPhone(row.getValue("msisdn")),
    },
    {
      accessorKey: "mno",
      header: "MNO",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("mno")}</Badge>
      ),
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => formatCurrency(row.getValue("balance")),
    },
    {
      accessorKey: "bonus",
      header: "Bonus",
      cell: ({ row }) => formatCurrency(row.getValue("bonus")),
    },
    {
      accessorKey: "bets",
      header: "Bets",
      cell: ({ row }) => (
        <span className="font-mono">{row.getValue("bets")}</span>
      ),
    },
    {
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("platform")}</Badge>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("is_active");
        return (
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Suspended"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "daily_withdrawal_limit",
      header: "Daily W/D Limit",
      cell: ({ row }) => {
        const limit = row.getValue("daily_withdrawal_limit") as string | null;
        return limit ? formatCurrency(limit) : (
          <span className="text-muted-foreground">Default</span>
        );
      },
    },
    {
      accessorKey: "is_payout_locked",
      header: "Payout",
      cell: ({ row }) => {
        const isLocked = row.getValue("is_payout_locked");
        return (
          <Badge variant={isLocked ? "destructive" : "default"}>
            {isLocked ? "Locked" : "Enabled"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Joined",
      cell: ({ row }) => formatDate(row.getValue("created_at")),
    },
    {
      accessorKey: "last_login",
      header: "Last Login",
      cell: ({ row }) => formatDate(row.getValue("last_login")),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <PlayerActionsCell player={row.original} handlers={handlers} />
      ),
    },
  ];
}

// Default columns without actions (for reference)
export const playerColumnsBasic: ColumnDef<UserListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "msisdn",
    header: "Phone",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "is_active",
    header: "Status",
  },
];
