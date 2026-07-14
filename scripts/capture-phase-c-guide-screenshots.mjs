import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "docs", "phase-c-guide-visual-qa");
const baseUrl = process.env.PHASE_C_SCREENSHOT_BASE_URL || "http://localhost:3000";
const routes = [
  "/guides/how-to-pay-in-china-as-a-foreigner",
  "/guides/best-apps-for-traveling-in-china",
  "/guides/how-to-book-high-speed-trains-in-china",
  "/guides/how-to-use-alipay-and-wechat-pay-in-china",
  "/guides/china-travel-packing-list",
  "/guides/basic-chinese-phrases-for-travelers",
  "/guides/china-esim-guide-for-tourists",
  "/guides/china-food-ordering-guide",
  "/guides/can-americans-travel-to-china-in-2026",
  "/guides/china-240-hour-visa-free-transit-guide",
  "/guides/how-to-use-alipay-in-china-as-a-tourist",
  "/guides/how-to-use-wechat-pay-in-china-as-a-foreigner",
  "/guides/3-days-in-shanghai-for-first-time-visitors",
  "/guides/china-travel-checklist-before-you-fly",
];

fs.mkdirSync(outputDir, { recursive: true });
for (const file of fs.readdirSync(outputDir)) {
  if (/\.(?:webp|png|jpe?g)$/i.test(file)) fs.rmSync(path.join(outputDir, file));
}

const saveWebp = async (buffer, filename, quality = 72) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const pipeline = (metadata.height || 0) > 15_800
    ? image.resize({ height: 15_800, fit: "inside", withoutEnlargement: true })
    : image;
  await pipeline.webp({ quality, effort: 5 }).toFile(path.join(outputDir, filename));
};

const loadEntirePage = async (page) => {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 700) {
    await page.evaluate((value) => window.scrollTo(0, value), top);
    await page.waitForTimeout(45);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
};

const makeContactSheet = async (buffers, filename) => {
  const width = 520;
  const height = 660;
  const tiles = await Promise.all(buffers.map((buffer) => sharp(buffer)
    .resize(width, height, { fit: "contain", background: "#fbf8f1" })
    .png()
    .toBuffer()));
  await sharp({
    create: {
      width: width * 2,
      height: height * 2,
      channels: 3,
      background: "#fbf8f1",
    },
  }).composite(tiles.map((input, index) => ({
    input,
    left: (index % 2) * width,
    top: Math.floor(index / 2) * height,
  }))).webp({ quality: 76, effort: 5 }).toFile(path.join(outputDir, filename));
};

const makeGridContactSheet = async (buffers, filename, { columns, width, height }) => {
  const rows = Math.ceil(buffers.length / columns);
  const tiles = await Promise.all(buffers.map((buffer) => sharp(buffer)
    .resize(width, height, { fit: "contain", background: "#fbf8f1" })
    .png()
    .toBuffer()));
  await sharp({
    create: {
      width: width * columns,
      height: height * rows,
      channels: 3,
      background: "#fbf8f1",
    },
  }).composite(tiles.map((input, index) => ({
    input,
    left: (index % columns) * width,
    top: Math.floor(index / columns) * height,
  }))).webp({ quality: 72, effort: 5 }).toFile(path.join(outputDir, filename));
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await context.newPage();

await page.goto(`${baseUrl}/guides`, { waitUntil: "load" });
await loadEntirePage(page);
await saveWebp(await page.screenshot({ fullPage: true }), "guides-list-desktop-full.webp", 72);

const cardSets = {
  payment: [
    "/guides/how-to-pay-in-china-as-a-foreigner",
    "/guides/how-to-use-alipay-and-wechat-pay-in-china",
    "/guides/how-to-use-alipay-in-china-as-a-tourist",
    "/guides/how-to-use-wechat-pay-in-china-as-a-foreigner",
  ],
  tools: [
    "/guides/best-apps-for-traveling-in-china",
    "/guides/china-esim-guide-for-tourists",
    "/guides/how-to-book-high-speed-trains-in-china",
    "/guides/china-travel-checklist-before-you-fly",
  ],
};

for (const [name, set] of Object.entries(cardSets)) {
  const buffers = [];
  for (const route of set) {
    await page.goto(`${baseUrl}/guides`, { waitUntil: "load" });
    await page.addStyleTag({ content: "header { position: static !important; }" });
    const card = page.locator("article").filter({ has: page.locator(`a[href="${route}"]`) }).first();
    await card.scrollIntoViewIfNeeded();
    await card.evaluate((element) => {
      for (const other of document.querySelectorAll("main article")) {
        if (other !== element) other.style.visibility = "hidden";
      }
      element.style.width = "520px";
      element.style.background = "#fbf8f1";
    });
    await page.waitForTimeout(120);
    buffers.push(await card.screenshot());
  }
  await makeContactSheet(buffers, `${name}-guide-card-comparison.webp`);
}

for (const route of routes) {
  const slug = route.split("/").at(-1);
  await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(250);
  await saveWebp(await page.screenshot(), `${slug}-hero-desktop-1440.webp`, 74);
  await loadEntirePage(page);
  await saveWebp(await page.screenshot({ fullPage: true }), `${slug}-desktop-full.webp`, 68);

  const related = page.locator("section").filter({ has: page.getByText("Related guides", { exact: true }) }).first();
  await related.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await saveWebp(await related.screenshot(), `${slug}-related-guides.webp`, 74);
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${baseUrl}/guides`, { waitUntil: "load" });
await loadEntirePage(page);
await saveWebp(await page.screenshot({ fullPage: true }), "guides-list-mobile-full.webp", 72);

for (const route of routes) {
  const slug = route.split("/").at(-1);
  await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(250);
  await saveWebp(await page.screenshot(), `${slug}-hero-mobile-390.webp`, 74);
}

const slugs = routes.map((route) => route.split("/").at(-1));
await makeGridContactSheet(
  slugs.map((slug) => fs.readFileSync(path.join(outputDir, `${slug}-hero-desktop-1440.webp`))),
  "all-guide-heroes-desktop-contact-sheet.webp",
  { columns: 3, width: 360, height: 225 },
);
await makeGridContactSheet(
  slugs.map((slug) => fs.readFileSync(path.join(outputDir, `${slug}-hero-mobile-390.webp`))),
  "all-guide-heroes-mobile-contact-sheet.webp",
  { columns: 4, width: 195, height: 422 },
);
await makeGridContactSheet(
  slugs.map((slug) => fs.readFileSync(path.join(outputDir, `${slug}-related-guides.webp`))),
  "all-related-guides-contact-sheet.webp",
  { columns: 3, width: 360, height: 300 },
);

await context.close();
await browser.close();

const files = fs.readdirSync(outputDir).filter((file) => file.endsWith(".webp"));
const totalBytes = files.reduce((sum, file) => sum + fs.statSync(path.join(outputDir, file)).size, 0);
console.log(JSON.stringify({ outputDir, files: files.length, totalBytes }, null, 2));
