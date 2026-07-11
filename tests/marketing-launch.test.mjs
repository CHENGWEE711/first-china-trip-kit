import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { buildUtmUrl } from "../scripts/build-utm-url.mjs";

const root = new URL("../", import.meta.url);

test("UTM builder normalizes values and preserves existing query parameters", () => {
  const value = buildUtmUrl({
    url: "https://www.firstchinatripkit.com/guides/example?ref=launch",
    source: "Reddit",
    medium: "Social",
    campaign: "China First Trip Launch",
    content: "Day 1 Payment Stack",
  });
  const url = new URL(value);

  assert.equal(url.searchParams.get("ref"), "launch");
  assert.equal(url.searchParams.get("utm_source"), "reddit");
  assert.equal(url.searchParams.get("utm_medium"), "social");
  assert.equal(url.searchParams.get("utm_campaign"), "china_first_trip_launch");
  assert.equal(url.searchParams.get("utm_content"), "day_1_payment_stack");
});

test("UTM builder rejects missing required values", () => {
  assert.throws(
    () =>
      buildUtmUrl({
        url: "https://www.firstchinatripkit.com/",
        source: "",
        medium: "social",
        campaign: "china_first_trip_launch",
        content: "launch",
      }),
    /source must not be empty/,
  );
});

test("Klook links emit the dedicated event without changing their destination", async () => {
  const affiliateLink = await readFile(new URL("components/AffiliateLink.tsx", root), "utf8");

  assert.match(affiliateLink, /trackEvent\("affiliate_klook_clicked"/);
  assert.match(affiliateLink, /destination: resolvedAffiliateUrl/);
  assert.match(affiliateLink, /offer_type/);
  assert.match(affiliateLink, /offer_name/);
  assert.match(affiliateLink, /"sponsored noopener noreferrer"/);
});

test("Brevo newsletter attributes include complete launch attribution", async () => {
  const newsletter = await readFile(new URL("lib/services/newsletter.ts", root), "utf8");
  const route = await readFile(new URL("app/api/newsletter/route.ts", root), "utf8");

  for (const attribute of [
    "UTM_SOURCE",
    "UTM_MEDIUM",
    "UTM_CAMPAIGN",
    "UTM_CONTENT",
    "SIGNUP_PAGE",
    "LEAD_MAGNET",
    "CONSENT_TIMESTAMP",
  ]) {
    assert.match(newsletter, new RegExp(attribute));
  }
  assert.match(route, /utm_content/);
});
