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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Banknote } from "lucide-react"

interface CreditPlayerDialogProps {
    playerId: string
    msisdn: string
    playerName?: string
}

export default function CreditPlayerDialog({ playerId, msisdn, playerName }: CreditPlayerDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [sendSms, setSendSms] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const handleCredit = async () => {
        const parsedAmount = Number(amount)
        if (!parsedAmount || parsedAmount <= 0) {
            toast.error("Please enter a valid amount")
            return
        }
        if (!subject.trim()) {
            toast.error("Please enter a subject/reason")
            return
        }

        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch(`/api/players/${playerId}/credit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    msisdn,
                    amount: parsedAmount,
                    subject: subject.trim(),
                    description: description.trim() || subject.trim(),
                    playerName: playerName || "",
                    sendSms,
                }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success(data.message)
                resetForm()
                setOpen(false)
            } else {
                throw new Error(data.error || "Failed to credit player")
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
                    <Banknote className="h-4 w-4 mr-2" />
                    Credit Player
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Credit Player</DialogTitle>
                    <DialogDescription>
                        Send funds directly to {playerName || msisdn}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="credit-amount">Amount (KES)</Label>
                        <Input
                            id="credit-amount"
                            type="number"
                            min="1"
                            placeholder="e.g. 500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="credit-subject">Subject / Reason</Label>
                        <Input
                            id="credit-subject"
                            placeholder="e.g. Refund, Promotion reward"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="credit-description">Description (optional)</Label>
                        <Input
                            id="credit-description"
                            placeholder="Additional details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="send-sms" className="text-sm">
                            Send SMS notification
                        </Label>
                        <Switch
                            id="send-sms"
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
                        disabled={isLoading || !amount || !subject.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Banknote className="h-4 w-4 mr-2" />
                                Credit KES {amount || "0"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}