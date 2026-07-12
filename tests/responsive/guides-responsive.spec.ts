import { expect, test } from "@playwright/test";

const viewports = [
  { width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 1000 },
];

for (const viewport of viewports) {
  test(`Guides remain usable at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Explicit viewport matrix runs once");
    await page.setViewportSize(viewport);
    for (const route of ["/guides", "/guides/how-to-pay-in-china-as-a-foreigner"]) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
}
