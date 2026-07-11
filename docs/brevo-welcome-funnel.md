# Brevo welcome funnel

This document contains the production setup and English copy for the First China
Trip Kit five-email welcome sequence.

## Brevo account structure

- List name: `China First Trip Checklist - Website`
- Automation name: `First China Trip Welcome Series v1`
- Trigger: `Contact added to list`
- Re-entry: Off
- Sender name: `First China Trip Kit`
- Reply-to: a verified address controlled by First China Trip Kit
- Unsubscribe: use Brevo's standard unsubscribe block in every message
- Google Analytics tracking: On, with campaign name `welcome_series_v1`

The website adds a subscriber to the list through `POST /v3/contacts` with
`updateEnabled: true`. The automation must be active before a test subscriber is
added. Brevo only enrolls contacts who meet the list trigger after activation.

## Workflow timing

1. Contact added to `China First Trip Checklist - Website`
2. Send Email 1 immediately
3. Wait 2 days
4. Send Email 2
5. Wait 2 days
6. Send Email 3
7. Wait 3 days
8. Send Email 4
9. Wait 5 days
10. Send Email 5
11. End automation

## Email 1: Deliver the checklist

**Internal name:** `Welcome 01 - Checklist delivery`

**Subject:** Your China First Trip Checklist is ready

**Preview text:** Start with payment, apps, internet, hotel addresses, and arrival-day backups.

**Body:**

Welcome to First China Trip Kit.

Your free China First Trip Checklist is ready. It is designed for first-time
visitors who want the practical details sorted before the flight, without turning
trip planning into a second job.

Use the checklist to review:

- payment and cash backups;
- essential travel apps;
- eSIM or roaming preparation;
- your hotel address in Chinese;
- transport confirmations;
- food and emergency phrases.

**Primary button:** Download the free checklist

**URL:** `https://www.firstchinatripkit.com/thank-you?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day0_checklist`

Before you close the checklist, save your hotel name, Chinese address, and phone
number in an offline screenshot folder. That one step can make airport transfers,
taxis, and hotel check-in much easier.

First China Trip Kit provides travel planning information only. Always verify
current visa, entry, payment, and transport requirements with official sources.

## Email 2: Payment preparation

**Internal name:** `Welcome 02 - Payment stack`

**Subject:** Set up your China payment backup before you fly

**Preview text:** Do not rely on one app, one card, or one internet connection.

**Body:**

Many first-time visitors focus on installing Alipay or WeChat Pay. The more useful
goal is to build a payment stack with several layers.

Prepare:

1. Alipay with an international card, if supported.
2. WeChat Pay as an optional backup, if setup works.
3. A physical bank card for hotels and larger venues where accepted.
4. A small amount of RMB cash for arrival-day problems.

Card linking and payment-app support may vary by bank, card, account, merchant, and
current verification rules. Test a small purchase after arrival before depending
on mobile payment for taxis or dinner.

**Primary button:** Read the foreign visitor payment guide

**URL:** `https://www.firstchinatripkit.com/guides/how-to-pay-in-china-as-a-foreigner?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day2_payment`

Want the printable setup version? The $7 Payment & Apps Setup Guide includes a
payment failure decision tree, setup checklists, phrase cards, and offline backup
pages.

**Secondary link:** `https://www.firstchinatripkit.com/store?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day2_store`

## Email 3: Essential apps

**Internal name:** `Welcome 03 - Essential apps`

**Subject:** Install these China travel tools before arrival

**Preview text:** Payment, maps, translation, mobile data, trains, and offline backups.

**Body:**

Your phone becomes your payment wallet, map, translator, train folder, and taxi
backup in China. Install the core tools while you still have familiar internet and
time to check passwords or card verification.

The practical pre-arrival stack is:

- Alipay;
- WeChat;
- a translation app with offline language support;
- a map option you can use in China;
- eSIM or roaming access;
- Trip.com or another train-booking support option;
- an offline screenshot folder;
- a charged power bank.

You do not need every local app on day one. Add advanced tools only when they solve
a real problem for your route.

**Primary button:** Use the Essential Apps Checklist

**URL:** `https://www.firstchinatripkit.com/tools/essential-apps-checklist?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day4_apps_tool`

**Secondary link:** `https://www.firstchinatripkit.com/guides/best-apps-for-traveling-in-china?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day4_apps_guide`

## Email 4: Arrival-day plan

**Internal name:** `Welcome 04 - Arrival day`

**Subject:** Your first 90 minutes in China

**Preview text:** Test internet and payment before you are tired, hungry, or far from your hotel.

**Body:**

Arrival day is not the best time to troubleshoot every app. Keep the first 90
minutes simple.

1. Connect your eSIM, roaming, airport Wi-Fi, or hotel Wi-Fi.
2. Open your saved hotel address in Chinese.
3. Confirm the correct airport, railway station, or pickup point.
4. Reach your hotel and complete check-in.
5. Make a small convenience-store purchase to test payment.
6. Confirm the charge in your bank app.
7. Keep cash and your physical card available until the test succeeds.

If mobile data or payment fails, use your offline hotel card and ask airport or
hotel staff for help. Do not upload passport or banking information through links
sent by strangers.

**Primary button:** Start with the first-trip planning page

**URL:** `https://www.firstchinatripkit.com/start-here?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day7_start_here`

## Email 5: Choose a realistic route

**Internal name:** `Welcome 05 - City and route planning`

**Subject:** Choose fewer China stops and make them work better

**Preview text:** A realistic route leaves room for jet lag, station transfers, weather, and booking rules.

**Body:**

First-time China itineraries often become difficult because they include too many
cities, not because they include too few attractions.

As a starting point:

- 1 to 3 days: choose one city base;
- 4 to 5 days: one city plus a day trip, or two fast-paced cities;
- 6 to 8 days: two or three nearby cities;
- 9 to 12 days: a classic multi-city route becomes more realistic;
- 13 or more days: add slower travel or a specialist food, nature, or southern route.

Use the City Kits for hotel areas, local transport, food, and Chinese addresses.
Use the Itinerary Kits to compare pacing and transfers.

**Primary button:** Browse City Kits

**URL:** `https://www.firstchinatripkit.com/city-kits?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day12_city_kits`

**Secondary link:** `https://www.firstchinatripkit.com/itinerary-kits?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day12_itinerary_kits`

Still unsure? Send your passport country, travel month, trip length, and cities.

**Question link:** `https://www.firstchinatripkit.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome_series_v1&utm_content=day12_contact`

## Pre-activation checklist

- Verify the sender address in Brevo.
- Confirm the list ID matches `BREVO_LIST_ID` in Vercel.
- Confirm each email includes Brevo's unsubscribe block.
- Send test emails to an address controlled by the site owner.
- Check every button and UTM link.
- Confirm Email 1 arrives and the PDF link opens.
- Confirm the automation is active before testing a new subscriber.
- Keep re-entry disabled for this welcome series.
