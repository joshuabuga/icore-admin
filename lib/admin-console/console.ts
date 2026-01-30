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
  sortDesc?: boolean;
}

class AdminConsole {
  private baseURL;

  constructor() {
    this.baseURL = process.env.TUCHEZE_ADMIN_API;
  }

  private buildQueryString(params: FetchParams): string {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.set('search', params.search);
    if (params.page_size) searchParams.set('page_size', params.page_size.toString());
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortDesc !== undefined) searchParams.set('sortDesc', params.sortDesc.toString());

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  private async getAccessToken(): Promise<AccessTokenResponse> {
    const username = process.env.TUCHEZE_ADMIN_USERNAME;
    const password = process.env.TUCHEZE_ADMIN_PASSWORD;
    const response = await fetch(`${this.baseURL}/api/v1/console/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'GET'
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'GET'
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
  
  async fetchSummary():Promise<Summary> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(`${this.baseURL}/api/v1/console/summary/`, {
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
         method: 'GET'
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'GET'
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'GET'
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'GET'
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'PUT',
        body: JSON.stringify(data)
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'PUT',
        body: JSON.stringify(data)
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
        headers: {
          'Authorization': `Bearer ${accessToken.data.accessToken}`,
        },
        method: 'DELETE'
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
