# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tucheze Admin is an internal admin console for the Tucheze gaming platform. It manages players, batch payments, promotions, games, cashflow, and staff with role-based access control.

## Commands

```bash
# Development
bun dev              # Start dev server with Turbopack

# Build & Production
bun run build        # Build for production
bun start            # Start production server

# Linting
bun run lint         # Run ESLint

# Database
bunx prisma generate # Generate Prisma client (outputs to prisma/db/generated/client)
bunx prisma db push  # Push schema changes to database
bunx prisma studio   # Open Prisma Studio GUI
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19 and React Compiler
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Data Fetching**: SWR for client-side, AdminConsole service for server-side
- **UI**: Shadcn/ui components with Tailwind CSS v4

### Key Directories
- `app/api/` - REST API routes (all protected with Clerk auth + RBAC)
- `lib/admin-console/` - External API client (console.ts), SMS service (sms.ts), payment processor
- `lib/permissions.ts` - RBAC system with roles: user, cs, marketing, finance, admin, super_admin
- `hooks/` - SWR-based React hooks for each domain (players, games, promos, cashflow, etc.)
- `types/` - TypeScript interfaces for API responses
- `prisma/schema.prisma` - Database schema

### External API Integration
The app bridges to an external Tucheze Admin API via `lib/admin-console/console.ts`:
- Uses token-based auth (credentials from env vars)
- Endpoints: `/api/v1/console/users/`, `/games/`, `/payments/payins/`, `/payments/payouts/`, `/summary/`

### Permission System
Defined in `lib/permissions.ts`. Each API route checks permissions:
```typescript
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
// Use hasPermission(user.role, userPerms, PERMISSIONS.PLAYERS_READ)
```

Roles have default permissions; individual permissions can be added via the Permissions table.

### Data Fetching Pattern
- **Server-side**: Use `adminConsole.fetchX()` methods in API routes
- **Client-side**: Use hooks from `hooks/` (e.g., `usePlayers()`, `usePromos()`)
- **Mutations**: Use mutation hooks (e.g., `usePlayerMutations()`, `usePromoMutations()`)

## Environment Variables

```
DATABASE_URL                      # PostgreSQL connection string
TUCHEZE_ADMIN_API                # External admin API base URL
TUCHEZE_ADMIN_USERNAME           # External API username
TUCHEZE_ADMIN_PASSWORD           # External API password
SMS_BASE_URL                     # SMS service endpoint
SMS_API_KEY                      # SMS authentication
SMS_SENDER_ID                    # SMS sender ID
SMS_CLIENT_ID                    # SMS client ID
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```
