import {
    AccountBalanceResponse,
    MoveFundsPayload,
    MoveFundsResponse,
    ProviderConfig,
    ShortCode,
    TPayPaginatedResponse,
    TPayResponse,
    UpdateCredentialsPayload,
    UpdateProviderConfigPayload,
} from '@/types/tpay';

class TPayClient {
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.TPAY_API_URL || '';
    }

    private getHeaders(token: string): HeadersInit {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const text = await response.text();
        let json: Record<string, unknown>;
        try {
            json = JSON.parse(text);
        } catch {
            throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`);
        }
        if (!response.ok) {
            throw new Error((json.message as string) || `Request failed (${response.status})`);
        }
        return json as T;
    }

    async fetchShortcodes(token: string): Promise<TPayPaginatedResponse<ShortCode>> {
        const response = await fetch(`${this.baseURL}/api/v1/admin/shortcodes/`, {
            method: 'GET',
            headers: this.getHeaders(token),
        });
        return this.handleResponse<TPayPaginatedResponse<ShortCode>>(response);
    }

    async getProviderConfig(token: string): Promise<TPayResponse<ProviderConfig>> {
        const response = await fetch(`${this.baseURL}/api/v1/admin/provider-config/`, {
            method: 'GET',
            headers: this.getHeaders(token),
        });
        return this.handleResponse<TPayResponse<ProviderConfig>>(response);
    }

    async updateProviderConfig(token: string, payload: UpdateProviderConfigPayload): Promise<TPayResponse<ProviderConfig>> {
        const response = await fetch(`${this.baseURL}/api/v1/admin/provider-config/`, {
            method: 'PATCH',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse<TPayResponse<ProviderConfig>>(response);
    }

    async updateCredentials(token: string, id: number, payload: UpdateCredentialsPayload): Promise<TPayResponse<ShortCode>> {
        const response = await fetch(`${this.baseURL}/api/v1/admin/shortcodes/${id}/credentials/`, {
            method: 'PATCH',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse<TPayResponse<ShortCode>>(response);
    }

    async fetchAccountBalance(token: string): Promise<AccountBalanceResponse> {
        const response = await fetch(`${this.baseURL}/api/v1/admin/account-balance/`, {
            method: 'GET',
            headers: this.getHeaders(token),
        });
        return this.handleResponse<AccountBalanceResponse>(response);
    }

    async moveFunds(token: string, payload: MoveFundsPayload): Promise<MoveFundsResponse> {
        const response = await fetch(`${this.baseURL}/api/v1/admin/move-funds/`, {
            method: 'POST',
            headers: this.getHeaders(token),
            body: JSON.stringify(payload),
        });
        return this.handleResponse<MoveFundsResponse>(response);
    }
}

export const tpayClient = new TPayClient();
