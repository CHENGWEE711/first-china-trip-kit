import { test } from "@playwright/test";
import path from "node:path";

const evidence = path.resolve("docs/screenshots/phase6-guides/after");
const payment = "/guides/how-to-pay-in-china-as-a-foreigner";

async function loadImages(page: import("@playwright/test").Page) {
  const images = page.locator("img");
  const count = await images.count();
  for (let index = 0; index < count; index += 1) await images.nth(index).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
}

test("capture Phase 6 Guide evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One evidence capture run");
  for (const item of [
    { name: "guides-list", route: "/guides" },
    { name: "payment-guide", route: payment },
    { name: "apps-guide", route: "/guides/best-apps-for-traveling-in-china" },
  ]) {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.goto(item.route);
      await loadImages(page);
      await page.screenshot({ path: path.join(evidence, `${item.name}-after-${viewport.width}.png`), fullPage: true });
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(payment);
  await page.screenshot({ path: path.join(evidence, "mobile-toc-closed-390.png") });
  await page.getByRole("button", { name: /On this page/ }).click();
  await page.screenshot({ path: path.join(evidence, "mobile-toc-open-390.png") });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(payment);
  await page.locator("#troubleshooting").scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(evidence, "desktop-toc-active-section-1440.png") });
  await page.getByRole("heading", { name: "Keep planning with these practical guides" }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(evidence, "related-guides-1440.png") });
});
