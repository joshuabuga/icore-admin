export interface AffiliateWallet {
    currency: string;
    pending_balance: string;
    available_balance: string;
    paid_out_balance: string;
}

export interface AffiliateListItem {
    id: number;
    msisdn: string;
    affiliate_code: string;
    status: 'active' | 'inactive' | 'suspended';
    commission_rate: string;
    commission_model: 'ggr_share' | 'revenue_share';
    min_payout_amount: string;
    max_payout_amount: string | null;
    hold_days: number | null;
    wallet: AffiliateWallet;
    total_players: number;
    total_commission: number;
    total_ggr: number;
    created_at: string;
}

export interface AffiliateSummary {
    total_active: number;
    total_commission_paid_out: string;
    total_pending: string;
    total_players_referred: number;
}

export interface AffiliateCommissionAnalyticsEntry {
    date: string;
    commission_amount: string;
    ggr_amount: string;
}

export interface AffiliatePlayer {
    id: number;
    msisdn: string;
    status: string;
    created_at: string;
}

export interface AffiliateCommission {
    id: number;
    player_msisdn: string;
    stake_amount: string;
    payout_amount: string;
    ggr_amount: string;
    commission_rate: string;
    commission_amount: string;
    currency: string;
    commission_date: string;
    status: 'pending' | 'available' | 'paid';
}

export interface AffiliatePayoutRequest {
    id: number;
    affiliate_id: number;
    affiliate_msisdn: string;
    amount: string;
    status: 'pending' | 'approved' | 'rejected' | 'paid' | 'failed';
    requested_at: string;
    processed_at: string | null;
    processed_by_clerk_id: string | null;
    transaction_id: string | null;
    notes: string;
}

export interface AffiliateDetail extends AffiliateListItem {
    players: AffiliatePlayer[];
    commissions: AffiliateCommission[];
    payout_requests: AffiliatePayoutRequest[];
}
