'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";

interface WhatsAppDialogProps {
    msisdn: string | undefined;
    trigger?: React.ReactNode;
}

export default function WhatsAppDialog({ msisdn, trigger }: WhatsAppDialogProps) {
    const [message, setMessage] = useState<string>("");
    const [showDialog, setShowDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!msisdn) return null;

    const handleSend = async () => {
        if (!message.trim()) {
            toast.error('Please enter a message');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('/api/send-whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: msisdn, message: message.trim() }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('WhatsApp message sent');
                setMessage('');
                setShowDialog(false);
            } else {
                throw new Error(data.message || 'Failed to send WhatsApp message');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setShowDialog(open);
        if (!open) {
            setMessage('');
            setError(null);
        }
    };

    return (
        <Dialog open={showDialog} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        Send WhatsApp
                    </DialogTitle>
                    <DialogDescription>
                        Send a WhatsApp message to {msisdn}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        disabled={isLoading}
                        className="min-h-25"
                    />

                    {error && (
                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                            {error}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isLoading} onClick={() => handleOpenChange(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSend}
                        disabled={isLoading || !message.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Send
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
