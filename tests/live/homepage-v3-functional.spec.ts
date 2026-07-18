import { expect, test } from "@playwright/test";

const eventRecorder = () => {
  if (!sessionStorage.getItem("__homepageEvents")) {
    sessionStorage.setItem("__homepageEvents", "[]");
  }
  window.gtag = (_command, eventName, params) => {
    const events = JSON.parse(sessionStorage.getItem("__homepageEvents") || "[]") as Array<{
      eventName: string;
      params?: Record<string, unknown>;
    }>;
    events.push({ eventName, params });
    sessionStorage.setItem("__homepageEvents", JSON.stringify(events));
  };
};

test("Homepage 3.0 exposes only real planning destinations", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('#home-hero a[href="/start-here"]')).toHaveCount(1);
  await expect(
    page.locator('#home-hero a[href="/payments-and-apps"]'),
  ).toHaveCount(1);
  await expect(page.locator("#home-tasks a")).toHaveCount(4);
  await expect(page.locator("#home-popular a")).toHaveCount(3);
  await expect(page.locator("#home-trending a[href^=\"/city-kits/\"]")).toHaveCount(2);
  await expect(page.locator("#home-experiences a")).toHaveCount(8);
  await expect(page.locator("#home-guides article")).toHaveCount(3);

  const emptyOrTaggedInternalLinks = await page.locator("main a").evaluateAll((links) =>
    links
      .map((link) => link.getAttribute("href") || "")
      .filter(
        (href) =>
          !href ||
          href === "#" ||
          (href.startsWith("/") && /[?&]utm_(?:source|medium|campaign|content)=/.test(href)),
      ),
  );
  expect(emptyOrTaggedInternalLinks).toEqual([]);
});

test("Homepage 3.0 primary, task, popular, trending and preview events include attribution", async ({ page }) => {
  await page.addInitScript(eventRecorder);
  await page.goto(
    "/?utm_source=threads&utm_medium=organic_social&utm_campaign=phase1_test&utm_content=homepage_test",
  );
  await page.locator('#home-hero a[href="/start-here"]').click();
  await expect(page).toHaveURL(/\/start-here$/);

  let events = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__homepageEvents") || "[]") as Array<{
      eventName: string;
      params?: Record<string, string>;
    }>,
  );
  expect(events.at(-1)).toMatchObject({
    eventName: "hero_primary_cta_clicked",
    params: {
      item_name: "Plan Your First China Trip",
      destination_url: "/start-here",
      section: "homepage_hero",
      utm_source: "threads",
      utm_campaign: "phase1_test",
      utm_content: "homepage_test",
    },
  });

  await page.goto("/");
  await page.locator('#home-tasks a[href="/city-kits"]').click();
  await expect(page).toHaveURL(/\/city-kits$/);
  await page.goto("/");
  await page.locator('#home-popular a[href="/guides/how-to-pay-in-china-as-a-foreigner"]').click();
  await expect(page).toHaveURL(/\/guides\/how-to-pay-in-china-as-a-foreigner$/);
  await page.goto("/");
  await page.locator('#home-trending a[href="/city-kits/xian"]').click();
  await expect(page).toHaveURL(/\/city-kits\/xian$/);
  await page.goto("/");
  await page.locator('#home-product a[href="/store#inside-the-guide"]').first().click();
  await expect(page).toHaveURL(/\/store#inside-the-guide$/);

  events = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__homepageEvents") || "[]") as Array<{
      eventName: string;
    }>,
  );
  expect(events.map((event) => event.eventName)).toEqual(
    expect.arrayContaining([
      "hero_primary_cta_clicked",
      "homepage_task_clicked",
      "homepage_popular_content_clicked",
      "homepage_trending_clicked",
      "homepage_product_preview_clicked",
    ]),
  );
});

test("Homepage 3.0 checklist, newsletter and product checkout states remain honest", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(eventRecorder);

  await page.getByRole("link", { name: "Get the Free Checklist" }).click();
  await expect(page).toHaveURL(/#free-checklist$/);
  await expect(page.getByLabel("Email address")).toBeVisible();
  const checklistEvents = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__homepageEvents") || "[]") as Array<{
      eventName: string;
    }>,
  );
  expect(checklistEvents.map((event) => event.eventName)).toContain("checklist_opened");

  const form = page.locator("#newsletter form");
  await form.evaluate((element) => element.setAttribute("novalidate", ""));
  await page.getByLabel("Email address").fill("not-an-email");
  await page.getByRole("button", { name: "Get the checklist" }).click();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();

  const buyLinks = page.locator('#home-product a[target="_blank"]');
  const buyCount = await buyLinks.count();
  expect([0, 1]).toContain(buyCount);
  if (buyCount === 1) {
    await expect(buyLinks).toHaveAttribute("href", /^https:\/\/(?:www\.)?payhip\.com\//);
    await expect(buyLinks).toHaveAttribute("href", /utm_source=firstchinatripkit/);
    await expect(buyLinks).toHaveAttribute("href", /utm_campaign=china_first_trip_launch/);
  }
});

test("Homepage 3.0 keeps policy, SEO, Header and Footer safeguards", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/First China Trip Kit/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/www\.firstchinatripkit\.com\/?$/,
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.locator('script#google-analytics')).toHaveCount(0);
  await expect(page.locator('script#metricool-analytics')).toHaveCount(0);
  await expect(page.locator('nav[aria-label="Primary navigation"] a')).toHaveCount(7);
  await expect(page.locator('nav[aria-label="Primary navigation"] a[href="/visa-free-transit"]')).toHaveCount(1);
  await expect(page.locator('nav[aria-label="Primary navigation"] a[href="/payments-and-apps"]')).toHaveCount(1);
  await expect(page.getByText(/verify official requirements before relying/i)).toBeVisible();
  await expect(page.locator("footer a[href=\"/contact\"]")).toHaveCount(1);

  const forbiddenClaims = await page.locator("main").innerText();
  expect(forbiddenClaims).not.toMatch(/guaranteed (?:visa|entry)/i);
});
