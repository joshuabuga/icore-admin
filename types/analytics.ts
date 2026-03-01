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
