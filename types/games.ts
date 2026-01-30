import { ApiStatus, Paginator } from "./users";

export type GameStatus = "Active" | "Inactive";

export type GameCategory = "casino" | "sports";

export interface Game {
  id: number;
  external_id: string;
  name: string;
  absolute_name: string;
  code: string;
  type: string;
  slug: string;
  sub_type: string;
  desktop: number;
  mobile: number;
  full_state: number;
  demo_mode_available: boolean;
  demo_url: string | null;
  thumbnail: string;
  width: number;
  height: number;
  provider: string;
  aggregator: string;
  status: GameStatus;
  is_offered: boolean;
  priority: number;
  created_at: string;
  tags: string;
  category: GameCategory;
}

// Simplified game from detail/edit endpoint
export interface GameDetail {
  id: number;
  name: string;
  code: string;
  is_offered: boolean;
  priority: number;
  thumbnail: string;
  tags: string;
  category: GameCategory;
}

// API Response wrappers
export interface GameDetailResponse {
  status: ApiStatus;
  data: GameDetail;
}

export interface GameListResponse {
  status: ApiStatus;
  paginator: Paginator;
  data: Game[];
}