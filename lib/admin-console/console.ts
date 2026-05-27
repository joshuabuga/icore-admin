import { AccessTokenResponse } from "@/types/accessToken";
import { AffiliateListItem, AffiliateDetail, AffiliatePayoutRequest, AffiliateSummary, AffiliateCommissionAnalyticsEntry } from "@/types/affiliate";
import {
  DailyFlowEntry,
  DailyFTDVolume,
  DailyNewUsersFTD,
  DailyStakesWinnings,
  HourlyActiveUsers,
  HourlyRegistration,
  PayinsGraphResponse,
  TopGame,
  UsersGraphResponse,
} from "@/types/analytics";
import { Payin } from "@/types/payins";
import { Payout } from "@/types/payouts";
import { UserDetail, UserListItem } from "@/types/users";
import { Game,GameDetail } from "@/types/games";
import { Summary } from "@/types/summary";
import { getEnvConfig } from "./env-config";


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

  private getHeaders(accessToken?: string, { omitContentType = false } = {}): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
      'Origin': 'https://x.tucheze.com',
      'Referer': 'https://x.tucheze.com/',
    };
    if (!omitContentType) {
      headers['Content-Type'] = 'application/json';
    }
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }

  private toFormData(data: Record<string, unknown>): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      } else {
        formData.append(key, '');
      }
    }
    return formData;
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

  async getAuth(): Promise<{ access: string; baseURL: string }> {
    const config = await getEnvConfig();
    const response = await fetch(`${config.baseURL}/api/v1/console/auth/token/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email: config.username, password: config.password }),
    });

    if (!response.ok) {
      throw new Error(`Failed to getAccessToken: ${response.statusText}`);
    }

    const result: AccessTokenResponse = await response.json();
    return { access: result.data.access, baseURL: config.baseURL };
  }

  /** Perform Fetch functions **/
  async fetchUsers(params: FetchParams = {}): Promise<PaginatedResponse<UserListItem>> {
    try {
      const { access, baseURL } = await this.getAuth();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${baseURL}/api/v1/console/users/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(access),
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
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/users/${id}/`, {
        method: 'GET',
        headers: this.getHeaders(access),
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
      const { access, baseURL } = await this.getAuth();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${baseURL}/api/v1/console/wallets/transactions/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(access),
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

  async fetchSummary(date?: string):Promise<Summary> {
    try {
      const { access, baseURL } = await this.getAuth();
      const url = date
        ? `${baseURL}/api/v1/console/stats/summary/?date=${date}`
        : `${baseURL}/api/v1/console/stats/summary/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(access),
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

  async fetchDailyFlow(startDate: string, endDate: string): Promise<DailyFlowEntry[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/daily-flow/?${params.toString()}`,
        {
          method: 'GET',
          headers: this.getHeaders(access),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetchDailyFlow: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchPlayerDeposits(userId: string, params: FetchParams = {}): Promise<PaginatedResponse<Payin>> {
    try {
      const { access, baseURL } = await this.getAuth();
      const searchParams = new URLSearchParams();
      searchParams.set('user_id', userId);
      if (params.search) searchParams.set('search', params.search);
      searchParams.set('page_size', (params.page_size ?? 10).toString());
      searchParams.set('page', (params.page ?? 1).toString());
      if (params.sortBy) searchParams.set('ordering', params.sortDesc ? `-${params.sortBy}` : params.sortBy);
      if (params.date_after) searchParams.set('date_after', params.date_after);
      if (params.date_before) searchParams.set('date_before', params.date_before);

      const response = await fetch(`${baseURL}/api/v1/console/wallets/deposits/?${searchParams.toString()}`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchPlayerDeposits: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.count || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchPlayerWithdrawals(userId: string, params: FetchParams = {}): Promise<PaginatedResponse<Payout>> {
    try {
      const { access, baseURL } = await this.getAuth();
      const searchParams = new URLSearchParams();
      searchParams.set('user_id', userId);
      if (params.search) searchParams.set('search', params.search);
      searchParams.set('page_size', (params.page_size ?? 10).toString());
      searchParams.set('page', (params.page ?? 1).toString());
      if (params.sortBy) searchParams.set('ordering', params.sortDesc ? `-${params.sortBy}` : params.sortBy);
      if (params.date_after) searchParams.set('date_after', params.date_after);
      if (params.date_before) searchParams.set('date_before', params.date_before);

      const response = await fetch(`${baseURL}/api/v1/console/wallets/withdrawals/?${searchParams.toString()}`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetchPlayerWithdrawals: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        data: result.data,
        totalRows: result.count || 0,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async requeuePayout(payoutId: number): Promise<{ message: string }> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/payouts/${payoutId}/requeue/`, {
      method: 'GET',
      headers: this.getHeaders(access),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'Requeue failed');
    return data;
  }

  async fetchDeposits(params: FetchParams = {}): Promise<PaginatedResponse<Payin>> {
    try {
      const { access, baseURL } = await this.getAuth();
      const queryString = this.buildQueryString(params, 'date');
      const response = await fetch(`${baseURL}/api/v1/console/payments/payins/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(access),
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
      const { access, baseURL } = await this.getAuth();
      const queryString = this.buildQueryString(params, 'date');
      const response = await fetch(`${baseURL}/api/v1/console/payments/payouts/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(access),
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
      const { access, baseURL } = await this.getAuth();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${baseURL}/api/v1/console/games/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(access),
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
  async patchUser(id: string, data: Partial<UserDetail>): Promise<UserDetail> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/users/${id}/`, {
        method: 'PATCH',
        headers: this.getHeaders(access),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to patchUser: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(id:string, data:UserDetail):Promise<UserDetail> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/users/${id}/`, {
        method: 'PUT',
        headers: this.getHeaders(access),
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

  async updateGame(id:string, data:Partial<GameDetail>):Promise<GameDetail> {
    try {
      const { access, baseURL } = await this.getAuth();
      const formData = this.toFormData(data as unknown as Record<string, unknown>);
      const response = await fetch(`${baseURL}/api/v1/console/games/${id}/`, {
        method: 'PUT',
        headers: this.getHeaders(access, { omitContentType: true }),
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.error('updateGame error response:', response.status, errorBody);
        throw new Error(`Failed to updateGame: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateGameThumbnail(id:string, thumbnailFile: File):Promise<GameDetail> {
    try {
      const { access, baseURL } = await this.getAuth();
      // The external API expects thumbnail as a base64 string
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const dataUri = `data:${thumbnailFile.type || 'image/png'};base64,${base64}`;

      const formData = new FormData();
      formData.append('id', id);
      formData.append('thumbnail', dataUri);

      const response = await fetch(`${baseURL}/api/v1/console/games/${id}/`, {
        method: 'PUT',
        headers: this.getHeaders(access, { omitContentType: true }),
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.error('updateGameThumbnail error response:', response.status, errorBody);
        throw new Error(`Failed to updateGameThumbnail: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /** Affiliate methods **/
  async fetchAffiliates(params: FetchParams = {}): Promise<PaginatedResponse<AffiliateListItem>> {
    try {
      const { access, baseURL } = await this.getAuth();
      const queryString = this.buildQueryString(params);
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/${queryString}`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });
      if (!response.ok) throw new Error(`Failed to fetchAffiliates: ${response.statusText}`);
      const result = await response.json();
      return { data: result.data, totalRows: result.paginator?.length || 0 };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchAffiliate(id: string): Promise<AffiliateDetail> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/${id}/`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });
      if (!response.ok) throw new Error(`Failed to fetchAffiliate: ${response.statusText}`);
      const result = await response.json();
      return (result?.data?.data ?? result?.data ?? result) as AffiliateDetail;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchAffiliatePayoutRequests(params: FetchParams = {}): Promise<PaginatedResponse<AffiliatePayoutRequest>> {
    try {
      const { access, baseURL } = await this.getAuth();
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.set('search', params.search);
      searchParams.set('page_size', (params.page_size ?? 10).toString());
      searchParams.set('page', (params.page ?? 1).toString());
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/payout-requests/?${searchParams}`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });
      if (!response.ok) throw new Error(`Failed to fetchAffiliatePayoutRequests: ${response.statusText}`);
      const result = await response.json();
      return { data: result.data, totalRows: result.paginator?.length || 0 };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async patchAffiliatePayoutRequest(id: string, action: 'approve' | 'reject', notes?: string, approvedBy?: string): Promise<AffiliatePayoutRequest> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/payout-requests/${id}/`, {
        method: 'PATCH',
        headers: this.getHeaders(access),
        body: JSON.stringify({ action, notes: notes ?? '', approved_by: approvedBy ?? '' }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || `Failed to patch payout request: ${response.statusText}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchAffiliateSummary(): Promise<AffiliateSummary> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/summary/`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });
      if (!response.ok) throw new Error(`Failed to fetchAffiliateSummary: ${response.statusText}`);
      const result = await response.json();
      return (result?.data ?? result) as AffiliateSummary;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchAffiliateCommissionAnalytics(id: string, params: { start_date: string; end_date: string }): Promise<AffiliateCommissionAnalyticsEntry[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const qs = new URLSearchParams(params).toString();
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/${id}/commission-analytics/?${qs}`, {
        method: 'GET',
        headers: this.getHeaders(access),
      });
      if (!response.ok) throw new Error(`Failed to fetchAffiliateCommissionAnalytics: ${response.statusText}`);
      const result = await response.json();
      console.dir(result.data)
      return (result?.data ?? result) as AffiliateCommissionAnalyticsEntry[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async patchAffiliate(id: string, data: Partial<AffiliateListItem>): Promise<AffiliateListItem> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/affiliate/${id}/`, {
        method: 'PATCH',
        headers: this.getHeaders(access),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to patchAffiliate: ${response.statusText}`);
      const result = await response.json();
      return (result?.data?.data ?? result?.data ?? result) as AffiliateListItem;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /*** Delete Functions ***/
  async deleteUser(id:string):Promise<void> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(`${baseURL}/api/v1/console/users/${id}/`, {
        method: 'DELETE',
        headers: this.getHeaders(access),
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

  /** Analytics methods */
  async fetchPayinsPerDay(createdAtAfter: string, createdAtBefore: string): Promise<PayinsGraphResponse> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({
        created_at_after: createdAtAfter,
        created_at_before: createdAtBefore,
      });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/series/payins-per-month/?${params.toString()}`,
        {
          method: 'GET',
          headers: this.getHeaders(access),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetchPayinsPerDay: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchHourlyRegistrations(): Promise<HourlyRegistration[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/hourly-registrations/`,
        { method: 'GET', headers: this.getHeaders(access) }
      );
      if (!response.ok) throw new Error(`Failed to fetchHourlyRegistrations: ${response.statusText}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchHourlyActiveUsers(): Promise<HourlyActiveUsers[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/hourly-active-users/`,
        { method: 'GET', headers: this.getHeaders(access) }
      );
      if (!response.ok) throw new Error(`Failed to fetchHourlyActiveUsers: ${response.statusText}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchDailyStakesWinnings(startDate: string, endDate: string): Promise<DailyStakesWinnings[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/daily-stakes-winnings/?${params.toString()}`,
        { method: 'GET', headers: this.getHeaders(access) }
      );
      if (!response.ok) throw new Error(`Failed to fetchDailyStakesWinnings: ${response.statusText}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchDailyNewUsersFTD(startDate: string, endDate: string): Promise<DailyNewUsersFTD[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/daily-new-users-ftd/?${params.toString()}`,
        { method: 'GET', headers: this.getHeaders(access) }
      );
      if (!response.ok) throw new Error(`Failed to fetchDailyNewUsersFTD: ${response.statusText}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchDailyFTDVolume(startDate: string, endDate: string): Promise<DailyFTDVolume[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/daily-ftd-volume/?${params.toString()}`,
        { method: 'GET', headers: this.getHeaders(access) }
      );
      if (!response.ok) throw new Error(`Failed to fetchDailyFTDVolume: ${response.statusText}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchTopGames(startDate: string, endDate: string): Promise<TopGame[]> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/top-games/?${params.toString()}`,
        { method: 'GET', headers: this.getHeaders(access) }
      );
      if (!response.ok) throw new Error(`Failed to fetchTopGames: ${response.statusText}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchUsersPerDay(createdAtAfter: string, createdAtBefore: string): Promise<UsersGraphResponse> {
    try {
      const { access, baseURL } = await this.getAuth();
      const params = new URLSearchParams({
        created_at_after: createdAtAfter,
        created_at_before: createdAtBefore,
      });
      const response = await fetch(
        `${baseURL}/api/v1/console/stats/series/users-per-month/?${params.toString()}`,
        {
          method: 'GET',
          headers: this.getHeaders(access),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetchUsersPerDay: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // ── Promotions ─────────────────────────────────────────────────────────────

  async getPromos(params?: { search?: string; page?: number }): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const qs = new URLSearchParams();
    if (params?.search) qs.set('search', params.search);
    if (params?.page) qs.set('page', String(params.page));
    const response = await fetch(`${baseURL}/api/v1/console/promotions/?${qs}`, {
      headers: this.getHeaders(access),
    });
    if (!response.ok) throw new Error(`getPromos: ${response.statusText}`);
    return response.json();
  }

  async getPromo(id: number): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/${id}/`, {
      headers: this.getHeaders(access),
    });
    if (!response.ok) throw new Error(`getPromo: ${response.statusText}`);
    return response.json();
  }

  async createPromo(data: Record<string, unknown>): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/`, {
      method: 'POST',
      headers: this.getHeaders(access),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw err;
    }
    return response.json();
  }

  async updatePromo(id: number, data: Record<string, unknown>): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/${id}/`, {
      method: 'PATCH',
      headers: this.getHeaders(access),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw err;
    }
    return response.json();
  }

  async deletePromo(id: number): Promise<void> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/${id}/`, {
      method: 'DELETE',
      headers: this.getHeaders(access),
    });
    if (!response.ok) throw new Error(`deletePromo: ${response.statusText}`);
  }

  async getPromoCodes(params?: { promo?: number; search?: string }): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const qs = new URLSearchParams();
    if (params?.promo) qs.set('promo', String(params.promo));
    if (params?.search) qs.set('search', params.search);
    const response = await fetch(`${baseURL}/api/v1/console/promotions/codes/?${qs}`, {
      headers: this.getHeaders(access),
    });
    if (!response.ok) throw new Error(`getPromoCodes: ${response.statusText}`);
    return response.json();
  }

  async createPromoCode(data: Record<string, unknown>): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/codes/`, {
      method: 'POST',
      headers: this.getHeaders(access),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw err;
    }
    return response.json();
  }

  async updatePromoCode(id: number, data: Record<string, unknown>): Promise<any> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/codes/${id}/`, {
      method: 'PATCH',
      headers: this.getHeaders(access),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw err;
    }
    return response.json();
  }

  async deletePromoCode(id: number): Promise<void> {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/promotions/codes/${id}/`, {
      method: 'DELETE',
      headers: this.getHeaders(access),
    });
    if (!response.ok) throw new Error(`deletePromoCode: ${response.statusText}`);
  }

  async fetchTaxConfig() {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/payments/tax-config/`, {
      method: 'GET',
      headers: this.getHeaders(access),
    });
    if (!response.ok) throw new Error(`fetchTaxConfig: ${response.statusText}`);
    return response.json();
  }

  async updateTaxConfig(data: Record<string, unknown>) {
    const { access, baseURL } = await this.getAuth();
    const response = await fetch(`${baseURL}/api/v1/console/payments/tax-config/`, {
      method: 'PATCH',
      headers: this.getHeaders(access),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw err;
    }
    return response.json();
  }
}

export const adminConsole = new AdminConsole();