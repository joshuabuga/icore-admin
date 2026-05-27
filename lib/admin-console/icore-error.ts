/**
 * Icore wraps all API responses in a PayLoad envelope:
 *   { status: { code, desc, ok }, data|errors: ... }
 *
 * For error responses, DRF validation details land under `errors`.
 * This helper unwraps that so callers get the flat field-error map
 * (e.g. { code: ["already exists."], name: ["may not be blank."] })
 * rather than the entire envelope.
 */
export function extractIcoreError(err: unknown): Record<string, unknown> {
    if (!err || typeof err !== 'object' || Array.isArray(err)) {
        return { error: String(err) };
    }
    if (err instanceof Error) {
        return { error: err.message };
    }
    const payload = err as Record<string, unknown>;
    if (payload.errors && typeof payload.errors === 'object' && !Array.isArray(payload.errors)) {
        return payload.errors as Record<string, unknown>;
    }
    return payload;
}
