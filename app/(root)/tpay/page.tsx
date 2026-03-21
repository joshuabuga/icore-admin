"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ArrowRightLeft, Loader2, Wallet } from "lucide-react";

import {
    useShortcodes,
    useShortcodeMutations,
    useProviderConfig,
    useProviderConfigMutations,
    useAccountBalance,
    useMoveFundsMutation,
} from "@/hooks/use-shortcodes";
import { ShortCode, Provider, UpdateCredentialsPayload, PROVIDER_LABELS } from "@/types/tpay";
import { DataTable } from "@/components/shared/data-table";
import {
    createShortCodeColumns,
    ShortCodeActionHandlers,
} from "@/components/tpay/columns";
import { UpdateCredentialsDialog } from "@/components/tpay/update-credentials-dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ProviderSelect({
    label,
    description,
    value,
    onValueChange,
    disabled,
}: {
    label: string;
    description: string;
    value: Provider | undefined;
    onValueChange: (value: Provider) => void;
    disabled?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Select value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                    {(["mpesa", "sasapay"] as Provider[]).map((p) => (
                        <SelectItem key={p} value={p}>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={p === "mpesa" ? "/mpesa.png" : "/sasapay.png"}
                                    alt={PROVIDER_LABELS[p]}
                                    width={16}
                                    height={16}
                                    className="rounded"
                                />
                                {PROVIDER_LABELS[p]}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default function TPayPage() {
    const { shortcodes, isLoading, error, refetch } = useShortcodes();
    const { updateCredentials } = useShortcodeMutations();
    const { config, isLoading: configLoading, refetch: refetchConfig } = useProviderConfig();
    const { updateProviderConfig } = useProviderConfigMutations();
    const { balance, isLoading: balanceLoading, refetch: refetchBalance } = useAccountBalance();
    const { moveFunds } = useMoveFundsMutation();

    const [credentialsDialogOpen, setCredentialsDialogOpen] = useState(false);
    const [selectedShortcode, setSelectedShortcode] = useState<ShortCode | null>(null);
    const [isMutating, setIsMutating] = useState(false);
    const [isConfigMutating, setIsConfigMutating] = useState(false);
    const [moveFundsAmount, setMoveFundsAmount] = useState("");
    const [isMovingFunds, setIsMovingFunds] = useState(false);
    const [moveFundsDialogOpen, setMoveFundsDialogOpen] = useState(false);

    const handleProviderChange = useCallback(
        async (field: "c2b_provider" | "b2c_provider", value: Provider) => {
            setIsConfigMutating(true);
            try {
                await updateProviderConfig({ [field]: value });
                const label = field === "c2b_provider" ? "Deposits" : "Withdrawals";
                toast.success(`${label} provider switched to ${PROVIDER_LABELS[value]}`);
                refetchConfig();
                refetch();
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to update provider");
            } finally {
                setIsConfigMutating(false);
            }
        },
        [updateProviderConfig, refetchConfig, refetch]
    );

    const handleUpdateCredentials = useCallback(
        async (id: number, payload: UpdateCredentialsPayload) => {
            setIsMutating(true);
            try {
                await updateCredentials(id, payload);
                toast.success("Credentials updated successfully");
                setCredentialsDialogOpen(false);
                setSelectedShortcode(null);
                refetch();
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to update credentials");
            } finally {
                setIsMutating(false);
            }
        },
        [updateCredentials, refetch]
    );

    const handleMoveFunds = useCallback(async () => {
        if (!moveFundsAmount) return;
        setIsMovingFunds(true);
        try {
            await moveFunds(moveFundsAmount);
            toast.success("Funds moved successfully");
            setMoveFundsAmount("");
            setMoveFundsDialogOpen(false);
            refetchBalance();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to move funds");
        } finally {
            setIsMovingFunds(false);
        }
    }, [moveFunds, moveFundsAmount, refetchBalance]);

    const actionHandlers: ShortCodeActionHandlers = useMemo(
        () => ({
            onUpdateCredentials: (sc: ShortCode) => {
                setSelectedShortcode(sc);
                setCredentialsDialogOpen(true);
            },
        }),
        []
    );

    const columns = useMemo(
        () => createShortCodeColumns(actionHandlers),
        [actionHandlers]
    );

    if (error) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-destructive">
                        Failed to load shortcodes
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
                <h1 className="text-2xl font-bold tracking-tight">TPay Shortcodes</h1>
                <p className="text-muted-foreground">
                    Manage payment shortcodes, providers, and credentials
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Active Providers
                        {(configLoading || isConfigMutating) && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                    </CardTitle>
                    <CardDescription>
                        Set the active payment provider for deposits (C2B) and withdrawals (B2C)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProviderSelect
                        label="Deposits (C2B)"
                        description="Provider for customer-to-business payments"
                        value={config?.c2b_provider}
                        onValueChange={(v) => handleProviderChange("c2b_provider", v)}
                        disabled={configLoading || isConfigMutating}
                    />
                    <ProviderSelect
                        label="Withdrawals (B2C)"
                        description="Provider for business-to-customer payments"
                        value={config?.b2c_provider}
                        onValueChange={(v) => handleProviderChange("b2c_provider", v)}
                        disabled={configLoading || isConfigMutating}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                Account Balance
                                {balanceLoading && (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                )}
                            </CardTitle>
                            <CardDescription>
                                B2C account balances
                                {balance?.currency_code && ` (${balance.currency_code})`}
                            </CardDescription>
                        </div>
                        <AlertDialog open={moveFundsDialogOpen} onOpenChange={setMoveFundsDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                                    Move Funds
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Move B2C Funds</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Transfer funds to the B2C bulk payment account for processing withdrawals.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="py-4">
                                    <Label htmlFor="move-amount">Amount ({balance?.currency_code || "KES"})</Label>
                                    <Input
                                        id="move-amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        value={moveFundsAmount}
                                        onChange={(e) => setMoveFundsAmount(e.target.value)}
                                        className="mt-2"
                                    />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isMovingFunds}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMoveFunds();
                                        }}
                                        disabled={!moveFundsAmount || isMovingFunds}
                                    >
                                        {isMovingFunds && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Move Funds
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {balance ? (
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <p className="text-sm text-muted-foreground">Total Balance</p>
                                <p className="text-2xl font-bold">
                                    {balance.currency_code ?? "KES"}{" "}
                                    {(balance.org_account_balance ?? 0).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                            {balance.accounts && balance.accounts.length > 0 && (
                            <div className="grid gap-3 sm:grid-cols-3">
                                {balance.accounts.map((account) => (
                                    <div key={account.account_label} className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">{account.account_label}</p>
                                        <p className="text-lg font-semibold">
                                            {(account.account_balance ?? 0).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            )}
                        </div>
                    ) : !balanceLoading ? (
                        <p className="text-sm text-muted-foreground">
                            No balance data available. This may mean no active B2C shortcode is configured.
                        </p>
                    ) : null}
                </CardContent>
            </Card>

            {/*<DataTable*/}
            {/*    columns={columns}*/}
            {/*    data={shortcodes}*/}
            {/*    isLoading={isLoading}*/}
            {/*    searchPlaceholder="Search shortcodes…"*/}
            {/*    showDateFilter={false}*/}
            {/*    mobileHiddenColumns={["type", "credentials", "is_active"]}*/}
            {/*    tabletHiddenColumns={["credentials"]}*/}
            {/*/>*/}

            {/*<UpdateCredentialsDialog*/}
            {/*    open={credentialsDialogOpen}*/}
            {/*    onOpenChange={(open) => {*/}
            {/*        setCredentialsDialogOpen(open);*/}
            {/*        if (!open) setSelectedShortcode(null);*/}
            {/*    }}*/}
            {/*    shortcode={selectedShortcode}*/}
            {/*    onSave={handleUpdateCredentials}*/}
            {/*    isLoading={isMutating}*/}
            {/*/>*/}
        </div>
    );
}
