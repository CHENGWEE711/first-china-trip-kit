import { expect, test } from "@playwright/test";
import { guideRoutes } from "./guide-routes";

for (const route of guideRoutes) {
  test(`${route} retains Guide SEO signals`, { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "One SEO crawl per Guide is sufficient");
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/\S+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /\S+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /\S+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https?:\/\//);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", /\S+/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", /\S+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", /^https?:\/\//);

    const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(structuredData.length).toBeGreaterThan(0);
    const objects = structuredData.flatMap((value) => {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
    const article = objects.find((item) => item["@type"] === "Article");
    expect(article?.headline).toBeTruthy();
    expect(article?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(objects.some((item) => item["@type"] === "BreadcrumbList")).toBe(true);

    await expect(page.locator("article .content-prose")).toBeVisible();
    await expect(page.locator("#quick-answer")).toBeVisible();
    const invalidAnchors = await page.evaluate(() =>
      Array.from(document.querySelectorAll('article a[href^="#"]'))
        .map((link) => link.getAttribute("href") || "")
        .filter((href) => href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1)))),
    );
    expect(invalidAnchors).toEqual([]);
  });
}
