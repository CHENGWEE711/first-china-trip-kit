create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  status text not null default 'subscribed',
  consent_version text not null default 'welcome-series-v1',
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers
add column if not exists source text;

alter table public.newsletter_subscribers
add column if not exists status text not null default 'subscribed';

alter table public.newsletter_subscribers
add column if not exists consent_version text not null default 'welcome-series-v1';

alter table public.newsletter_subscribers
add column if not exists consented_at timestamptz not null default now();

alter table public.newsletter_subscribers
drop column if exists source_page;

alter table public.newsletter_subscribers
drop column if exists subscribed_at;

alter table public.newsletter_subscribers enable row level security;

create policy "Allow service role newsletter writes"
on public.newsletter_subscribers
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
