"use client"

import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Pencil } from "lucide-react"
import { usePlayerMutations } from "@/hooks/use-players"

interface WithdrawalLimitDialogProps {
    playerId: string
    playerName?: string
    currentLimit: string | null
    onSuccess?: () => void
}

const DEFAULT_LIMIT = 30000

export default function WithdrawalLimitDialog({
    playerId,
    playerName,
    currentLimit,
    onSuccess,
}: WithdrawalLimitDialogProps) {
    const [open, setOpen] = useState(false)
    const { updatePlayer, isUpdating } = usePlayerMutations()
    const [limitValue, setLimitValue] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleSave = async () => {
        setError(null)

        const trimmed = limitValue.trim()
        const newLimit = trimmed === "" ? null : parseFloat(trimmed)

        if (newLimit !== null) {
            if (isNaN(newLimit) || newLimit < 0) {
                setError("Limit must be a number >= 0")
                return
            }
        }

        try {
            await updatePlayer({
                id: playerId,
                data: { daily_withdrawal_limit: newLimit === null ? null : newLimit.toFixed(2) },
            })

            toast.success(
                newLimit === null
                    ? "Withdrawal limit reset to global default"
                    : newLimit === 0
                        ? "Withdrawals blocked for this player"
                        : `Daily withdrawal limit set to KES ${newLimit.toLocaleString()}`
            )
            setOpen(false)
            onSuccess?.()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to update withdrawal limit"
            setError(message)
            toast.error(message)
        }
    }

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        if (value) {
            setLimitValue(currentLimit ?? "")
            setError(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Pencil className="h-3 w-3" />
                    <span className="sr-only">Edit withdrawal limit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Daily Withdrawal Limit</DialogTitle>
                    <DialogDescription>
                        Set a custom daily withdrawal limit for {playerName || "this player"}.
                        Leave empty to use the global default (KES {DEFAULT_LIMIT.toLocaleString()}).
                        Setting to 0 blocks all withdrawals.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="withdrawal-limit">Limit (KES)</Label>
                        <Input
                            id="withdrawal-limit"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder={`${DEFAULT_LIMIT.toLocaleString()} (global default)`}
                            value={limitValue}
                            onChange={(e) => setLimitValue(e.target.value)}
                            disabled={isUpdating}
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                            {error}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isUpdating}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSave} disabled={isUpdating}>
                        {isUpdating ? (
                            <>
                                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
