import { ApiStatus, Paginator } from "./users";

export interface Tag {
  id: number;
  name: string;
  priority: number;
  is_active: boolean;
  created_at: string;
}

export interface TagListResponse {
  status: ApiStatus;
  paginator: Paginator;
  data: Tag[];
}