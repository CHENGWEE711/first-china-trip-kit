create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  country_or_passport text,
  travel_month text,
  cities_considered text,
  trip_length text,
  main_question text not null,
  interested_in_custom_itinerary boolean not null default false,
  preferred_reply_method text not null default 'email',
  source text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_messages
add column if not exists country_or_passport text;

alter table public.contact_messages
add column if not exists travel_month text;

alter table public.contact_messages
add column if not exists cities_considered text;

alter table public.contact_messages
add column if not exists trip_length text;

alter table public.contact_messages
add column if not exists interested_in_custom_itinerary boolean not null default false;

alter table public.contact_messages
add column if not exists preferred_reply_method text not null default 'email';

alter table public.contact_messages
add column if not exists source text;

alter table public.contact_messages
add column if not exists status text not null default 'new';

alter table public.contact_messages enable row level security;

create policy "Allow service role contact message writes"
on public.contact_messages
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
