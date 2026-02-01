"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Wallet, Shield } from "lucide-react";

import { usePlayer, usePlayerTransactions } from "@/hooks/use-players";
import { DataTable } from "@/components/shared/data-table";
import { transactionsColumns } from "@/components/players/transactions-columns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate, formatPhone } from "@/lib/utils/table-utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PlayerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { player, isLoading: playerLoading, error: playerError } = usePlayer(id);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { transactions, totalRows, isLoading: transactionsLoading } = usePlayerTransactions({
    wallet_id: player?.wallet_id ? String(player.wallet_id) : undefined,
    search: search || undefined,
    page,
    page_size: pageSize,
    sortBy: "id",
    sortDesc: true,
  });

  if (playerError) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to load player
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {playerError instanceof Error
              ? playerError.message
              : "An error occurred"}
          </p>
          <Link href="/players" className="mt-4 text-sm text-primary underline">
            Back to players
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/players">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to players</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {playerLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                player?.name || player?.msisdn || "Player Details"
              )}
            </h1>
            <p className="text-muted-foreground">Player account details</p>
          </div>
        </div>
        {player && (
          <div className="flex gap-2">
            <Badge variant={player.is_active ? "default" : "destructive"}>
              {player.is_active ? "Active" : "Suspended"}
            </Badge>
            <Badge variant={player.is_verified ? "default" : "secondary"}>
              {player.is_verified ? "Verified" : "Unverified"}
            </Badge>
          </div>
        )}
      </div>

      {/* Player Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Contact Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {playerLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <>
                <div className="text-lg font-bold">
                  {formatPhone(player?.msisdn)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {player?.mno} - {player?.platform}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {playerLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <>
                <div className="text-lg font-bold">
                  {formatCurrency(player?.balance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Bonus: {formatCurrency(player?.bonus)}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Wallets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallets</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {playerLoading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <div className="space-y-1">
                {player?.wallets?.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="capitalize text-muted-foreground">
                      {wallet.label}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(wallet.balance)}
                    </span>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No wallets</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Dates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {playerLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Joined: </span>
                  {formatDate(player?.created_at)}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Last login: </span>
                  {formatDate(player?.last_login)}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Transaction history for this player
          </p>
        </div>

        <DataTable
          columns={transactionsColumns}
          data={transactions}
          isLoading={transactionsLoading || playerLoading}
          searchPlaceholder="Search transactions..."
          showDateFilter={false}
          mobileHiddenColumns={["initial_balance", "final_balance", "details"]}
          tabletHiddenColumns={["details"]}
          serverSide={true}
          totalRows={totalRows}
          page={page}
          pageSize={pageSize}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
