"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { AffiliateListItem } from "@/types/affiliate";
import { patchAffiliate, AffiliateEditFields } from "@/hooks/use-affiliate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    affiliate: AffiliateListItem;
    onDone?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideTrigger?: boolean;
}

export function EditAffiliateDialog({ affiliate, onDone, open: openProp, onOpenChange, hideTrigger }: Props) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = openProp ?? internalOpen;
    const setOpen = onOpenChange ?? setInternalOpen;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [status, setStatus] = useState<AffiliateListItem["status"]>(affiliate.status);
    const [commissionRate, setCommissionRate] = useState(affiliate.commission_rate);
    const [commissionModel, setCommissionModel] = useState<AffiliateListItem["commission_model"]>(affiliate.commission_model);
    const [minPayout, setMinPayout] = useState(affiliate.min_payout_amount);
    const [maxPayout, setMaxPayout] = useState(affiliate.max_payout_amount ?? "");
    const [holdDays, setHoldDays] = useState(affiliate.hold_days?.toString() ?? "");

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const data: AffiliateEditFields = {
                status,
                commission_rate: parseFloat(commissionRate),
                commission_model: commissionModel,
                min_payout_amount: parseFloat(minPayout),
                max_payout_amount: maxPayout !== "" ? parseFloat(maxPayout) : null,
                hold_days: holdDays !== "" ? parseInt(holdDays, 10) : null,
            };
            await patchAffiliate(affiliate.id, data);
            setOpen(false);
            onDone?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!hideTrigger && (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="size-4" />
                        Edit
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Affiliate</DialogTitle>
                    <DialogDescription>
                        Update settings for {affiliate.affiliate_code}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={(v) => setStatus(v as AffiliateListItem["status"])}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Commission Model</Label>
                        <Select value={commissionModel} onValueChange={(v) => setCommissionModel(v as AffiliateListItem["commission_model"])}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ggr_share">GGR Share</SelectItem>
                                <SelectItem value="revenue_share">Revenue Share</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Commission Rate (%)</Label>
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                step={0.01}
                                value={commissionRate}
                                onChange={(e) => setCommissionRate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Hold Days <span className="text-muted-foreground text-xs">(blank = global)</span></Label>
                            <Input
                                type="number"
                                min={0}
                                placeholder="e.g. 7"
                                value={holdDays}
                                onChange={(e) => setHoldDays(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Min Payout (KES)</Label>
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                value={minPayout}
                                onChange={(e) => setMinPayout(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Max Payout (KES) <span className="text-muted-foreground text-xs">(blank = no cap)</span></Label>
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                placeholder="No cap"
                                value={maxPayout}
                                onChange={(e) => setMaxPayout(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving…" : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
