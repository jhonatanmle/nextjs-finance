# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Next.js 15.3.4 finance application with feature-based architecture, using Supabase for authentication and database operations, and TypeScript throughout.

## Development Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server

## Key Technologies
- **Next.js 15.3.4** with App Router
- **React 19.0.0** with TypeScript 5
- **Supabase** (@supabase/ssr for SSR, GitHub OAuth configured)
- **Tailwind CSS 4** with Shadcn/ui components
- **Radix UI** components and **Lucide React** icons
- **Zod** for validation and **date-fns** for date utilities
- **pnpm** as package manager

## Architecture

### Feature-Based Structure
- `/src/app` - Next.js app router with route groups: `(auth)` for auth pages, `home` for protected routes
- `/src/features` - Self-contained feature modules (auth, bank, dashboard, finance, stock-events, core)
- `/src/shared` - Shared components, hooks, constants, and utilities
- `/src/middleware.ts` - Authentication middleware protecting all routes except `/sign-in` and `/api/auth/callback`

### Data Layer Patterns
- Each feature has its own API module (e.g., `bank.api.ts`, `finance.api.ts`)
- **Mappers** transform Supabase responses to application types
- **Schemas** directory with Zod schemas for validation
- **Core types** in `/features/core` for shared entities (Currency, PaymentType, Record types)

### Authentication Flow
- **Supabase SSR** with cookie-based sessions
- **GitHub OAuth** configured for social login
- **Middleware protection** redirects unauthenticated users to `/sign-in`
- User metadata extracted from GitHub profile (name, email, avatar)

## Database Entities
Key Supabase tables: `BankRecord`, `FinanceRecord`, `Category`, `Subcategory`, `DollarPrice`, `Goals`
- Multi-currency support (PEN/USD) with exchange rate tracking
- PaymentType enum for different payment methods
- Foreign key relationships between entities

## UI Patterns
- **Sidebar layout** with collapsible navigation
- **Dark mode default** with system preference support via next-themes
- **Card-based dashboard** with Suspense boundaries and skeleton loading states
- **Absolute imports** using `@/*` path mapping

## Important Configuration
- **TypeScript strict mode** with Next.js plugin
- **ESLint** with Next.js and TypeScript rules
- **Tailwind** custom configuration integrated with Shadcn/ui
- Root `/` route redirects to `/home/dashboard`
- Dashboard displays financial metrics: Balance, Bank, Investment, and Expenses totals