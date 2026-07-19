import { expect, test } from "@playwright/test";
import { gotoWithNetworkRetry } from "./helpers";

const LANDINGS = [
  {
    path: "/landing/pay-in-china",
    primaryName: "Open Payments Hub",
    primaryHref: "/payments-and-apps",
    secondaryName: "Download Checklist",
    secondaryHref: "/landing/china-checklist#free-checklist",
  },
  {
    path: "/landing/china-visa-free",
    primaryName: "Check My Route",
    primaryHref: "/visa-free-transit#route-check",
    secondaryName: "Read Visa Guide",
    secondaryHref: "/guides/china-240-hour-visa-free-transit-guide",
  },
  {
    path: "/landing/china-checklist",
    primaryName: "Download Free Checklist",
    primaryHref: "#free-checklist",
    secondaryName: "Explore Start Here",
    secondaryHref: "/start-here",
  },
] as const;

const REQUIRED_SECTIONS = [
  "landing-hero",
  "landing-quick-answer",
  "landing-benefits",
  "landing-trust",
  "landing-primary-cta",
  "landing-hub-preview",
  "landing-faq",
  "landing-related-content",
  "landing-footer-cta",
] as const;

for (const landing of LANDINGS) {
  test(`${landing.path} renders the reusable short-form landing structure without browser errors`, async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });

    const response = await gotoWithNetworkRetry(page, landing.path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), landing.path).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const heroImage = page.getByTestId("landing-hero").locator("img");
    await expect.poll(() =>
      heroImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    ).toBe(true);
    await page.waitForTimeout(200);

    for (const testId of REQUIRED_SECTIONS) {
      await expect(page.getByTestId(testId), `${landing.path}: ${testId}`).toHaveCount(1);
    }

    const primary = page.getByRole("link", { name: landing.primaryName, exact: true }).first();
    const secondary = page.getByRole("link", { name: landing.secondaryName, exact: true }).first();
    await expect(primary).toBeVisible();
    await expect(primary).toHaveAttribute("href", landing.primaryHref);
    await expect(secondary).toBeVisible();
    await expect(secondary).toHaveAttribute("href", landing.secondaryHref);

    const quality = await page.evaluate(() => ({
      brokenImages: Array.from(document.images).filter(
        (image) => image.complete && image.naturalWidth === 0,
      ).length,
      placeholders:
        document.querySelector("main")?.textContent?.match(/lorem ipsum|coming soon|placeholder/gi) || [],
      internalUtmLinks: Array.from(
        document.querySelectorAll<HTMLAnchorElement>('main a[href^="/"]'),
      )
        .map((link) => link.getAttribute("href") || "")
        .filter((href) => /[?&]utm_(?:source|medium|campaign|content)=/.test(href)),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    }));
    expect(quality.brokenImages).toBe(0);
    expect(quality.placeholders).toEqual([]);
    expect(quality.internalUtmLinks).toEqual([]);
    expect(quality.horizontalOverflow).toBe(false);
    expect(runtimeErrors, `${landing.path} should not emit browser errors`).toEqual([]);
  });
}

test("primary Hub calls to action reach the existing product Hubs", async ({ page }) => {
  await gotoWithNetworkRetry(page, "/landing/pay-in-china");
  await page.getByRole("link", { name: "Open Payments Hub", exact: true }).first().click();
  await expect(page).toHaveURL(/\/payments-and-apps(?:#.*)?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Set Up China Before You Land",
  );
  await page.waitForLoadState("networkidle");

  await gotoWithNetworkRetry(page, "/landing/china-visa-free");
  await page.getByRole("link", { name: "Check My Route", exact: true }).first().click();
  await expect(page).toHaveURL(/\/visa-free-transit(?:#.*)?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Can You Use China’s 240-Hour Visa-Free Transit?",
  );
  await expect(page.locator("#route-check-heading")).toBeFocused();
});

test("all internal links in the three landing bodies resolve without broken responses", async ({ page }) => {
  const destinations = new Set<string>();
  for (const landing of LANDINGS) {
    await gotoWithNetworkRetry(page, landing.path, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator('main a[href]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") || ""),
    );
    for (const href of hrefs) {
      if (href.startsWith("#")) {
        await expect(page.locator(href), `${landing.path}: ${href}`).toHaveCount(1);
      } else if (href.startsWith("/")) {
        destinations.add(href.split("#")[0]);
      }
    }
  }

  for (const destination of destinations) {
    const response = await page.request.get(destination, { maxRetries: 2 });
    expect(response.status(), destination).toBeGreaterThanOrEqual(200);
    expect(response.status(), destination).toBeLessThan(400);
  }
});

test("the checklist landing connects its primary CTA to a working newsletter flow", async ({ page }) => {
  await page.route("**/api/newsletter", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Thanks! Your checklist is ready on the next page.",
      }),
    });
  });

  await gotoWithNetworkRetry(page, "/landing/china-checklist");
  await page.getByRole("link", { name: "Download Free Checklist", exact: true }).first().click();
  await expect(page.locator("#free-checklist")).toBeVisible();

  const email = page.getByRole("textbox", { name: "Email address" });
  await expect(page.getByRole("textbox")).toHaveCount(1);
  await expect(page.locator('input[name="website"][type="text"]')).toHaveCount(1);
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute("required", "");
  await email.fill("landing-qa@example.test");
  await page.getByRole("button", { name: /get|download/i }).click();
  await expect(page.getByRole("status")).toContainText(/checklist|ready|subscribed/i);
  await expect(page).toHaveURL(/\/thank-you$/, { timeout: 5_000 });
});
