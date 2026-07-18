import { expect, test, type Page } from "@playwright/test";

async function prepareVisualPage(page: Page) {
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
    await Promise.all(
      Array.from(document.images).map((image) => image.decode().catch(() => undefined)),
    );
  });
  await page.waitForFunction(
    () =>
      Array.from(document.images).every(
        (image) => image.getClientRects().length === 0 || image.complete,
      ),
    null,
    { timeout: 10_000 },
  );
  await page.waitForFunction(() => window.scrollY === 0);
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  await page.waitForTimeout(400);
}

test("Homepage 3.0 desktop and mobile full-page baselines", async ({ page }, testInfo) => {
  const viewport =
    testInfo.project.name === "chromium-desktop"
      ? { width: 1440, height: 1000 }
      : testInfo.project.name === "chromium-mobile"
        ? { width: 390, height: 844 }
        : null;

  if (!viewport) {
    await page.goto("/");
    await expect(page.locator("#home-hero")).toBeVisible();
    await expect(page.locator("#home-product")).toBeAttached();
    return;
  }

  await page.setViewportSize(viewport);
  await prepareVisualPage(page);
  await expect(page).toHaveScreenshot(`homepage-v3-${viewport.width}.png`, {
    animations: "disabled",
    caret: "hide",
    fullPage: true,
    maxDiffPixelRatio: 0.005,
    scale: "css",
    timeout: 15_000,
  });
});

test("Homepage 3.0 mobile menu baseline", async ({ page }, testInfo) => {
  if (testInfo.project.name !== "chromium-mobile") {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    return;
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await expect(page.locator("#mobile-navigation")).toHaveScreenshot(
    "homepage-v3-mobile-menu-390.png",
    { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.005 },
  );
});

test("Homepage 3.0 product section baseline", async ({ page }, testInfo) => {
  if (testInfo.project.name !== "chromium-desktop") {
    await page.goto("/");
    await expect(page.locator("#home-product")).toBeAttached();
    return;
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await prepareVisualPage(page);
  const product = page.locator("#home-product");
  await product.scrollIntoViewIfNeeded();
  await expect(product).toHaveScreenshot("homepage-v3-product-1440.png", {
    animations: "disabled",
    caret: "hide",
    maxDiffPixelRatio: 0.005,
    timeout: 15_000,
  });
});

test("Homepage 3.0 task navigation baseline", async ({ page }, testInfo) => {
  if (testInfo.project.name !== "chromium-mobile") {
    await page.goto("/");
    await expect(page.locator('[data-testid="homepage-task-grid"]')).toBeAttached();
    return;
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await prepareVisualPage(page);
  await page.addStyleTag({ content: "header, .skip-link { display: none !important; }" });
  const tasks = page.locator('[data-testid="homepage-task-grid"]');
  await tasks.scrollIntoViewIfNeeded();
  await expect(tasks).toHaveScreenshot("homepage-v3-tasks-390.png", {
    animations: "disabled",
    caret: "hide",
    maxDiffPixelRatio: 0.005,
    timeout: 15_000,
  });
});
