import { expect, test } from "@playwright/test";

const route = "/itinerary-kits/10-days-classic-china-itinerary";

test("classic China itinerary renders a distinct contextual image for every day", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One content-image audit is sufficient");
  await page.goto(route);

  const expectedAltFragments = [
    "hutong lane",
    "Forbidden City",
    "Great Wall",
    "Xi'an Ancient City Wall",
    "Terracotta Warrior",
    "Pudong skyline",
    "Yu Garden",
    "West Lake",
    "Shanghai History Museum",
    "airport departure hall",
  ];

  const images: string[] = [];
  for (let day = 1; day <= 10; day += 1) {
    const image = page.locator(`#day-${day} img`);
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", new RegExp(expectedAltFragments[day - 1], "i"));
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy();
    images.push(src!);
  }

  expect(new Set(images).size).toBe(10);
  await expect(page.locator("article > header img")).toHaveAttribute("alt", /Great Wall/i);
  await expect(page.getByRole("heading", { name: "Transport between cities" }).locator("..").locator("img")).toHaveAttribute("alt", /high-speed train/i);
});
