export interface PayinsGraphResponse {
  graph_data: {
    payins_graph_data: number[];
    payin_labels: string[];  // YYYY-MM-DD
  };
}

export interface UsersGraphResponse {
  graph_data: {
    users_graph_data: number[];
    user_labels: string[];  // YYYY-MM-DD
  };
}

export interface DailyFlowEntry {
  date: string;
  deposits: number;
  deposit_count: number;
  withdrawals: number;
  withdrawal_count: number;
  net_flow: number;
}

// Dashboard analytics types
export interface HourlyRegistration {
  hour: string;      // ISO datetime, e.g. "2026-03-17T10:00:00+03:00"
  new_users: number;
}

export interface HourlyActiveUsers {
  hour: string;
  active_users: number;
}

export interface DailyStakesWinnings {
  date: string;          // "2026-03-15"
  total_stakes: number;
  stake_count: number;
  total_winnings: number;
  win_count: number;
  ggr: number;           // total_stakes - total_winnings
}

export interface DailyNewUsersFTD {
  date: string;
  new_users: number;
  ftd_count: number;
  conversion_rate: number; // percentage, e.g. 37.5
}

export interface DailyFTDVolume {
  date: string;
  total_deposit_amount: number;
  total_deposit_count: number;
  ftd_amount: number;
  ftd_count: number;
}

export interface TopGame {
  rank: number;            // 1-10
  game_name: string;       // normalized, e.g. "Aviator"
  total_bet_volume: number;
  bet_count: number;
}
