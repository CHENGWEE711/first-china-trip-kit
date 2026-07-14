import { expect, test } from "@playwright/test";

test("homepage has a usable semantic structure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByLabel("Email address")).toHaveCount(1);
  await expect(page.locator('main img[alt=""]')).toHaveCount(0);

  const issues = await page.evaluate(() => {
    const headingLevels = Array.from(document.querySelectorAll("main h1, main h2, main h3, main h4"), (heading) => Number(heading.tagName.slice(1)));
    const headingJumps = headingLevels.filter((level, index) => index > 0 && level - headingLevels[index - 1] > 1);
    const unnamedActions = Array.from(document.querySelectorAll("a, button")).filter((element) => {
      const name = element.getAttribute("aria-label") || element.textContent?.trim() || element.querySelector("img")?.getAttribute("alt");
      return !name;
    }).length;
    return { headingJumps, unnamedActions };
  });
  expect(issues.headingJumps).toEqual([]);
  expect(issues.unnamedActions).toBe(0);
});

test("mobile navigation supports ARIA, Escape and focus return", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.focus();
  await menuButton.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  const firstMenuLink = page.locator("#mobile-navigation a").first();
  const lastMenuLink = page.locator("#mobile-navigation a").last();
  await expect(firstMenuLink).toBeFocused();
  await firstMenuLink.press("Shift+Tab");
  await expect(lastMenuLink).toBeFocused();
  await lastMenuLink.press("Tab");
  await expect(firstMenuLink).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow-y", "hidden");
  await firstMenuLink.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});
