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
