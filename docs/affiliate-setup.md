# Affiliate setup

The affiliate system is intentionally disabled until a verified partner URL is configured.
No partner ID or destination URL is included in source control.

## Configure a partner

Add the matching public environment variable in Vercel for Production and Preview:

- `NEXT_PUBLIC_AFFILIATE_AIRALO_URL`
- `NEXT_PUBLIC_AFFILIATE_KLOOK_URL`
- `NEXT_PUBLIC_AFFILIATE_KLOOK_SHANGHAI_URL`
- `NEXT_PUBLIC_AFFILIATE_KLOOK_BEIJING_URL`
- `NEXT_PUBLIC_AFFILIATE_KLOOK_XIAN_URL`
- `NEXT_PUBLIC_AFFILIATE_KLOOK_CHENGDU_URL`
- `NEXT_PUBLIC_AFFILIATE_BOOKING_URL`
- `NEXT_PUBLIC_AFFILIATE_SAFETYWING_URL`

Use the complete HTTPS affiliate URL issued by the partner. Do not use a normal homepage
URL as a substitute. A blank, malformed, or non-HTTPS URL stays disabled.

The four city-level Klook variables are optional deep-link overrides. When one is blank or
invalid, that city card safely falls back to `NEXT_PUBLIC_AFFILIATE_KLOOK_URL`.

A valid URL enables the partner by default. To pause one partner without removing its URL,
set its matching switch to `false`, for example:

```text
NEXT_PUBLIC_AFFILIATE_AIRALO_ENABLED=false
```

Redeploy after changing public environment variables. Central labels, descriptions,
campaign defaults, and category metadata live in `config/affiliate.ts`.

## Link behavior

Enabled partner links open in a new tab with:

```text
rel="sponsored nofollow noopener noreferrer"
```

When a URL is missing, the related visitor-facing button, card, or recommendation module
does not render. The site never exposes a configuration state or fake partner destination.

## GA4 event

Every enabled partner link sends one `affiliate_click` event with:

- `affiliate_partner`
- `affiliate_category`
- `affiliate_campaign`
- `link_label`
- `link_position`
- `page_location`
- `page_path`
- `source_page`
- `destination_url`

If GA4 is absent, the existing analytics helper safely becomes a no-op/dataLayer fallback.

## Verify in GA4 DebugView

1. Set `NEXT_PUBLIC_ANALYTICS_DEBUG=true` in a Preview environment and redeploy.
2. Open the Preview site with Google Tag Assistant connected, or enable GA debug mode in
   the browser you use for testing.
3. Click one enabled affiliate button once.
4. In GA4, open **Admin -> DebugView** and select the test device.
5. Open the `affiliate_click` event and confirm the partner, category, campaign, label,
   position, page, and destination values.
6. Confirm one click creates one event, then return the debug variable to `false`.

Never place partner dashboard credentials, private tokens, or secret API keys in a
`NEXT_PUBLIC_` variable.
