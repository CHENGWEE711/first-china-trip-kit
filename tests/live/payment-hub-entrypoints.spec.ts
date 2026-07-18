import { expect, test } from "@playwright/test";
import { getGuideBySlug } from "@/data/guides";

const relatedImageCases = [
  {
    source: "how-to-pay-in-china-as-a-foreigner",
    target: "best-apps-for-traveling-in-china",
  },
  {
    source: "how-to-pay-in-china-as-a-foreigner",
    target: "how-to-use-alipay-in-china-as-a-tourist",
  },
  {
    source: "how-to-pay-in-china-as-a-foreigner",
    target: "how-to-use-wechat-pay-in-china-as-a-foreigner",
  },
  {
    source: "best-apps-for-traveling-in-china",
    target: "china-esim-guide-for-tourists",
  },
  {
    source: "basic-chinese-phrases-for-travelers",
    target: "china-travel-packing-list",
  },
  {
    source: "china-food-ordering-guide",
    target: "basic-chinese-phrases-for-travelers",
  },
] as const;

test("Homepage, Start Here, Store and payment Guides expose the Payment Hub", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#home-hero a[href="/payments-and-apps"]')).toHaveCount(1);

  await page.goto("/start-here");
  await expect(page.locator('a[href^="/payments-and-apps"]')).not.toHaveCount(0);

  await page.goto("/store");
  await expect(page.locator('a[href="/payments-and-apps"]')).not.toHaveCount(0);

  for (const route of [
    "/guides/how-to-pay-in-china-as-a-foreigner",
    "/guides/best-apps-for-traveling-in-china",
    "/guides/china-esim-guide-for-tourists",
  ]) {
    await page.goto(route);
    await expect(
      page.getByRole("navigation", { name: "China payments and essential apps guides" }),
    ).toBeVisible();
    await expect(page.locator('a[href="/payments-and-apps"]')).not.toHaveCount(0);
  }
});

test("Related Guides render every target Guide's own featuredImage", async ({ page }) => {
  const targetGuides = relatedImageCases.map(({ target }) => getGuideBySlug(target));
  expect(targetGuides.every(Boolean)).toBe(true);
  expect(new Set(targetGuides.map((guide) => guide?.featuredImage.src)).size).toBe(
    relatedImageCases.length,
  );

  for (const { source, target } of relatedImageCases) {
    const targetGuide = getGuideBySlug(target);
    expect(targetGuide, target).toBeTruthy();

    await page.goto(`/guides/${source}`);
    const image = page.locator(`a[href="/guides/${target}"] img`);
    await expect(image, `${source} → ${target}`).toHaveCount(1);
    await expect(image).toHaveAttribute("alt", targetGuide!.featuredImage.alt);

    const renderedSource = await image.getAttribute("src");
    expect(renderedSource).toBeTruthy();
    const renderedUrl = new URL(renderedSource!, "https://www.firstchinatripkit.com");
    const optimizedSource = renderedUrl.searchParams.get("url");
    expect(optimizedSource || renderedUrl.pathname).toBe(targetGuide!.featuredImage.src);
  }
});
