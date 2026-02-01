import { ApiStatus } from "./users";


export interface AccessTokenResponse {
  status: ApiStatus;
  data: {
    refresh: string;
    access: string;
  };
}
