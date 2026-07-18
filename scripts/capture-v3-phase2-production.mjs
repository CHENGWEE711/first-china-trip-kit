import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL || "https://www.firstchinatripkit.com").replace(/\/$/, "");
const outputDirectory = path.resolve("docs/screenshots/v3-phase2-production");
const routes = [
  { name: "homepage", path: "/" },
  { name: "payment-hub", path: "/payments-and-apps" },
];
const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route.path}`, {
        waitUntil: "domcontentloaded",
      });
      if (response?.status() !== 200) {
        throw new Error(`${route.path} returned ${response?.status()}`);
      }
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          Array.from(document.images, (image) =>
            image.complete
              ? Promise.resolve()
              : new Promise((resolve) => {
                  image.addEventListener("load", resolve, { once: true });
                  image.addEventListener("error", resolve, { once: true });
                }),
          ),
        );
      });

      const file = path.join(outputDirectory, `${route.name}-${viewport.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      results.push({
        route: route.path,
        viewport: viewport.width,
        status: response.status(),
        screenshot: path.relative(process.cwd(), file),
        horizontalOverflow: await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      });
    }

    if (consoleErrors.length > 0) {
      throw new Error(`Console errors at ${viewport.width}px: ${consoleErrors.join(" | ")}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
