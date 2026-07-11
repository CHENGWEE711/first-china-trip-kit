# GA4 review guide - china_first_trip_launch

## Campaign acquisition report

1. Open GA4 and choose the First China Trip Kit property.
2. Go to **Reports > Acquisition > Traffic acquisition**.
3. Set the date range to the seven campaign days plus one comparison day.
4. Add a filter where **Session campaign** exactly matches `china_first_trip_launch`.
5. Review these dimensions:
   - Session source / medium
   - Session campaign
   - Session manual ad content
   - Landing page + query string
   - Device category
   - Country

Use **Session manual ad content** to compare each unique `utm_content` value. Do not
compare only platform totals; two posts on the same platform can perform very differently.

## Events to review

- `checklist_download_clicked`
- `newsletter_subscribed`
- `payment_apps_guide_buy_clicked`
- `affiliate_klook_clicked`
- `contact_form_submitted`
- `whatsapp_contact_clicked`
- `purchase`

The newsletter event should appear only after a new contact is saved successfully. A
duplicate address, validation failure, provider error, or 503 response must not count.

## Recommended exploration

Create a free-form exploration with:

- Rows: Session source / medium, Session manual ad content
- Columns: Device category
- Filters: Session campaign exactly matches `china_first_trip_launch`
- Values: Sessions, Engaged sessions, Engagement rate, Event count, Key events, Purchase revenue

Add a second tab with **Landing page + query string** as rows and **Country** as a
breakdown. This reveals whether a post attracted the intended first-time traveler audience.

## Conversion interpretation

- High sessions, low engagement: the hook or audience is mismatched.
- High engagement, no checklist action: the CTA may be too quiet or the content answered
  the question without creating a useful next step.
- Checklist downloads, no newsletter event: verify the signup flow and provider response.
- Paid guide clicks, no purchase: review Payhip checkout continuity and product positioning.
- Klook clicks from transit or itinerary content: confirm the destination matches the route.
- Contact actions: review question themes manually; do not treat all questions as equal leads.

## Day 7 decision

Continue a format only when it produces either meaningful engagement or a downstream
action. Do not scale a platform based only on impressions. Record the decision and next
test in `weekly-report-template.csv`.

