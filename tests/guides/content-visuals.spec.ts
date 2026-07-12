import { expect, test } from "@playwright/test";
import { guideRoutes } from "./guide-routes";

for (const route of guideRoutes) {
  test(`${route} renders one hero and three distinct inline visuals`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Shared visual data is audited once per Guide");
    await page.goto(route);
    const visualData = await page.evaluate(() => {
      const readFigure = (figure: Element) => {
        const image = figure.querySelector("img");
        return {
          src: image?.currentSrc || image?.getAttribute("src") || "",
          alt: image?.getAttribute("alt") || "",
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
    expect(visualData.inline).toHaveLength(3);
    expect(visualData.inline.every((item) => item.visible && item.alt && item.insertedBefore)).toBe(true);
    expect(new Set(visualData.inline.map((item) => item.src)).size).toBe(3);
    expect(visualData.inline.some((item) => item.src === visualData.hero?.src)).toBe(false);
  });
}
