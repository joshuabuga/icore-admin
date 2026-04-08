import { adminConsole } from './console';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';

/**
 * Maps AdminConsole method names to their required permission.
 * This serves as a second line of defense — even if an API route
 * forgets to check permissions, the proxy layer catches it.
 */
const METHOD_PERMISSIONS: Record<string, string> = {
    // Players
    fetchUsers: PERMISSIONS.PLAYERS_READ,
    fetchUser: PERMISSIONS.PLAYERS_READ,
    fetchUserTransactions: PERMISSIONS.PLAYERS_READ,
    fetchPlayerDeposits: PERMISSIONS.PLAYERS_READ,
    fetchPlayerWithdrawals: PERMISSIONS.PLAYERS_READ,
    patchUser: PERMISSIONS.PLAYERS_WRITE,  // granular checks handled in route
    updateUser: PERMISSIONS.PLAYERS_WRITE,
    deleteUser: PERMISSIONS.PLAYERS_WRITE,

    // Cashflow
    fetchDeposits: PERMISSIONS.CASHFLOW_READ,
    fetchWithdrawals: PERMISSIONS.CASHFLOW_READ,

    // Games
    fetchGames: PERMISSIONS.GAMES_READ,
    updateGame: PERMISSIONS.GAMES_WRITE,
    updateGameThumbnail: PERMISSIONS.GAMES_WRITE,

    // Summary
    fetchSummary: PERMISSIONS.SUMMARY_READ,
    fetchDailyFlow: PERMISSIONS.SUMMARY_READ,

    // Analytics
    fetchPayinsPerDay: PERMISSIONS.ANALYTICS_READ,
    fetchUsersPerDay: PERMISSIONS.ANALYTICS_READ,
    fetchHourlyRegistrations: PERMISSIONS.ANALYTICS_READ,
    fetchHourlyActiveUsers: PERMISSIONS.ANALYTICS_READ,
    fetchDailyStakesWinnings: PERMISSIONS.ANALYTICS_READ,
    fetchDailyNewUsersFTD: PERMISSIONS.ANALYTICS_READ,
    fetchDailyFTDVolume: PERMISSIONS.ANALYTICS_READ,
    fetchTopGames: PERMISSIONS.ANALYTICS_READ,

    // Affiliate
    fetchAffiliates: PERMISSIONS.AFFILIATE_READ,
    fetchAffiliate: PERMISSIONS.AFFILIATE_READ,
    fetchAffiliatePayoutRequests: PERMISSIONS.AFFILIATE_READ,
    patchAffiliatePayoutRequest: PERMISSIONS.AFFILIATE_WRITE,
    patchAffiliate: PERMISSIONS.AFFILIATE_WRITE,
};

export class ForbiddenError extends Error {
    public readonly statusCode = 403;

    constructor(method: string, permission: string) {
        super(`Forbidden: permission '${permission}' required for '${method}'`);
        this.name = 'ForbiddenError';
    }
}

/**
 * Execute an AdminConsole method with permission verification.
 *
 * @param userId - Clerk user ID to check permissions for
 * @param method - Name of the AdminConsole method to call
 * @param args - Arguments to pass to the method
 * @throws ForbiddenError if the user lacks the required permission
 */
export async function withPermissionCheck<
    K extends keyof typeof adminConsole & string
>(
    userId: string,
    method: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
): Promise<ReturnType<(typeof adminConsole)[K] extends (...a: any[]) => any ? (typeof adminConsole)[K] : never>> {
    const requiredPermission = METHOD_PERMISSIONS[method];

    if (requiredPermission) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            throw new ForbiddenError(method, requiredPermission);
        }

        const userPerms = user.permissions.map(p => p.permission);

        if (!hasPermission(user.role, userPerms, requiredPermission)) {
            throw new ForbiddenError(method, requiredPermission);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (adminConsole as any)[method];
    if (typeof fn !== 'function') {
        throw new Error(`AdminConsole has no method '${method}'`);
    }

    return fn.apply(adminConsole, args);
}

export { METHOD_PERMISSIONS };
