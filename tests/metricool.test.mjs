import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("Analytics trackers are mounted once globally and only load in Vercel Production", async () => {
  const [metricoolComponent, googleComponent, layout] = await Promise.all([
    readFile(new URL("components/MetricoolAnalytics.tsx", root), "utf8"),
    readFile(new URL("components/GoogleAnalytics.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);

  assert.match(metricoolComponent, /from "next\/script"/);
  assert.match(metricoolComponent, /strategy="afterInteractive"/);
  assert.match(metricoolComponent, /process\.env\.VERCEL_ENV !== "production"/);
  assert.match(metricoolComponent, /https:\/\/tracker\.metricool\.com\/resources\/be\.js/);
  assert.match(metricoolComponent, /1abc11cf9e2d5eeb6d0c61f3792985f0/);
  assert.match(googleComponent, /process\.env\.VERCEL_ENV !== "production"/);
  assert.match(googleComponent, /googletagmanager\.com\/gtag\/js/);
  assert.equal(layout.match(/<MetricoolAnalytics \/>/g)?.length, 1);
  assert.equal(layout.match(/<GoogleAnalytics \/>/g)?.length, 1);
});
