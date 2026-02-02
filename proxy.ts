import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:4173',
    'https://tucheze.com',
    'https://gonga-prd.web.app',
    'https://www.tucheze.com',
];

const isProtectedRoute = createRouteMatcher([
    '/promos',
    '/promos/(.*)',
    '/players/(.*)',
    '/cashflow/(.*)',
    '/summary/(.*)',
    '/staff/(.*)',
    '/payments/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const origin = req.headers.get('origin');
    const isAllowedOrigin = origin && allowedOrigins.includes(origin);

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        const headers = {
            'Access-Control-Allow-Origin': isAllowedOrigin
                ? origin
                : allowedOrigins[0],
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        };
        return new Response(null, { status: 204, headers });
    }

    // Protect routes with Clerk
    if (isProtectedRoute(req)) {
        const isGetToPromos =
            req.method === 'GET' &&
            req.nextUrl.pathname.startsWith('/api/promos');
        if (!isGetToPromos) {
            await auth.protect();
        }
    }

    // Set CORS headers for all other routes
    const response = NextResponse.next();
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    return response;
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
