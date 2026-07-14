import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.PHASE_C_PERF_BASE_URL || "http://localhost:3000";
const label = process.env.PHASE_C_PERF_LABEL || "current";
const output = process.env.PHASE_C_PERF_OUTPUT || path.join(root, `docs/PHASE_C_GUIDE_PERFORMANCE_${label.toUpperCase()}.json`);
const routes = [
  "/guides/how-to-pay-in-china-as-a-foreigner",
  "/guides/best-apps-for-traveling-in-china",
  "/guides/china-240-hour-visa-free-transit-guide",
];

const browser = await chromium.launch({ headless: true });

// Warm route compilation separately so dev-server compilation time is not counted.
const warmContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
for (const route of routes) {
  const page = await warmContext.newPage();
  await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(350);
  await page.close();
}
await warmContext.close();

const samples = [];
for (const route of routes) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__phaseCPerformance = { cls: 0, lcp: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__phaseCPerformance.lcp = Math.max(window.__phaseCPerformance.lcp, entry.startTime || 0);
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__phaseCPerformance.cls += entry.value || 0;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(1_200);
  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource").map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType,
      transferSize: entry.transferSize || 0,
      encodedBodySize: entry.encodedBodySize || 0,
    }));
    const images = resources.filter((entry) => entry.initiatorType === "img" || entry.name.includes("/_next/image"));
    const scripts = resources.filter((entry) => entry.initiatorType === "script" || /\.(?:js|mjs)(?:\?|$)/.test(entry.name));
    const bytes = (entry) => entry.transferSize || entry.encodedBodySize || 0;
    const domImages = [...document.images];
    return {
      lcpMs: Math.round(window.__phaseCPerformance?.lcp || 0),
      cls: Number((window.__phaseCPerformance?.cls || 0).toFixed(4)),
      requestCount: resources.length + 1,
      imageRequestCount: images.length,
      imageTransferBytes: images.reduce((sum, entry) => sum + bytes(entry), 0),
      maxImageBytes: images.reduce((max, entry) => Math.max(max, bytes(entry)), 0),
      jsTransferBytes: scripts.reduce((sum, entry) => sum + bytes(entry), 0),
      domElementCount: document.getElementsByTagName("*").length,
      loadedDomImages: domImages.filter((image) => image.complete && image.naturalWidth > 0).length,
      unusedLoadedImages: domImages.filter((image) => {
        if (!image.complete || image.naturalWidth === 0) return false;
        const rect = image.getBoundingClientRect();
        return rect.width === 0 || rect.height === 0;
      }).length,
      lazyImages: domImages.filter((image) => image.loading === "lazy").length,
      eagerImages: domImages.filter((image) => image.loading === "eager" || !image.hasAttribute("loading")).length,
    };
  });
  samples.push({ route, status: response?.status() || 0, ...metrics });
  await context.close();
}

await browser.close();

const average = (key) => Math.round(samples.reduce((sum, item) => sum + item[key], 0) / samples.length);
const summary = {
  lcpMs: average("lcpMs"),
  cls: Number((samples.reduce((sum, item) => sum + item.cls, 0) / samples.length).toFixed(4)),
  requestCount: average("requestCount"),
  imageRequestCount: average("imageRequestCount"),
  imageTransferBytes: average("imageTransferBytes"),
  maxImageBytes: Math.max(...samples.map((item) => item.maxImageBytes)),
  jsTransferBytes: average("jsTransferBytes"),
  domElementCount: average("domElementCount"),
  unusedLoadedImages: Math.max(...samples.map((item) => item.unusedLoadedImages)),
};

const result = {
  generatedAt: new Date().toISOString(),
  label,
  baseUrl,
  environment: "Local Next.js dev server, warmed routes, fresh browser context per sample, Chromium 1440x900",
  routes,
  summary,
  samples,
};

fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
