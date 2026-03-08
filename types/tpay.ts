export type ShortCodeType = "B2C" | "C2B" | "BOTH";
export type Provider = "mpesa" | "sasapay";

export interface ShortCode {
    id: number;
    name: string;
    code: number;
    payload_callback_url: string | null;
    description: string;
    type: ShortCodeType;
    provider: Provider;
    is_active: boolean;
    has_consumer_key: boolean;
    has_consumer_secret: boolean;
    has_security_credential: boolean;
    has_initiator: boolean;
    created_at: string;
}

export interface TPayPagination {
    count: number;
    num_pages: number;
    current_page: number;
    previous: string | null;
    next: string | null;
    start_index: number;
    end_index: number;
}

export interface TPayResponse<T> {
    data: T;
    message: string;
    status: boolean;
}

export interface TPayPaginatedResponse<T> {
    data: {
        pagination: TPayPagination;
        results: T[];
    };
    message: string;
    status: boolean;
}

export interface ProviderConfig {
    c2b_provider: Provider;
    b2c_provider: Provider;
}

export interface UpdateProviderConfigPayload {
    c2b_provider?: Provider;
    b2c_provider?: Provider;
}

export interface UpdateCredentialsPayload {
    provider?: Provider;
    consumer_key?: string;
    consumer_secret?: string;
    security_credential?: string;
    initiator?: string;
}

export const PROVIDER_LABELS: Record<Provider, string> = {
    mpesa: "M-Pesa",
    sasapay: "SasaPay",
};
