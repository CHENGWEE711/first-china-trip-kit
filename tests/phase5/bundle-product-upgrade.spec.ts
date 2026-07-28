import { expect, test } from "@playwright/test";

const bundleRoute = "/products/china-arrival-setup-bundle";
const viewports = [390, 768, 1440, 1920] as const;

test("Phase 5.2 Bundle presents a distinct seven-file product without layout regressions", { tag: "@chromium-desktop-only" }, async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "The explicit viewport matrix runs once in Chromium");

  const severeErrors: string[] = [];
  page.on("console", (message) => {
    if (["error", "assert"].includes(message.type())) severeErrors.push(message.text());
  });

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(bundleRoute, { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { name: "Arrive in China with payments, internet, addresses and your first ride already sorted." })).toBeVisible();
    await expect(page.getByText("The $19 Bundle includes the complete $7 Payment & Apps Guide.")).toBeVisible();
    await expect(page.getByText("Seven focused files", { exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: "Payment troubleshooting decision tree preview" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Fillable China Arrival Sheet preview" })).toBeVisible();

    const quality = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      heroCtasTooSmall: Array.from(document.querySelectorAll<HTMLElement>("section a, section button"))
        .filter((element) => /Arrival Setup Bundle|readiness checker|real previews/i.test(element.textContent || ""))
        .some((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.height < 44;
        }),
    }));

    expect(quality.overflow, `Bundle must not overflow at ${width}px`).toBe(false);
    expect(quality.heroCtasTooSmall, `Bundle CTAs must meet the 44px target at ${width}px`).toBe(false);
  }

  await page.goto("/store", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "China Arrival Setup Bundle" })).toBeVisible();
  const detailLink = page.getByRole("link", { name: "View Bundle details" });
  await expect(detailLink).toHaveCount(1);
  await expect(detailLink).toHaveAttribute("href", "/products/china-arrival-setup-bundle");
  expect(severeErrors).toEqual([]);
});
