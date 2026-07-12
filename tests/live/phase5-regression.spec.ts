import { expect, test } from "@playwright/test";

const routes = [
  "/guides",
  "/guides/how-to-pay-in-china-as-a-foreigner",
  "/start-here",
  "/city-kits",
  "/itinerary-kits",
  "/store",
  "/tools",
  "/about",
] as const;

test("phase 5 shared styles do not break priority routes", async ({ page }) => {
  for (const route of routes) {
    await test.step(route, async () => {
      const severeErrors: string[] = [];
      const onConsole = (message: { type(): string; text(): string }) => {
        if (["error", "assert"].includes(message.type())) severeErrors.push(message.text());
      };
      page.on("console", onConsole);

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} should return a successful response`).toBe(true);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect(page.locator("footer")).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, `${route} should not scroll horizontally`).toBe(false);
      expect(severeErrors, `${route} should not log severe console errors`).toEqual([]);
      page.off("console", onConsole);
    });
  }
});
