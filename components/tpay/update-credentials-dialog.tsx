"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { ShortCode, UpdateCredentialsPayload, PROVIDER_LABELS } from "@/types/tpay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UpdateCredentialsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    shortcode: ShortCode | null;
    onSave: (id: number, payload: UpdateCredentialsPayload) => Promise<void>;
    isLoading?: boolean;
}

function CredentialField({
    id,
    label,
    placeholder,
    isSet,
    value,
    onChange,
}: {
    id: string;
    label: string;
    placeholder: string;
    isSet: boolean;
    value: string;
    onChange: (value: string) => void;
}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={id}>{label}</Label>
                <div className="flex items-center gap-1 text-xs">
                    {isSet ? (
                        <span className="flex items-center gap-1 text-green-600"><Check className="h-3 w-3" /> Set</span>
                    ) : (
                        <span className="flex items-center gap-1 text-muted-foreground"><X className="h-3 w-3" /> Not set</span>
                    )}
                </div>
            </div>
            <div className="relative">
                <Input
                    id={id}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pr-10"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 px-3 hover:bg-transparent"
                    onClick={() => setVisible(!visible)}
                    tabIndex={-1}
                >
                    {visible ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
            </div>
        </div>
    );
}

export function UpdateCredentialsDialog({
    open,
    onOpenChange,
    shortcode,
    onSave,
    isLoading,
}: UpdateCredentialsDialogProps) {
    const [consumerKey, setConsumerKey] = useState("");
    const [consumerSecret, setConsumerSecret] = useState("");
    const [securityCredential, setSecurityCredential] = useState("");
    const [initiator, setInitiator] = useState("");

    useEffect(() => {
        if (open) {
            setConsumerKey("");
            setConsumerSecret("");
            setSecurityCredential("");
            setInitiator("");
        }
    }, [open]);

    if (!shortcode) return null;

    const isMpesa = shortcode.provider === "mpesa";

    const handleSave = async () => {
        const payload: UpdateCredentialsPayload = {};

        if (consumerKey) payload.consumer_key = consumerKey;
        if (consumerSecret) payload.consumer_secret = consumerSecret;
        if (isMpesa) {
            if (securityCredential) payload.security_credential = securityCredential;
            if (initiator) payload.initiator = initiator;
        }

        await onSave(shortcode.id, payload);
    };

    const hasAnyInput = consumerKey || consumerSecret || (isMpesa && (securityCredential || initiator));

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Update Credentials</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update API credentials for{" "}
                        <strong>{shortcode.name}</strong> (code: {shortcode.code}).
                        Only filled fields will be updated.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 py-2">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                        <Image
                            src={isMpesa ? "/mpesa.png" : "/sasapay.png"}
                            alt={PROVIDER_LABELS[shortcode.provider]}
                            width={24}
                            height={24}
                            className="rounded"
                        />
                        <span className="text-sm font-medium">
                            {PROVIDER_LABELS[shortcode.provider]}
                        </span>
                    </div>

                    <CredentialField
                        id="consumer_key"
                        label={isMpesa ? "Consumer Key" : "Client ID"}
                        placeholder={`Enter ${isMpesa ? "consumer key" : "client ID"}…`}
                        isSet={shortcode.has_consumer_key}
                        value={consumerKey}
                        onChange={setConsumerKey}
                    />

                    <CredentialField
                        id="consumer_secret"
                        label={isMpesa ? "Consumer Secret" : "Client Secret"}
                        placeholder={`Enter ${isMpesa ? "consumer secret" : "client secret"}…`}
                        isSet={shortcode.has_consumer_secret}
                        value={consumerSecret}
                        onChange={setConsumerSecret}
                    />

                    {isMpesa && (
                        <>
                            <CredentialField
                                id="security_credential"
                                label="Security Credential"
                                placeholder="Enter security credential…"
                                isSet={shortcode.has_security_credential}
                                value={securityCredential}
                                onChange={setSecurityCredential}
                            />

                            <CredentialField
                                id="initiator"
                                label="Initiator Name"
                                placeholder="Enter B2C initiator name…"
                                isSet={shortcode.has_initiator}
                                value={initiator}
                                onChange={setInitiator}
                            />
                        </>
                    )}
                </div>

                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading || !hasAnyInput}
                    >
                        {isLoading ? "Saving…" : "Save Credentials"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
