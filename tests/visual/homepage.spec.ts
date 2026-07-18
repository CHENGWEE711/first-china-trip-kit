import { expect, test } from "@playwright/test";

test("homepage matches the approved desktop and mobile baseline", async ({ page }, testInfo) => {
  if (!["chromium-desktop", "chromium-mobile"].includes(testInfo.project.name)) {
    await page.goto("/");
    await expect(page.locator("#home-hero")).toBeVisible();
    await expect(page.locator("#home-product")).toBeAttached();
    return;
  }
  const mobile = testInfo.project.name === "chromium-mobile";
  const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 };
  await page.setViewportSize(viewport);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
    await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)));
  });
  await page.waitForFunction(
    () => Array.from(document.images).every((image) => image.getClientRects().length === 0 || image.complete),
    null,
    { timeout: 10_000 },
  );
  await page.waitForFunction(() => window.scrollY === 0);
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  await page.waitForTimeout(500);

  await expect(page).toHaveScreenshot(`homepage-${viewport.width}.png`, {
    animations: "disabled",
    caret: "hide",
    fullPage: true,
    maxDiffPixelRatio: 0.005,
    scale: "css",
    timeout: 15_000,
  });
});
