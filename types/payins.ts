import { ApiStatus, Paginator } from "./users";

// Payin status
export type PayinStatus = "processed" | "pending" | "failed";

// Payment method
export type PayinMethod = "mpesa";

export interface Payin {
  id: number;
  msisdn: string;
  amount: string;
  transaction_id: string;
  status: PayinStatus;
  method: PayinMethod;
  timestamp: string;
  full_name: string;
  short_code: number;
  transaction_ref: string;
  created_at: string;
}

export interface PayinListResponse {
  status: ApiStatus;
  paginator: Paginator;
  data: Payin[];
}