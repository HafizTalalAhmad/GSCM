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
- Sub-pages are scaffolded and ready for live data, CMS wiring, and backend integration.
