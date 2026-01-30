import { ApiStatus } from "./users";


export interface Summary {
  today_deposits: string,
  total_deposits: string,
  today_payouts: string,
  total_payouts: string,
  total_winnings: string,
  today_winnings: string,
  today_users: string,
  total_users: string,
  active_users: bigint,
  active_today: bigint,
  verified_users: bigint,
  dormant_users: bigint,
  total_cash_balances: string,
  utility_balance: string,
  working_balance: string
}


export interface SummaryApiResponse {
  status: ApiStatus,
  data: Summary
}