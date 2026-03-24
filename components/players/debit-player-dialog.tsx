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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ArrowDownCircle } from "lucide-react"

interface DebitPlayerDialogProps {
    playerId: string
    msisdn: string
    playerName?: string
}

export default function DebitPlayerDialog({ playerId, msisdn, playerName }: DebitPlayerDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleDebit = async () => {
        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount) || parsedAmount < 0.01 || parsedAmount > 99999.99) {
            toast.error("Amount must be between 0.01 and 99,999.99")
            return
        }
        if (!subject.trim()) {
            toast.error("Please enter a subject/reason")
            return
        }
        if (subject.trim().length > 128) {
            toast.error("Subject must be 128 characters or less")
            return
        }
        if (!description.trim()) {
            toast.error("Please enter a description")
            return
        }
        if (description.trim().length > 150) {
            toast.error("Description must be 150 characters or less")
            return
        }

        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch(`/api/players/${playerId}/debit`, {
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
                toast.success(data.message)
                resetForm()
                setOpen(false)
            } else {
                throw new Error(data.error || "Failed to debit player")
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
    }

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        if (!value) resetForm()
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/50 hover:bg-destructive/10">
                    <ArrowDownCircle className="h-4 w-4 mr-2" />
                    Debit Player
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Debit Player</DialogTitle>
                    <DialogDescription>
                        Debit funds from {playerName || msisdn}&apos;s wallet. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="debit-amount">Amount (KES)</Label>
                        <Input
                            id="debit-amount"
                            type="number"
                            min="0.01"
                            max="99999.99"
                            step="0.01"
                            placeholder="e.g. 500.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">Between 0.01 and 99,999.99</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="debit-subject">Subject / Reason</Label>
                        <Input
                            id="debit-subject"
                            placeholder="e.g. fraud_clawback"
                            maxLength={128}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">{subject.length}/128 characters</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="debit-description">Description</Label>
                        <Textarea
                            id="debit-description"
                            placeholder="e.g. Balance manipulation detected on 2026-03-24"
                            maxLength={150}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">{description.length}/150 characters</p>
                    </div>

                    {error && (
                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                            {error}
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
                                <ArrowDownCircle className="h-4 w-4 mr-2" />
                                Debit KES {amount || "0"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}