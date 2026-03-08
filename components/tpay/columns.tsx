'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, KeyRound, Check, X } from 'lucide-react';

import { ShortCode, PROVIDER_LABELS } from '@/types/tpay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export interface ShortCodeActionHandlers {
    onUpdateCredentials: (shortcode: ShortCode) => void;
}

function ProviderCell({ provider }: { provider: ShortCode['provider'] }) {
    return (
        <div className="flex items-center gap-2">
            <Image
                src={provider === 'mpesa' ? '/mpesa.png' : '/sasapay.png'}
                alt={PROVIDER_LABELS[provider]}
                width={20}
                height={20}
                className="rounded"
            />
            <span className="font-medium">{PROVIDER_LABELS[provider]}</span>
        </div>
    );
}

function CredentialIcon({ isSet, label }: { isSet: boolean; label: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="inline-flex">
                        {isSet ? (
                            <Check className="h-4 w-4 text-green-600" />
                        ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                        )}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}: {isSet ? "Set" : "Not set"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function CredentialStatusCell({ shortcode }: { shortcode: ShortCode }) {
    const isMpesa = shortcode.provider === 'mpesa';

    return (
        <div className="flex items-center gap-1.5">
            <CredentialIcon
                isSet={shortcode.has_consumer_key}
                label={isMpesa ? "Consumer Key" : "Client ID"}
            />
            <CredentialIcon
                isSet={shortcode.has_consumer_secret}
                label={isMpesa ? "Consumer Secret" : "Client Secret"}
            />
            {isMpesa && (
                <>
                    <CredentialIcon
                        isSet={shortcode.has_security_credential}
                        label="Security Credential"
                    />
                    <CredentialIcon
                        isSet={shortcode.has_initiator}
                        label="Initiator"
                    />
                </>
            )}
        </div>
    );
}

function ActionsCell({
    shortcode,
    handlers,
}: {
    shortcode: ShortCode;
    handlers: ShortCodeActionHandlers;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handlers.onUpdateCredentials(shortcode)}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Update Credentials
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function createShortCodeColumns(
    handlers: ShortCodeActionHandlers
): ColumnDef<ShortCode>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <div className="text-xs text-muted-foreground">{row.original.description}</div>
                </div>
            ),
        },
        {
            accessorKey: 'code',
            header: 'Shortcode',
            cell: ({ row }) => (
                <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                    {row.original.code}
                </code>
            ),
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => {
                const type = row.original.type;
                const variant = type === 'BOTH' ? 'default' : 'outline';
                return <Badge variant={variant}>{type}</Badge>;
            },
        },
        {
            accessorKey: 'provider',
            header: 'Provider',
            cell: ({ row }) => <ProviderCell provider={row.original.provider} />,
        },
        {
            id: 'credentials',
            header: 'Credentials',
            cell: ({ row }) => <CredentialStatusCell shortcode={row.original} />,
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ row }) => (
                <Badge variant={row.original.is_active ? 'default' : 'destructive'}>
                    {row.original.is_active ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionsCell shortcode={row.original} handlers={handlers} />,
        },
    ];
}
