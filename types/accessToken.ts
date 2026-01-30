import { ApiStatus } from "./users";


export interface AccessTokenResponse {
  status: ApiStatus;
  data: {
    refreshToken: string;
    accessToken: string;
  };
}
