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
  test(`homepage layout is stable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#home-hero")).toBeVisible();
    await expect(page.locator('#home-hero a[href="/start-here"]')).toBeVisible();
    await expect(page.locator('#home-hero a[href="/payments-and-apps"]')).toBeVisible();

    const productPreview = page.locator('[data-testid="product-preview"]');
    await productPreview.scrollIntoViewIfNeeded();
    await expect(productPreview.locator("img")).toHaveCount(4);
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll<HTMLImageElement>('[data-testid="product-preview"] img'))
        .every((image) => image.complete && image.naturalWidth > 0),
    );

    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      heroTitleOverflow: (() => {
        const heading = document.querySelector("h1");
        return heading ? heading.scrollWidth > heading.clientWidth + 1 : true;
      })(),
      brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).length,
      productPreviewQuality: Array.from(document.querySelectorAll<HTMLImageElement>('[data-testid="product-preview"] img'))
        .every((image) => image.naturalWidth / image.clientWidth >= 0.65 && image.naturalHeight / image.clientHeight >= 0.65),
      newsletterFontSize: Number.parseFloat(getComputedStyle(document.querySelector('input[type="email"]') as Element).fontSize),
    }));
    expect(state.overflow).toBe(false);
    expect(state.heroTitleOverflow).toBe(false);
    expect(state.brokenImages).toBe(0);
    expect(state.productPreviewQuality).toBe(true);
    expect(state.newsletterFontSize).toBeGreaterThanOrEqual(16);

    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    if (viewport.width < 1024) {
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      await expect(page.locator("#mobile-navigation")).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    } else {
      await expect(menuButton).toBeHidden();
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    }
  });
}
