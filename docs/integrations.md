# GSCM Multi-Platform Integration Plan

This project now includes the backend scaffolding for real campaign sync across:

- Meta Ads
- TikTok Ads
- LinkedIn Ads

## Real-world flow

1. Admin connects a client's platform account with OAuth.
2. We store the connected ad account in `external_accounts`.
3. A scheduled sync job pulls campaign metrics from each provider API.
4. Normalized daily metrics are written into `campaign_daily_metrics`.
5. Client dashboards read from Supabase instead of directly hitting ad APIs.

## Why the dashboard reads from Supabase

- faster page loads
- fewer API rate-limit issues
- historical daily metrics stay available
- one normalized schema across all platforms
- safer secrets handling

## Core tables

- `external_accounts`
  - which client has connected which provider account
- `campaign_external_sources`
  - maps an internal GSCM campaign to a provider campaign ID
- `campaign_daily_metrics`
  - daily synced performance metrics for charts and reports
- `sync_runs`
  - audit trail for sync jobs and failures

## Recommended sync cadence

- campaign summaries: every 1 hour
- daily rollups: nightly
- approval-sensitive accounts: optional manual refresh button later

## Metrics to normalize

- impressions
- clicks
- spend
- conversions
- ctr
- cpc
- cpm
- roas

## Build sequence

1. Add provider OAuth connect/disconnect flow
2. Save tokens securely in Supabase
3. Add sync job endpoint or cron worker
4. Normalize and store daily metrics
5. Replace synthetic dashboard charts with live synced values

## Current repo status

The provider files in `lib/integrations/` are scaffolds only.
They define the production interface and authorization URL builders, but the live token exchange and data sync calls still need to be implemented provider by provider.
