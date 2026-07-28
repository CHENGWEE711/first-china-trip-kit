import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const bundleFiles = [
  "00_READ_ME_FIRST.pdf",
  "01_CHINA_ARRIVAL_SETUP_GUIDE.pdf",
  "02_PAYMENT_AND_APPS_SETUP_GUIDE.pdf",
  "03_MOBILE_QUICK_CARDS.pdf",
  "04_MY_CHINA_ARRIVAL_SHEET.pdf",
  "05_TROUBLESHOOTING_DECISION_TREES.pdf",
  "06_OFFLINE_CHECKLIST_AND_SOURCES.pdf",
];

test("Phase 5.2 keeps the $19 Bundle structurally distinct and includes the complete $7 guide", async () => {
  const [products, landing, comparison, readiness] = await Promise.all([
    readFile(new URL("data/products.ts", root), "utf8"),
    readFile(new URL("app/products/china-arrival-setup-bundle/page.tsx", root), "utf8"),
    readFile(new URL("components/ProductLadderComparison.tsx", root), "utf8"),
    readFile(new URL("components/ArrivalReadinessChecker.tsx", root), "utf8"),
  ]);

  assert.match(products, /Complete \$7 Payment & Apps Setup Guide/);
  assert.match(landing, /includes the complete \$7 Payment & Apps Guide/);
  assert.match(landing, /Seven focused files/);
  assert.match(landing, /Real inner-page previews/);
  assert.match(comparison, /The \$19 Bundle includes the complete \$7 Payment/);
  assert.match(comparison, /Fillable Arrival Sheet/);
  assert.match(readiness, /Targeted Bundle modules/);
  assert.match(readiness, /china-first-time-visitor-checklist\.pdf/);
  assert.doesNotMatch(readiness, /products\/china-arrival-setup-bundle\.pdf/);
});

test("Phase 5.2 delivery manifest and its public previews have the expected stable files", async () => {
  const generator = await readFile(new URL("scripts/generate-arrival-setup-bundle-package.py", root), "utf8");
  for (const filename of bundleFiles) {
    assert.match(generator, new RegExp(filename.replace(/[.]/g, "\\.")), `${filename} should be part of the delivery manifest`);
  }
  assert.match(generator, /OUT = Path\("product-assets\/china-arrival-setup-bundle"\)/);
  assert.match(generator, /def ensure_payment_guide\(\)/);
  for (const filename of [
    "arrival-bundle-v2-setup-routes.png",
    "arrival-bundle-v2-payment-tree.png",
    "arrival-bundle-v2-address-card.png",
    "arrival-bundle-v2-first-24-hours.png",
    "arrival-bundle-v2-arrival-sheet.png",
  ]) {
    const file = new URL(`public/products/previews/${filename}`, root);
    await access(file);
    assert.ok((await stat(file)).size > 1000, `${filename} should be a real preview image`);
  }
});

test("Phase 5.2 generator validates privacy, links, form fields and the $7 sync rule", async () => {
  const source = await readFile(new URL("scripts/generate-arrival-setup-bundle-package.py", root), "utf8");
  assert.match(source, /PRODUCT_VERSION = "2\.0"/);
  assert.match(source, /get_fields\(\)/);
  assert.match(source, /traveler_name/);
  assert.match(source, /destination\.read_bytes\(\) != PAYMENT_GUIDE\.read_bytes\(\)/);
  assert.match(source, /Blank page found/);
  assert.match(source, /get_uri_links/);
  assert.match(source, /Mobile Quick Cards/);
});
