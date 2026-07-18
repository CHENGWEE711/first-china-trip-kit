import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

async function importTranspiled(file, replacements = [], preamble = "") {
  let source = read(file);
  for (const [pattern, replacement] of replacements) source = source.replace(pattern, replacement);
  const output = ts.transpileModule(`${preamble}\n${source}`, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
}

const imagesModule = await importTranspiled("data/images.ts");
const itinerariesModule = await importTranspiled(
  "data/itineraries.ts",
  [[
    /import\s*\{\s*itineraryVisuals,\s*type\s+ContentImage\s*\}\s*from\s*["']@\/data\/images["'];?/,
    "",
  ]],
  `const itineraryVisuals = ${JSON.stringify(imagesModule.itineraryVisuals)};`,
);
const kitsModule = await importTranspiled("data/kits.ts");
const seoModule = await importTranspiled(
  "lib/seo.ts",
  [[
    /import\s*\{\s*absoluteUrl,\s*siteConfig\s*\}\s*from\s*["']@\/lib\/site["'];?/,
    "",
  ]],
  `const absoluteUrl = (value) => new URL(value, "https://www.firstchinatripkit.com").toString();
   const siteConfig = { name: "First China Trip Kit", siteUrl: "https://www.firstchinatripkit.com" };`,
);

test("Itinerary Kits emits one valid canonical ItemList matching the visible order", () => {
  const itineraries = kitsModule.itineraryKitSlugs.map((slug) =>
    itinerariesModule.itineraries.find((itinerary) => itinerary.slug === slug),
  );
  assert.equal(itineraries.every(Boolean), true);
  const schema = seoModule.itineraryCollectionJsonLd(itineraries);
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "ItemList");
  assert.equal(schema.numberOfItems, itineraries.length);
  assert.equal(schema.itemListElement.length, itineraries.length);
  assert.deepEqual(schema.itemListElement.map((item) => item.position), itineraries.map((_, index) => index + 1));
  assert.deepEqual(
    schema.itemListElement.map((item) => item.url),
    itineraries.map((itinerary) => `https://www.firstchinatripkit.com/itinerary-kits/${itinerary.slug}`),
  );
  assert.deepEqual(
    schema.itemListElement.map((item) => item.image),
    itineraries.map((itinerary) => `https://www.firstchinatripkit.com${itinerary.cardImage.src}`),
  );
  assert.doesNotMatch(JSON.stringify(schema), /firstchinatripkit\.com\/itineraries(?:\/|\")/);
  assert.match(read("app/itinerary-kits/page.tsx"), /<SEOJsonLd data=\{itemListSchema\}/);
});

test("Every Phase E low-width photography asset now clears 1400px without interpolation", async () => {
  const files = [
    "public/images/cities/shenzhen-skyline.webp",
    "public/images/itineraries/classic-china/day-1-beijing-hutong.webp",
    "public/images/itineraries/classic-china/day-5-terracotta-warriors.webp",
    "public/images/itineraries/classic-china/day-6-shanghai-bund.webp",
    "public/images/itineraries/classic-china/day-8-hangzhou-west-lake.webp",
    "public/images/itineraries/classic-china/day-9-shanghai-museum.webp",
  ];
  for (const file of files) {
    const metadata = await sharp(path.join(root, file)).metadata();
    assert.equal(metadata.format, "webp", file);
    assert.ok((metadata.width || 0) >= 1400, `${file} width`);
    assert.ok(fs.statSync(path.join(root, file)).size <= 700 * 1024, `${file} weight`);
  }
});

test("Classic China provenance uses exact Unsplash photo pages with a fresh verification date", () => {
  const credits = JSON.parse(read("data/image-credits.json"));
  const ids = [
    "unsplash-classic-day1-beijing-hutong",
    "unsplash-classic-day2-forbidden-city",
    "unsplash-classic-day7-yu-garden",
    "unsplash-classic-day8-hangzhou-west-lake",
  ];
  for (const id of ids) {
    const credit = credits.find((item) => item.creditId === id);
    assert.ok(credit, id);
    assert.match(credit.sourcePage, /^https:\/\/unsplash\.com\/photos\//);
    assert.doesNotMatch(credit.sourcePage, /\/s\/photos\//);
    assert.ok(credit.photographer, `${id} photographer`);
    assert.equal(credit.verificationDate, "2026-07-14");
  }
});

test("Policy and Shanghai Guides are explicitly separated from their executable itineraries", () => {
  const guideTemplate = read("components/GuideTemplate.tsx");
  const itineraryPage = read("app/itinerary-kits/[slug]/page.tsx");
  for (const href of [
    "/itinerary-kits/240-hour-visa-free-china-itinerary",
    "/itinerary-kits/3-days-in-shanghai",
  ]) {
    assert.ok(guideTemplate.includes(href), href);
  }
  for (const href of [
    "/guides/china-240-hour-visa-free-transit-guide",
    "/guides/3-days-in-shanghai-for-first-time-visitors",
  ]) {
    assert.ok(itineraryPage.includes(href), href);
  }
  assert.match(guideTemplate, /explains eligibility and policy checks/);
  assert.match(itineraryPage, /route planning, not an eligibility decision/);
});

test("Store explains how the Payhip checklist remains free", () => {
  const storePage = read("app/store/page.tsx");
  assert.match(storePage, /Download the checklist for free, or optionally support future updates through Payhip/);
  assert.match(storePage, /Download Free Checklist/);
});

test("commercial outbound buttons add website attribution without changing internal links", () => {
  const actionButton = read("components/ProductActionButton.tsx");
  const checklistLink = read("components/PayhipChecklistLink.tsx");
  const coffeeTipLink = read("components/CoffeeTipLink.tsx");
  for (const source of [actionButton, checklistLink, coffeeTipLink]) {
    assert.match(source, /buildUtmUrl/);
    assert.match(source, /utm_source: "firstchinatripkit"/);
    assert.match(source, /utm_medium: "website"/);
    assert.match(source, /utm_content:/);
  }
  assert.match(actionButton, /payhip\\\.com/);
  assert.match(actionButton, /: href;/);
});
