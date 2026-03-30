"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Wallet, Shield, ArrowDownToLine } from "lucide-react";

import { usePlayer, usePlayerTransactions, usePlayerDeposits, usePlayerWithdrawals } from "@/hooks/use-players";
import { usePermissions } from "@/hooks/use-permissions";
import { DataTable } from "@/components/shared/data-table";
import { transactionsColumns } from "@/components/players/transactions-columns";
import { depositsColumns } from "@/components/cashflow/deposits-columns";
import { withdrawalsColumns } from "@/components/cashflow/withdrawals-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate, formatPhone } from "@/lib/utils/table-utils";
import SMSDialog from "@/components/sms/sms-dialog";
import CreditPlayerDialog from "@/components/players/credit-player-dialog";
import DebitPlayerDialog from "@/components/players/debit-player-dialog";
import WithdrawalLimitDialog from "@/components/players/withdrawal-limit-dialog";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PlayerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { player, isLoading: playerLoading, error: playerError, refetch: refetchPlayer } = usePlayer(id);
  const { hasPermission, PERMISSIONS } = usePermissions();

  const [activeTab, setActiveTab] = useState("transactions");

  // Transactions state
  const [txSearch, setTxSearch] = useState("");
  const [txPage, setTxPage] = useState(1);
  const [txPageSize, setTxPageSize] = useState(10);
  const [txDateRange, setTxDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Deposits state
  const [depSearch, setDepSearch] = useState("");
  const [depPage, setDepPage] = useState(1);
  const [depPageSize, setDepPageSize] = useState(10);
  const [depDateRange, setDepDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Withdrawals state
  const [wdSearch, setWdSearch] = useState("");
  const [wdPage, setWdPage] = useState(1);
  const [wdPageSize, setWdPageSize] = useState(10);
  const [wdDateRange, setWdDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Convert dates to ISO datetime strings for API
  const txDateAfter = txDateRange.from ? `${txDateRange.from.toISOString().split('T')[0]}T00:00:00Z` : undefined;
  const txDateBefore = txDateRange.to ? `${txDateRange.to.toISOString().split('T')[0]}T23:59:59Z` : undefined;
  const depDateAfter = depDateRange.from ? `${depDateRange.from.toISOString().split('T')[0]}T00:00:00Z` : undefined;
  const depDateBefore = depDateRange.to ? `${depDateRange.to.toISOString().split('T')[0]}T23:59:59Z` : undefined;
  const wdDateAfter = wdDateRange.from ? `${wdDateRange.from.toISOString().split('T')[0]}T00:00:00Z` : undefined;
  const wdDateBefore = wdDateRange.to ? `${wdDateRange.to.toISOString().split('T')[0]}T23:59:59Z` : undefined;

  const { transactions, totalRows: txTotalRows, isLoading: transactionsLoading } = usePlayerTransactions({
    wallet_id: player?.wallet_id ? String(player.wallet_id) : undefined,
    search: txSearch || undefined,
    page: txPage,
    page_size: txPageSize,
    sortBy: "id",
    sortDesc: true,
    date_after: txDateAfter,
    date_before: txDateBefore,
  });

  const { deposits, totalRows: depTotalRows, isLoading: depositsLoading } = usePlayerDeposits(
    activeTab === "deposits" ? id : null,
    {
      search: depSearch || undefined,
      page: depPage,
      page_size: depPageSize,
      sortBy: "id",
      sortDesc: true,
      date_after: depDateAfter,
      date_before: depDateBefore,
    }
  );

  const { withdrawals, totalRows: wdTotalRows, isLoading: withdrawalsLoading } = usePlayerWithdrawals(
    activeTab === "withdrawals" ? id : null,
    {
      search: wdSearch || undefined,
      page: wdPage,
      page_size: wdPageSize,
      sortBy: "id",
      sortDesc: true,
      date_after: wdDateAfter,
      date_before: wdDateBefore,
    }
  );

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
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {playerLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                player?.name || player?.msisdn || "Player Details"
              )}
            </h1>
            <p className="text-muted-foreground">Player account details</p>
          </div>
          {player?.msisdn && (
            <div className="flex gap-2">
              <SMSDialog msisdn={player.msisdn}/>
              {hasPermission(PERMISSIONS.BATCHES_PROCESS) && (
                <CreditPlayerDialog
                  playerId={id}
                  msisdn={player.msisdn}
                  playerName={player.name}
                />
              )}
              {hasPermission(PERMISSIONS.PLAYERS_WRITE) && (
                <DebitPlayerDialog
                  playerId={id}
                  msisdn={player.msisdn}
                  playerName={player.name}
                />
              )}
            </div>
          )}
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

        {/* Daily Withdrawal Limit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Withdrawal Limit</CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {playerLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-lg font-bold">
                    {player?.daily_withdrawal_limit
                      ? formatCurrency(player.daily_withdrawal_limit)
                      : "KES 30,000"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {player?.daily_withdrawal_limit ? "Custom limit" : "Global default"}
                  </p>
                </div>
                {hasPermission(PERMISSIONS.PLAYERS_WRITE) && (
                  <WithdrawalLimitDialog
                    playerId={id}
                    playerName={player?.name}
                    currentLimit={player?.daily_withdrawal_limit ?? null}
                    onSuccess={() => refetchPlayer()}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
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
            showDateFilter={true}
            mobileHiddenColumns={["initial_balance", "final_balance", "details"]}
            tabletHiddenColumns={["details"]}
            serverSide={true}
            totalRows={txTotalRows}
            page={txPage}
            pageSize={txPageSize}
            onSearchChange={(value) => {
              setTxSearch(value);
              setTxPage(1);
            }}
            onPageChange={setTxPage}
            onPageSizeChange={(value) => {
              setTxPageSize(value);
              setTxPage(1);
            }}
            dateRange={txDateRange}
            onDateRangeChange={(range) => {
              setTxDateRange(range);
              setTxPage(1);
            }}
          />
        </TabsContent>

        <TabsContent value="deposits" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Deposits</h2>
            <p className="text-sm text-muted-foreground">
              Deposit history for this player
            </p>
          </div>
          <DataTable
            columns={depositsColumns}
            data={deposits}
            isLoading={depositsLoading || playerLoading}
            searchPlaceholder="Search deposits..."
            showDateFilter={true}
            mobileHiddenColumns={["transaction_ref", "short_code", "method"]}
            tabletHiddenColumns={["short_code"]}
            serverSide={true}
            totalRows={depTotalRows}
            page={depPage}
            pageSize={depPageSize}
            onSearchChange={(value) => {
              setDepSearch(value);
              setDepPage(1);
            }}
            onPageChange={setDepPage}
            onPageSizeChange={(value) => {
              setDepPageSize(value);
              setDepPage(1);
            }}
            dateRange={depDateRange}
            onDateRangeChange={(range) => {
              setDepDateRange(range);
              setDepPage(1);
            }}
          />
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Withdrawals</h2>
            <p className="text-sm text-muted-foreground">
              Withdrawal history for this player
            </p>
          </div>
          <DataTable
            columns={withdrawalsColumns}
            data={withdrawals}
            isLoading={withdrawalsLoading || playerLoading}
            searchPlaceholder="Search withdrawals..."
            showDateFilter={true}
            mobileHiddenColumns={["mpesa_transaction_id", "details", "method"]}
            tabletHiddenColumns={["details"]}
            serverSide={true}
            totalRows={wdTotalRows}
            page={wdPage}
            pageSize={wdPageSize}
            onSearchChange={(value) => {
              setWdSearch(value);
              setWdPage(1);
            }}
            onPageChange={setWdPage}
            onPageSizeChange={(value) => {
              setWdPageSize(value);
              setWdPage(1);
            }}
            dateRange={wdDateRange}
            onDateRangeChange={(range) => {
              setWdDateRange(range);
              setWdPage(1);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
