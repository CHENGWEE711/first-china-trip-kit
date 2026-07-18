import { expect, test } from "@playwright/test";

test("Payment Hub has canonical metadata, structured data and sitemap coverage", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One SEO pass is sufficient");
  const response = await page.goto("/payments-and-apps");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/China Payments & Essential Apps Hub/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /payments, essential apps, internet/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.firstchinatripkit.com/payments-and-apps");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\/www\.firstchinatripkit\.com\//);

  const objects = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent || "null");
      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );
  expect(objects.map((object) => object["@type"])).toEqual(
    expect.arrayContaining(["WebPage", "BreadcrumbList", "ItemList", "FAQPage"]),
  );

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://www.firstchinatripkit.com/payments-and-apps");
});

test("Payment cluster Guides link back to the Hub", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One cluster crawl is sufficient");
  for (const route of [
    "/guides/how-to-pay-in-china-as-a-foreigner",
    "/guides/how-to-use-alipay-in-china-as-a-tourist",
    "/guides/how-to-use-wechat-pay-in-china-as-a-foreigner",
    "/guides/best-apps-for-traveling-in-china",
    "/guides/china-esim-guide-for-tourists",
    "/guides/china-travel-checklist-before-you-fly",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("navigation", { name: "China payments and essential apps guides" })).toBeVisible();
    await expect(page.locator('a[href="/payments-and-apps"]')).not.toHaveCount(0);
  }
});
