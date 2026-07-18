import { expect, test } from "@playwright/test";

const eventRecorder = () => {
  sessionStorage.setItem("__paymentHubEvents", "[]");
  window.gtag = (_command, eventName, params) => {
    const events = JSON.parse(sessionStorage.getItem("__paymentHubEvents") || "[]") as Array<{
      eventName: string;
      params?: Record<string, unknown>;
    }>;
    events.push({ eventName, params });
    sessionStorage.setItem("__paymentHubEvents", JSON.stringify(events));
  };
};

test("Payment Hub exposes the complete scoped information architecture", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One complete structural pass is sufficient");
  const response = await page.goto("/payments-and-apps");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Set Up China Before You Land");
  await expect(page.locator('[data-testid="payment-hub-hero"] a')).toHaveCount(2);

  for (const id of [
    "quick-start",
    "payments",
    "apps",
    "internet",
    "arrival-day",
    "backup-plan",
    "interactive-checklist",
    "setup-guide",
    "people-always-ask",
    "related-guides",
  ]) {
    await expect(page.locator(`#${id}`), `${id} should exist`).toHaveCount(1);
  }

  await expect(page.locator("#quick-start a")).toHaveCount(4);
  await expect(page.locator("#related-guides > div > div.divide-y a")).toHaveCount(5);
  await expect(page.getByText("People Always Ask", { exact: true })).toBeVisible();
  await expect(page.locator("#people-always-ask details")).toHaveCount(8);

  const quality = await page.evaluate(() => ({
    brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).length,
    placeholders: document.querySelector("main")?.textContent?.match(/lorem ipsum|coming soon|placeholder/gi) || [],
    internalUtmLinks: Array.from(document.querySelectorAll<HTMLAnchorElement>('main a[href^="/"]'))
      .map((link) => link.getAttribute("href") || "")
      .filter((href) => /[?&]utm_(?:source|medium|campaign|content)=/.test(href)),
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
  }));
  expect(quality.brokenImages).toBe(0);
  expect(quality.placeholders).toEqual([]);
  expect(quality.internalUtmLinks).toEqual([]);
  expect(quality.horizontalOverflow).toBe(false);

  const claims = await page.locator("main").innerText();
  expect(claims).not.toMatch(/guaranteed (?:visa|entry|payment|access)/i);
});

test("Payment readiness, internet, backup and checklist tools work and persist", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One complete interaction pass is sufficient");
  await page.goto("/payments-and-apps");

  const readiness = page.locator('[data-testid="payment-readiness-checker"]');
  const readinessChecks = readiness.locator('input[type="checkbox"]');
  const readinessLabels = readiness.locator("label");
  await expect(readinessChecks).toHaveCount(5);
  await expect(readinessLabels).toHaveCount(5);
  for (let index = 0; index < 4; index += 1) await readinessLabels.nth(index).click();
  await expect(readiness.getByText("85%", { exact: true })).toBeVisible();
  await expect(readiness.getByText(/still missing: emergency cash/i)).toBeVisible();

  const internet = page.locator('[data-testid="internet-decision-tree"]');
  await internet.getByText("Android", { exact: true }).click();
  await internet.getByText("About 30 days", { exact: true }).click();
  await internet.getByText("New number is fine", { exact: true }).click();
  await expect(internet.getByText(/compare a local SIM with a 30-day travel plan/i)).toBeVisible();

  const backup = page.locator('[data-testid="offline-backup-plan"]');
  await backup.getByRole("button", { name: /what if wechat pay fails/i }).click();
  await expect(backup.getByText(/keep alipay as the primary route/i)).toBeVisible();

  const checklist = page.locator('[data-testid="interactive-payment-checklist"]');
  const checklistChecks = checklist.locator('input[type="checkbox"]');
  const checklistLabels = checklist.locator("label");
  await expect(checklistChecks).toHaveCount(20);
  await expect(checklistLabels).toHaveCount(20);
  for (let index = 0; index < 7; index += 1) await checklistLabels.nth(index).click();
  await expect(checklist.getByText("35%", { exact: true })).toBeVisible();
  for (let index = 7; index < 20; index += 1) await checklistLabels.nth(index).click();
  await expect(checklist.getByRole("link", { name: /download the free pdf/i })).toBeVisible();

  await page.reload();
  await expect(page.locator('[data-testid="payment-readiness-checker"]').getByText("85%", { exact: true })).toBeVisible();
  await expect(page.locator('[data-testid="interactive-payment-checklist"]').getByText("100%", { exact: true })).toBeVisible();
});

test("Payment Hub sends the required GA4 event names", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One analytics pass is sufficient");
  await page.addInitScript(eventRecorder);
  await page.goto("/payments-and-apps");
  await page.locator('#quick-start a[href="#payments"]').click();
  const readiness = page.locator('[data-testid="payment-readiness-checker"]');
  await readiness.locator("label").first().click();
  await readiness.getByRole("button", { name: "Check my readiness" }).click();
  const checklist = page.locator('[data-testid="interactive-payment-checklist"]');
  await checklist.locator("label").first().click();
  const backup = page.locator('[data-testid="offline-backup-plan"]');
  await backup.getByRole("button", { name: /what if alipay fails/i }).click();
  await backup.getByRole("button", { name: /what if alipay fails/i }).click();
  await page.locator('[data-testid="payment-guide-preview"]').getByRole("button", { name: /open the 5-page preview/i }).click();

  const eventNames = await page.evaluate(() => {
    const recorded = JSON.parse(
      sessionStorage.getItem("__paymentHubEvents") || "[]",
    ) as Array<{ eventName: string }>;
    const productionEvents = (window.dataLayer || [])
      .map((entry) => {
        if (Array.isArray(entry)) return entry;
        if (typeof entry === "object" && entry !== null && "0" in entry) {
          return Array.from(entry as unknown as ArrayLike<unknown>);
        }
        return [];
      })
      .filter((entry) => entry[0] === "event" && typeof entry[1] === "string")
      .map((entry) => entry[1] as string);

    return [...recorded.map((event) => event.eventName), ...productionEvents];
  });
  expect(eventNames).toEqual(
    expect.arrayContaining([
      "payment_hub_view",
      "payment_step_clicked",
      "payment_readiness_started",
      "payment_readiness_completed",
      "interactive_checklist_started",
      "offline_backup_opened",
      "guide_preview_opened",
    ]),
  );
});
