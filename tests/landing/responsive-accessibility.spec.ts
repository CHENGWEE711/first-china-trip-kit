import { expect, test } from "@playwright/test";
import { gotoWithNetworkRetry } from "./helpers";

const LANDING_PATHS = [
  "/landing/pay-in-china",
  "/landing/china-visa-free",
  "/landing/china-checklist",
] as const;

for (const path of LANDING_PATHS) {
  test(`${path} remains readable and keyboard-operable at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await gotoWithNetworkRetry(page, path, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.waitForTimeout(200);
    await expect(page.getByTestId("landing-hero")).toBeVisible();

    const semantics = await page.evaluate(() => {
      const headings = Array.from(
        document.querySelectorAll("main h1, main h2, main h3, main h4"),
        (heading) => Number(heading.tagName.slice(1)),
      );
      return {
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: Array.from(document.images).filter(
          (image) => image.complete && image.naturalWidth === 0,
        ).length,
        imagesWithoutAlt: document.querySelectorAll("main img:not([alt])").length,
        unnamedActions: Array.from(document.querySelectorAll("main a, main button")).filter(
          (element) => !(element.getAttribute("aria-label") || element.textContent?.trim()),
        ).length,
        headingJumps: headings.filter(
          (level, index) => index > 0 && level - headings[index - 1] > 1,
        ),
        undersizedPrimaryControls: Array.from(
          document.querySelectorAll<HTMLElement>("main [data-landing-cta]"),
        ).filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
        }).length,
      };
    });

    expect(semantics.horizontalOverflow).toBe(false);
    expect(semantics.brokenImages).toBe(0);
    expect(semantics.imagesWithoutAlt).toBe(0);
    expect(semantics.unnamedActions).toBe(0);
    expect(semantics.headingJumps).toEqual([]);
    expect(semantics.undersizedPrimaryControls).toBe(0);

    const firstCta = page.locator("main [data-landing-cta]").first();
    await expect(firstCta).toBeVisible();
    await firstCta.focus();
    await expect(firstCta).toBeFocused();

    const faqButtons = page.getByTestId("landing-faq").locator("button[aria-expanded]");
    if ((await faqButtons.count()) > 0) {
      const firstFaq = faqButtons.first();
      await firstFaq.focus();
      await firstFaq.press("Enter");
      await expect(firstFaq).toHaveAttribute("aria-expanded", "true");
    } else {
      await expect(page.getByTestId("landing-faq").locator("details summary").first()).toBeVisible();
    }
  });
}

test("the checklist form exposes a visible label and keyboard focus state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoWithNetworkRetry(page, "/landing/china-checklist");
  await page.getByRole("link", { name: "Download Free Checklist", exact: true }).first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#free-checklist")).toBeVisible();

  const email = page.getByRole("textbox", { name: "Email address" });
  await expect(page.getByRole("textbox")).toHaveCount(1);
  await expect(page.locator('input[name="website"][type="text"]')).toHaveCount(1);
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute("type", "email");
  await expect(email).toHaveAttribute("required", "");
  await email.focus();
  await expect(email).toBeFocused();
  await page.keyboard.type("keyboard@example.test");
  await expect(email).toHaveValue("keyboard@example.test");
});
