import { expect, test } from "@playwright/test";

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 1000 },
] as const;

for (const viewport of viewports) {
  test(`Homepage 3.0 is usable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#home-hero")).toBeVisible();
    await expect(page.locator('#home-hero a[href="/start-here"]')).toBeVisible();
    await expect(page.locator('#home-hero a[href="/guides/how-to-pay-in-china-as-a-foreigner"]')).toBeVisible();
    await expect(page.locator("#home-tasks a")).toHaveCount(4);

    const productPreview = page.locator('[data-testid="product-preview"]');
    await productPreview.scrollIntoViewIfNeeded();
    await expect(productPreview.locator("img")).toHaveCount(4);
    await page.waitForFunction(() =>
      Array.from(
        document.querySelectorAll<HTMLImageElement>('[data-testid="product-preview"] img'),
      ).every((image) => image.complete && image.naturalWidth > 0),
    );

    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      heroTitleOverflow: (() => {
        const heading = document.querySelector("h1");
        return heading ? heading.scrollWidth > heading.clientWidth + 1 : true;
      })(),
      brokenImages: Array.from(document.images).filter(
        (image) => image.complete && image.naturalWidth === 0,
      ).length,
      taskTargets: Array.from(document.querySelectorAll<HTMLElement>("#home-tasks a")).map(
        (link) => ({ width: link.getBoundingClientRect().width, height: link.getBoundingClientRect().height }),
      ),
      newsletterFontSize: Number.parseFloat(
        getComputedStyle(document.querySelector('input[type="email"]') as Element).fontSize,
      ),
    }));

    expect(state.overflow).toBe(false);
    expect(state.heroTitleOverflow).toBe(false);
    expect(state.brokenImages).toBe(0);
    expect(state.taskTargets.every((target) => target.width >= 44 && target.height >= 44)).toBe(true);
    expect(state.newsletterFontSize).toBeGreaterThanOrEqual(16);

    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    if (viewport.width < 1024) {
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      await expect(page.locator("#mobile-navigation")).toBeVisible();
      await menuButton.click();
      await expect(page.locator("#mobile-navigation")).toHaveCount(0);
    } else {
      await expect(menuButton).toBeHidden();
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    }
  });
}
