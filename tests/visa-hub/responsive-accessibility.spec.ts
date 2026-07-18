import { expect, test } from "@playwright/test";

const exactViewports = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
] as const;

for (const viewport of exactViewports) {
  test(`Visa-Free Transit Hub is readable without horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.setViewportSize(viewport);
    const response = await page.goto("/visa-free-transit", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByTestId("visa-hub-hero")).toBeVisible();
    await expect(page.getByTestId("transit-eligibility-checker")).toBeVisible();
    await expect(page.getByTestId("eligible-ports-explorer")).toBeVisible();

    const quality = await page.evaluate(() => ({
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).length,
      emptyAltImages: document.querySelectorAll('main img[alt=""]').length,
      unnamedActions: Array.from(document.querySelectorAll("main a, main button")).filter(
        (element) =>
          !(
            element.getAttribute("aria-label") ||
            element.textContent?.trim() ||
            element.querySelector('img[alt]:not([alt=""])')
          ),
      ).length,
      unlabeledFields: Array.from(document.querySelectorAll("main input, main select, main textarea")).filter(
        (element) =>
          !element.closest("label") &&
          !(element.id && document.querySelector(`label[for="${CSS.escape(element.id)}"]`)) &&
          !element.getAttribute("aria-label") &&
          !element.getAttribute("aria-labelledby"),
      ).length,
    }));
    expect(quality.horizontalOverflow, `${quality.scrollWidth}px must fit ${quality.viewportWidth}px`).toBe(false);
    expect(quality.brokenImages).toBe(0);
    expect(quality.emptyAltImages).toBe(0);
    expect(quality.unnamedActions).toBe(0);
    expect(quality.unlabeledFields).toBe(0);
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);

    const firstFaq = page.locator("#faq details").filter({ hasText: "Is 240 hours the same as 10 calendar days?" });
    await expect(firstFaq).toHaveCount(1);
    await firstFaq.locator("summary").click();
    await expect(firstFaq).toHaveAttribute("open", "");
  });
}

test("the checker can be completed with keyboard-focused controls and moves focus to the result", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/visa-free-transit");
  const checker = page.getByTestId("transit-eligibility-checker");

  const nationality = checker.locator("#visa-nationality");
  await nationality.focus();
  await nationality.selectOption("US");
  const passportType = checker.locator('input[name="visa-passport-type"][value="ordinary"]');
  await passportType.focus();
  await passportType.press("Space");
  await expect(passportType).toBeChecked();
  const passportValidity = checker.locator('input[name="visa-passport-validity"][value="over-6-months"]');
  await passportValidity.focus();
  await passportValidity.press("Space");
  await expect(passportValidity).toBeChecked();
  await checker.getByRole("button", { name: "Continue", exact: true }).focus();
  await checker.getByRole("button", { name: "Continue", exact: true }).press("Enter");

  await checker.locator("#visa-immediate-origin").focus();
  await checker.locator("#visa-immediate-origin").pressSequentially("Japan");
  await checker.locator("#visa-immediate-onward").focus();
  await checker.locator("#visa-immediate-onward").pressSequentially("Singapore");
  const multipleEntries = checker.locator('input[name="visa-multiple-mainland-entries"][value="no"]');
  await multipleEntries.focus();
  await multipleEntries.press("Space");
  await expect(multipleEntries).toBeChecked();
  await checker.getByRole("button", { name: "Continue", exact: true }).press("Enter");

  for (const [name, value] of [
    ["visa-onward-ticket", "yes"],
    ["visa-onward-window", "yes"],
    ["visa-journey-type", "connecting"],
  ] as const) {
    const control = checker.locator(`input[name="${name}"][value="${value}"]`);
    await control.focus();
    await control.press("Space");
    await expect(control).toBeChecked();
  }
  await checker.locator("#visa-planned-stay-hours").focus();
  await checker.locator("#visa-planned-stay-hours").pressSequentially("72");
  await checker.getByRole("button", { name: "Continue", exact: true }).press("Enter");

  const portSearch = checker.locator("#visa-entry-port-search");
  await portSearch.focus();
  await portSearch.pressSequentially("PVG");
  await portSearch.press("Enter");
  await expect(checker.locator("#visa-entry-port")).toHaveValue("shanghai-pudong");
  await checker.locator("#visa-exit-port").focus();
  await checker.locator("#visa-exit-port").selectOption("shanghai-hongqiao");
  await checker.getByRole("button", { name: "Continue", exact: true }).press("Enter");

  await checker.locator("#visa-planned-stay-area").focus();
  await checker.locator("#visa-planned-stay-area").selectOption("shanghai-municipality");
  const withinArea = checker.locator('input[name="visa-permitted-area"][value="yes"]');
  await withinArea.focus();
  await withinArea.press("Space");
  const individualReview = checker.locator('input[name="visa-individual-review"][value="no"]');
  await individualReview.focus();
  await individualReview.press("Space");
  await expect(individualReview).toBeChecked();
  await checker.locator("#visa-purpose").focus();
  await checker.locator("#visa-purpose").selectOption("tourism");
  const submit = checker.getByRole("button", { name: "Check this route", exact: true });
  await submit.focus();
  await submit.press("Enter");

  const heading = checker.getByRole("heading", {
    name: "Your route appears to meet the main 240-hour transit conditions",
  });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
});
