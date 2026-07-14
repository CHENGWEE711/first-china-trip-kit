import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [baseUrlArg, outputArg] = process.argv.slice(2);
const baseUrl = (baseUrlArg || "http://127.0.0.1:3000").replace(/\/$/, "");
const output = outputArg || "docs/PHASE_D_PERFORMANCE_FINAL.json";

const routes = [
  "/",
  "/start-here",
  "/city-kits",
  "/city-kits/shanghai",
  "/city-kits/beijing",
  "/city-kits/xian",
  "/city-kits/chengdu",
  "/city-kits/guangzhou",
  "/store",
  "/thank-you",
  "/tools",
  "/about",
  "/contact",
];

const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 1000 }, routes },
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
    routes: ["/", "/start-here", "/city-kits", "/store", "/tools"],
  },
];

const percentile = (values, fraction) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
};

const browser = await chromium.launch();
const results = [];

try {
  for (const profile of profiles) {
    for (const route of profile.routes) {
      const context = await browser.newContext({
        viewport: profile.viewport,
        serviceWorkers: "block",
      });
      const page = await context.newPage();

      await page.addInitScript(() => {
        window.__phaseDPerformance = { lcp: 0, cls: 0 };
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const latest = entries.at(-1);
          if (latest) window.__phaseDPerformance.lcp = latest.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__phaseDPerformance.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });

      const startedAt = Date.now();
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 45_000,
      });
      await page.waitForTimeout(1_500);

      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        const sum = (entries, key) =>
          Math.round(entries.reduce((total, entry) => total + (entry[key] || 0), 0));
        const isJs = (entry) =>
          entry.initiatorType === "script" || /\.js(?:\?|$)/i.test(entry.name);
        const isImage = (entry) =>
          entry.initiatorType === "img" || /\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?|$)/i.test(entry.name);
        const imageResources = resources.filter(isImage);
        const jsResources = resources.filter(isJs);
        const fontResources = resources.filter(
          (entry) => entry.initiatorType === "css" && /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(entry.name),
        );
        const largestImage = [...imageResources].sort(
          (a, b) => (b.encodedBodySize || b.transferSize || 0) - (a.encodedBodySize || a.transferSize || 0),
        )[0];

        return {
          lcpMs: Math.round(window.__phaseDPerformance?.lcp || 0),
          cls: Number((window.__phaseDPerformance?.cls || 0).toFixed(4)),
          domNodes: document.getElementsByTagName("*").length,
          requestCount: resources.length + 1,
          transferBytes: sum(resources, "transferSize") + Math.round(navigation?.transferSize || 0),
          encodedBytes: sum(resources, "encodedBodySize") + Math.round(navigation?.encodedBodySize || 0),
          imageRequestCount: imageResources.length,
          imageBytes: sum(imageResources, "encodedBodySize"),
          jsRequestCount: jsResources.length,
          jsBytes: sum(jsResources, "encodedBodySize"),
          fontRequestCount: fontResources.length,
          fontBytes: sum(fontResources, "encodedBodySize"),
          largestImage: largestImage
            ? {
                url: largestImage.name,
                bytes: Math.round(largestImage.encodedBodySize || largestImage.transferSize || 0),
              }
            : null,
          imageElements: document.images.length,
          unloadedImageElements: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0)
            .length,
        };
      });

      results.push({
        profile: profile.name,
        route,
        status: response?.status() || null,
        wallTimeMs: Date.now() - startedAt,
        ...metrics,
      });
      await context.close();
    }
  }
} finally {
  await browser.close();
}

const successful = results.filter((result) => result.status === 200);
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  methodology: {
    browser: "Playwright Chromium",
    cache: "Fresh browser context per route; service workers blocked",
    timing: "networkidle plus 1500 ms stabilization",
    profiles: Object.fromEntries(profiles.map((profile) => [profile.name, profile.viewport])),
    note: "Lab measurements are directional and should be compared under the same machine and network conditions.",
  },
  summary: {
    measuredRoutes: results.length,
    statusFailures: results.filter((result) => result.status !== 200).length,
    lcpP75Ms: percentile(successful.map((result) => result.lcpMs), 0.75),
    clsP75: percentile(successful.map((result) => result.cls), 0.75),
    maxCls: Math.max(0, ...successful.map((result) => result.cls)),
    maxDomNodes: Math.max(0, ...successful.map((result) => result.domNodes)),
    maxImageBytes: Math.max(
      0,
      ...successful.map((result) => result.largestImage?.bytes || 0),
    ),
    unloadedImageElements: successful.reduce(
      (total, result) => total + result.unloadedImageElements,
      0,
    ),
  },
  results,
};

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report.summary, null, 2));
