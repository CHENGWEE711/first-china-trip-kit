import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [baseUrlArg, outputArg, labelArg] = process.argv.slice(2);
const baseUrl = (baseUrlArg || "http://127.0.0.1:3000").replace(/\/$/, "");
const output = outputArg || "docs/PHASE_E_PERFORMANCE_LOCAL.json";
const label = labelArg || "local-production-build";

const routes = [
  "/",
  "/start-here",
  "/guides",
  "/guides/how-to-pay-in-china-as-a-foreigner",
  "/guides/best-apps-for-traveling-in-china",
  "/guides/china-240-hour-visa-free-transit-guide",
  "/city-kits",
  "/city-kits/beijing",
  "/city-kits/shanghai",
  "/itinerary-kits",
  "/itinerary-kits/240-hour-visa-free-china-itinerary",
  "/store",
  "/tools",
];

const percentile = (values, fraction) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
};

const browser = await chromium.launch();
const results = [];

try {
  for (const route of routes) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__phaseEPerformance = { lcp: 0, cls: 0, maxLongTask: 0 };
      new PerformanceObserver((list) => {
        const latest = list.getEntries().at(-1);
        if (latest) window.__phaseEPerformance.lcp = latest.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__phaseEPerformance.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__phaseEPerformance.maxLongTask = Math.max(
              window.__phaseEPerformance.maxLongTask,
              entry.duration || 0,
            );
          }
        }).observe({ type: "longtask", buffered: true });
      } catch {
        // Long Task API is a best-effort INP risk proxy.
      }
    });

    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "networkidle",
      timeout: 45_000,
    });
    await page.waitForTimeout(1_200);

    const metrics = await page.evaluate((auditedBaseUrl) => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");
      const total = (entries, key) => Math.round(
        entries.reduce((sum, entry) => sum + (entry[key] || 0), 0),
      );
      const images = resources.filter((entry) =>
        entry.initiatorType === "img" || entry.name.includes("/_next/image?") || /\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?|$)/i.test(entry.name),
      );
      const scripts = resources.filter((entry) =>
        entry.initiatorType === "script" || /\.js(?:\?|$)/i.test(entry.name),
      );
      const fonts = resources.filter((entry) =>
        /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(entry.name),
      );
      const origin = new URL(auditedBaseUrl).origin;
      const thirdParty = resources.filter((entry) => {
        try {
          return new URL(entry.name).origin !== origin;
        } catch {
          return false;
        }
      });
      const largestImage = [...images].sort(
        (a, b) => (b.encodedBodySize || b.transferSize || 0) - (a.encodedBodySize || a.transferSize || 0),
      )[0];

      return {
        ttfbMs: Math.round(navigation?.responseStart || 0),
        lcpMs: Math.round(window.__phaseEPerformance?.lcp || 0),
        cls: Number((window.__phaseEPerformance?.cls || 0).toFixed(4)),
        inpRiskProxyMaxLongTaskMs: Math.round(window.__phaseEPerformance?.maxLongTask || 0),
        requestCount: resources.length + 1,
        transferBytes: total(resources, "transferSize") + Math.round(navigation?.transferSize || 0),
        encodedBytes: total(resources, "encodedBodySize") + Math.round(navigation?.encodedBodySize || 0),
        decodedBytes: total(resources, "decodedBodySize") + Math.round(navigation?.decodedBodySize || 0),
        imageRequestCount: images.length,
        imageBytes: total(images, "encodedBodySize"),
        jsRequestCount: scripts.length,
        jsBytes: total(scripts, "encodedBodySize"),
        fontRequestCount: fonts.length,
        fontBytes: total(fonts, "encodedBodySize"),
        thirdPartyRequestCount: thirdParty.length,
        cacheHitCount: resources.filter((entry) => entry.transferSize === 0 && entry.decodedBodySize > 0).length,
        domNodes: document.getElementsByTagName("*").length,
        imageElements: document.images.length,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        unusedLoadedImages: [...document.images].filter((image) => {
          if (!image.complete || image.naturalWidth === 0) return false;
          const rect = image.getBoundingClientRect();
          return rect.width === 0 || rect.height === 0;
        }).length,
        largestImage: largestImage
          ? {
              url: largestImage.name,
              bytes: Math.round(largestImage.encodedBodySize || largestImage.transferSize || 0),
            }
          : null,
      };
    }, baseUrl);

    results.push({ route, status: response?.status() || null, ...metrics });
    await context.close();
  }
} finally {
  await browser.close();
}

const successful = results.filter((result) => result.status === 200);
const report = {
  generatedAt: new Date().toISOString(),
  label,
  baseUrl,
  environment: "Fresh Playwright Chromium context per route, 1440x900, service workers blocked, networkidle + 1200ms stabilization.",
  comparabilityNote: "LCP and TTFB are host-sensitive lab values. Transfer size, request count, DOM size and asset counts are more directly comparable across deployments.",
  summary: {
    measuredRoutes: results.length,
    statusFailures: results.filter((result) => result.status !== 200).length,
    lcpP75Ms: percentile(successful.map((result) => result.lcpMs), 0.75),
    ttfbP75Ms: percentile(successful.map((result) => result.ttfbMs), 0.75),
    clsP75: percentile(successful.map((result) => result.cls), 0.75),
    maxCls: Math.max(0, ...successful.map((result) => result.cls)),
    maxInpRiskProxyLongTaskMs: Math.max(0, ...successful.map((result) => result.inpRiskProxyMaxLongTaskMs)),
    maxImageBytes: Math.max(0, ...successful.map((result) => result.largestImage?.bytes || 0)),
    maxJsBytes: Math.max(0, ...successful.map((result) => result.jsBytes)),
    maxDomNodes: Math.max(0, ...successful.map((result) => result.domNodes)),
    totalBrokenImages: successful.reduce((sum, result) => sum + result.brokenImages, 0),
    totalUnusedLoadedImages: successful.reduce((sum, result) => sum + result.unusedLoadedImages, 0),
  },
  results,
};

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report.summary, null, 2));
