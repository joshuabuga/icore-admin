import { ApiStatus, Paginator } from "./users";

// Payout status codes
export type PayoutStatus = 0 | 1 | 2; // 0: pending, 1: success, 2: failed (adjust as needed)

// Payment method
export type PaymentMethod = "mpesa";

export interface Payout {
  id: number;
  user: number;
  name: string;
  msisdn: string;
  amount: string;
  mpesa_transaction_id: string;
  transaction_id: string;
  status: PayoutStatus;
  details: string;
  method: PaymentMethod;
  created_at: string;
}

export interface PayoutListResponse {
  status: ApiStatus;
  paginator: Paginator;
  data: Payout[];
}