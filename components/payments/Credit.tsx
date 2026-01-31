"use client";

import { useState } from "react";
import { useCSV } from "@/hooks/useCSV";
import { CustomersToBeCredited } from "@/types/crediting";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, Users, DollarSign, Check, X, Loader2, Download } from "lucide-react";
import { toast } from "sonner";

export default function CreditingSection() {
    const {
        loading,
        error,
        handleFileChange,
        extractCSVData,
        creditedCustomers,
        setCreditedCustomers,
        file,
    } = useCSV();

    const [particulars, setParticulars] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processed, setProcessed] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a CSV file first");
            return;
        }

        try {
            const data = await extractCSVData();
            if (data && data.length > 0) {
                toast.success(`Successfully extracted ${data.length} customer records from CSV`);
            } else {
                toast.warning("No valid customer records found in the CSV file");
            }
        } catch (err) {
            console.error("Error processing CSV:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to process CSV file";
            toast.error(errorMessage);
        }
    };

    const calculateTotalAmount = (): number => {
        if (!creditedCustomers) return 0;
        return creditedCustomers.reduce((total, customer) => total + Number(customer.amount), 0);
    };

    const handleProcessPayments = async () => {
        if (!creditedCustomers || creditedCustomers.length === 0) {
            toast.error("No customers to process");
            return;
        }

        if (!particulars.trim()) {
            toast.error("Please provide payment particulars");
            return;
        }

        setIsProcessing(true);
        try {
            const batchData = {
                particulars: particulars.trim(),
                recipients: creditedCustomers,
                total_amount: calculateTotalAmount(),
                batch_no: `BATCH${Date.now()}`,
            };

            const response = await fetch('/api/process-batch-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(batchData),
            });

            if (response.ok) {
                const result = await response.json();
                setProcessed(true);
                toast.success(`Batch payment initiated successfully! Batch No: ${result.batch_no}`);
                // Clear form
                setCreditedCustomers([]);
                setParticulars("");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to process batch payment");
            }
        } catch (err) {
            console.error("Error processing batch payment:", err);
            toast.error("An error occurred while processing the payment");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setCreditedCustomers([]);
        setParticulars("");
        setProcessed(false);
    };

    return (
        <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
            {/* Upload Section */}
            <Card>
                <CardHeader className="space-y-2 p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                        Upload CSV File
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Upload a CSV file containing customer information for batch payments.
                        Required columns: name, phoneNumber, amount
                        <br />
                        <a
                            href="/sample-customers.csv"
                            download
                            className="inline-flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 mt-2"
                        >
                            <Download className="h-3 w-3" />
                            Download sample CSV format
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="csv-file" className="text-sm">CSV File</Label>
                        <Input
                            id="csv-file"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="text-sm"
                        />
                    </div>
                    <Button
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <FileText className="mr-2 h-4 w-4" />
                                Extract Data
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Payment Details Section */}
            {creditedCustomers && creditedCustomers.length > 0 && (
                <Card>
                    <CardHeader className="space-y-2 p-4 sm:p-6">
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                            Payment Details
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Review the extracted customer data and provide payment particulars
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <div className="flex items-center space-x-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
                                <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-xs sm:text-sm font-medium">Recipients:</span>
                                <Badge variant="secondary" className="text-xs">{creditedCustomers.length}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
                                <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-xs sm:text-sm font-medium">Total:</span>
                                <Badge variant="secondary" className="text-xs">KES {calculateTotalAmount().toLocaleString()}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 p-2 sm:p-3 bg-muted/50 rounded-lg sm:col-span-2 lg:col-span-1">
                                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-xs sm:text-sm font-medium">Status:</span>
                                <Badge variant="outline" className="text-xs">Ready</Badge>
                            </div>
                        </div>

                        <Separator />

                        {/* Particulars Input */}
                        <div className="space-y-2">
                            <Label htmlFor="particulars" className="text-sm">Payment Particulars *</Label>
                            <Textarea
                                id="particulars"
                                placeholder="Enter the reason/description for this batch payment (e.g., 'Weekly Bonus Distribution', 'Customer Service Compensation')"
                                value={particulars}
                                onChange={(e) => setParticulars(e.target.value)}
                                className="min-h-20 text-sm"
                            />
                        </div>

                        {/* Customer List Preview */}
                        <div className="space-y-2">
                            <Label className="text-sm">Customer Preview (First 5 records)</Label>
                            <div className="border rounded-lg p-2 sm:p-4 space-y-2 max-h-60 overflow-y-auto">
                                {creditedCustomers.slice(0, 5).map((customer, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-2 sm:px-0 border-b last:border-b-0 gap-1 sm:gap-0">
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm truncate">{customer.name}</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground">{customer.phoneNumber}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs w-fit">KES {Number(customer.amount).toLocaleString()}</Badge>
                                    </div>
                                ))}
                                {creditedCustomers.length > 5 && (
                                    <p className="text-xs sm:text-sm text-muted-foreground text-center py-2">
                                        ... and {creditedCustomers.length - 5} more recipients
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <Button
                                onClick={handleProcessPayments}
                                disabled={isProcessing || !particulars.trim()}
                                className="flex-1 text-sm"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span className="hidden sm:inline">Processing Batch Payment...</span>
                                        <span className="sm:hidden">Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Process Batch Payment</span>
                                        <span className="sm:hidden">Process Payment</span>
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                disabled={isProcessing}
                                className="text-sm"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Success Message */}
            {processed && (
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4 sm:pt-6">
                        <div className="flex items-start sm:items-center space-x-2 text-green-800">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-0 shrink-0" />
                            <p className="font-medium text-sm sm:text-base">Batch payment has been successfully initiated!</p>
                        </div>
                        <p className="text-xs sm:text-sm text-green-700 mt-2 ml-6 sm:ml-7">
                            The payment batch is now pending approval and can be viewed in the Payment Batches section.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Error Display */}
            {error && (
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4 sm:pt-6">
                        <div className="flex items-start sm:items-center space-x-2 text-red-800">
                            <X className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-0 shrink-0" />
                            <p className="font-medium text-sm sm:text-base">Error processing request</p>
                        </div>
                        <p className="text-xs sm:text-sm text-red-700 mt-2 ml-6 sm:ml-7">
                            {typeof error === "string"
                                ? error
                                : error instanceof Error
                                ? error.message
                                : "An unknown error occurred"}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}