import { expect, test } from "@playwright/test";

const productionRoutes = [
  "/",
  "/payments-and-apps",
  "/guides/how-to-pay-in-china-as-a-foreigner",
  "/guides/best-apps-for-traveling-in-china",
  "/store",
  "/start-here",
];

test("Phase 2 production routes stay healthy, readable and free of technical states", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One production crawl is sufficient");
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  for (const route of productionRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    const state = await page.evaluate(() => ({
      brokenImages: Array.from(document.images).filter(
        (image) => image.complete && image.naturalWidth === 0,
      ).length,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      visitorText: document.querySelector("main")?.textContent || "",
    }));
    expect(state.brokenImages, route).toBe(0);
    expect(state.horizontalOverflow, route).toBe(false);
    expect(state.visitorText, route).not.toMatch(
      /Coming soon|A verified partner link has not been configured yet\.|Partner link not configured|when configured/i,
    );
  }

  expect(consoleErrors).toEqual([]);
});

test("Hub SEO, modules and every high-intent parent entry are connected", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One wiring pass is sufficient");
  await page.goto("/payments-and-apps");
  await expect(page).toHaveURL(/\/payments-and-apps$/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.firstchinatripkit.com/payments-and-apps",
  );
  for (const id of ["payments", "apps", "internet", "arrival-day", "backup-plan", "interactive-checklist", "setup-guide"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator('script[type="application/ld+json"]')).not.toHaveCount(0);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Payments & Essential Apps Hub/);
  await expect(
    page.locator('#setup-guide a[href*="payhip.com"], #setup-guide a[href="/store#inside-the-guide"]'),
  ).not.toHaveCount(0);

  for (const route of ["/", "/start-here", "/store"]) {
    await page.goto(route);
    await expect(page.locator('a[href^="/payments-and-apps"]')).not.toHaveCount(0);
  }
});

test("payment Guide Related Guides use each target featured image", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One image wiring pass is sufficient");
  await page.goto("/guides/how-to-pay-in-china-as-a-foreigner");
  await expect(page.locator('a[href="/guides/best-apps-for-traveling-in-china"] img')).toHaveAttribute(
    "src",
    /phase-c%2Fbest-apps-for-traveling-in-china%2Fcard\.webp|phase-c\/best-apps-for-traveling-in-china\/card\.webp/,
  );
  await expect(page.locator('a[href="/guides/how-to-use-alipay-in-china-as-a-tourist"] img')).toHaveAttribute(
    "src",
    /phase-c%2Fhow-to-use-alipay-in-china-as-a-tourist%2Fcard\.webp|phase-c\/how-to-use-alipay-in-china-as-a-tourist\/card\.webp/,
  );
});

test("robots and sitemap expose the Hub without canonical collision", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One SEO endpoint pass is sufficient");
  const [sitemap, robots] = await Promise.all([
    page.request.get("/sitemap.xml"),
    page.request.get("/robots.txt"),
  ]);
  expect(sitemap.status()).toBe(200);
  expect(robots.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://www.firstchinatripkit.com/payments-and-apps");
  expect(await robots.text()).not.toMatch(/Disallow:\s*\/payments-and-apps/i);

  await page.goto("/guides/how-to-pay-in-china-as-a-foreigner");
  await expect(page.locator('link[rel="canonical"]')).not.toHaveAttribute(
    "href",
    "https://www.firstchinatripkit.com/payments-and-apps",
  );
});
