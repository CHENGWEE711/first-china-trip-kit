import { expect, test } from "@playwright/test";

test("homepage core planning links keep their real destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#home-hero a[href="/start-here"]')).toHaveCount(1);
  await expect(page.locator('#home-hero a[href="/payments-and-apps"]')).toHaveCount(1);
  await expect(page.locator("#home-tasks a")).toHaveCount(4);
  await expect(page.locator("#home-popular a")).toHaveCount(3);
  await expect(page.locator("#home-trending a")).toHaveCount(3);
  await expect(page.locator('#home-guides a[href="/guides"]')).toHaveCount(1);

  for (const slug of ["shanghai", "xian"]) {
    await expect(page.locator(`#home-trending a[href="/city-kits/${slug}"]`)).toHaveCount(1);
  }
  for (const slug of [
    "how-to-pay-in-china-as-a-foreigner",
    "best-apps-for-traveling-in-china",
    "china-240-hour-visa-free-transit-guide",
  ]) {
    await expect(page.locator(`#home-guides a[href="/guides/${slug}"]`)).toHaveCount(2);
  }
});

test("checklist CTA scrolls to the real newsletter form", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const checklist = page.getByRole("link", { name: "Get the Free Checklist" });
  await checklist.click();
  await expect(page).toHaveURL(/#free-checklist$/);
  await expect(page.getByLabel("Email address")).toBeVisible();
});

test("newsletter preserves local validation without transmitting invalid data", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("#newsletter form");
  await form.evaluate((element) => element.setAttribute("novalidate", ""));
  await page.getByLabel("Email address").fill("not-an-email");
  await page.getByRole("button", { name: "Get the checklist" }).click();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
});

test("product, contact, WhatsApp and footer links expose only configured targets", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#home-product a[href="/store#inside-the-guide"]')).toHaveCount(2);
  const buyLinks = page.locator('#home-product a[target="_blank"]');
  const buyCount = await buyLinks.count();
  if (buyCount === 1) await expect(buyLinks).toHaveAttribute("href", /^https:\/\//);
  else expect(buyCount).toBe(0);

  await expect(page.locator('footer a[href="/contact"]')).toHaveCount(1);
  const whatsapp = page.locator('footer a[href^="https://wa.me/"]');
  const whatsappCount = await whatsapp.count();
  expect([0, 1]).toContain(whatsappCount);
  if (whatsappCount === 1) await expect(whatsapp).not.toHaveAttribute("href", "");

  const brokenFooterLinks = await page.locator("footer a").evaluateAll((links) => links
    .map((link) => link.getAttribute("href") || "")
    .filter((href) => !href || href === "#"));
  expect(brokenFooterLinks).toEqual([]);
});

test("homepage SEO and analytics hooks remain intact", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/First China Trip Kit/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /China/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/www\.firstchinatripkit\.com\/?$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.locator('script#google-analytics')).toHaveCount(0);
  await expect(page.locator('script#metricool-analytics')).toHaveCount(0);

  await page.goto("/store");
  await page.evaluate(() => {
    sessionStorage.setItem("__analyticsEvents", "[]");
    window.gtag = (_command, eventName) => {
      const events = JSON.parse(sessionStorage.getItem("__analyticsEvents") || "[]") as string[];
      events.push(eventName);
      sessionStorage.setItem("__analyticsEvents", JSON.stringify(events));
    };
  });
  await page.getByRole("link", { name: "Download Free Checklist", exact: true }).first().click();
  const analyticsEvents = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__analyticsEvents") || "[]") as string[],
  );
  expect(analyticsEvents).toContain("checklist_download_clicked");
});

test("contact and thank-you routes remain available", async ({ page }) => {
  for (const route of ["/contact", "/thank-you"]) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} should return a successful response`).toBe(true);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});
