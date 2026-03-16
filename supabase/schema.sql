create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null unique,
  timezone text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  client_email text not null references public.clients(email) on update cascade on delete cascade,
  name text not null,
  platform text not null,
  objective text not null,
  budget numeric not null default 0,
  start_date date,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists campaigns_client_email_idx on public.campaigns(client_email);
create index if not exists campaigns_status_idx on public.campaigns(status);

create table if not exists public.external_accounts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on update cascade on delete cascade,
  platform text not null check (platform in ('Meta Ads', 'TikTok Ads', 'LinkedIn Ads')),
  external_account_id text not null,
  account_name text not null default '',
  access_token text not null,
  refresh_token text not null default '',
  token_expires_at timestamptz,
  status text not null default 'connected' check (status in ('connected', 'expired', 'revoked')),
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  unique (platform, external_account_id)
);

create table if not exists public.campaign_external_sources (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on update cascade on delete cascade,
  platform text not null check (platform in ('Meta Ads', 'TikTok Ads', 'LinkedIn Ads')),
  external_campaign_id text not null,
  external_account_id text not null,
  created_at timestamptz not null default now(),
  unique (platform, external_campaign_id)
);

create table if not exists public.campaign_daily_metrics (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on update cascade on delete cascade,
  platform text not null check (platform in ('Meta Ads', 'TikTok Ads', 'LinkedIn Ads')),
  metric_date date not null,
  impressions integer not null default 0,
  clicks integer not null default 0,
  spend numeric not null default 0,
  conversions numeric not null default 0,
  ctr numeric not null default 0,
  cpc numeric not null default 0,
  cpm numeric not null default 0,
  roas numeric not null default 0,
  created_at timestamptz not null default now(),
  unique (campaign_id, platform, metric_date)
);

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('Meta Ads', 'TikTok Ads', 'LinkedIn Ads')),
  external_account_id text not null,
  status text not null check (status in ('running', 'success', 'failed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  records_synced integer not null default 0,
  error_message text not null default ''
);

create index if not exists external_accounts_client_id_idx on public.external_accounts(client_id);
create index if not exists campaign_external_sources_campaign_id_idx on public.campaign_external_sources(campaign_id);
create index if not exists campaign_daily_metrics_campaign_id_idx on public.campaign_daily_metrics(campaign_id);
create index if not exists campaign_daily_metrics_metric_date_idx on public.campaign_daily_metrics(metric_date);
create index if not exists sync_runs_platform_idx on public.sync_runs(platform);
