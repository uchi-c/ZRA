# ZRA Integrated Digital Tax Return System

A click-through prototype of Zambia Revenue Authority's Integrated Digital Tax Return System, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase.

## Pages

1. **`/signup`** — Role-based registration (Taxpayer / Tax Practitioner) with a shared `SignupFormShell`, mock "Automated System Verification" checklist, and a confirmation screen with a generated registration number and user ID.
2. **`/login`** — Auth login, redirects by role after sign-in. Demo accounts are seeded automatically (see below).
3. **`/dashboard/consultant`** — ZRA Tax Consultant portal: dashboard summary, revenue performance table, management KPI dashboard.
4. **`/dashboard/practitioner`** — Tax Practitioner portal: client management summary, client tax returns table, practitioner performance dashboard.
5. **`/dashboard/taxpayer`** — Taxpayer portal: income/expense declaration, automatic tax computation, PAYE/VAT/withholding tax modules, refund management, outstanding liability, and action buttons.
6. **`/budget`** — Public, no-auth national budget visualization: revenue collected, a Sankey flow from revenue sources → Treasury Single Account → sector allocation, and a sector allocation bar chart.

## Auth

Tonight's build uses a mock, localStorage-backed auth context (`lib/auth.tsx`) so the whole app is navigable without a live backend. Three demo accounts are seeded on first load (password `demo123` for all):

| Role | Username |
| --- | --- |
| Taxpayer | `taxpayer` |
| Tax Practitioner | `practitioner` |
| ZRA Consultant | `consultant` |

`lib/supabaseClient.ts` has a real Supabase client scaffold ready for when `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`) are wired up to replace the mock auth with real Supabase auth + Postgres.

## Shared components

`components/ui/`: `StatCard`, `StatusBadge`, `DataTable`, `FormSection`, `FileUpload`, `Tabs`, `Field` (text/select/radio/checkbox inputs).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
