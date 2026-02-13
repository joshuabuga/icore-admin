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
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface SMSDialogProps {
    msisdn: string | undefined;
    trigger?: React.ReactNode;
}

export default function SMSDialog({ msisdn, trigger }: SMSDialogProps) {
    const [message, setMessage] = useState<string>("")
    const [showDialog, setShowDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Don't render anything if no msisdn provided
    if (!msisdn) {
        return null;
    }

    const handleSend = async () => {
        if (!message.trim()) {
            toast.error('Please enter a message');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('/api/send-sms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: msisdn, message: message.trim() }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('SMS sent successfully');
                setMessage('');
                setShowDialog(false);
            } else {
                throw new Error(data.message || 'Failed to send SMS');
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            toast.error(`Failed to send SMS: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setShowDialog(open);
        if (!open) {
            // Only reset state when closing
            setMessage('');
            setError(null);
        }
    };

    const handleClose = () => {
        setShowDialog(false);
        setMessage('');
        setError(null);
    };

    return (
        <Dialog open={showDialog} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send SMS
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Send SMS</DialogTitle>
                    <DialogDescription>
                        Send a message to {msisdn}
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
                        <Button
                            variant="outline"
                            disabled={isLoading}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSend}
                        disabled={isLoading || !message.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent animate-spin rounded-full" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send SMS
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}