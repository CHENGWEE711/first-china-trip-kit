import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const citySlugs = [
  "shanghai",
  "beijing",
  "xian",
  "chengdu",
  "hangzhou",
  "suzhou",
  "guangzhou",
  "shenzhen",
] as const;

const publicRoutes = [
  "/",
  "/start-here",
  "/city-kits",
  ...citySlugs.map((slug) => `/city-kits/${slug}`),
  "/travel-essentials",
  "/tools",
  "/store",
  "/thank-you",
  "/about",
  "/contact",
  "/affiliate-disclosure",
  "/privacy",
  "/terms",
] as const;

async function settlePage(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  const images = page.locator("img");
  const imageCount = await images.count();
  for (let index = 0; index < imageCount; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => {
      if (node.currentSrc || !node.srcset) return;
      const firstCandidate = node.srcset.split(",")[0]?.trim().split(/\s+/)[0];
      if (!firstCandidate) return;
      node.removeAttribute("srcset");
      node.loading = "eager";
      node.src = firstCandidate;
    });
    await expect
      .poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth), {
        timeout: 10_000,
      })
      .toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

test.describe("Phase D public-page regression", () => {
  test("priority public routes render without broken images, console errors, or overflow", async ({ page }) => {
    test.setTimeout(120_000);
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (["error", "assert"].includes(message.type())) consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    for (const route of publicRoutes) {
      await test.step(route, async () => {
        consoleErrors.length = 0;
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("h1"), `${route} H1`).toHaveCount(1);
        await settlePage(page);

        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          brokenImages: Array.from(document.images)
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.alt || image.src),
          missingAlt: Array.from(document.images)
            .filter((image) => !image.hasAttribute("alt"))
            .map((image) => image.src),
        }));
        expect(result.overflow, `${route} horizontal overflow`).toBe(false);
        expect(result.brokenImages, `${route} broken images`).toEqual([]);
        expect(result.missingAlt, `${route} missing alt`).toEqual([]);
        expect(consoleErrors, `${route} console errors`).toEqual([]);
      });
    }
  });

  test("destination Cards and Heroes stay unique at runtime", async ({ page }) => {
    await page.goto("/city-kits", { waitUntil: "domcontentloaded" });
    await settlePage(page);
    const cardData = await page.locator('[data-testid="destination-grid"] article').evaluateAll((articles) =>
      articles.map((article) => {
        const image = article.querySelector("img") as HTMLImageElement | null;
        const url = new URL(image?.currentSrc || image?.src || "", window.location.href);
        return {
          city: article.querySelector("h2")?.textContent?.trim() || "",
          src: url.searchParams.get("url") || url.pathname,
          alt: image?.alt || "",
          width: image?.naturalWidth || 0,
        };
      }),
    );
    expect(cardData).toHaveLength(citySlugs.length);
    expect(new Set(cardData.map((item) => item.src)).size).toBe(citySlugs.length);
    expect(cardData.every((item) => item.city && item.alt && item.width > 0)).toBe(true);

    const heroSources: string[] = [];
    for (const slug of citySlugs) {
      await page.goto(`/city-kits/${slug}`, { waitUntil: "domcontentloaded" });
      const hero = page.locator("main article header img");
      await expect(hero).toHaveCount(1);
      await expect(hero).toBeVisible();
      await expect
        .poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth), {
          message: `${slug} Hero decoded`,
          timeout: 10_000,
        })
        .toBeGreaterThan(0);
      const heroData = await hero.evaluate((image: HTMLImageElement) => {
        const url = new URL(image.currentSrc || image.src, window.location.href);
        return {
          src: url.searchParams.get("url") || url.pathname,
          alt: image.alt,
          naturalWidth: image.naturalWidth,
        };
      });
      expect(heroData.alt, slug).not.toBe("");
      expect(heroData.naturalWidth, slug).toBeGreaterThan(0);
      heroSources.push(heroData.src);
    }
    expect(new Set(heroSources).size).toBe(citySlugs.length);
  });

  test("Start Here and all four planning tools provide real interaction", async ({ page }) => {
    await page.goto("/start-here", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-progress-ready="true"]')).toBeVisible();
    const firstProgressCheckbox = page.locator('input[type="checkbox"]').first();
    await firstProgressCheckbox.check();
    await expect(page.getByText("1 of 8 preparation steps marked complete", { exact: true })).toBeVisible();

    await page.goto("/tools/china-trip-duration-planner", { waitUntil: "domcontentloaded" });
    await page.locator("#duration-6-8").check();
    await expect(page.getByRole("heading", { name: "6-8 days", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy result", exact: true })).toBeVisible();

    await page.goto("/tools/city-route-picker", { waitUntil: "domcontentloaded" });
    await page.locator("#route-classic-history").check();
    await expect(page.getByRole("heading", { name: "Beijing + Xi'an", exact: true })).toBeVisible();

    await page.goto("/tools/essential-apps-checklist", { waitUntil: "domcontentloaded" });
    await page.locator("#app-alipay").check();
    await expect(page.getByText("1/8 ready", { exact: true })).toBeVisible();

    await page.goto("/tools/visa-free-eligibility-checker", { waitUntil: "domcontentloaded" });
    await page.locator("#visa-passport").check();
    await expect(page.getByText("1/5 confirmed", { exact: true })).toBeVisible();
    expect(
      await page.getByText("This is not legal or immigration advice.", { exact: false }).count(),
    ).toBeGreaterThan(0);
  });

  test("unconfigured Contact and Newsletter backends show honest errors", { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "One local mutation-state test is sufficient.");
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "Send question", exact: true })).toBeEnabled();
    await page.getByLabel("Name", { exact: true }).fill("Phase D QA");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("qa@example.com");
    await page.getByLabel("Main question", { exact: true }).fill("Please verify that this local failure state is clear.");
    await page.getByRole("button", { name: "Send question", exact: true }).click();
    await expect(page.getByText("The contact form is temporarily unavailable.", { exact: false })).toBeVisible();

    await page.getByLabel("Email address", { exact: true }).fill("qa-newsletter@example.com");
    await page.getByRole("button", { name: "Get the checklist", exact: true }).click();
    await expect(page.getByText("Newsletter signup is not connected yet.", { exact: false })).toBeVisible();
    await expect(page).toHaveURL("/contact");
  });

  test("legacy routes, sitemap, robots, and 404 follow the intended SEO state", async ({ request }) => {
    for (const [legacy, destination] of [
      ["/cities", "/city-kits"],
      ["/cities/shanghai", "/city-kits/shanghai"],
      ["/itineraries", "/itinerary-kits"],
      ["/itineraries/4-days-in-beijing", "/itinerary-kits/4-days-in-beijing"],
    ]) {
      const response = await request.get(legacy, { maxRedirects: 0 });
      expect(response.status(), legacy).toBe(301);
      expect(response.headers().location, legacy).toBe(destination);
    }

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.status()).toBe(200);
    const sitemap = await sitemapResponse.text();
    expect(sitemap).not.toContain("/cities/");
    expect(sitemap).not.toContain("/itineraries/");
    expect(sitemap).not.toContain("/thank-you");
    expect(sitemap).toContain("/city-kits/shanghai");
    for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const response = await request.get(new URL(match[1]).pathname);
      expect(response.status(), match[1]).toBe(200);
    }

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap:");

    const notFound = await request.get("/phase-d-page-that-does-not-exist");
    expect(notFound.status()).toBe(404);
    expect(await notFound.text()).toContain("noindex");
  });
});

test("capture Phase D visual evidence", { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Evidence sizes are set explicitly in this test.");
  test.setTimeout(180_000);
  const output = path.resolve("docs/screenshots/phase-d");
  const heroOutput = path.join(output, "city-heroes");
  mkdirSync(heroOutput, { recursive: true });

  async function capture(
    name: string,
    route: string,
    viewport: { width: number; height: number },
    options: { fullPage?: boolean; selector?: string } = { fullPage: true },
  ) {
    await page.setViewportSize(viewport);
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await settlePage(page);
    if (options.selector) {
      await page.locator(options.selector).screenshot({
        path: path.join(output, name),
        animations: "disabled",
      });
    } else {
      await page.screenshot({
        path: path.join(output, name),
        fullPage: options.fullPage,
        animations: "disabled",
      });
    }
  }

  const desktop = { width: 1440, height: 900 };
  const mobile = { width: 390, height: 844 };
  await capture("homepage-1440-full.png", "/", desktop);
  await capture("homepage-390-full.png", "/", mobile);
  await capture("start-here-1440-full.png", "/start-here", desktop);
  await capture("start-here-390-full.png", "/start-here", mobile);
  await capture("destinations-1440-full.png", "/city-kits", desktop);
  await capture("destinations-390-full.png", "/city-kits", mobile);
  await capture("all-city-cards-comparison.png", "/city-kits", desktop, {
    selector: '[data-testid="destination-grid"]',
  });
  await capture("store-1440-full.png", "/store", desktop);
  await capture("store-390-full.png", "/store", mobile);
  await capture("free-checklist-390-full.png", "/thank-you", mobile);
  await capture("tools-1440-full.png", "/tools", desktop);
  await capture("about-1440-full.png", "/about", desktop);
  await capture("contact-1440-full.png", "/contact", desktop);
  await capture("header-1440.png", "/", desktop, { selector: "header" });

  await page.setViewportSize(mobile);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation menu", exact: true }).click();
  await page.screenshot({ path: path.join(output, "header-mobile-open-390.png"), animations: "disabled" });

  await capture("footer-1440.png", "/", desktop, { selector: "footer" });
  await capture("footer-390.png", "/", mobile, { selector: "footer" });
  await capture("404-1440-full.png", "/phase-d-page-that-does-not-exist", desktop);

  for (const slug of citySlugs) {
    await page.setViewportSize(desktop);
    await page.goto(`/city-kits/${slug}`, { waitUntil: "domcontentloaded" });
    await page.locator("main article header").screenshot({
      path: path.join(heroOutput, `${slug}.png`),
      animations: "disabled",
    });
  }

  const tileWidth = 720;
  const tileHeight = 280;
  const sheets = await Promise.all(citySlugs.map(async (slug) => {
    const image = await sharp(path.join(heroOutput, `${slug}.png`))
      .resize(tileWidth, tileHeight, { fit: "cover" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${tileWidth}" height="${tileHeight}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="220" width="${tileWidth}" height="60" fill="#202A33" fill-opacity="0.86"/><text x="24" y="259" fill="#FFFDF8" font-family="Arial, sans-serif" font-size="26" font-weight="700">${slug[0].toUpperCase()}${slug.slice(1)}</text></svg>`,
    );
    return sharp(image).composite([{ input: label }]).png().toBuffer();
  }));
  await sharp({
    create: {
      width: tileWidth * 2,
      height: tileHeight * 4,
      channels: 3,
      background: "#FFFDF8",
    },
  })
    .composite(sheets.map((input, index) => ({
      input,
      left: (index % 2) * tileWidth,
      top: Math.floor(index / 2) * tileHeight,
    })))
    .png({ compressionLevel: 9 })
    .toFile(path.join(output, "all-city-heroes-comparison.png"));
});
