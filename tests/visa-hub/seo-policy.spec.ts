import { expect, test } from "@playwright/test";

test("Visa-Free Transit Hub has independent canonical metadata, schema, sitemap and robots coverage", async ({ page }) => {
  const response = await page.goto("/visa-free-transit");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page).toHaveTitle(/China Visa-Free Transit Planner: 240-Hour Route & Port Check/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /nationality, route, entry port and permitted stay area/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.firstchinatripkit.com/visa-free-transit");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /240-Hour Route & Port Check/i);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /nationality, route, entry port and permitted stay area/i);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\/www\.firstchinatripkit\.com\//);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const structuredData = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent || "null");
      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );
  const schemaTypes = structuredData.map((entry) => entry?.["@type"]);
  expect(schemaTypes).toEqual(expect.arrayContaining(["WebPage", "WebApplication", "BreadcrumbList", "FAQPage"]));
  expect(schemaTypes).not.toContain("GovernmentService");
  const webpage = structuredData.find((entry) => entry?.["@type"] === "WebPage");
  expect(webpage?.dateModified).toBe("2026-07-19");
  expect(webpage?.isBasedOn).toEqual(expect.arrayContaining([expect.stringMatching(/^https:\/\/(?:en\.)?nia\.gov\.cn\//)]));
  const faq = structuredData.find((entry) => entry?.["@type"] === "FAQPage");
  expect(faq?.mainEntity).toHaveLength(20);

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://www.firstchinatripkit.com/visa-free-transit");
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).not.toMatch(/Disallow:\s*\/visa-free-transit/i);

  await page.goto("/guides/china-240-hour-visa-free-transit-guide");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.firstchinatripkit.com/guides/china-240-hour-visa-free-transit-guide",
  );
  await expect(page.locator('a[href^="/visa-free-transit"]')).not.toHaveCount(0);
});

test("current-policy copy retains the verified safeguards and rejects stale active wording", async ({ page }) => {
  await page.goto("/visa-free-transit");
  const mainCopy = await page.locator("#main-content").innerText();
  const currentPolicyCopy = await page.evaluate(() =>
    [
      "which-policy",
      "route-check",
      "route-shape",
      "time-calculator",
      "eligible-ports",
      "permitted-areas",
      "documents-checklist",
      "arrival-process",
      "starter-routes",
      "common-mistakes",
      "faq",
    ]
      .map((id) => document.getElementById(id)?.innerText || "")
      .join("\n"),
  );

  expect(mainCopy).toMatch(/55 eligible nationalities/i);
  expect(mainCopy).toMatch(/65 eligible ports/i);
  expect(mainCopy).toMatch(/24 province-level regions/i);
  expect(mainCopy).toMatch(/00:00 on the day following the day of entry/i);
  expect(mainCopy).toMatch(/at least three months of passport validity/i);
  expect(mainCopy).toMatch(/final (?:handling|decision).*immigration inspection/i);
  expect(currentPolicyCopy).not.toMatch(/\b72[-\s]?hour\b|\b144[-\s]?hour\b|72\/144|six days|transit visa free for 6 days/i);
  expect(mainCopy).not.toMatch(/100% eligible|you are approved|definitely eligible|guaranteed (?:visa|entry)/i);
  expect(mainCopy).not.toMatch(/you can travel anywhere in china/i);

  const sections = [
    "which-policy",
    "route-check",
    "route-shape",
    "time-calculator",
    "eligible-ports",
    "permitted-areas",
    "documents-checklist",
    "arrival-process",
    "starter-routes",
    "common-mistakes",
    "faq",
    "official-sources",
  ];
  for (const id of sections) await expect(page.locator(`#${id}`), `${id} should exist once`).toHaveCount(1);
});

test("the Hub is discoverable from the primary planning surfaces", async ({ page }) => {
  for (const route of ["/", "/start-here", "/payments-and-apps"]) {
    await page.goto(route);
    await expect(page.locator('a[href="/visa-free-transit"]'), `${route} should link to the Visa Hub`).not.toHaveCount(0);
  }
});
