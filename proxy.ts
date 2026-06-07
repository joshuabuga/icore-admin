import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:4173',
    'https://ushindibox.com',
    'https://www.ushindibox.com',
    'https://bo.ushindibox.com',
    'https://operator.ushindibox.com',
];

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/onboarding(.*)',
    '/unauthorized(.*)',
]);

const isProtectedRoute = createRouteMatcher([
    '/promos',
    '/promos/(.*)',
    '/players/(.*)',
    '/cashflow/(.*)',
    '/summary/(.*)',
    '/staff/(.*)',
    '/payments/(.*)',
]);

// Comma-separated allowed emails, e.g. ALLOWED_EMAILS=alice@example.com,bob@example.com
// Leave unset to allow any authenticated Clerk user.
const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS
    ? process.env.ALLOWED_EMAILS.split(',').map(e => e.trim().toLowerCase())
    : null;

export default clerkMiddleware(async (auth, req) => {
    const origin = req.headers.get('origin');
    const isAllowedOrigin = origin && allowedOrigins.includes(origin);

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        const headers = {
            'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        };
        return new Response(null, { status: 204, headers });
    }

    // Public routes — no auth required
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    const { userId, sessionClaims } = await auth();

    // Not signed in — redirect to sign-in
    if (!userId) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // Email allowlist check — fetch email from Clerk user object
    if (ALLOWED_EMAILS) {
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(userId);
        const email = clerkUser.emailAddresses
            .find(e => e.id === clerkUser.primaryEmailAddressId)
            ?.emailAddress?.toLowerCase() ?? '';
        if (!ALLOWED_EMAILS.includes(email)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    // Protected routes: enforce Clerk session
    if (isProtectedRoute(req)) {
        const isGetToPromos =
            req.method === 'GET' &&
            req.nextUrl.pathname.startsWith('/api/promos');
        if (!isGetToPromos) {
            await auth.protect();
        }
    }

    // Set CORS headers
    const response = NextResponse.next();
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
