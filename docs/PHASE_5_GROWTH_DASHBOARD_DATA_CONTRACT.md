# Phase 5 weekly growth dashboard data contract

## Analytical job and artifact design

- Job: weekly monitoring of acquisition, search visibility, tool progression,
  lead capture, product intent, verified orders and affiliate intent.
- Artifact: internal noindex dashboard using metric cards, an accessible
  labelled funnel and three HTML tables. It deliberately uses no decorative
  charts, hover-only values or simulated data.
- Primary route: `/growth-dashboard`; mobile collapses cards and retains direct
  labels and horizontally scrollable data tables.
- Fallback: when no approved data is loaded, values display `Awaiting data`,
  never `0`.

## Import process

1. Export a matching 7-day period from GA4: users, sessions, named events,
   traffic channels and landing pages.
2. Export the same date range from Search Console: clicks, impressions, top
   queries and top pages.
3. Import Payhip completed-order and refund data. Do not derive orders from
   click events or thank-you pages.
4. Import approved affiliate clicks from GA4; only replace this with commission
   data when the partner supplies a verified report.
5. Reconcile dates, timezone and property IDs, then obtain an analyst approval.
6. Update `data/growth-dashboard.ts` with aggregate numbers and set
   `sourceStatus` to `verified`. Keep the source export and approval note with
   the reporting evidence.

## Required fields

| Field | System of record | Notes |
| --- | --- | --- |
| Users, sessions, channels, landing pages | GA4 | Use the production property and one exact weekly date range. |
| Search clicks, impressions, queries | Search Console | Use the verified property and same date range. |
| Tool starts, completions, email leads, product clicks, affiliate clicks | GA4 | Named Phase 5 events only; exclude legacy aliases from new KPIs. |
| Orders and refunds | Payhip | Verified provider export/webhook only. |

## Calculations

- Tool completion rate = `toolCompletions / toolStarts`
- Email capture rate = `emailLeads / toolCompletions`
- Product intent rate = `productClicks / emailLeads`
- Order conversion rate = `orders / productClicks`
- Week-over-week change = `(current - prior) / prior`

When the denominator is zero or the source is missing, the dashboard shows no
rate. This is intentional and protects decision-making from false precision.
