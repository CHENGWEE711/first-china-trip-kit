import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/start-here",
  "/city-kits",
  "/itinerary-kits",
  "/guides",
  "/travel-essentials",
  "/tools",
  "/store",
  "/about",
] as const;

for (const route of routes) {
  test(`${route} renders without critical browser errors`, async ({ page }) => {
    const seriousErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        seriousErrors.push(`console: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => {
      seriousErrors.push(`page: ${error.message}`);
    });

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response, `${route} should return a document response`).not.toBeNull();
    expect(response?.status(), `${route} should return a successful status`).toBeLessThan(400);
    await expect(page.locator("h1"), `${route} should contain one H1`).toHaveCount(1);

    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow, `${route} should not scroll horizontally`).toBe(false);

    const failedImages = await page.locator("main img").evaluateAll(async (images) => {
      const contentImages = images as HTMLImageElement[];
      const majorImages = contentImages.filter((image) => {
        const bounds = image.getBoundingClientRect();
        const style = window.getComputedStyle(image);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          bounds.width > 0 &&
          bounds.height > 0 &&
          bounds.bottom > 0 &&
          bounds.top < window.innerHeight
        );
      });

      await Promise.all(
        majorImages.map(
          (image) =>
            new Promise<void>((resolve) => {
              if (image.complete) {
                resolve();
                return;
              }

              const finish = () => resolve();
              image.addEventListener("load", finish, { once: true });
              image.addEventListener("error", finish, { once: true });
              window.setTimeout(finish, 5_000);
            }),
        ),
      );

      return majorImages
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.getAttribute("src") || image.alt || "unknown image");
    });

    expect(failedImages, `${route} should load its main content images`).toEqual([]);
    expect(seriousErrors, `${route} should not emit serious console or page errors`).toEqual([]);
  });
}
