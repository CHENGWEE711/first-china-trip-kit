import { expect, test } from "@playwright/test";

const route = "/tools/china-arrival-readiness-checker";

test("China Arrival Readiness Checker completes the privacy-safe lead flow and emits the Phase 5 events", { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Event capture is asserted once in Chromium");
  await page.addInitScript(() => {
    window.dataLayer = [];
  });
  await page.route("**/api/newsletter", async (request) => {
    await request.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true, message: "Saved" }) });
  });
  await page.goto(route);
  await expect(page.locator("h1")).toHaveText("China Arrival Readiness Checker");
  await expect(page.locator('[data-testid="arrival-readiness-checker"] button[aria-pressed]')).toHaveCount(24);

  const yesButtons = page.locator('[data-testid="arrival-readiness-checker"] button', { hasText: "Yes, this is ready" });
  for (let index = 0; index < await yesButtons.count(); index += 1) await yesButtons.nth(index).click();

  await expect(page.locator('[data-testid="arrival-readiness-result"]')).toBeVisible();
  await expect(page.locator('[data-testid="arrival-readiness-result"]')).toContainText("100");
  await page.locator("#arrival-readiness-email").fill("traveler@example.com");
  await page.getByRole("button", { name: "Send my result" }).click();
  await expect(page.locator('[data-testid="arrival-readiness-result"]')).toContainText("Checklist unlocked");

  const events = await page.evaluate(() =>
    (window.dataLayer || [])
      .flatMap((entry) => {
        if (entry && typeof entry === "object" && "event" in entry && typeof entry.event === "string") {
          return [{ name: entry.event, params: entry }];
        }
        const event = Array.isArray(entry) ? entry : Object.values(entry || {});
        return event[0] === "event" && typeof event[1] === "string"
          ? [{ name: event[1], params: event[2] as Record<string, unknown> | undefined }]
          : [];
      }),
  );
  const names = events.map((event) => event.name);
  expect(names.filter((name) => name === "readiness_checker_started")).toHaveLength(1);
  expect(names.filter((name) => name === "readiness_checker_completed")).toHaveLength(1);
  expect(names.filter((name) => name === "readiness_result_email_submitted")).toHaveLength(1);
  const completion = events.find((event) => event.name === "readiness_checker_completed");
  expect(completion?.params).toMatchObject({ score: 100, result_status: "ready", unresolved_count: 0 });
  expect(JSON.stringify(events)).not.toMatch(/traveler@example\.com|passport number|card number/i);
});

for (const viewport of [390, 768, 1440, 1920]) {
  test(`China Arrival Readiness Checker is usable at ${viewport}px`, { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Viewport grid runs once in Chromium");
    await page.setViewportSize({ width: viewport, height: 1000 });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      tooSmall: Array.from(document.querySelectorAll<HTMLElement>('[data-testid="arrival-readiness-checker"] button')).filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.height < 44;
      }).length,
    }));
    expect(state.overflow).toBe(false);
    expect(state.tooSmall).toBe(0);
  });
}

test("new tool and product routes have canonical metadata, structured data, sitemap entries and no sensitive form fields", { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "SEO inspection runs once in Chromium");
  await page.goto(route);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.firstchinatripkit.com/tools/china-arrival-readiness-checker");
  await expect(page.locator('script[type="application/ld+json"]')).not.toHaveCount(0);
  const formNames = await page.locator("input").evaluateAll((inputs) => inputs.map((input) => input.getAttribute("name") || input.id));
  expect(formNames.join(" ")).not.toMatch(/passport|card/i);
  const sitemap = await page.request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("https://www.firstchinatripkit.com/tools/china-arrival-readiness-checker");
  expect(await sitemap.text()).toContain("https://www.firstchinatripkit.com/products/china-arrival-setup-bundle");
});

test("bundle view and custom-itinerary review events use the approved privacy-safe flow", { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Event capture is asserted once in Chromium");
  await page.addInitScript(() => {
    window.dataLayer = [];
  });
  await page.goto("/products/china-arrival-setup-bundle");
  await expect(page.getByRole("heading", { name: "China Arrival Setup Bundle", exact: true })).toBeVisible();
  let events = await page.evaluate(() =>
    (window.dataLayer || [])
      .flatMap((entry) => {
        if (entry && typeof entry === "object" && "event" in entry && typeof entry.event === "string") {
          return [{ name: entry.event, params: entry }];
        }
        const event = Array.isArray(entry) ? entry : Object.values(entry || {});
        return event[0] === "event" && typeof event[1] === "string"
          ? [{ name: event[1], params: event[2] as Record<string, unknown> | undefined }]
          : [];
      }),
  );
  expect(events.filter((event) => event.name === "arrival_bundle_viewed")).toHaveLength(1);

  await page.route("**/api/contact", async (request) => {
    await request.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true, message: "Saved" }) });
  });
  await page.goto("/custom-itinerary");
  await page.getByLabel("Name", { exact: true }).fill("QA traveler");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("qa@example.com");
  await page.getByLabel("Main question", { exact: true }).fill("I need a realistic first China itinerary review for a seven-day trip.");
  await page.getByRole("button", { name: "Send question", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Saved");
  events = await page.evaluate(() =>
    (window.dataLayer || [])
      .flatMap((entry) => {
        if (entry && typeof entry === "object" && "event" in entry && typeof entry.event === "string") {
          return [{ name: entry.event, params: entry }];
        }
        const event = Array.isArray(entry) ? entry : Object.values(entry || {});
        return event[0] === "event" && typeof event[1] === "string"
          ? [{ name: event[1], params: event[2] as Record<string, unknown> | undefined }]
          : [];
      }),
  );
  expect(events.filter((event) => event.name === "itinerary_review_started")).toHaveLength(1);
  expect(events.filter((event) => event.name === "itinerary_review_submitted")).toHaveLength(1);
  expect(JSON.stringify(events)).not.toMatch(/qa@example\.com|QA traveler/i);
});
