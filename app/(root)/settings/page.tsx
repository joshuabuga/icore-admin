"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useTaxConfig, useTaxConfigMutations } from "@/hooks/use-tax-config";
import { usePermissions } from "@/hooks/use-permissions";
import { PERMISSIONS } from "@/lib/permissions";
import { TaxConfigPayload } from "@/types/tax-config";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface WhtSectionProps {
    title: string;
    description: string;
    enabled: boolean;
    rate: string;
    minAmount: string;
    maxAmount: string;
    disabled: boolean;
    onEnabledChange: (v: boolean) => void;
    onRateChange: (v: string) => void;
    onMinAmountChange: (v: string) => void;
    onMaxAmountChange: (v: string) => void;
}

function WhtSection({
    title,
    description,
    enabled,
    rate,
    minAmount,
    maxAmount,
    disabled,
    onEnabledChange,
    onRateChange,
    onMinAmountChange,
    onMaxAmountChange,
}: WhtSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <Switch
                    checked={enabled}
                    onCheckedChange={onEnabledChange}
                    disabled={disabled}
                />
            </div>

            <div className={`grid gap-4 sm:grid-cols-3 transition-opacity ${!enabled ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="space-y-1.5">
                    <Label className="text-xs">Rate (%)</Label>
                    <div className="relative">
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="5"
                            value={rate ? (parseFloat(rate) * 100).toFixed(2) : ""}
                            onChange={(e) => onRateChange(e.target.value ? (parseFloat(e.target.value) / 100).toFixed(4) : "")}
                            disabled={disabled}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs">Min amount (KES)</Label>
                    <Input
                        type="number"
                        step="1"
                        min="0"
                        placeholder="0"
                        value={minAmount}
                        onChange={(e) => onMinAmountChange(e.target.value)}
                        disabled={disabled}
                    />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs">Max amount (KES, blank = no cap)</Label>
                    <Input
                        type="number"
                        step="1"
                        min="0"
                        placeholder="No cap"
                        value={maxAmount}
                        onChange={(e) => onMaxAmountChange(e.target.value)}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    const { config, isLoading, refetch } = useTaxConfig();
    const { updateTaxConfig } = useTaxConfigMutations();
    const { hasPermission } = usePermissions();

    const canWrite = hasPermission(PERMISSIONS.TAX_CONFIG_WRITE);

    const [depositEnabled, setDepositEnabled] = useState(true);
    const [depositRate, setDepositRate] = useState("0.0500");
    const [depositMin, setDepositMin] = useState("0");
    const [depositMax, setDepositMax] = useState("499");

    const [withdrawalEnabled, setWithdrawalEnabled] = useState(true);
    const [withdrawalRate, setWithdrawalRate] = useState("0.0500");
    const [withdrawalMin, setWithdrawalMin] = useState("0");
    const [withdrawalMax, setWithdrawalMax] = useState("");

    const [notes, setNotes] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!config) return;
        setDepositEnabled(config.deposit_wht_enabled);
        setDepositRate(config.deposit_wht_rate);
        setDepositMin(config.deposit_wht_min_amount);
        setDepositMax(config.deposit_wht_max_amount ?? "");
        setWithdrawalEnabled(config.withdrawal_wht_enabled);
        setWithdrawalRate(config.withdrawal_wht_rate);
        setWithdrawalMin(config.withdrawal_wht_min_amount);
        setWithdrawalMax(config.withdrawal_wht_max_amount ?? "");
        setNotes(config.notes ?? "");
    }, [config]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload: TaxConfigPayload = {
                deposit_wht_enabled: depositEnabled,
                deposit_wht_rate: depositRate,
                deposit_wht_min_amount: depositMin,
                deposit_wht_max_amount: depositMax || null,
                withdrawal_wht_enabled: withdrawalEnabled,
                withdrawal_wht_rate: withdrawalRate,
                withdrawal_wht_min_amount: withdrawalMin,
                withdrawal_wht_max_amount: withdrawalMax || null,
                notes: notes || null,
            };
            await updateTaxConfig(payload);
            toast.success("Tax config saved");
            refetch();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Platform configuration</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Withholding Tax (WHT)
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    </CardTitle>
                    <CardDescription>
                        Control WHT applied to player deposits and withdrawals. Use this to run
                        tax-free campaigns — toggle WHT off before the campaign starts and back on
                        when it ends. KRA betting taxes are not affected.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <WhtSection
                        title="Deposit WHT"
                        description="Applied when a player deposits funds"
                        enabled={depositEnabled}
                        rate={depositRate}
                        minAmount={depositMin}
                        maxAmount={depositMax}
                        disabled={!canWrite || isLoading}
                        onEnabledChange={setDepositEnabled}
                        onRateChange={setDepositRate}
                        onMinAmountChange={setDepositMin}
                        onMaxAmountChange={setDepositMax}
                    />

                    <Separator />

                    <WhtSection
                        title="Withdrawal WHT"
                        description="Deducted from the amount sent to the player on withdrawal"
                        enabled={withdrawalEnabled}
                        rate={withdrawalRate}
                        minAmount={withdrawalMin}
                        maxAmount={withdrawalMax}
                        disabled={!canWrite || isLoading}
                        onEnabledChange={setWithdrawalEnabled}
                        onRateChange={setWithdrawalRate}
                        onMinAmountChange={setWithdrawalMin}
                        onMaxAmountChange={setWithdrawalMax}
                    />

                    <Separator />

                    <div className="space-y-1.5">
                        <Label className="text-xs">Notes (optional)</Label>
                        <Textarea
                            placeholder="e.g. Tax free weekend 9–11 May 2026"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={!canWrite || isLoading}
                            rows={2}
                        />
                    </div>

                    {config?.updated_by && (
                        <p className="text-xs text-muted-foreground">
                            Last updated by {config.updated_by} on {config.updated_at}
                        </p>
                    )}

                    {canWrite && (
                        <Button onClick={handleSave} disabled={isSaving || isLoading}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Save changes
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
