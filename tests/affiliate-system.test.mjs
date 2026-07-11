import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("affiliate partners stay disabled without verified URLs", async () => {
  const { affiliatePartnerOrder, affiliatePartners } = await import(
    new URL("../config/affiliate.ts", import.meta.url)
  );

  assert.deepEqual(affiliatePartnerOrder, ["airalo", "booking", "klook", "safetywing"]);
  for (const partner of affiliatePartnerOrder) {
    assert.equal(affiliatePartners[partner].affiliateUrl, "");
    assert.equal(affiliatePartners[partner].enabled, false);
  }
});

test("affiliate links use safe sponsored attributes and the shared event", async () => {
  const source = await readFile(new URL("components/AffiliateLink.tsx", root), "utf8");

  assert.match(source, /sponsored nofollow noopener noreferrer/);
  assert.match(source, /sponsored noopener noreferrer/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /trackEvent\("affiliate_click"/);
  for (const field of [
    "affiliate_partner",
    "affiliate_category",
    "affiliate_campaign",
    "link_label",
    "link_position",
    "page_location",
    "page_path",
    "destination_url",
  ]) {
    assert.match(source, new RegExp(field));
  }
  assert.match(source, /aria-disabled="true"/);
});

test("city Klook links support safe overrides with a generic fallback", async () => {
  const config = await readFile(new URL("config/affiliate.ts", root), "utf8");
  const cityCards = await readFile(
    new URL("components/CityPlanYourStay.tsx", root),
    "utf8"
  );

  assert.match(config, /NEXT_PUBLIC_AFFILIATE_KLOOK_SHANGHAI_URL/);
  assert.match(config, /getKlookCityAffiliateUrl/);
  assert.match(config, /affiliateUrlOverride\?\.trim\(\) \|\| configuredUrls\[partner\]\.trim\(\)/);
  assert.match(cityCards, /affiliateUrl=\{klookCityAffiliateUrl\}/);
});

test("WhatsApp username and official short links render safely", async () => {
  const { isValidWhatsAppContactUrl } = await import(
    new URL("../lib/whatsapp.ts", import.meta.url)
  );

  assert.equal(isValidWhatsAppContactUrl("https://wa.me/firstchinatripkit"), true);
  assert.equal(isValidWhatsAppContactUrl("https://wa.me/message/ABC123"), true);
  assert.equal(isValidWhatsAppContactUrl("https://example.com/contact"), false);
});

test("public affiliate routes are included in the sitemap and footer", async () => {
  const sitemap = await readFile(new URL("app/sitemap.ts", root), "utf8");
  const footer = await readFile(new URL("components/Footer.tsx", root), "utf8");

  assert.match(sitemap, /"\/travel-tools"/);
  assert.match(sitemap, /"\/affiliate-disclosure"/);
  assert.match(footer, /href="\/affiliate-disclosure"/);
});
