import { expect, test } from "@playwright/test";

const INTEGRATION_ROUTES = [
  "/visa-free-transit",
  "/tools/visa-free-eligibility-checker",
  "/guides/china-240-hour-visa-free-transit-guide",
  "/itinerary-kits/240-hour-visa-free-china-itinerary",
  "/payments-and-apps",
  "/start-here",
  "/",
] as const;

test("Phase 3 routes load without console errors or horizontal overflow", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const route of INTEGRATION_ROUTES) {
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), `${route} should return HTTP 200`).toBe(200);
    await expect(page.locator("main"), `${route} should have one main landmark`).toHaveCount(1);
    await expect(page.locator("h1"), `${route} should have one H1`).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });

    const layout = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(
      layout.scrollWidth,
      `${route} must not overflow its ${layout.viewportWidth}px viewport`,
    ).toBeLessThanOrEqual(layout.viewportWidth);
  }

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("the legacy visa tool keeps its own canonical and hands off to the full screener", async ({
  page,
}) => {
  await page.goto("/tools/visa-free-eligibility-checker");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.firstchinatripkit.com/tools/visa-free-eligibility-checker",
  );
  await expect(
    page.getByRole("link", {
      name: "Check your full route and entry port",
      exact: true,
    }),
  ).toHaveAttribute("href", "/visa-free-transit#route-check");
});

test("the Guide and transit itinerary return visitors to the route screener", async ({
  page,
}) => {
  await page.goto("/guides/china-240-hour-visa-free-transit-guide");
  await expect(page.locator('a[href="/visa-free-transit#route-check"]')).not.toHaveCount(0);

  await page.goto("/itinerary-kits/240-hour-visa-free-china-itinerary");
  await expect(
    page.getByRole("link", {
      name: "Check whether your exact route and stay area match the current policy",
      exact: true,
    }),
  ).toHaveAttribute("href", "/visa-free-transit#route-check");
});

test("Homepage, Start Here and Payments Hub expose a Visa-Free Transit Hub entry", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('a[href="/visa-free-transit"]')).not.toHaveCount(0);

  await page.goto("/start-here");
  await expect(
    page.getByRole("link", { name: "Check your visa-free route", exact: true }),
  ).toHaveAttribute("href", "/visa-free-transit");

  await page.goto("/payments-and-apps");
  await expect(
    page.getByRole("link", {
      name: "Check your visa-free entry plan",
      exact: true,
    }),
  ).toHaveAttribute("href", "/visa-free-transit");
});
