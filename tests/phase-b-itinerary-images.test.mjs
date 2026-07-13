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
const itinerariesModule = await importTranspiled("data/itineraries.ts", [[
  /import\s*\{\s*itineraryVisuals,\s*type\s+ContentImage\s*\}\s*from\s*["']@\/data\/images["'];?/,
  "",
]], `const itineraryVisuals = ${JSON.stringify(imagesModule.itineraryVisuals)};`);

const targets = itinerariesModule.phaseBItinerarySlugs.map((slug) =>
  itinerariesModule.itineraries.find((itinerary) => itinerary.slug === slug),
);
const credits = JSON.parse(read("data/image-credits.json"));
const creditById = new Map(credits.map((credit) => [credit.creditId, credit]));

const expectedDailyAlt = {
  "4-days-in-beijing": [/hutong street/i, /Forbidden City/i, /Great Wall/i, /Summer Palace/i],
  "5-days-beijing-and-xian": [/market stalls/i, /Forbidden City/i, /Great Wall/i, /high-speed train/i, /Terracotta Army/i],
  "7-days-shanghai-hangzhou-suzhou": [/Shanghai skyline/i, /Yu Garden/i, /Shanghai street/i, /high-speed train/i, /Longjing tea/i, /Suzhou/i, /railway station/i],
  "240-hour-visa-free-china-itinerary": [/International passengers/i, /Shanghai skyline/i, /Shanghai street/i, /high-speed train/i, /Longjing tea/i, /West Lake/i, /Suzhou/i, /Pudong skyline/i, /Zhujiajiao/i, /airport departure hall/i],
};

test("Phase B itineraries have distinct card and hero identities plus one semantic image per day", () => {
  assert.equal(targets.every(Boolean), true);
  assert.equal(new Set(targets.map((itinerary) => itinerary.cardImage.src)).size, targets.length);
  assert.equal(new Set(targets.map((itinerary) => itinerary.heroImage.src)).size, targets.length);

  for (const itinerary of targets) {
    assert.equal(itinerary.dailyImages.length, itinerary.dayByDayPlan.length, itinerary.slug);
    assert.equal(new Set(itinerary.dailyImages.map((image) => image.src)).size, itinerary.dailyImages.length, itinerary.slug);
    itinerary.dailyImages.forEach((image, index) => {
      assert.match(image.alt, expectedDailyAlt[itinerary.slug][index], `${itinerary.slug} day ${index + 1}`);
      assert.ok(image.creditId, `${itinerary.slug} day ${index + 1} credit`);
    });
  }
});

test("Phase B itinerary assets meet size, format, and provenance thresholds", async () => {
  for (const itinerary of targets) {
    const roleAssets = [
      ["hero", itinerary.heroImage],
      ["card", itinerary.cardImage],
      ...itinerary.dailyImages.map((image, index) => [`day-${index + 1}`, image]),
    ];
    for (const [role, image] of roleAssets) {
      const file = path.join(root, "public", image.src);
      assert.equal(fs.existsSync(file), true, `${itinerary.slug} ${role} file`);
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.format, "webp", `${itinerary.slug} ${role} format`);
      assert.ok((metadata.width || 0) >= (role === "hero" ? 2000 : 1400), `${itinerary.slug} ${role} width`);
      assert.ok(fs.statSync(file).size <= 700 * 1024, `${itinerary.slug} ${role} size`);
      const credit = creditById.get(image.creditId);
      assert.ok(credit, `${itinerary.slug} ${role} credit record`);
      assert.equal(credit.localFile, image.src, `${itinerary.slug} ${role} credit path`);
      assert.equal(credit.licenseChecked, true, `${itinerary.slug} ${role} license`);
      for (const field of ["sourcePlatform", "sourcePage", "photographer", "downloadDate", "usage"]) {
        assert.ok(credit[field], `${itinerary.slug} ${role} credit ${field}`);
      }
    }
  }
});

test("240-hour policy copy uses current NIA sources, verification date, and required disclaimer", () => {
  const itineraryContent = read("data/itinerary-guide-content.ts");
  const guideContent = read("data/guide-detail-content.ts");
  const requiredDisclaimer = "Rules can change. Confirm your eligibility and entry port with China’s National Immigration Administration or your airline before travel.";
  for (const content of [itineraryContent, guideContent]) {
    assert.match(content, /lastVerified: "2026-07-13"/);
    assert.ok(content.includes(requiredDisclaimer));
    assert.ok(content.includes("https://www.nia.gov.cn/n897453/c1751080/content.html"));
    assert.ok(content.includes("https://en.nia.gov.cn/n147418/n147468/c187308/content.html"));
    assert.doesNotMatch(content, /n147413\/c178106\/content\.html/);
    assert.doesNotMatch(content, /\b54 countries\b|\b60 (eligible )?ports\b/i);
    assert.doesNotMatch(content, /guaranteed (visa|entry)/i);
  }
});

test("itinerary renderer does not cycle route images and keeps only the hero high priority", () => {
  const page = read("app/itinerary-kits/[slug]/page.tsx");
  assert.doesNotMatch(page, /%\s*itinerary\.routeImages\.length/);
  assert.doesNotMatch(page, /priority\s+loading="eager"/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /objectPosition: itinerary\.heroImage\.position/);
});
