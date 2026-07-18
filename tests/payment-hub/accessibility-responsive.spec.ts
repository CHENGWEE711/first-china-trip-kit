import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
] as const;

for (const viewport of viewports) {
  test(`Payment Hub is readable and operable at ${viewport.width}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Viewport matrix runs in one browser engine");
    await page.setViewportSize(viewport);
    await page.goto("/payments-and-apps", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('[data-testid="payment-hub-hero"]')).toBeVisible();

    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      emptyAlt: document.querySelectorAll('main img[alt=""]').length,
      brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).length,
      smallControls: Array.from(document.querySelectorAll<HTMLElement>("main button, main label, main a[class*='min-h-11'], #quick-start a"))
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
        })
        .length,
      unnamedActions: Array.from(document.querySelectorAll("main a, main button")).filter(
        (element) => !(element.getAttribute("aria-label") || element.textContent?.trim()),
      ).length,
    }));
    expect(state.overflow).toBe(false);
    expect(state.emptyAlt).toBe(0);
    expect(state.brokenImages).toBe(0);
    expect(state.smallControls).toBe(0);
    expect(state.unnamedActions).toBe(0);

    const readinessInputs = page.locator('[data-testid="payment-readiness-checker"] input[type="checkbox"]');
    await expect(readinessInputs).toHaveCount(5);
    const firstReadiness = readinessInputs.first();
    await firstReadiness.focus();
    await firstReadiness.press("Space");
    await expect(firstReadiness).toBeChecked();
  });
}

test("Payment Hub headings, fields and disclosures have accessible semantics", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One semantic pass is sufficient");
  await page.goto("/payments-and-apps");

  const issues = await page.evaluate(() => {
    const levels = Array.from(document.querySelectorAll("main h1, main h2, main h3, main h4"), (heading) => Number(heading.tagName.slice(1)));
    return {
      headingJumps: levels.filter((level, index) => index > 0 && level - levels[index - 1] > 1),
      inputsWithoutLabels: Array.from(document.querySelectorAll("main input")).filter(
        (input) => !input.closest("label") && !input.getAttribute("aria-label") && !input.getAttribute("aria-labelledby"),
      ).length,
    };
  });
  expect(issues.headingJumps).toEqual([]);
  expect(issues.inputsWithoutLabels).toBe(0);
  await expect(page.locator('[data-testid="offline-backup-plan"] button[aria-expanded]')).toHaveCount(8);
  await expect(page.locator('[aria-live="polite"]')).not.toHaveCount(0);
});
