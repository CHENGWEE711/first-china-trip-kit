import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { phase5GuideDetails } from "../data/phase5-guide-details.ts";
import { phase5GuideEntries } from "../data/phase5-guides.ts";

const root = new URL("../", import.meta.url);

test("Phase 5 publishes nine distinct high-intent guides with source, date and checker CTA contracts", () => {
  assert.equal(phase5GuideEntries.length, 9);
  assert.equal(new Set(phase5GuideEntries.map((guide) => guide.slug)).size, 9);

  const topicCounts = phase5GuideEntries.reduce((counts, guide) => {
    counts[guide.category] = (counts[guide.category] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(topicCounts, { Payment: 3, Apps: 3, "Visa & Entry": 3 });

  for (const guide of phase5GuideEntries) {
    const detail = phase5GuideDetails[guide.slug];
    assert.ok(detail, `Missing extended detail for ${guide.slug}`);
    assert.ok(detail.quickAnswer.split(/\s+/).length >= 25, `${guide.slug} needs a direct opening answer`);
    assert.ok(detail.steps.length >= 3, `${guide.slug} needs operational steps`);
    assert.ok(detail.commonMistakes.length >= 2, `${guide.slug} needs failure handling`);
    assert.equal(detail.lastVerified, "2026-07-27");
    assert.ok(detail.officialSourceLinks.some((source) => source.href.startsWith("https://")));
    assert.ok(detail.ctaLinks.some((link) => link.href === "/tools/china-arrival-readiness-checker"));
  }
});

test("Phase 5 bundle, measurement and sitemap contracts keep conversion and reporting honest", async () => {
  const [bundlePage, productActions, products, payhip, sitemap, dashboard] = await Promise.all([
    readFile(new URL("app/products/china-arrival-setup-bundle/page.tsx", root), "utf8"),
    readFile(new URL("components/ProductActionButton.tsx", root), "utf8"),
    readFile(new URL("data/products.ts", root), "utf8"),
    readFile(new URL("lib/payhip.ts", root), "utf8"),
    readFile(new URL("app/sitemap.ts", root), "utf8"),
    readFile(new URL("app/growth-dashboard/page.tsx", root), "utf8"),
  ]);

  assert.match(bundlePage, /arrival_bundle_viewed/);
  assert.match(bundlePage, /arrival_bundle_buy_clicked/);
  assert.match(payhip, /NEXT_PUBLIC_PAYHIP_FREE_CHECKLIST_URL/);
  assert.match(payhip, /NEXT_PUBLIC_PAYHIP_PAYMENT_GUIDE_URL/);
  assert.match(payhip, /NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL/);
  assert.match(bundlePage, /Open the real PDF preview/);
  assert.match(products, /China Arrival Setup Bundle/);
  assert.match(products, /price: "\$19"/);
  assert.match(products, /checkoutProvider: "payhip"/);
  assert.match(productActions, /destination_type: isExternal \? "payhip" : "internal"/);
  assert.match(productActions, /China Arrival Setup Bundle/);
  assert.doesNotMatch(productActions, /destination_url/);
  assert.match(sitemap, /china-arrival-setup-bundle/);
  assert.match(dashboard, /index: false, follow: false/);
  assert.match(dashboard, /Awaiting verified weekly import/);
});
