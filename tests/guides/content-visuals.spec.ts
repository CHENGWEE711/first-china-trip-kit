import { expect, test } from "@playwright/test";
import { guideRoutes } from "./guide-routes";

for (const route of guideRoutes) {
  test(`${route} renders one hero and only intentional inline visuals`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Shared visual data is audited once per Guide");
    await page.goto(route);
    const inlineImages = page.locator('article figure[data-guide-visual="inline"] img');
    for (let index = 0; index < await inlineImages.count(); index += 1) {
      const image = inlineImages.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) =>
        element instanceof HTMLImageElement ? element.naturalWidth : 0,
      )).toBeGreaterThan(0);
    }
    const visualData = await page.evaluate(() => {
      const readFigure = (figure: Element) => {
        const image = figure.querySelector("img");
        return {
          src: image?.currentSrc || image?.getAttribute("src") || "",
          alt: image?.getAttribute("alt") || "",
          naturalWidth: image instanceof HTMLImageElement ? image.naturalWidth : 0,
          visible: Boolean(image && image.getBoundingClientRect().width > 0 && image.getBoundingClientRect().height > 0),
          insertedBefore: figure.getAttribute("data-inserted-before") || "",
        };
      };
      const hero = document.querySelector('article figure[data-guide-visual="hero"]');
      const inline = Array.from(document.querySelectorAll('article figure[data-guide-visual="inline"]'));
      return { hero: hero ? readFigure(hero) : null, inline: inline.map(readFigure) };
    });

    expect(visualData.hero?.visible).toBe(true);
    expect(visualData.hero?.alt).not.toBe("");
    expect(visualData.hero?.naturalWidth).toBeGreaterThan(0);
    expect(visualData.inline.length).toBeLessThanOrEqual(4);
    expect(visualData.inline.every((item) => item.visible && item.naturalWidth > 0 && item.alt && item.insertedBefore)).toBe(true);
    expect(new Set(visualData.inline.map((item) => item.src)).size).toBe(visualData.inline.length);
    expect(visualData.inline.some((item) => item.src === visualData.hero?.src)).toBe(false);
  });
}
