create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source_page text,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers
drop column if exists source;

alter table public.newsletter_subscribers
drop column if exists status;

alter table public.newsletter_subscribers
drop column if exists subscribed_at;

alter table public.newsletter_subscribers
add column if not exists source_page text;

alter table public.newsletter_subscribers enable row level security;

create policy "Allow service role newsletter writes"
on public.newsletter_subscribers
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
