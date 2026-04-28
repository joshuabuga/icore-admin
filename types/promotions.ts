export interface PromoRules {
    requires_first_deposit?: boolean;
    valid_mnos?: string[];
    min_account_age_days?: number;
    active_days_of_week?: number[];  // 0=Mon … 6=Sun
    max_uses_per_user?: number;
    excluded_users?: number[];
}

export interface Promo {
    id: number;
    name: string;
    promotion_type: string;
    description: string;
    bonus_amount: string;
    bonus_awards_type: string;
    bonus_award_ratio: string;
    min_claim_payin: string;
    min_claim_odds: string;
    min_claim_stake: string;
    active_from: string | null;
    active_to: string | null;
    is_active: boolean;
    rules: PromoRules;
    max_uses_total: number | null;
    uses_count: number;
    is_deleted: boolean;
    created_at: string;
    modified_at: string;
}

export interface PromoCodeUse {
    id: number;
    user: number;
    user_msisdn: string;
    payin: number | null;
    bonus_awarded: string;
    context: 'registration' | 'deposit' | 'manual';
    created_at: string;
}

export interface PromoCode {
    id: number;
    code: string;
    name: string;
    campaign_tag: string;
    promo: number | null;
    bonus_amount_override: string | null;
    min_deposit: string;
    max_uses: number | null;
    max_uses_per_user: number;
    registration_only: boolean;
    first_deposit_only: boolean;
    active_from: string | null;
    active_to: string | null;
    is_active: boolean;
    uses_count: number;
    is_valid: boolean;
    uses: PromoCodeUse[];
    created_at: string;
    modified_at: string;
}

export const PROMO_TYPES = [
    { value: 'welcome_bonus', label: 'Welcome Bonus' },
    { value: 'first_deposit_bonus', label: 'First Deposit Bonus' },
    { value: 'recurring_bonus', label: 'Recurring Bonus' },
    { value: 'weekly_bonus', label: 'Weekly Bonus' },
    { value: 'super_sunday_bonus', label: 'Super Sunday Bonus' },
    { value: 'promo_code', label: 'Promo Code' },
] as const;

export const BONUS_AWARD_TYPES = [
    { value: 'fixed', label: 'Fixed Amount' },
    { value: 'ratio', label: 'Percentage of Deposit' },
] as const;

export const DAYS_OF_WEEK = [
    { value: 0, label: 'Mon' },
    { value: 1, label: 'Tue' },
    { value: 2, label: 'Wed' },
    { value: 3, label: 'Thu' },
    { value: 4, label: 'Fri' },
    { value: 5, label: 'Sat' },
    { value: 6, label: 'Sun' },
] as const;
