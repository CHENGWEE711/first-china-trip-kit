-- Phase 5.1C: persist Custom Itinerary Review submissions.
-- Safe to apply to an empty Preview project or a project with the table already present.

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
  add column if not exists country_or_passport text,
  add column if not exists travel_month text,
  add column if not exists cities_considered text,
  add column if not exists trip_length text,
  add column if not exists interested_in_custom_itinerary boolean not null default false,
  add column if not exists preferred_reply_method text not null default 'email',
  add column if not exists source text,
  add column if not exists status text not null default 'new';

alter table public.contact_messages enable row level security;

-- The Vercel API route uses SUPABASE_SERVICE_ROLE_KEY server-side. That role
-- bypasses RLS, so this migration does not grant browser roles any access.
