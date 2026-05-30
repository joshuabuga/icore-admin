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
import { Gift } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface BonusCreditPlayerDialogProps {
    playerId: string
    msisdn: string
    playerName?: string
}

export default function BonusCreditPlayerDialog({ playerId, msisdn, playerName }: BonusCreditPlayerDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [sendSms, setSendSms] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const handleCredit = async () => {
        const parsedAmount = Number(amount)
        if (!parsedAmount || parsedAmount < 1) {
            toast.error("Amount must be at least 1")
            return
        }
        if (parsedAmount > 50000) {
            toast.error("Amount cannot exceed 50,000")
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

            const response = await fetch(`/api/players/${playerId}/bonus-credit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    msisdn,
                    amount: parsedAmount,
                    subject: subject.trim(),
                    description: description.trim(),
                    playerName: playerName || "",
                    sendSms,
                }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success(`Bonus wallet credited. New balance: KES ${data.bonus_balance}`)
                resetForm()
                setOpen(false)
            } else {
                throw new Error(data.error || "Failed to credit bonus wallet")
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
        setSendSms(true)
        setError(null)
    }

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        if (!value) resetForm()
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Gift className="h-4 w-4 mr-2" />
                    Bonus Credit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Credit Bonus Wallet</DialogTitle>
                    <DialogDescription>
                        Add bonus funds to {playerName || msisdn}&apos;s bonus wallet
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bonus-credit-amount">Amount (KES)</Label>
                        <Input
                            id="bonus-credit-amount"
                            type="number"
                            min="1"
                            max="50000"
                            placeholder="e.g. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bonus-credit-subject">Subject / Reason</Label>
                        <Input
                            id="bonus-credit-subject"
                            placeholder="e.g. Welcome bonus, Promo reward"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            maxLength={128}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bonus-credit-description">Description</Label>
                        <Input
                            id="bonus-credit-description"
                            placeholder="Additional details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={150}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="bonus-send-sms" className="text-sm">
                            Send SMS notification
                        </Label>
                        <Switch
                            id="bonus-send-sms"
                            checked={sendSms}
                            onCheckedChange={setSendSms}
                            disabled={isLoading}
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
                        <Button variant="outline" disabled={isLoading}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleCredit}
                        disabled={isLoading || !amount || !subject.trim() || !description.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Gift className="h-4 w-4 mr-2" />
                                Credit KES {amount || "0"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
