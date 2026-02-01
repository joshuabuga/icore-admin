export class FetchError extends Error {
    status: number;
    info: unknown;

    constructor(message: string, status: number, info?: unknown) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
        this.info = info;
    }
}

function isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
}

export const fetcher = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);

    if (!isSuccessStatus(res.status)) {
        const info = await res.json().catch(() => ({}));
        throw new FetchError(
            info.error || `An error occurred while fetching the data (${res.status}).`,
            res.status,
            info
        );
    }

    return res.json();
};

export const fetcherWithParams = async <T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>
): Promise<T> => {
    const searchParams = new URLSearchParams();

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.set(key, String(value));
            }
        });
    }

    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return fetcher<T>(fullUrl);
};

export const mutationFetcher = async <T, D = unknown>(
    url: string,
    { arg }: { arg: { method: 'POST' | 'PATCH' | 'PUT' | 'DELETE'; data?: D } }
): Promise<T> => {
    const res = await fetch(url, {
        method: arg.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: arg.data ? JSON.stringify(arg.data) : undefined,
    });

    if (!isSuccessStatus(res.status)) {
        const info = await res.json().catch(() => ({}));
        throw new FetchError(
            info.error || `An error occurred while mutating the data (${res.status}).`,
            res.status,
            info
        );
    }

    return res.json();
};
