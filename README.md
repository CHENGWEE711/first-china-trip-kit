# First China Trip Kit

An English China travel guide website for first-time foreign visitors. Built with Next.js, TypeScript, and Tailwind CSS.

Production domain: https://www.firstchinatripkit.com
Redirect domain: https://firstchinatripkit.com

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

First-stage content lives in:

- `data/cities.ts`
- `data/itineraries.ts`
- `data/guides.ts`

The local data shape is intentionally isolated so it can later move to Supabase without changing the page components.

## SEO

The app includes:

- Page-level metadata and Open Graph data
- Dynamic metadata for city, itinerary, and guide pages
- JSON-LD for travel guide and article pages
- `sitemap.xml`
- `robots.txt`

## Production Setup

Deployment notes live in:

- `docs/production-launch.md`

Canonical URLs, Open Graph URLs, robots, and sitemap output read from
`NEXT_PUBLIC_SITE_URL` through the shared site config in `lib/site.ts`.
If the environment variable is not set, the default reserved domain is
`https://www.firstchinatripkit.com`. The downloadable checklist PDF is regenerated
from the same site URL during `npm run build`.

The only required production environment variable is:

```bash
NEXT_PUBLIC_SITE_URL=https://www.firstchinatripkit.com
```

Newsletter signup is wired for Supabase and becomes active when the Supabase
environment variables are added in Vercel. The table SQL lives at
`supabase/newsletter_subscribers.sql`. Payments, AI itinerary generation, and CMS
migration remain optional future integrations.

## Future integrations

Reserved integration points are in `lib/services`:

- Newsletter subscription
- Paid PDF guide download
- AI itinerary generator
- Supabase CMS migration
- Stripe payment integration
- Multi-language path helpers in `lib/i18n.ts`
