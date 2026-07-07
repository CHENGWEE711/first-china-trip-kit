# First China Trip Kit Production Launch

This is the first SEO content MVP for first-time China travelers.

## Production URLs

- Primary: https://www.firstchinatripkit.com
- Redirect: https://firstchinatripkit.com -> https://www.firstchinatripkit.com
- Current Vercel preview/test alias: https://china-travel-kit.vercel.app

## Required Vercel Environment Variable

```bash
NEXT_PUBLIC_SITE_URL=https://www.firstchinatripkit.com
```

This value controls canonical URLs, Open Graph URLs, robots, sitemap, JSON-LD,
and the generated checklist PDF links.

No backend, login, payment, AI itinerary generator, or CMS environment variables
are required for the first deployment.

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

Use Namecheap Advanced DNS:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | @ | 76.76.21.21 | Automatic |
| CNAME Record | www | cname.vercel-dns.com | Automatic |

Remove conflicting parking, forwarding, or old A/CNAME records for `@` and
`www` before adding these.

## Post-Deploy Verification

```bash
curl -I https://www.firstchinatripkit.com/
curl https://www.firstchinatripkit.com/sitemap.xml
curl https://www.firstchinatripkit.com/robots.txt
```

Expected state:

- Homepage returns `200`.
- `/cities`, `/itineraries`, `/travel-essentials`, and guide detail pages open.
- Sitemap includes static pages, city pages, itinerary pages, and guide pages.
- Robots allows crawling and points to the sitemap.
- Canonical and Open Graph URLs use `https://www.firstchinatripkit.com`.
- Mobile navigation, product cards, and newsletter sections do not overflow.
