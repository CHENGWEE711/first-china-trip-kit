import { expect, test } from "@playwright/test";

test("Guide list and article expose accessible navigation and actions", async ({ page }) => {
  await page.goto("/guides");
  await expect(page.getByRole("navigation", { name: "Guide topics" })).toBeVisible();
  await expect(page.locator('main img[alt=""]')).toHaveCount(0);
  await page.goto("/guides/how-to-pay-in-china-as-a-foreigner");
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  const unnamed = await page.locator("main a, main button").evaluateAll((nodes) => nodes.filter((node) => !(node.getAttribute("aria-label") || node.textContent?.trim() || node.querySelector("img")?.getAttribute("alt"))).length);
  expect(unnamed).toBe(0);
});
