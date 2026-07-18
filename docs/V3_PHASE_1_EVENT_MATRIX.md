# V3 Phase 1 — Homepage 3.0 Event Matrix

- Scope: Homepage 3.0 only
- Analytics loaders: existing GA4 + Metricool, no duplicate loader
- Attribution behavior: current-session stored UTM is attached when available; no new identity or user system
- Validation: `tests/live/homepage-v3-functional.spec.ts`

## Required events

| Event | Surface / trigger | Destination | Required parameters | Additional parameters | QA |
|---|---|---|---|---|---|
| `hero_primary_cta_clicked` | Hero / Plan Your First China Trip | `/start-here` | `item_name`, `destination_url`, `section`, stored UTM | — | Passed |
| `homepage_task_clicked` | Hero payment CTA | Payment Guide | Same | — | Passed |
| `homepage_task_clicked` | Four task cards | Visa checker, Payment Guide, City Kits, Itinerary Kits | Same | — | Passed |
| `homepage_popular_content_clicked` | Three Popular cards | Payment Guide, 240-hour Guide, 10-day itinerary | Same | — | Passed |
| `homepage_trending_clicked` | Xi’an / Shanghai cards | Existing City Kit | Same | — | Passed |
| `homepage_product_preview_clicked` | Product visual and Preview button | `/store#inside-the-guide` | Same | — | Passed |
| `payment_guide_buy_clicked` | Payhip Buy button, only when configured | Verified Payhip URL with website UTM | Same | `source_page`, `placement`, `product_id`, `product`, `price` | Passed when available; honest hidden state also passed |
| `checklist_opened` | Desktop/mobile Header checklist CTA | `/#free-checklist` | Same | — | Passed |

## Supplementary homepage events

| Event | Surface | Purpose |
|---|---|---|
| `homepage_before_fly_clicked` | Four Before You Fly actions | Distinguish Visa, Payments, Apps/Internet and Transport demand |
| `homepage_experience_clicked` | Eight Explore by Experience entries | Measure theme-led navigation before Phase 5 |

## Parameter contract

Every `TrackedLink` event sends:

```text
item_name
destination_url
section
utm_source
utm_medium
utm_campaign
utm_content
```

UTM fields are empty when no stored attribution exists; the implementation does not invent values. Internal links are not rewritten with UTM query strings.

The Payhip buy action additionally sends:

```text
source_page
placement
product_id
product
price
```

and appends website attribution to the verified external Payhip destination only.

## Event-to-section mapping

| Section value | Meaning |
|---|---|
| `homepage_hero` | Hero primary/secondary decision |
| `homepage_tasks` | Four task navigation cards |
| `homepage_popular` | Current-interest content |
| `homepage_trending` | Ready hotspot city entries |
| `homepage_before_you_fly` | Four preparation systems |
| `homepage_experiences` | Theme-led exploration |
| `homepage_product_visual` | Product cover/preview collage |
| `homepage_product_cta` | Preview button |
| `homepage_product` | Payhip buy action |
| `header` / `mobile_header` | Checklist navigation CTA |

## Safeguards

- GA4 and Metricool scripts remain absent outside their existing production gate.
- No duplicate analytics loader was added.
- Payhip is only linked when the verified environment URL exists.
- `payment_apps_guide_buy_clicked` remains emitted alongside the new `payment_guide_buy_clicked` event for backwards compatibility.
- Tests assert event name, destination URL, section and available attribution fields.
