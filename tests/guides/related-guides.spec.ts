import { expect, test } from "@playwright/test";
import { guideRoutes } from "./guide-routes";

test("every Guide has valid, unique related Guide links", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Shared Guide relationship audit");
  for (const route of guideRoutes) {
    await page.goto(route);
    const section = page.getByRole("heading", { name: "Keep planning with these practical guides" }).locator("..").locator("..");
    const links = section.locator('a[href^="/guides/"]');
    const hrefs = await links.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href") || ""));
    const unique = [...new Set(hrefs)];
    expect(unique.length).toBeGreaterThanOrEqual(2);
    expect(unique.length).toBeLessThanOrEqual(3);
    expect(unique).not.toContain(route);
    expect(unique.length).toBe(hrefs.length / 2);
    for (const href of unique) expect(guideRoutes).toContain(href as (typeof guideRoutes)[number]);
  }
});
