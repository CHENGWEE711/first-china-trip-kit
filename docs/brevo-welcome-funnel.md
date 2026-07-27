# Phase 5 Brevo welcome sequence

This is the production configuration and English copy for the 60-day Phase 5
lead-nurture test. It supports both the free checklist and the China Arrival
Readiness Checker. All links use controlled UTM parameters.

## Configuration

- List: `China First Trip Checklist - Website`
- Automation: `First China Trip Arrival Series v2`
- Trigger: contact added to the list
- Re-entry: off
- Sender: `First China Trip Kit`
- Reply-to: verified site-owned mailbox
- Unsubscribe: Brevo standard block in every message
- Google Analytics tracking: on, campaign `arrival_series_v2`
- Required contact attributes: `FIRSTNAME`, `LEAD_SOURCE`, `LEAD_MAGNET`,
  `READINESS_SCORE` (number), `READINESS_RISK_LEVEL` (text), `UTM_SOURCE`,
  `UTM_MEDIUM`, `UTM_CAMPAIGN`, `UTM_CONTENT`, `LANDING_PAGE`,
  `CONSENT_TIMESTAMP`, plus the established `SIGNUP_PAGE` attribution field.
  `EMAIL` is Brevo's standard contact email field, not a custom attribute.
- Accepted lead-source values: `readiness_checker`, `free_checklist`, and
  `itinerary_review`. Create the attributes in Brevo before activation with
  the matching names and types.

The website submits only email, consent, acquisition metadata and lead-magnet
selection. It does not send passport numbers, bank card numbers or individual
readiness-checker answers to Brevo.

For preview QA, make a separate Preview list and duplicate the automation with
short waits. Restore the production waits below before any production
activation; never point a Preview deployment at a production list.

## Timing

1. Immediately: Email 1
2. Wait 2 days: Email 2
3. Wait 2 days: Email 3
4. Wait 3 days: Email 4
5. Wait 3 days: Email 5

## Email 1 - immediate delivery

**Subject:** Your China arrival checklist is ready

**Preview:** Start with entry, payment, apps, hotel details and an arrival-day backup.

Welcome to First China Trip Kit.

Your free planning checklist is ready. If you used the China Arrival Readiness
Checker, reopen it to see your score and personalised next steps; your answers
stay in your browser and are not included in this email.

Before your flight, save your hotel name, Chinese address, phone number and
booking confirmation in an offline folder. That one backup can make airport
transfers, taxis and late check-in much easier.

**Primary button:** Open your free checklist

`https://www.firstchinatripkit.com/thank-you?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day0_checklist`

**Secondary link:** Run the China Arrival Readiness Checker

`https://www.firstchinatripkit.com/tools/china-arrival-readiness-checker?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day0_checker`

## Email 2 - day 2: payment setup

**Subject:** Build a payment backup before you fly

**Preview:** Do not depend on one wallet, one card or one internet connection.

Set up your primary payment option before departure, but keep a second card,
physical card and a modest RMB cash backup. Card verification, limits and
merchant acceptance can vary by app, issuer and transaction.

Test one small purchase near your hotel before relying on your phone for a taxi
or restaurant payment. If it fails, use the immediate backup and troubleshoot on
stable Wi-Fi instead of repeatedly retrying at a counter.

**Primary button:** Read the payment guide

`https://www.firstchinatripkit.com/payments-and-apps?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day2_payments`

**Secondary link:** Foreign-card setup guide

`https://www.firstchinatripkit.com/guides/can-i-link-a-foreign-card-to-alipay-in-china?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day2_card_link`

## Email 3 - day 4: essential apps and internet

**Subject:** Install the essential China apps before arrival

**Preview:** Payment, maps, translation, data, rides and offline screenshots.

Your phone is likely to be your wallet, map, translator, train folder and taxi
backup. Install only the apps you will actually use, sign in while you have time
to recover passwords, and save key hotel and transport information as screenshots.

Choose an eSIM, roaming or local-data plan before arrival. Do not make the first
airport hour the first time you discover whether your phone is unlocked or an
app needs verification.

**Primary button:** Use the essential apps checklist

`https://www.firstchinatripkit.com/tools/essential-apps-checklist?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day4_apps_tool`

**Secondary link:** Read the app stack guide

`https://www.firstchinatripkit.com/guides/which-china-travel-apps-should-i-install-before-flying?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day4_apps_guide`

## Email 4 - day 7: itinerary and transport

**Subject:** Make your first transfer boring on purpose

**Preview:** Confirm the exact airport, station, hotel entrance and fallback route.

The first arrival transfer should be simple. Confirm the exact airport terminal
or railway station, save your hotel address in Chinese, choose a clear pickup
point and note one fallback route. For trains, use the exact station name and
the passport linked to the booking.

Leave room for queues, a wrong station entrance, jet lag and a low phone battery.
A practical plan is more valuable than packing in one extra attraction.

**Primary button:** Read the rail and transport guide

`https://www.firstchinatripkit.com/guides/how-do-foreigners-book-trains-and-rides-in-china?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day7_transport`

**Secondary link:** Compare realistic routes

`https://www.firstchinatripkit.com/itinerary-kits?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day7_itineraries`

## Email 5 - day 10: bundle offer

**Subject:** Want one printable plan for arrival day?

**Preview:** A $19 offline bundle for the details that are easy to forget before a first China arrival.

If you want a single printable system rather than another open tab, the China
Arrival Setup Bundle brings together the arrival-day command sheet, payment and
app backups, hotel-address plan, transport check and emergency offline folder.

It is for travellers who want a calm first 90 minutes after landing. It is not a
visa decision, payment guarantee or substitute for current official requirements.

**Primary button:** Preview the China Arrival Setup Bundle - $19

`https://www.firstchinatripkit.com/products/china-arrival-setup-bundle?utm_source=brevo&utm_medium=email&utm_campaign=arrival_series_v2&utm_content=day10_bundle`

## Pre-activation evidence

- Verify the sender and unsubscribe block.
- Confirm `BREVO_LIST_ID` and the listed attributes match Brevo exactly.
- Activate the automation before adding a new test contact.
- Send a test to a controlled inbox and confirm all five UTM links.
- Confirm Email 1 reaches both checklist and checker leads.
- Confirm the visible unsubscribe link and that replies reach the verified
  Reply-to mailbox.
- Record the test contact, timestamps, delivery status and all clicked URLs in
  the Phase 5.1 Preview Integration Report. Do not put a full email address in
  that report.
