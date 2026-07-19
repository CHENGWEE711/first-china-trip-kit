import { expect, test } from "@playwright/test";

async function loadImages(page: import("@playwright/test").Page) {
  const images = page.locator("img");
  const count = await images.count();
  for (let index = 0; index < count; index += 1) await images.nth(index).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`Guides list visual ${viewport.width}`, { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Explicit visual viewport");
    await page.setViewportSize(viewport);
    await page.goto("/guides");
    await loadImages(page);
    await expect(page).toHaveScreenshot(`guides-list-${viewport.width}.png`, { fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.015 });
  });
}
