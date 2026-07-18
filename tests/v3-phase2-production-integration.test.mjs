import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("all general payment and apps entry points resolve to the Hub", () => {
  const sources = [
    "app/page.tsx",
    "components/StartHerePath.tsx",
    "components/Footer.tsx",
    "lib/site.ts",
    "app/store/page.tsx",
    "app/thank-you/page.tsx",
    "data/kits.ts",
    "components/GuideTemplate.tsx",
  ].map(read).join("\n");

  assert.match(sources, /Payments & Apps/);
  for (const anchor of ["#payments", "#apps", "#internet"]) {
    assert.match(sources, new RegExp(`/payments-and-apps${anchor}`));
  }
  assert.match(read("lib/site.ts"), /href: "\/payments-and-apps", label: "Payments & Apps"/);
  assert.match(read("app/store/page.tsx"), /Start with the free Payments & Apps Hub/);
  assert.match(read("docs/brevo-welcome-funnel.md"), /firstchinatripkit\.com\/payments-and-apps\?utm_source=brevo/);
});

test("unconfigured affiliate modules disappear without an empty visitor shell", () => {
  const source = read("components/GuideAffiliateRecommendations.tsx");
  assert.match(source, /recommendations\[guideSlug\]\?\.filter/);
  assert.match(source, /getAffiliatePartner\(item\.partner\)\.enabled/);
  assert.match(source, /if \(!items\?\.length\) return null/);
  assert.doesNotMatch(source, /hasEnabledPartner/);
});

test("Store contains customer language and one responsive comparison DOM", () => {
  const source = read("app/store/page.tsx");
  assert.match(source, /Secure checkout and instant digital delivery through Payhip/);
  assert.match(source, /Download the checklist for free, or optionally support future updates through Payhip/);
  assert.equal((source.match(/freeVsPaidRows\.map/g) || []).length, 1);
  for (const phrase of [
    "Products open through Payhip when a public product link is configured.",
    "Payhip can also be used for $0+ pay-what-you-want support when configured.",
    "A verified partner link has not been configured yet.",
    "Partner link not configured",
    "public product link",
    "environment",
    "partner link",
  ]) assert.doesNotMatch(source, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
});

test("Related Guides render each target Guide featuredImage without fallbacks", () => {
  const card = read("components/GuideCard.tsx");
  const template = read("components/GuideTemplate.tsx");
  const route = read("app/guides/[slug]/page.tsx");
  const imageData = read("data/images.ts");

  assert.match(card, /const image = guide\.featuredImage/);
  assert.match(template, /<GuideCard[^>]+guide=\{relatedGuide\}/);
  assert.match(route, /relatedGuideSlugs\s*\.map/);
  assert.match(route, /guides\.find\(\(candidate\) => candidate\.slug === relatedSlug\)/);
  assert.match(imageData, /featuredImage:\s*image\([\s\S]*?`\/images\/guides\/phase-c\/\$\{slug\}\/card\.webp`/);
  assert.match(imageData, /"best-apps-for-traveling-in-china":\s*\{[\s\S]*?phaseCPrimaryVisuals\([\s\S]*?"best-apps-for-traveling-in-china"/);
  assert.match(imageData, /"how-to-use-alipay-in-china-as-a-tourist":\s*\{[\s\S]*?phaseCPrimaryVisuals\([\s\S]*?"how-to-use-alipay-in-china-as-a-tourist"/);
  assert.doesNotMatch(`${card}\n${template}\n${route}`, /categoryFallback|defaultFoodImage|currentPageImage/);
});

test("newsletter and active social payment defaults use the Hub with their existing UTM", () => {
  const files = [
    "docs/brevo-welcome-funnel.md",
    "docs/analytics-growth-setup.md",
    "docs/marketing/china-first-trip-launch/post-copy.md",
    "docs/marketing/china-first-trip-launch/utm-links.csv",
    "docs/marketing/china-first-trip-launch/video-scripts.md",
  ].map(read).join("\n");

  assert.match(files, /firstchinatripkit\.com\/payments-and-apps\?utm_source=/);
  assert.doesNotMatch(files, /guides\/how-to-pay-in-china-as-a-foreigner\?utm_source=/);
});
