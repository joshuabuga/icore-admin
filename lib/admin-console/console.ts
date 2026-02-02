import { AccessTokenResponse } from "@/types/accessToken";
import { Payin } from "@/types/payins";
import { Payout } from "@/types/payouts";
import { UserDetail, UserListItem } from "@/types/users";
import { Game,GameDetail } from "@/types/games";
import { Summary } from "@/types/summary";


export interface FetchParams {
  search?: string;
  page_size?: number;
  page?: number;
  sortBy?: string;
  wallet_id?: string;
  sortDesc?: boolean;
  date_after?: string;   // ISO date string (start date)
  date_before?: string;  // ISO date string (end date)
}

export interface PaginatedResponse<T> {
  data: T[];
  totalRows: number;
}

class AdminConsole {
  private baseURL;

  constructor() {
    this.baseURL = process.env.TUCHEZE_ADMIN_API;
  }

  private getHeaders(accessToken?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
      'Origin': 'https://x.tucheze.com',
      'Referer': 'https://x.tucheze.com/',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }

  private buildQueryString(params: FetchParams, dateFieldPrefix: 'date' | 'created_at' = 'date'): string {
    const searchParams = new URLSearchParams();

    // Default params - always included
    searchParams.set('search',params.search ?? '');
    searchParams.set('page_size', (params.page_size ?? 10).toString());
    searchParams.set('page', (params.page ?? 1).toString());
    searchParams.set('sortBy', params.sortBy ?? 'id');
    searchParams.set('sortDesc', (params.sortDesc ?? true).toString());

    // Optional params
    if (params.search) searchParams.set('search', params.search);
    if (params.wallet_id) searchParams.set('wallet_id', params.wallet_id);

    // Date range params - use appropriate field name based on endpoint
    if (params.date_after) searchParams.set(`${dateFieldPrefix}_after`, params.date_after);
    if (params.date_before) searchParams.set(`${dateFieldPrefix}_before`, params.date_before);

    return `?${searchParams.toString()}`;
  }

  private async getAccessToken(): Promise<AccessTokenResponse> {
    const email = process.env.TUCHEZE_ADMIN_USERNAME;
    const password = process.env.TUCHEZE_ADMIN_PASSWORD;
    const response = await fetch(`${this.baseURL}/api/v1/console/auth/token/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to getAccessToken: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /** Perform Fetch functions **/
  async fetchUsers(params: FetchParams = {}): Promise<PaginatedResponse<UserListItem>> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/users/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchUsers: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.paginator?.length || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async fetchUser(id:string):Promise<UserDetail> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/users/${id}/`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchUser: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchUserTransactions(params: FetchParams):Promise<PaginatedResponse<Payin>> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/wallets/transactions/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.paginator?.length || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchSummary():Promise<Summary> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/stats/summary/`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchSummary: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchDeposits(params: FetchParams = {}): Promise<PaginatedResponse<Payin>> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params, 'created_at');
      const response = await fetch(`${this.baseURL}/api/v1/console/payments/payins/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchDeposits: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.paginator?.length || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchWithdrawals(params: FetchParams = {}): Promise<PaginatedResponse<Payout>> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params, 'created_at');
      const response = await fetch(`${this.baseURL}/api/v1/console/payments/payouts/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchWithdrawals: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.paginator?.length || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchGames(params: FetchParams = {}): Promise<PaginatedResponse<Game>> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/games/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchGames: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.paginator?.length || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /*** Update Functions ***/
  async updateUser(id:string, data:UserDetail):Promise<UserDetail> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/users/${id}/`, {
        method: 'PUT',
        headers: this.getHeaders(accessToken.data.access),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to updateUser: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateGame(id:string, data:GameDetail):Promise<GameDetail> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/games/${id}/`, {
        method: 'PUT',
        headers: this.getHeaders(accessToken.data.access),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to updateGame: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  /*** Delete Functions ***/
  async deleteUser(id:string):Promise<void> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/users/${id}/`, {
        method: 'DELETE',
        headers: this.getHeaders(accessToken.data.access),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to deleteUser: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const adminConsole = new AdminConsole();
