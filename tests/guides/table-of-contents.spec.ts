import { expect, test } from "@playwright/test";
import { createSectionId } from "../../lib/section-id";
import { guideRoutes } from "./guide-routes";

const guidePath = guideRoutes[0];

test.describe("Guide table of contents", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Desktop sticky table of contents only");
    await page.goto(guidePath);
  });

  test("clicking a contents link updates the hash and clears the sticky header", async ({ page }) => {
    const link = page.locator('nav[aria-label="Guide contents"] a[href="#troubleshooting"]');
    await expect(link).toHaveCount(1);
    await link.click();
    await expect(page).toHaveURL(/#troubleshooting$/);
    await expect(link).toHaveAttribute("aria-current", "location");

    const offsets = await page.evaluate(() => {
      const header = document.querySelector("body > header");
      const target = document.getElementById("troubleshooting");
      return {
        headerBottom: header?.getBoundingClientRect().bottom || 0,
        targetTop: target?.getBoundingClientRect().top || 0,
      };
    });
    expect(offsets.targetTop).toBeGreaterThanOrEqual(offsets.headerBottom);
  });

  test("browser back restores the previous section hash", async ({ page }) => {
    await page.locator('nav[aria-label="Guide contents"] a[href="#step-by-step-guide"]').click();
    await expect(page).toHaveURL(/#step-by-step-guide$/);
    await page.locator('nav[aria-label="Guide contents"] a[href="#common-mistakes"]').click();
    await expect(page).toHaveURL(/#common-mistakes$/);
    await page.goBack();
    await expect(page).toHaveURL(/#step-by-step-guide$/);
  });

  test("scroll position highlights the current section", async ({ page }) => {
    const target = page.locator("#first-day-checklist");
    await target.evaluate((element) => element.scrollIntoView({ block: "start" }));
    await expect(page.locator('nav[aria-label="Guide contents"] a[href="#first-day-checklist"]')).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  test("contents links are keyboard operable and visibly focusable", async ({ page }) => {
    const link = page.locator('nav[aria-label="Guide contents"] a[href="#quick-answer"]');
    await link.focus();
    const outline = await link.evaluate((element) => getComputedStyle(element).outlineStyle);
    expect(outline).not.toBe("none");
    await link.press("Enter");
    await expect(page).toHaveURL(/#quick-answer$/);
  });

  test("all Guide pages use unique DOM ids", async ({ page }) => {
    for (const route of guideRoutes) {
      await page.goto(route);
      const duplicates = await page.evaluate(() => {
        const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
        return ids.filter((id, index) => ids.indexOf(id) !== index);
      });
      expect(duplicates, `${route} should not contain duplicate IDs`).toEqual([]);
    }
  });

  test("non-English section labels create stable anchors", () => {
    expect(createSectionId("实用中文短语")).toBe("实用中文短语");
    expect(createSectionId("支付方式 / 常见问题")).toBe("支付方式-常见问题");
    expect(createSectionId("Café & Métro")).toBe("cafe-metro");
  });
});

test.describe("Mobile guide table of contents", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Mobile accordion behavior");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(guidePath);
  });

  test("is collapsed by default, expands, navigates, and closes", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /On this page/ });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("navigation", { name: "Mobile guide contents" }).getByRole("link", { name: "Troubleshooting" }).click();
    await expect(page).toHaveURL(/#troubleshooting$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("Escape closes the menu and restores focus", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /On this page/ });
    await toggle.click();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });
});
