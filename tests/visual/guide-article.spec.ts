import { expect, test } from "@playwright/test";

async function loadImages(page: import("@playwright/test").Page) {
  const images = page.locator("img");
  const count = await images.count();
  for (let index = 0; index < count; index += 1) await images.nth(index).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const item of [
  { name: "payment", path: "/guides/how-to-pay-in-china-as-a-foreigner" },
  { name: "apps", path: "/guides/best-apps-for-traveling-in-china" },
]) for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`${item.name} Guide visual ${viewport.width}`, { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Explicit visual viewport");
    await page.setViewportSize(viewport);
    await page.goto(item.path);
    await loadImages(page);
    await expect(page).toHaveScreenshot(`${item.name}-guide-${viewport.width}.png`, { fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.015 });
  });
}
