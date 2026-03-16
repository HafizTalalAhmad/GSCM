# GSCM Platform

Premium agency and SaaS-style platform for Global Social Circle Media.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

## Information Architecture

### Marketing site

- `/`
- `/about`
- `/services`
- `/pricing`
- `/case-studies`
- `/blog`
- `/contact`
- `/faq`
- `/book-a-call`

### Client dashboard

- `/dashboard/client`
- `/dashboard/client/analytics`
- `/dashboard/client/content-calendar`
- `/dashboard/client/reports`
- `/dashboard/client/approvals`
- `/dashboard/client/billing`
- `/dashboard/client/messages`
- `/dashboard/client/assets`

### Admin dashboard

- `/dashboard/admin`
- `/dashboard/admin/clients`
- `/dashboard/admin/leads`
- `/dashboard/admin/blog-posts`
- `/dashboard/admin/case-studies`
- `/dashboard/admin/campaigns`
- `/dashboard/admin/testimonials`
- `/dashboard/admin/services`
- `/dashboard/admin/contact-submissions`
- `/dashboard/admin/settings`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Keep the framework preset as `Next.js`.
3. Build command: `npm run build`
4. Output setting: leave default for Next.js
5. Add the environment variables from `.env.example`
6. Deploy

## Environment variables

- `AUTH_SECRET`
- `GSCM_ADMIN_EMAIL`
- `GSCM_ADMIN_PASSWORD`
- `GSCM_CLIENT_EMAIL`
- `GSCM_CLIENT_PASSWORD`
- `LEADS_WEBHOOK_URL`
- `BOOKING_WEBHOOK_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Project structure

- `app/` App Router pages and route groups
- `components/ui/` design primitives
- `components/layout/` site and dashboard shells
- `components/marketing/` homepage sections
- `components/dashboard/` dashboard widgets and placeholders
- `lib/` shared data and helpers
- `lib/integrations/` provider scaffolds for Meta, TikTok, and LinkedIn sync
- `docs/` implementation notes and architecture references

## Notes

- The homepage and main client/admin dashboards are production-style layouts.
- Contact and booking forms use server actions with webhook-ready delivery.
- Dashboard routes are protected by JWT cookie auth via middleware.
- Dashboard campaign management supports two modes:
- Without Supabase, client and campaign data falls back to browser-only local storage.
- With Supabase configured, admin-created clients and campaigns are shared across devices.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor in Supabase.
3. Run the schema from `supabase/schema.sql`.
4. In Vercel, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `META_APP_ID`
- `META_APP_SECRET`
- `META_REDIRECT_URI`
- `TIKTOK_APP_ID`
- `TIKTOK_APP_SECRET`
- `TIKTOK_REDIRECT_URI`
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `LINKEDIN_REDIRECT_URI`
5. Redeploy the app.

Once Supabase is connected:

- Admin `Manage Clients` saves to the shared `clients` table
- Admin `Manage Campaigns` saves to the shared `campaigns` table
- Client dashboards load only campaigns assigned to the logged-in client email

## Real social integrations

The repo now includes a production-oriented integration scaffold for:

- Meta Ads
- TikTok Ads
- LinkedIn Ads

What is included now:

- provider interface definitions
- provider registry
- OAuth authorization URL builders
- Supabase schema for connected accounts, external campaign mapping, daily metrics, and sync runs

What still needs implementation:

- live OAuth callback handlers
- token exchange calls
- token refresh logic
- provider campaign sync jobs
- dashboard charts reading from `campaign_daily_metrics`

See [integrations.md](/abs/path/c:/Users/T/Music/GSCM/GSCM/docs/integrations.md) for the real-world architecture and rollout sequence.

## Meta Ads first step now included

The first live integration step is now wired:

- admin settings page can start a Meta OAuth connection for a selected client
- Meta OAuth callback exchanges the authorization code for a token
- accessible Meta ad accounts are fetched and stored in `external_accounts`

Before using it, make sure Vercel has:

- `META_APP_ID`
- `META_APP_SECRET`
- `META_REDIRECT_URI`

`META_REDIRECT_URI` must point to:

- `/api/integrations/meta/callback`

Example:

- `https://your-domain.vercel.app/api/integrations/meta/callback`
