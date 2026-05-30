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
import { MinusCircle } from "lucide-react"

interface BonusDebitPlayerDialogProps {
    playerId: string
    msisdn: string
    playerName?: string
}

export default function BonusDebitPlayerDialog({ playerId, msisdn, playerName }: BonusDebitPlayerDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [bonusBalance, setBonusBalance] = useState<string | null>(null)

    const handleDebit = async () => {
        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount) || parsedAmount < 0.01) {
            toast.error("Amount must be at least 0.01")
            return
        }
        if (parsedAmount > 99999.99) {
            toast.error("Amount cannot exceed 99,999.99")
            return
        }
        if (!subject.trim()) {
            toast.error("Please enter a subject/reason")
            return
        }
        if (!description.trim()) {
            toast.error("Please enter a description")
            return
        }

        try {
            setIsLoading(true)
            setError(null)
            setBonusBalance(null)

            const response = await fetch(`/api/players/${playerId}/bonus-debit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    msisdn,
                    amount: parsedAmount.toFixed(2),
                    subject: subject.trim(),
                    description: description.trim(),
                }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success(`Bonus wallet debited. New balance: KES ${data.bonus_balance}`)
                resetForm()
                setOpen(false)
            } else {
                if (data.bonus_balance) setBonusBalance(data.bonus_balance)
                throw new Error(data.error || "Failed to debit bonus wallet")
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setAmount("")
        setSubject("")
        setDescription("")
        setError(null)
        setBonusBalance(null)
    }

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        if (!value) resetForm()
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                    <MinusCircle className="h-4 w-4 mr-2" />
                    Bonus Debit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Debit Bonus Wallet</DialogTitle>
                    <DialogDescription>
                        Remove bonus funds from {playerName || msisdn}&apos;s bonus wallet
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bonus-debit-amount">Amount (KES)</Label>
                        <Input
                            id="bonus-debit-amount"
                            type="number"
                            min="0.01"
                            max="99999.99"
                            step="0.01"
                            placeholder="e.g. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bonus-debit-subject">Subject / Reason</Label>
                        <Input
                            id="bonus-debit-subject"
                            placeholder="e.g. Expired bonus, Adjustment"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            maxLength={128}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bonus-debit-description">Description</Label>
                        <Input
                            id="bonus-debit-description"
                            placeholder="Additional details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={150}
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md space-y-1">
                            <p>{error}</p>
                            {bonusBalance && (
                                <p className="text-xs">Current bonus balance: KES {bonusBalance}</p>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isLoading}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDebit}
                        disabled={isLoading || !amount || !subject.trim() || !description.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <MinusCircle className="h-4 w-4 mr-2" />
                                Debit KES {amount || "0"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
