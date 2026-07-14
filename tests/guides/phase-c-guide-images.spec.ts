import { expect, test } from "@playwright/test";
import { guideRoutes } from "./guide-routes";

test("Guide listing renders 14 distinct, loaded Card images", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Shared Card data is audited once");
  await page.goto("/guides");
  const cardImages = page.locator('a[href^="/guides/"] img');
  await expect(cardImages).toHaveCount(14);
  for (let index = 0; index < await cardImages.count(); index += 1) {
    const image = cardImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) =>
      element instanceof HTMLImageElement ? element.naturalWidth : 0,
    )).toBeGreaterThan(0);
  }
  const cards = await page.locator('a[href^="/guides/"] img').evaluateAll((images) =>
    images.map((image) => ({
      src: image instanceof HTMLImageElement ? image.currentSrc : "",
      naturalWidth: image instanceof HTMLImageElement ? image.naturalWidth : 0,
      alt: image.getAttribute("alt") || "",
    })),
  );
  expect(cards).toHaveLength(14);
  expect(new Set(cards.map((card) => card.src)).size).toBe(14);
  expect(cards.every((card) => card.naturalWidth > 0 && card.alt)).toBe(true);
});

for (const route of guideRoutes) {
  test(`${route} passes Phase C rendered image and responsive checks`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);

    const hero = page.locator('article figure[data-guide-visual="hero"] img');
    await expect(hero).toHaveCount(1);
    await expect(hero).toBeVisible();
    await expect.poll(() => hero.evaluate((image) => image instanceof HTMLImageElement ? image.naturalWidth : 0)).toBeGreaterThan(0);

    const inline = page.locator('article figure[data-guide-visual="inline"] img');
    expect(await inline.count()).toBeLessThanOrEqual(4);
    for (let index = 0; index < await inline.count(); index += 1) {
      const image = inline.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      expect(await image.getAttribute("alt")).toBeTruthy();
      await expect.poll(() => image.evaluate((element) =>
        element instanceof HTMLImageElement ? element.naturalWidth : 0,
      )).toBeGreaterThan(0);
      expect(await image.getAttribute("loading")).toBe("lazy");
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(consoleErrors).toEqual([]);
  });
}

test("Guide Heroes, OG images, Twitter images, and Article JSON-LD stay aligned", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Shared metadata is crawled once");
  const heroSources: string[] = [];
  for (const route of guideRoutes) {
    await page.goto(route);
    const heroPath = await page.locator('article figure[data-guide-visual="hero"] img').getAttribute("src");
    const optimizedSource = heroPath?.startsWith("/_next/image")
      ? new URL(heroPath, "http://localhost:3000").searchParams.get("url")
      : heroPath;
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    const twitter = await page.locator('meta[name="twitter:image"]').getAttribute("content");
    const jsonLd = (await page.locator('script[type="application/ld+json"]').allTextContents())
      .flatMap((value) => {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      });
    const article = jsonLd.find((item) => item["@type"] === "Article");
    expect(optimizedSource).toContain("/images/guides/phase-c/");
    expect(og).toContain("/images/guides/phase-c/");
    expect(twitter).toBe(og);
    expect(article?.image).toBe(og);
    expect(article?.datePublished).toMatch(/^2026-07-0[78]$/);
    expect(article?.dateModified).toBe("2026-07-13");
    heroSources.push(og || "");
  }
  expect(new Set(heroSources).size).toBe(guideRoutes.length);
});

test("priority Guide pages keep CLS below 0.1", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "CLS sampling uses one browser profile");
  for (const route of [
    "/guides/how-to-pay-in-china-as-a-foreigner",
    "/guides/best-apps-for-traveling-in-china",
    "/guides/china-240-hour-visa-free-transit-guide",
  ]) {
    await page.addInitScript(() => {
      (window as typeof window & { __phaseCCls?: number }).__phaseCCls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!shift.hadRecentInput) {
            (window as typeof window & { __phaseCCls?: number }).__phaseCCls =
              ((window as typeof window & { __phaseCCls?: number }).__phaseCCls || 0) + (shift.value || 0);
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(route);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const cls = await page.evaluate(() => (window as typeof window & { __phaseCCls?: number }).__phaseCCls || 0);
    expect(cls, route).toBeLessThan(0.1);
  }
});
