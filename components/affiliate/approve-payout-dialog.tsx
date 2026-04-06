"use client";

import { useState } from "react";
import { AffiliatePayoutRequest } from "@/types/affiliate";
import { actionPayoutRequest } from "@/hooks/use-affiliate";
import { formatCurrency } from "@/lib/utils/table-utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
    request: AffiliatePayoutRequest;
    onDone?: () => void;
}

export function ApprovePayoutDialog({ request, onDone }: Props) {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState<"approve" | "reject" | null>(null);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!action) return;
        setLoading(true);
        setError("");
        try {
            await actionPayoutRequest(request.id, action, notes);
            setOpen(false);
            setNotes("");
            setAction(null);
            onDone?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Review Payout Request</DialogTitle>
                    <DialogDescription>
                        Request #{request.id} — {formatCurrency(request.amount)}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="flex gap-3">
                        <Button
                            variant={action === "approve" ? "default" : "outline"}
                            className="flex-1 gap-2"
                            onClick={() => setAction("approve")}
                        >
                            <CheckCircle className="size-4" />
                            Approve
                        </Button>
                        <Button
                            variant={action === "reject" ? "destructive" : "outline"}
                            className="flex-1 gap-2"
                            onClick={() => setAction("reject")}
                        >
                            <XCircle className="size-4" />
                            Reject
                        </Button>
                    </div>

                    <Textarea
                        placeholder="Optional notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                    />

                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!action || loading}>
                        {loading ? "Processing…" : action === "approve" ? "Approve" : action === "reject" ? "Reject" : "Select action"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
