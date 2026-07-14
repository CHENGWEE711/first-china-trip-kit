import { expect, test, type Page } from "@playwright/test";

const representativeRoutes = [
  "/",
  "/start-here",
  "/guides",
  "/guides/how-to-pay-in-china-as-a-foreigner",
  "/guides/best-apps-for-traveling-in-china",
  "/guides/china-240-hour-visa-free-transit-guide",
  "/city-kits",
  "/city-kits/beijing",
  "/city-kits/shanghai",
  "/city-kits/shenzhen",
  "/itinerary-kits",
  "/itinerary-kits/3-days-in-shanghai",
  "/itinerary-kits/10-days-classic-china-itinerary",
  "/itinerary-kits/240-hour-visa-free-china-itinerary",
  "/store",
  "/tools",
  "/tools/china-trip-duration-planner",
  "/tools/city-route-picker",
  "/tools/essential-apps-checklist",
  "/tools/visa-free-eligibility-checker",
  "/contact",
  "/about",
] as const;

const legacyRoutes = [
  ["/cities", "/city-kits"],
  ["/cities/beijing", "/city-kits/beijing"],
  ["/cities/chengdu", "/city-kits/chengdu"],
  ["/cities/guangzhou", "/city-kits/guangzhou"],
  ["/cities/hangzhou", "/city-kits/hangzhou"],
  ["/cities/shanghai", "/city-kits/shanghai"],
  ["/cities/shenzhen", "/city-kits/shenzhen"],
  ["/cities/suzhou", "/city-kits/suzhou"],
  ["/cities/xian", "/city-kits/xian"],
  ["/itineraries", "/itinerary-kits"],
  ["/itineraries/10-days-classic-china-itinerary", "/itinerary-kits/10-days-classic-china-itinerary"],
  ["/itineraries/240-hour-visa-free-china-itinerary", "/itinerary-kits/240-hour-visa-free-china-itinerary"],
  ["/itineraries/3-days-in-beijing", "/itinerary-kits/3-days-in-beijing"],
  ["/itineraries/3-days-in-shanghai", "/itinerary-kits/3-days-in-shanghai"],
  ["/itineraries/4-days-in-beijing", "/itinerary-kits/4-days-in-beijing"],
  ["/itineraries/5-days-beijing-and-xian", "/itinerary-kits/5-days-beijing-and-xian"],
  ["/itineraries/7-days-shanghai-hangzhou-suzhou", "/itinerary-kits/7-days-shanghai-hangzhou-suzhou"],
] as const;

async function installAnalyticsRecorder(page: Page) {
  await page.evaluate(() => {
    sessionStorage.setItem("__phaseEEvents", "[]");
    window.gtag = (_command, eventName) => {
      const events = JSON.parse(sessionStorage.getItem("__phaseEEvents") || "[]") as string[];
      events.push(eventName);
      sessionStorage.setItem("__phaseEEvents", JSON.stringify(events));
    };
  });
}

async function analyticsEvents(page: Page) {
  return page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__phaseEEvents") || "[]") as string[],
  );
}

test("representative routes stay usable without console errors, broken images, or overflow", async ({ page }) => {
  test.setTimeout(150_000);

  for (const route of representativeRoutes) {
    await test.step(route, async () => {
      const routePage = await page.context().newPage();
      const errors: string[] = [];
      routePage.on("console", (message) => {
        if (["error", "assert"].includes(message.type())) errors.push(message.text());
      });
      routePage.on("pageerror", (error) => errors.push(error.message));
      const response = await routePage.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), route).toBe(200);
      await expect(routePage.locator("h1"), `${route} H1`).toHaveCount(1);
      await routePage.waitForTimeout(100);
      const state = await routePage.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        mixedContent: Array.from(document.querySelectorAll<HTMLImageElement | HTMLScriptElement>('img[src^="http:"], script[src^="http:"]')).map((node) => node.getAttribute("src")),
        missingAlt: Array.from(document.images).filter((image) => !image.hasAttribute("alt")).length,
        brokenVisibleImages: Array.from(document.images).filter((image) => {
          const box = image.getBoundingClientRect();
          return box.width > 0 && box.height > 0 && image.complete && image.naturalWidth === 0;
        }).length,
      }));
      expect(state.overflow, `${route} overflow`).toBe(false);
      expect(state.mixedContent, `${route} mixed content`).toEqual([]);
      expect(state.missingAlt, `${route} missing alt`).toBe(0);
      expect(state.brokenVisibleImages, `${route} broken image`).toBe(0);
      expect(errors, `${route} browser errors`).toEqual([]);
      await routePage.close();
    });
  }

  const missingPage = await page.context().newPage();
  const missing = await missingPage.goto("/phase-e-page-that-does-not-exist");
  expect(missing?.status()).toBe(404);
  const robotsDirectives = await missingPage.locator('meta[name="robots"]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("content") || ""),
  );
  expect(robotsDirectives.length).toBeGreaterThan(0);
  expect(robotsDirectives.every((directive) => directive.includes("noindex"))).toBe(true);
  await missingPage.close();
});

test("Itinerary Kits runtime ItemList matches all visible cards and canonical routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Structured data needs one runtime verification.");
  await page.goto("/itinerary-kits");
  const visibleCards = await page.locator("main article").count();
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => JSON.parse(script.textContent || "{}")),
  );
  const itemList = schemas.flatMap((schema) => Array.isArray(schema) ? schema : [schema])
    .find((schema) => schema["@type"] === "ItemList");
  expect(itemList).toBeTruthy();
  expect(itemList.numberOfItems).toBe(visibleCards);
  expect(itemList.itemListElement).toHaveLength(visibleCards);
  expect(itemList.itemListElement.map((item: { position: number }) => item.position)).toEqual(
    Array.from({ length: visibleCards }, (_, index) => index + 1),
  );
  for (const item of itemList.itemListElement as Array<{ url: string; image: string }>) {
    expect(item.url).toMatch(/^https:\/\/www\.firstchinatripkit\.com\/itinerary-kits\//);
    expect(item.url).not.toContain("/itineraries/");
    expect(item.image).toMatch(/^https:\/\/www\.firstchinatripkit\.com\//);
  }
});

test("all 17 legacy URLs are single-hop 301 and every sitemap URL is canonical 200", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Network matrix needs one verification.");
  for (const [legacy, destination] of legacyRoutes) {
    const response = await request.get(legacy, { maxRedirects: 0 });
    expect(response.status(), legacy).toBe(301);
    expect(response.headers().location, legacy).toBe(destination);
    const target = await request.get(destination, { maxRedirects: 0 });
    expect(target.status(), destination).toBe(200);
  }

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toHaveLength(49);
  for (const url of urls) {
    const path = new URL(url).pathname;
    expect(path).not.toMatch(/^\/(cities|itineraries)(?:\/|$)/);
    expect(path).not.toContain("thank-you");
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    const contentType = response.headers()["content-type"] || "";
    if (contentType.includes("text/html")) {
      const html = await response.text();
      expect(html, `${path} noindex`).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i);
      const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
      expect(canonical, `${path} canonical`).toBeTruthy();
      expect(canonical!.replace(/\/$/, ""), `${path} canonical`).toBe(url.replace(/\/$/, ""));
    }
  }
});

test("representative OG images load and official links use safe HTTPS behavior", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Metadata and external-link audit needs one verification.");
  for (const route of [
    "/",
    "/guides/how-to-pay-in-china-as-a-foreigner",
    "/city-kits/beijing",
    "/itinerary-kits/240-hour-visa-free-china-itinerary",
    "/store",
  ]) {
    await page.goto(route);
    const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(imageUrl, route).toBeTruthy();
    const response = await request.get(new URL(imageUrl!).pathname);
    expect(response.status(), imageUrl!).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }

  for (const route of [
    "/guides/how-to-pay-in-china-as-a-foreigner",
    "/guides/china-240-hour-visa-free-transit-guide",
    "/itinerary-kits/240-hour-visa-free-china-itinerary",
  ]) {
    await page.goto(route);
    const officialLinks = page.locator('main a[target="_blank"]');
    for (let index = 0; index < await officialLinks.count(); index += 1) {
      const link = officialLinks.nth(index);
      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
  }
});

test("configured form stubs expose loading, success, privacy-safe URLs, and single analytics events", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One deterministic form integration test is sufficient.");
  await page.route("**/api/contact", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, message: "Thanks! Your China trip question has been saved.", provider: "supabase" }) });
  });
  await page.goto("/contact");
  await installAnalyticsRecorder(page);
  await page.getByLabel("Name", { exact: true }).focus();
  await page.getByRole("textbox", { name: "Email", exact: true }).focus();
  await page.getByLabel("Name", { exact: true }).fill("Site QA Test");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("site-qa@example.com");
  await page.getByLabel("Main question", { exact: true }).fill("Automated production connectivity test. No response required.");
  await page.getByRole("button", { name: "Send question", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saving...", exact: true })).toBeDisabled();
  await expect(page.getByText("Thanks! Your China trip question has been saved.")).toBeVisible();
  let events = await analyticsEvents(page);
  expect(events.filter((event) => event === "contact_form_started")).toHaveLength(1);
  expect(events.filter((event) => event === "contact_form_submitted")).toHaveLength(1);

  await page.unroute("**/api/contact");
  await page.route("**/api/newsletter", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, message: "Thanks! You're subscribed.", provider: "supabase+brevo", delivery_status: "active" }) });
  });
  await page.goto("/");
  await installAnalyticsRecorder(page);
  await page.getByLabel("Email address").fill("site-qa@example.com");
  await page.getByRole("button", { name: "Get the checklist", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saving...", exact: true })).toBeDisabled();
  await expect(page).toHaveURL("/thank-you");
  expect(page.url()).not.toContain("email=");
  events = await analyticsEvents(page);
  expect(events.filter((event) => event === "newsletter_subscribed")).toHaveLength(1);
});

test("Store exposes only working commercial actions and an honest paid-product state", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One commercial-state verification is sufficient.");
  await page.goto("/store");

  const freeChecklist = page.getByRole("link", { name: "Download Free Checklist", exact: true }).first();
  await expect(freeChecklist).toBeVisible();
  const freeHref = await freeChecklist.getAttribute("href");
  expect(freeHref).toBeTruthy();
  if (freeHref!.startsWith("http")) {
    expect(freeHref).toMatch(/^https:\/\//);
    await expect(freeChecklist).toHaveAttribute("target", "_blank");
    await expect(freeChecklist).toHaveAttribute("rel", /noopener/);
  } else {
    expect(freeHref).toBe("/thank-you");
  }

  const paidAction = page.getByRole("link", { name: "Buy Payment & Apps Guide — $7", exact: true }).first();
  if (await paidAction.count()) {
    await expect(paidAction).toHaveAttribute("href", /^https:\/\//);
    await expect(paidAction).toHaveAttribute("target", "_blank");
    await expect(paidAction).toHaveAttribute("rel", /noopener/);
  } else {
    await expect(page.getByText("Paid checkout is temporarily unavailable; previews remain open.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Preview the $7 guide", exact: true })).toHaveAttribute("href", "#preview-pages");
  }
});

test("tracked interactions emit each required event once", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One analytics verification is sufficient.");
  await page.goto("/store");
  await installAnalyticsRecorder(page);
  await page.getByRole("link", { name: "Download Free Checklist", exact: true }).first().click();
  await expect(page).toHaveURL("/thank-you");
  let events = await analyticsEvents(page);
  expect(events.filter((event) => event === "checklist_download_clicked")).toHaveLength(1);

  await page.goto("/tools/essential-apps-checklist");
  await installAnalyticsRecorder(page);
  for (const checkbox of await page.locator('input[type="checkbox"]').all()) await checkbox.check();
  events = await analyticsEvents(page);
  expect(events.filter((event) => event === "essential_apps_checklist_completed")).toHaveLength(1);

  await page.goto("/tools/visa-free-eligibility-checker");
  await installAnalyticsRecorder(page);
  for (const checkbox of await page.locator('input[type="checkbox"]').all()) await checkbox.check();
  events = await analyticsEvents(page);
  expect(events.filter((event) => event === "visa_free_checker_completed")).toHaveLength(1);
});
