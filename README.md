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
5. Redeploy the app.

Once Supabase is connected:

- Admin `Manage Clients` saves to the shared `clients` table
- Admin `Manage Campaigns` saves to the shared `campaigns` table
- Client dashboards load only campaigns assigned to the logged-in client email
