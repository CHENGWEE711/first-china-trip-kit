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
const citiesModule = await importTranspiled(
  "data/cities.ts",
  [[/import\s*\{\s*destinationVisuals,\s*type\s+ContentImage\s*\}\s*from\s*["']@\/data\/images["'];?/, ""]],
  `const destinationVisuals = ${JSON.stringify(imagesModule.destinationVisuals)};`,
);
const { cities } = citiesModule;
const credits = JSON.parse(read("data/image-credits.json"));
const creditByPath = new Map(credits.map((credit) => [credit.localFile, credit]));
const expectedCities = [
  "shanghai",
  "beijing",
  "xian",
  "chengdu",
  "hangzhou",
  "suzhou",
  "guangzhou",
  "shenzhen",
];

test("Phase D generates every current destination with a complete explicit visual set", () => {
  assert.deepEqual(cities.map((city) => city.slug), expectedCities);
  assert.deepEqual(Object.keys(imagesModule.destinationVisuals), expectedCities);
  for (const city of cities) {
    assert.ok(city.heroImage);
    assert.ok(city.cardImage);
    assert.ok(city.attractionImages.length >= 2, city.slug);
    assert.ok(city.foodImage, `${city.slug} food visual`);
    assert.ok(city.transportImage, `${city.slug} transport visual`);
  }
});

test("Destination Hero and Card sources are unique and use separate crops", () => {
  const heroes = cities.map((city) => city.heroImage.src);
  const cards = cities.map((city) => city.cardImage.src);
  assert.equal(new Set(heroes).size, cities.length);
  assert.equal(new Set(cards).size, cities.length);
  for (const city of cities) assert.notEqual(city.heroImage.src, city.cardImage.src, city.slug);
});

test("Destination Hero and Card files meet Phase D format, resolution, weight, and provenance rules", async () => {
  for (const city of cities) {
    for (const [role, image, minimumWidth] of [
      ["hero", city.heroImage, 2000],
      ["card", city.cardImage, 1400],
    ]) {
      const file = path.join(root, "public", image.src);
      assert.equal(fs.existsSync(file), true, `${city.slug} ${role} exists`);
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.format, "webp", `${city.slug} ${role} format`);
      assert.ok((metadata.width || 0) >= minimumWidth, `${city.slug} ${role} width`);
      assert.ok((metadata.width || 0) > 0 && (metadata.height || 0) > 0, `${city.slug} ${role} decodes`);
      assert.ok(fs.statSync(file).size <= 700 * 1024, `${city.slug} ${role} weight`);
      const credit = creditByPath.get(image.src);
      assert.ok(credit, `${city.slug} ${role} provenance`);
      assert.equal(credit.licenseChecked, true, `${city.slug} ${role} license`);
    }
  }
});

test("Destination alt text identifies the city or a city-specific scene", () => {
  const sceneKeywords = {
    shanghai: /Shanghai|Bund|Huangpu/i,
    beijing: /Beijing|Temple of Heaven|hutong/i,
    xian: /Xi'an|Terracotta|Bell Tower/i,
    chengdu: /Chengdu|panda|Sichuan/i,
    hangzhou: /Hangzhou|West Lake|Longjing/i,
    suzhou: /Suzhou|canal|classical garden/i,
    guangzhou: /Guangzhou|Canton Tower|Pearl River/i,
    shenzhen: /Shenzhen|Shenzhen Bay/i,
  };
  for (const city of cities) {
    assert.match(city.heroImage.alt, sceneKeywords[city.slug], `${city.slug} Hero alt`);
    assert.match(city.cardImage.alt, sceneKeywords[city.slug], `${city.slug} Card alt`);
  }
});

test("Homepage uses its own Hero and real target image data without a fallback map", () => {
  const home = read("app/page.tsx");
  assert.match(home, /publicPageImages\.homeHero/);
  assert.match(home, /src=\{city\.heroImage\.src\}/);
  assert.match(home, /src=\{item\.image\.src\}/);
  assert.match(home, /<GuideCard/);
  assert.doesNotMatch(home, /cityImages\s*[:=]|fallbackImage|fallback.*image/i);
  assert.notEqual(imagesModule.publicPageImages.homeHero.src, cities[0].heroImage.src);
});

test("Start Here preserves the exact eight-step action path and browser-only progress", () => {
  const start = read("components/StartHerePath.tsx");
  const labels = [
    "Check entry rules",
    "Set up payment",
    "Install essential apps",
    "Prepare internet access",
    "Plan trains and transport",
    "Save addresses and Chinese phrases",
    "Download the checklist",
    "Choose a city or itinerary",
  ];
  let cursor = -1;
  for (const label of labels) {
    const next = start.indexOf(label);
    assert.ok(next > cursor, label);
    cursor = next;
  }
  assert.match(start, /localStorage/);
  assert.match(start, /saved only in this browser/i);
});

test("Store separates free and $7 products and never exposes an inactive paid checkout", () => {
  const store = read("app/store/page.tsx");
  const card = read("components/ProductCard.tsx");
  assert.match(store, /Download Free Checklist/);
  assert.match(store, /Payment & Apps Guide — \$7/);
  assert.match(store, /paymentGuideBuyUrl \?/);
  assert.match(card, /checkoutUnavailable/);
  assert.match(card, /Secure checkout is temporarily unavailable/);
  assert.doesNotMatch(store, /countdown|limited-time discount|verified review/i);
});

test("Tools expose empty states, copyable results, labels, and a privacy boundary", () => {
  const widget = read("components/ToolKitWidget.tsx");
  const detail = read("app/tools/[slug]/page.tsx");
  assert.match(widget, /Copy result/);
  assert.match(widget, /Choose a trip length above/);
  assert.match(widget, /Choose a travel style above/);
  assert.match(widget, /Nothing is selected yet/);
  assert.match(widget, /aria-live="polite"/);
  assert.match(detail, /Your answers stay in this browser/);
  assert.match(detail, /does not ask for a\s+passport number, bank details, or an account/);
});

test("Contact and Newsletter show honest failure states and never put email in the success URL", () => {
  const contact = read("lib/services/contact.ts");
  const newsletter = read("lib/services/newsletter.ts");
  const newsletterForm = read("components/NewsletterForm.tsx");
  assert.match(contact, /contact form is temporarily unavailable/i);
  assert.match(contact, /status: 503/);
  assert.match(newsletter, /Newsletter signup is not connected yet/);
  assert.match(newsletter, /status: 503/);
  assert.match(newsletterForm, /router\.push\("\/thank-you"\)/);
  assert.doesNotMatch(newsletterForm, /thank-you\?email/);
});

test("Header and Footer use consistent public names and the approved brand logo", () => {
  const header = read("components/Header.tsx");
  const footer = read("components/Footer.tsx");
  const site = read("lib/site.ts");
  for (const label of ["Start Here", "Destinations", "Plan Your Trip", "Guides", "Tools", "Store"]) {
    assert.match(`${site}\n${footer}`, new RegExp(label));
  }
  assert.match(header, /first-china-trip-kit-logo\.svg/);
  assert.doesNotMatch(footer, /Travel Guides|Planning Tools/);
});

test("Legacy city and itinerary routes are single-hop 301 redirects and are absent from sitemap", () => {
  const config = read("next.config.mjs");
  const sitemap = read("app/sitemap.ts");
  for (const route of ["/cities", "/cities/:slug", "/itineraries", "/itineraries/:slug"]) {
    assert.match(config, new RegExp(`source: ["']${route.replace("/", "\\/")}`));
  }
  assert.equal((config.match(/statusCode: 301/g) || []).length >= 5, true);
  assert.doesNotMatch(sitemap, /["']\/cities(?:\/|["'])/);
  assert.doesNotMatch(sitemap, /["']\/itineraries(?:\/|["'])/);
  assert.match(sitemap, /"\/city-kits"/);
  assert.match(sitemap, /"\/itinerary-kits"/);
});

test("404 and conversion pages stay noindex while canonical public pages stay in sitemap", () => {
  const notFound = read("app/not-found.tsx");
  const sitemap = read("app/sitemap.ts");
  assert.match(notFound, /index: false/);
  assert.match(notFound, /Open Start Here/);
  assert.doesNotMatch(sitemap, /thank-you/);
  for (const route of ["/start-here", "/city-kits", "/tools", "/store", "/about", "/contact"]) {
    assert.match(sitemap, new RegExp(`["']${route.replaceAll("/", "\\/")}["']`));
  }
});

test("Every public raster or vector asset has a complete provenance record", () => {
  const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
  const assets = walk(path.join(root, "public")).filter((file) => /\.(avif|jpe?g|png|svg|webp)$/i.test(file));
  for (const file of assets) {
    const localFile = `/${path.relative(path.join(root, "public"), file).split(path.sep).join("/")}`;
    const record = creditByPath.get(localFile);
    assert.ok(record, `${localFile} provenance`);
    for (const field of ["sourcePlatform", "sourcePage", "photographer", "downloadDate", "usage"]) {
      assert.ok(record[field], `${localFile} ${field}`);
    }
    assert.equal(record.licenseChecked, true, `${localFile} licenseChecked`);
  }
});

test("Public scope avoids guaranteed visa claims and keeps share assets optimized", () => {
  const publicSource = ["app", "components", "data"].flatMap((directory) => {
    const walk = (folder) => fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(folder, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    });
    return walk(path.join(root, directory)).filter((file) => /\.(ts|tsx)$/.test(file));
  }).map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(publicSource, /guaranteed (visa|entry)/i);
  assert.ok(
    fs.statSync(path.join(root, "public/share/china-first-trip-checklist-share-card.png")).size < 700 * 1024,
  );
});
