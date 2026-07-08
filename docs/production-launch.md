# First China Trip Kit Production Launch

This is the first SEO content MVP for first-time China travelers.

## Production URLs

- Primary: https://www.firstchinatripkit.com
- Redirect: https://firstchinatripkit.com -> https://www.firstchinatripkit.com
- Production domain: https://www.firstchinatripkit.com

## Required Vercel Environment Variable

```bash
NEXT_PUBLIC_SITE_URL=https://www.firstchinatripkit.com
```

This value controls canonical URLs, Open Graph URLs, robots, sitemap, JSON-LD,
and the generated checklist PDF links.

## Optional Newsletter Environment Variables

Newsletter signup is wired to Supabase when these variables are present. Without
them, the API returns a friendly "not connected yet" message and does not pretend
the visitor subscribed.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_NEWSLETTER_TABLE=newsletter_subscribers
SUPABASE_CONTACT_TABLE=contact_messages
```

Create the Supabase tables with `supabase/newsletter_subscribers.sql` and
`supabase/contact_messages.sql`.

## Optional Analytics Environment Variable

Google Analytics is only loaded when this variable is set. If it is blank or
missing, the site builds normally and no analytics script is added.

```bash
NEXT_PUBLIC_GA_ID=
```

Login, payment, AI itinerary generator, and CMS environment variables are not
required for the current SEO content deployment.

## Build Commands

```bash
npm install
npm run dev
npm run build
```

The build runs `scripts/generate-checklist-pdf.mjs` before Next.js builds so the
downloadable PDF uses the current `NEXT_PUBLIC_SITE_URL`.

## Vercel Domain Setup

Add both domains to the Vercel project:

```bash
vercel domains add firstchinatripkit.com
vercel domains add www.firstchinatripkit.com
```

Set `www.firstchinatripkit.com` as the primary domain in Vercel. Configure the
apex domain to redirect to the primary `www` domain.

## Namecheap DNS Records

Use Namecheap Advanced DNS. Remove any Namecheap parking records or URL redirect
records for `@` and `www`, then add the records Vercel recommended for this
project:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | @ | 216.198.79.1 | Automatic |
| A Record | @ | 64.29.17.1 | Automatic |
| CNAME Record | www | 0b70b409d857d13b.vercel-dns-017.com | Automatic |

If the Vercel dashboard shows newer recommended records, use the dashboard
values. After saving DNS changes, run `vercel domains verify
firstchinatripkit.com` and `vercel domains verify www.firstchinatripkit.com`
again.

## Post-Deploy Verification

```bash
curl -I https://www.firstchinatripkit.com/
curl https://www.firstchinatripkit.com/sitemap.xml
curl https://www.firstchinatripkit.com/robots.txt
```

Expected state:

- Homepage returns `200`.
- `/city-kits`, `/itinerary-kits`, `/travel-essentials`, and guide detail pages open.
- `/cities` and `/itineraries` redirect to the new kit paths.
- Sitemap includes only canonical kit paths, static pages, guide pages, legal pages, and tools.
- Robots allows crawling and points to the sitemap.
- Canonical and Open Graph URLs use `https://www.firstchinatripkit.com`.
- Mobile navigation, product cards, and newsletter sections do not overflow.

## Google Search Console

Submit `https://www.firstchinatripkit.com/sitemap.xml`. A short list of priority
URLs for first inspection lives in `docs/search-console-priority-urls.md`.
