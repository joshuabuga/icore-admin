'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Payments } from '@/types/crediting';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ViewRecipientsDialogProps {
    payment: Payments;
}

export function ViewRecipientsDialog({ payment }: ViewRecipientsDialogProps) {
    const [loading, setLoading] = useState(false);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [loadingRejection, setLoadingRejection] = useState(false);
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const userName = user?.fullName || ` ${user?.firstName} ${user?.lastName}`;
    const router = useRouter();

    const rejectPayments = async (batchNo: string) => {
        if (!confirm('Are you sure you want to reject this batch payment?')) {
            return;
        }

        try {
            setLoadingRejection(true);
            setLoading(true);
            const response = await fetch('/api/reject-payment', {
                method: 'POST',
                body: JSON.stringify({
                    batch_no: batchNo,
                    user_name: userName,
                    rejection_reason: 'Not specified',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Request details:', {
                batch_no: batchNo,
                user_name: userName,
                rejection_reason: 'Not specified',
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(
                    data.message || 'Batch payment rejected successfully'
                );
                setOpen(false);
                router.refresh();
            } else {
                toast.error(data.message || 'Failed to reject payment');
            }
        } catch (error) {
            console.error('Error rejecting payment', error);
            toast.error('Failed to reject payment. Please try again.');
        } finally {
            setLoadingRejection(false);
            setLoading(false);
        }
    };

    const processPayments = async (batchNo: string) => {
        if (
            !confirm(
                'Are you sure you want to approve and process this batch payment?'
            )
        ) {
            return;
        }

        try {
            setLoadingPayment(true);
            setLoading(true);
            const response = await fetch('/api/approve-payment', {
                method: 'POST',
                body: JSON.stringify({
                    batch_no: batchNo,
                    user_name: userName,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Request details:', {
                batch_no: batchNo,
                user_name: userName,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(
                    data.message ||
                        'Batch payment approved and processing started'
                );
                setOpen(false);
                router.refresh();
            } else {
                toast.error(data.message || 'Failed to process payment');
            }
        } catch (error) {
            console.error('Error processing payment', error);
            toast.error('Failed to process payment. Please try again.');
        } finally {
            setLoadingPayment(false);
            setLoading(false);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Batch Recipients - {payment.batch_no}
                    </DialogTitle>
                    <DialogDescription>
                        Total Amount: KES{' '}
                        {payment.total_amount.toLocaleString()} | Recipients:{' '}
                        {payment.recipients.length}
                    </DialogDescription>
                </DialogHeader>
                <div className="">
                    {payment.status === 'PENDING' && (
                        <div className="flex gap-2 mb-4">
                            <Button
                                onClick={() =>
                                    processPayments(payment.batch_no)
                                }
                                disabled={loading}>
                                {loadingPayment ? 'Processing...' : 'Approve Payments'}
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => rejectPayments(payment.batch_no)}
                                disabled={loading}>
                                {loadingRejection ? 'Rejecting...' : 'Reject Payments'}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {/* Status Summary for processed payments */}
                    {payment.status !== 'PENDING' && payment.status !== 'APPROVED' && (
                        <div className="flex flex-wrap gap-3 mb-4 p-3 bg-muted/30 rounded-lg text-sm">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-muted-foreground">Success:</span>
                                <span className="font-medium">
                                    {payment.recipients.filter(r => r.httpStatus && r.httpStatus >= 200 && r.httpStatus < 300).length}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-muted-foreground">Failed:</span>
                                <span className="font-medium">
                                    {payment.recipients.filter(r => r.httpStatus && r.httpStatus >= 400).length}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-yellow-500" />
                                <span className="text-muted-foreground">Pending:</span>
                                <span className="font-medium">
                                    {payment.recipients.filter(r => !r.httpStatus).length}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="space-y-2">
                        {payment.recipients.map((recipient, index) => {
                            const isSuccess = recipient.httpStatus && recipient.httpStatus >= 200 && recipient.httpStatus < 300;
                            const isFailed = recipient.httpStatus && recipient.httpStatus >= 400;

                            return (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center p-3 border rounded-lg transition-colors ${
                                        isSuccess
                                            ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
                                            : isFailed
                                            ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
                                            : 'bg-muted/50'
                                    }`}>
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        {/* Status Icon */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="shrink-0">
                                                        {isSuccess ? (
                                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                        ) : isFailed ? (
                                                            <XCircle className="h-5 w-5 text-red-500" />
                                                        ) : (
                                                            <Clock className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {isSuccess ? (
                                                        <p>Payment successful (HTTP {recipient.httpStatus})</p>
                                                    ) : isFailed ? (
                                                        <p>Payment failed (HTTP {recipient.httpStatus}){recipient.errorMessage && `: ${recipient.errorMessage}`}</p>
                                                    ) : (
                                                        <p>Awaiting processing</p>
                                                    )}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <div className="min-w-0">
                                            <p className="font-medium truncate">
                                                {recipient.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {recipient.phoneNumber}
                                            </p>
                                            {isFailed && recipient.errorMessage && (
                                                <p className="text-xs text-red-600 mt-1">
                                                    {recipient.errorMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-2">
                                        <p className="font-medium">
                                            KES {recipient.amount.toLocaleString()}
                                        </p>
                                        {recipient.httpStatus && (
                                            <Badge
                                                variant={isSuccess ? 'default' : 'destructive'}
                                                className="text-xs mt-1">
                                                {recipient.httpStatus}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
