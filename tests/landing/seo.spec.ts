import { expect, test } from "@playwright/test";
import { gotoWithNetworkRetry } from "./helpers";

const SITE_URL = "https://www.firstchinatripkit.com";
const LANDINGS = [
  { slug: "pay-in-china", destinationPattern: /pay|payment/i },
  { slug: "china-visa-free", destinationPattern: /visa|transit/i },
  { slug: "china-checklist", destinationPattern: /checklist|first trip/i },
] as const;

test("all Phase 4A landings have unique self-canonical metadata and schema", async ({ page }) => {
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();
  const seenOgImages = new Set<string>();

  for (const landing of LANDINGS) {
    const path = `/landing/${landing.slug}`;
    const response = await gotoWithNetworkRetry(page, path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1"), `${path} should have one H1`).toHaveCount(1);

    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(title).toMatch(landing.destinationPattern);
    expect(description).toMatch(landing.destinationPattern);
    expect(title.length).toBeGreaterThan(20);
    expect(description?.length || 0).toBeGreaterThan(70);
    expect(seenTitles.has(title), `duplicate title: ${title}`).toBe(false);
    expect(seenDescriptions.has(description || ""), `duplicate description: ${description}`).toBe(false);
    expect(seenOgImages.has(ogImage || ""), `duplicate OG image: ${ogImage}`).toBe(false);
    seenTitles.add(title);
    seenDescriptions.add(description || "");
    seenOgImages.add(ogImage || "");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE_URL}${path}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      description || "",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `${SITE_URL}${path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /^https:\/\/www\.firstchinatripkit\.com\//,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
      "content",
      description || "",
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      ogImage || "",
    );
    await expect(page.locator('meta[name="robots"][content*="noindex" i]')).toHaveCount(0);

    const structuredData = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.flatMap((script) => {
        const parsed = JSON.parse(script.textContent || "null");
        return Array.isArray(parsed) ? parsed : [parsed];
      }),
    );
    const types = structuredData.map((entry) => entry?.["@type"]);
    expect(types, path).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList"]));
    for (const forbiddenType of ["GovernmentService", "Review", "AggregateRating"]) {
      expect(types, path).not.toContain(forbiddenType);
    }
    const webPage = structuredData.find((entry) => entry?.["@type"] === "WebPage");
    expect(webPage?.url).toBe(`${SITE_URL}${path}`);
  }
});

test("sitemap and robots expose exactly the approved landing collection", async ({ page }) => {
  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  for (const { slug } of LANDINGS) {
    expect(sitemap.match(new RegExp(`${SITE_URL}/landing/${slug}`, "g"))).toHaveLength(1);
  }

  const landingUrls = [...sitemap.matchAll(/<loc>(https:\/\/www\.firstchinatripkit\.com\/landing\/[^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .sort();
  expect(landingUrls).toEqual(
    LANDINGS.map(({ slug }) => `${SITE_URL}/landing/${slug}`).sort(),
  );

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  expect(await robotsResponse.text()).not.toMatch(/Disallow:\s*\/landing/i);
});
