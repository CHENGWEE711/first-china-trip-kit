import { expect, test } from "@playwright/test";

test("Guide template retains basic semantic and keyboard accessibility", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Shared Guide template semantics");
  await page.goto("/guides/how-to-pay-in-china-as-a-foreigner");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await expect(page.getByRole("navigation", { name: "Guide contents" })).toBeVisible();
  await expect(page.getByRole("table", { name: /comparison table/ })).toHaveCount(1);
  await expect(page.locator('[role="note"][aria-label="Important notice"]')).toHaveCount(0);
  await expect(page.locator('[lang="zh-Hans"]')).not.toHaveCount(0);
  await expect(page.locator('article img[alt=""]')).toHaveCount(0);

  const semanticIssues = await page.evaluate(() => {
    const headingLevels = Array.from(document.querySelectorAll("main h1, main h2, main h3, main h4"), (heading) =>
      Number(heading.tagName.slice(1)),
    );
    const headingJumps = headingLevels.filter((level, index) => index > 0 && level - headingLevels[index - 1] > 1);
    const unnamedActions = Array.from(document.querySelectorAll("main a, main button")).filter((element) => {
      const name = element.getAttribute("aria-label") || element.textContent?.trim() || element.querySelector("img")?.getAttribute("alt");
      return !name;
    }).length;
    return { headingJumps, unnamedActions };
  });
  expect(semanticIssues.headingJumps).toEqual([]);
  expect(semanticIssues.unnamedActions).toBe(0);

  const colors = await page.locator("#quick-answer p:last-child").evaluate((element) => {
    const parse = (value: string) => value.match(/[\d.]+/g)?.slice(0, 3).map(Number) || [0, 0, 0];
    const luminance = (rgb: number[]) => {
      const channels = rgb.map((channel) => {
        const value = channel / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const foreground = luminance(parse(getComputedStyle(element).color));
    const background = luminance(parse(getComputedStyle(element.parentElement as Element).backgroundColor));
    return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  });
  expect(colors).toBeGreaterThanOrEqual(4.5);
});
