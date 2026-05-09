export interface TaxConfig {
    deposit_wht_enabled: boolean;
    deposit_wht_rate: string;
    deposit_wht_min_amount: string;
    deposit_wht_max_amount: string | null;
    withdrawal_wht_enabled: boolean;
    withdrawal_wht_rate: string;
    withdrawal_wht_min_amount: string;
    withdrawal_wht_max_amount: string | null;
    notes: string | null;
    updated_by: string | null;
    updated_at: string;
}

export type TaxConfigPayload = Partial<Omit<TaxConfig, 'updated_by' | 'updated_at'>>;
