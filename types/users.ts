// API Response Status
export interface ApiStatus {
  ok: boolean;
  code: number;
  desc: string;
}

// Pagination
export interface Paginator {
  index: number;
  pagesize: number;
  length: number;
}

// Wallet types
export type WalletType = "cash" | "bonus";

export interface Wallet {
  id: number;
  type: WalletType;
  label: string;
  balance: string;
}

// User from detail endpoint (includes wallets array)
export interface UserDetail {
  id: number;
  msisdn: string;
  mno: string;
  name: string;
  wallets: Wallet[];
  balance: string;
  bonus: string;
  is_active: boolean;
  is_verified: boolean;
  is_payout_locked: boolean;
  is_wagering_exempt: boolean;
  wallet_id: number;
  daily_withdrawal_limit: string | null;
  created_at: string;
  platform: string;
  last_login: string;
}

// User from list endpoint (flattened wallet info)
export interface UserListItem {
  id: number;
  msisdn: string;
  mno: string;
  name: string;
  balance: string;
  cash: string;
  wallet_id: number;
  bonus: string;
  platform: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  last_login: string;
  is_payout_locked: boolean;
  is_wagering_exempt: boolean;
  daily_withdrawal_limit: string | null;
  bets: number;
}

// Transaction types
export type TransactionType = "cr" | "dr";

export interface Transaction {
  id: number;
  type: TransactionType;
  value: string;
  subject: string;
  final_balance: string;
  initial_balance: string;
  details: string;
  created_at: string;
}

// API Response wrappers
export interface UserDetailResponse {
  status: ApiStatus;
  data: UserDetail;
}

export interface UserListResponse {
  status: ApiStatus;
  paginator: Paginator;
  data: UserListItem[];
}

export interface TransactionListResponse {
  status: ApiStatus;
  paginator: Paginator;
  data: Transaction[];
}