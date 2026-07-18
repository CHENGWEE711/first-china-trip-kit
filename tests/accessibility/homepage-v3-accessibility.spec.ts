import { expect, test } from "@playwright/test";

test("Homepage 3.0 has a coherent semantic and accessible structure", async ({ page }) => {
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
  await expect(page.locator("#home-tasks a")).toHaveCount(4);

  const issues = await page.evaluate(() => {
    const headingLevels = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main h4"),
      (heading) => Number(heading.tagName.slice(1)),
    );
    return {
      headingJumps: headingLevels.filter(
        (level, index) => index > 0 && level - headingLevels[index - 1] > 1,
      ),
      unnamedActions: Array.from(document.querySelectorAll("a, button")).filter((element) => {
        const name =
          element.getAttribute("aria-label") ||
          element.textContent?.trim() ||
          element.querySelector("img")?.getAttribute("alt");
        return !name;
      }).length,
    };
  });

  expect(issues.headingJumps).toEqual([]);
  expect(issues.unnamedActions).toBe(0);
});

test("Homepage 3.0 task navigation and mobile menu work from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.focus();
  await menuButton.press("Enter");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  const firstMenuLink = page.locator("#mobile-navigation a").first();
  const lastMenuLink = page.locator("#mobile-navigation a").last();
  await expect(firstMenuLink).toBeFocused();
  await firstMenuLink.press("Shift+Tab");
  await expect(lastMenuLink).toBeFocused();
  await lastMenuLink.press("Tab");
  await expect(firstMenuLink).toBeFocused();
  await firstMenuLink.press("Escape");
  await expect(menuButton).toBeFocused();
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);

  const firstTask = page.locator("#home-tasks a").first();
  await firstTask.focus();
  await expect(firstTask).toBeFocused();
  await expect(firstTask).toHaveAttribute("href", "/tools/visa-free-eligibility-checker");
});
