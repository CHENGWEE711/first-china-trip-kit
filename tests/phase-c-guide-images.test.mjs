import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

async function importTranspiled(file) {
  const output = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
}

function readVariable(file, variableName) {
  const sourceText = read(file);
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
  let initializer;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) {
        initializer = declaration.initializer;
      }
    }
  });
  if (!initializer) throw new Error(`Could not find ${variableName}`);
  return initializer.getText(sourceFile);
}

const { guideVisuals } = await importTranspiled("data/images.ts");
const guideEntries = Function(`"use strict"; return (${readVariable("data/guides.ts", "guideEntries")});`)();
const guideDetails = Function(
  "chinaTravelAppGroups",
  `"use strict"; return (${readVariable("data/guide-detail-content.ts", "guideDetailContent")});`,
)([]);
const credits = JSON.parse(read("data/image-credits.json"));
const creditById = new Map(credits.map((credit) => [credit.creditId, credit]));
const slugs = guideEntries.map((guide) => guide.slug);

const heroKeywords = {
  "how-to-pay-in-china-as-a-foreigner": /QR|checkout|payment/i,
  "best-apps-for-traveling-in-china": /smartphone|phone|metro/i,
  "how-to-book-high-speed-trains-in-china": /CRH|high-speed train|railway/i,
  "how-to-use-alipay-and-wechat-pay-in-china": /merchant QR|payment/i,
  "china-travel-packing-list": /passport|travel essentials|packing/i,
  "basic-chinese-phrases-for-travelers": /smartphone|restaurant/i,
  "china-esim-guide-for-tourists": /smartphone|airport|connectivity/i,
  "china-food-ordering-guide": /food|menu|Shanghai street stall/i,
  "can-americans-travel-to-china-in-2026": /international passengers|airport/i,
  "china-240-hour-visa-free-transit-guide": /boarding pass|airport|transit/i,
  "how-to-use-alipay-in-china-as-a-tourist": /QR|payment/i,
  "how-to-use-wechat-pay-in-china-as-a-foreigner": /smartphone|cafe|merchant/i,
  "3-days-in-shanghai-for-first-time-visitors": /Shanghai/i,
  "china-travel-checklist-before-you-fly": /passport|boarding pass|pre-flight/i,
};

test("Phase C gives every public Guide a distinct semantic Hero and Card", () => {
  assert.equal(slugs.length, 14);
  assert.deepEqual(Object.keys(guideVisuals).sort(), [...slugs].sort());
  const heroes = slugs.map((slug) => guideVisuals[slug].heroImage.src);
  const cards = slugs.map((slug) => guideVisuals[slug].featuredImage.src);
  assert.equal(new Set(heroes).size, slugs.length);
  assert.equal(new Set(cards).size, slugs.length);

  for (const slug of slugs) {
    const visual = guideVisuals[slug];
    assert.notEqual(visual.heroImage.src, visual.featuredImage.src, `${slug} uses a dedicated Card crop`);
    assert.match(visual.heroImage.alt, heroKeywords[slug], `${slug} Hero alt matches its topic`);
    assert.match(visual.featuredImage.alt, heroKeywords[slug], `${slug} Card alt matches its topic`);
  }
});

test("Phase C Hero and Card files meet format, resolution, size, and provenance rules", async () => {
  for (const slug of slugs) {
    const visual = guideVisuals[slug];
    for (const [role, image] of [["hero", visual.heroImage], ["card", visual.featuredImage]]) {
      const file = path.join(root, "public", image.src);
      assert.equal(fs.existsSync(file), true, `${slug} ${role} exists`);
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.format, "webp", `${slug} ${role} format`);
      assert.ok((metadata.width || 0) >= (role === "hero" ? 2000 : 1400), `${slug} ${role} width`);
      assert.ok(fs.statSync(file).size <= 700 * 1024, `${slug} ${role} stays below 700KB`);

      const credit = creditById.get(image.creditId);
      assert.ok(credit, `${slug} ${role} credit`);
      assert.equal(credit.localFile, image.src, `${slug} ${role} credit path`);
      assert.equal(credit.licenseChecked, true, `${slug} ${role} license`);
      assert.match(credit.sourcePage, /^https:\/\/www\.pexels\.com\/photo\/.+-\d+\/$/);
      assert.doesNotMatch(credit.sourcePage, /search|\/s\/photos\//i);
      for (const field of ["sourcePlatform", "photographer", "downloadDate", "usage", "licenseUrl"]) {
        assert.ok(credit[field], `${slug} ${role} ${field}`);
      }
    }
  }
});

test("Guide inline imagery is optional, limited, placed intentionally, and fully traceable", () => {
  const validPlacements = new Set(["before-steps", "before-common-mistakes", "before-details"]);
  for (const slug of slugs) {
    const visual = guideVisuals[slug];
    assert.ok(visual.inlineImages.length >= 0 && visual.inlineImages.length <= 4, `${slug} uses 0-4 inline images`);
    assert.equal(new Set(visual.inlineImages.map((image) => image.src)).size, visual.inlineImages.length, `${slug} inline src unique`);
    for (const image of visual.inlineImages) {
      assert.ok(validPlacements.has(image.placement), `${slug} placement`);
      assert.ok(image.alt.trim(), `${slug} inline alt`);
      assert.ok(image.caption?.trim(), `${slug} inline caption`);
      assert.equal(fs.existsSync(path.join(root, "public", image.src)), true, `${slug} inline file`);
      assert.ok(creditById.has(image.creditId), `${slug} inline credit`);
      assert.notEqual(image.src, visual.heroImage.src);
      assert.notEqual(image.src, visual.featuredImage.src);
    }
  }
});

test("Time-sensitive Guide content uses current sources and cautious claims", () => {
  const detailsSource = read("data/guide-detail-content.ts");
  const americans = guideDetails["can-americans-travel-to-china-in-2026"];
  const transit = guideDetails["china-240-hour-visa-free-transit-guide"];
  const esim = guideDetails["china-esim-guide-for-tourists"];

  assert.equal(americans.lastVerified, "2026-07-13");
  assert.match(americans.quickAnswer, /U\.S\. passports are not included.*50-country unilateral 30-day visa-free list/i);
  assert.ok(americans.officialSourceLinks.some((link) => link.href.includes("t20250920_11712385")));
  assert.ok(americans.officialSourceLinks.some((link) => link.href.includes("t20241224_11516392")));
  assert.equal(transit.lastVerified, "2026-07-13");
  assert.match(transit.quickAnswer, /55 eligible nationalities.*65 entry ports.*24 provincial-level regions/i);
  assert.match(esim.importantNotice, /no provider, app or VPN is guaranteed/i);
  assert.doesNotMatch(detailsSource, /\b54 countries\b|\b60 (eligible )?ports\b/i);
  assert.doesNotMatch(detailsSource, /guaranteed (visa|entry)|always eligible/i);
  assert.doesNotMatch(detailsSource, /content_WS6617c858c6d0868f4e8e5f4d\.html/);
});

test("Guide SEO uses a dedicated 2400x1600 Hero for OG, Twitter, and Article JSON-LD", () => {
  const page = read("app/guides/[slug]/page.tsx");
  const seo = read("lib/seo.ts");
  assert.match(page, /image: guide\.heroImage\.src/);
  assert.match(page, /imageWidth: 2400/);
  assert.match(page, /imageHeight: 1600/);
  assert.match(seo, /image: guide\.heroImage\.src/);
  assert.match(seo, /publishedAt: guide\.publishedAt/);
  assert.match(seo, /datePublished: input\.publishedAt \|\| input\.updatedAt/);
});

test("Guide-scope first-party CTA asset has an explicit internal provenance record", () => {
  const record = creditById.get("internal-payment-apps-guide-store-cover");
  assert.ok(record);
  assert.equal(record.assetType, "internal");
  assert.equal(record.sourceOwner, "First China Trip Kit");
  assert.equal(record.localFile, "/products/previews/payment-apps-guide-store-cover.png");
  assert.ok(record.generatedBy);
  assert.equal(record.verificationDate, "2026-07-13");
});

test("Payment visuals are sourced photography and do not include simulated app interface assets", () => {
  const paymentSlugs = slugs.filter((slug) => /pay|alipay|wechat/.test(slug));
  for (const slug of paymentSlugs) {
    const visual = guideVisuals[slug];
    for (const image of [visual.heroImage, visual.featuredImage, ...visual.inlineImages]) {
      assert.doesNotMatch(image.src, /screenshot|mockup|generated|interface/i);
      const credit = creditById.get(image.creditId);
      assert.notEqual(credit?.assetType, "generated");
    }
  }
});

