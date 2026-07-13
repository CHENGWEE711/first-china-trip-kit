import { expect, test } from "@playwright/test";

const routes = [
  {
    slug: "4-days-in-beijing",
    hero: /Temple of Heaven/i,
    days: [/hutong street/i, /Forbidden City/i, /Great Wall/i, /Summer Palace/i],
  },
  {
    slug: "5-days-beijing-and-xian",
    hero: /Xi'an Bell Tower/i,
    days: [/market stalls/i, /Forbidden City/i, /Great Wall/i, /high-speed train/i, /Terracotta Army/i],
  },
  {
    slug: "7-days-shanghai-hangzhou-suzhou",
    hero: /West Lake.*Hangzhou skyline/i,
    days: [/Shanghai skyline/i, /Yu Garden/i, /Shanghai street/i, /high-speed train/i, /Longjing tea/i, /Suzhou/i, /railway station/i],
  },
  {
    slug: "240-hour-visa-free-china-itinerary",
    hero: /Shanghai Pudong International Airport/i,
    days: [/International passengers/i, /Shanghai skyline/i, /Shanghai street/i, /high-speed train/i, /Longjing tea/i, /West Lake/i, /Suzhou/i, /Pudong skyline/i, /Zhujiajiao/i, /airport departure hall/i],
  },
];

test("priority itinerary list cards are visually distinct", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Card identity only needs one viewport");
  await page.goto("/itinerary-kits");
  const sources = [];
  for (const route of routes) {
    const image = page.getByTestId(`itinerary-card-image-${route.slug}`);
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    sources.push(await image.getAttribute("src"));
  }
  expect(new Set(sources).size).toBe(routes.length);
});

for (const route of routes) {
  test(`${route.slug} renders the correct image for every day`, async ({ page }) => {
    const consoleErrors: string[] = [];
    await page.addInitScript(() => {
      const state = window as typeof window & { __phaseBCls?: number };
      state.__phaseBCls = 0;
      new PerformanceObserver((list) => {
        for (const rawEntry of list.getEntries()) {
          const entry = rawEntry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!entry.hadRecentInput) state.__phaseBCls = (state.__phaseBCls || 0) + entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.goto(`/itinerary-kits/${route.slug}`);
    const hero = page.getByTestId("itinerary-hero-image");
    await expect(hero).toHaveAttribute("alt", route.hero);
    await expect.poll(() => hero.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

    const sources: string[] = [];
    for (let index = 0; index < route.days.length; index += 1) {
      const image = page.getByTestId(`itinerary-day-image-${index + 1}`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute("alt", route.days[index]);
      await expect(image).toHaveAttribute("loading", "lazy");
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      sources.push((await image.getAttribute("src")) || "");
    }

    expect(new Set(sources).size).toBe(route.days.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(await page.evaluate(() => (window as typeof window & { __phaseBCls?: number }).__phaseBCls || 0)).toBeLessThan(0.1);
    expect(consoleErrors).toEqual([]);
  });
}

test("240-hour page shows current policy verification and reachable official sources", async ({ page, request }, testInfo) => {
  await page.goto("/itinerary-kits/240-hour-visa-free-china-itinerary");
  await expect(page.getByText("July 13, 2026", { exact: true })).toBeVisible();
  const notice = testInfo.project.name === "chromium-desktop"
    ? page.locator("article > header").getByText(/Rules can change\. Confirm your eligibility and entry port/i)
    : page.getByLabel("Important notice").getByText(/Rules can change\. Confirm your eligibility and entry port/i);
  await expect(notice).toBeVisible();
  await expect(page.getByText(/55 eligible nationalities, 65 entry ports/i).first()).toBeVisible();
  const officialLinks = await page.locator('a[href*="nia.gov.cn"]').evaluateAll((links) =>
    [...new Set(links.map((link) => (link as HTMLAnchorElement).href))],
  );
  expect(officialLinks).toHaveLength(3);
  for (const href of officialLinks) {
    const response = await request.get(href, { timeout: 30_000 });
    expect(response.status(), href).toBe(200);
  }
});
