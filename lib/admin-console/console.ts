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
}

class AdminConsole {
  private baseURL;

  constructor() {
    this.baseURL = process.env.TUCHEZE_ADMIN_API;
  }

  private getHeaders(accessToken?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }

  private buildQueryString(params: FetchParams): string {
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
  async fetchUsers(params: FetchParams = {}): Promise<UserListItem[]> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/users/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.accessToken),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchUsers: ${response.statusText}`);
      }

      return response.json();
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
        headers: this.getHeaders(accessToken.data.accessToken),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetchUser: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchUserTransactions(params: FetchParams):Promise<Payin[]> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/wallets/transactions/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.accessToken),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }

      return response.json();
    }catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchSummary():Promise<Summary> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/summary/`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.accessToken),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetchSummary: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async fetchDeposits(params: FetchParams = {}): Promise<Payin[]> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/payments/payins/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.accessToken),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchDeposits: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async fetchWithdrawals(params: FetchParams = {}): Promise<Payout[]> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/payments/payouts/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.accessToken),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchWithdrawals: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async fetchGames(params: FetchParams = {}): Promise<Game[]> {
    try {
      const accessToken = await this.getAccessToken();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${this.baseURL}/api/v1/console/games/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(accessToken.data.accessToken),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchGames: ${response.statusText}`);
      }

      return response.json();
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
        headers: this.getHeaders(accessToken.data.accessToken),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to updateUser: ${response.statusText}`);
      }
      
      return response.json();
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
        headers: this.getHeaders(accessToken.data.accessToken),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to updateGame: ${response.statusText}`);
      }
      
      return response.json();
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
        headers: this.getHeaders(accessToken.data.accessToken),
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
