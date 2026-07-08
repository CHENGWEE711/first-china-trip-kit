# Supabase Contact and Newsletter Setup

First China Trip Kit stores newsletter signups and contact form messages in Supabase when these Vercel
environment variables are configured:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_NEWSLETTER_TABLE`
- `SUPABASE_CONTACT_TABLE`

The server-side APIs write with `SUPABASE_SERVICE_ROLE_KEY`. The anon key is
reserved for future lightweight client-side Supabase features.

Create the newsletter table by running:

```sql
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  status text not null default 'subscribed',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Allow service role newsletter writes"
on public.newsletter_subscribers
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
```

The complete migration file lives at `supabase/newsletter_subscribers.sql`.

Create the contact table by running `supabase/contact_messages.sql`. It stores:

- name
- email
- country_or_passport
- travel_month
- cities_considered
- trip_length
- main_question
- interested_in_custom_itinerary
- preferred_reply_method
- source
- status
- created_at
