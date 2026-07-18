# GA4 revenue attribution and growth setup

## Measurement

- Web stream: `https://www.firstchinatripkit.com`
- Measurement ID: configured with `NEXT_PUBLIC_GA_ID`
- Checkout provider: Payhip
- Default campaign: `china_first_trip_launch`

## Key events

Mark these events as key events in GA4 Admin > Data display > Events:

- `purchase`
- `contact_form_submitted`
- `newsletter_subscribed`

Keep the remaining interaction events as ordinary events until there is enough
traffic to judge their relationship with sales.

## Event-scoped custom dimensions

Create these in GA4 Admin > Data display > Custom definitions. Use the same
event parameter name shown below.

| Dimension name | Event parameter |
| --- | --- |
| Source page | `source_page` |
| Placement | `placement` |
| Product | `product` |
| Guide slug | `guide_slug` |
| Lead magnet | `lead_magnet` |
| UTM source | `utm_source` |
| UTM medium | `utm_medium` |
| UTM campaign | `utm_campaign` |
| UTM content | `utm_content` |

## Funnel explorations

### Funnel A: checklist to purchase

1. `page_view`
2. `checklist_download_clicked`
3. `payment_apps_guide_buy_clicked`
4. `purchase`

Use an open funnel while traffic is low. Add a 30-day conversion window and
break down by Session source / medium or the UTM custom dimensions.

### Funnel B: guide to purchase

1. `page_view` filtered to a core guide page path
2. `guide_paid_cta_clicked`
3. `payment_apps_guide_buy_clicked` as the measurable Payhip outbound visit
4. `purchase`

GA4 does not create a dependable custom `Payhip visit` event automatically.
The outbound buy click is the stable website-side proxy; the Payhip `purchase`
event closes the revenue loop.

## UTM standard

Use lowercase source and medium values. Do not add UTM parameters to ordinary
internal links. Generate campaign URLs with `buildUtmUrl` from `lib/utm.ts`.

| Channel | Example URL |
| --- | --- |
| Reddit | `https://www.firstchinatripkit.com/start-here?utm_source=reddit&utm_medium=organic_social&utm_campaign=china_first_trip_launch&utm_content=first_trip_checklist` |
| Quora | `https://www.firstchinatripkit.com/payments-and-apps?utm_source=quora&utm_medium=organic_social&utm_campaign=china_first_trip_launch&utm_content=payment_answer` |
| Threads | `https://www.firstchinatripkit.com/start-here?utm_source=threads&utm_medium=organic_social&utm_campaign=china_first_trip_launch&utm_content=launch_post` |
| TikTok | `https://www.firstchinatripkit.com/payments-and-apps?utm_source=tiktok&utm_medium=organic_social&utm_campaign=china_first_trip_launch&utm_content=payment_video` |
| Instagram | `https://www.firstchinatripkit.com/start-here?utm_source=instagram&utm_medium=organic_social&utm_campaign=china_first_trip_launch&utm_content=bio_link` |
| YouTube | `https://www.firstchinatripkit.com/start-here?utm_source=youtube&utm_medium=organic_video&utm_campaign=china_first_trip_launch&utm_content=video_description` |
| Pinterest | `https://www.firstchinatripkit.com/start-here?utm_source=pinterest&utm_medium=organic_social&utm_campaign=china_first_trip_launch&utm_content=checklist_pin` |

The first UTM attribution is retained in session storage so a newsletter signup
after internal navigation keeps the original campaign source.

## Internal traffic test

1. Open GA4 Admin > Data streams > the website stream > Configure tag settings.
2. Open Define internal traffic and create `First China Trip Kit team test`.
3. Set `traffic_type` to `internal` and add only the current office/home public IP.
4. Open Admin > Data filters > Internal traffic.
5. Keep the filter in **Testing** state.
6. Confirm traffic appears with the test data-filter name before considering Active.

Do not activate the filter permanently until the test traffic is visible and the
IP rule has been checked from every regular working location.

## Cross-domain verification

In the same web stream, add `firstchinatripkit.com` and `payhip.com` under
Configure your domains. After publishing, open a Payhip button from the website
and confirm the Payhip destination contains a `_gl` query parameter. The Payhip
store must use the same GA4 Measurement ID for the checkout-side `purchase`
event to join the same property.
