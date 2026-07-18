import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const output = path.resolve("docs/screenshots/v3-phase2/after");

await mkdir(output, { recursive: true });

const browser = await chromium.launch();

async function settle(page) {
  await page.goto(`${baseURL}/payments-and-apps`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    window.localStorage.removeItem("fctk:payment-readiness:v1");
    window.localStorage.removeItem("fctk:payment-hub-checklist:v1");
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
}

for (const viewport of [
  { width: 1440, height: 1000, suffix: "1440" },
  { width: 390, height: 844, suffix: "390" },
]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  const page = await context.newPage();
  await settle(page);
  await page.screenshot({
    path: path.join(output, `payment-hub-after-${viewport.suffix}.png`),
    fullPage: true,
    animations: "disabled",
  });
  await context.close();
}

const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  colorScheme: "light",
});
const page = await context.newPage();
await settle(page);
await page.locator("header").evaluate((element) => {
  element.style.display = "none";
});
await page.locator('a[href="#main-content"]').evaluate((element) => {
  element.style.display = "none";
});

const readiness = page.getByTestId("payment-readiness-checker");
await readiness.scrollIntoViewIfNeeded();
for (const label of ["Primary wallet", "Physical card", "Bank access", "Second payment route"]) {
  await readiness.getByText(label, { exact: true }).click();
}
await readiness.screenshot({
  path: path.join(output, "payment-readiness-score-85.png"),
  animations: "disabled",
});

const checklist = page.getByTestId("interactive-payment-checklist");
await checklist.scrollIntoViewIfNeeded();
for (const checkbox of await checklist.locator('input[type="checkbox"]').all()) {
  await checkbox.check({ force: true });
}
await checklist.screenshot({
  path: path.join(output, "interactive-checklist-complete-1440.png"),
  animations: "disabled",
});

await context.close();
await browser.close();
