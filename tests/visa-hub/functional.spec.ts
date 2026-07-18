import { expect, type Locator, type Page, test } from "@playwright/test";

type CheckerScenario = {
  nationality?: string;
  passportValidity?: "under-3-months" | "3-to-6-months" | "over-6-months" | "unknown";
  origin?: string;
  onward?: string;
  multipleEntries?: "yes" | "no" | "unknown";
  ticket?: "yes" | "no" | "unknown";
  withinWindow?: "yes" | "no" | "unknown";
  hours?: number;
  journey?: "connecting" | "through-flight" | "technical-stop" | "unknown";
  entryPort?: string;
  exitPort?: string;
  stayArea?: string;
  withinArea?: "yes" | "no" | "unknown";
  individualReview?: "yes" | "no" | "unknown";
  purpose?: "tourism" | "business" | "visit" | "family" | "work" | "study" | "journalism" | "other";
};

const DEFAULT_SCENARIO: Required<CheckerScenario> = {
  nationality: "US",
  passportValidity: "over-6-months",
  origin: "Japan",
  onward: "Singapore",
  multipleEntries: "no",
  ticket: "yes",
  withinWindow: "yes",
  hours: 72,
  journey: "connecting",
  entryPort: "shanghai-pudong",
  exitPort: "shanghai-hongqiao",
  stayArea: "shanghai-municipality",
  withinArea: "yes",
  individualReview: "no",
  purpose: "tourism",
};

function checker(page: Page): Locator {
  return page.getByTestId("transit-eligibility-checker");
}

async function chooseRadio(container: Locator, name: string, value: string) {
  const control = container.locator(`input[name="${name}"][value="${value}"]`);
  await expect(control).toHaveCount(1);
  const label = container.locator(`label:has(input[name="${name}"][value="${value}"])`);
  await expect(label).toHaveCount(1);
  await label.click();
  await expect(control).toBeChecked();
}

async function continueChecker(container: Locator) {
  const button = container.getByRole("button", { name: "Continue", exact: true });
  await expect(button).toHaveCount(1);
  await button.click();
}

async function completeChecker(page: Page, overrides: CheckerScenario = {}) {
  const answers = { ...DEFAULT_SCENARIO, ...overrides };
  const container = checker(page);

  await expect(container.getByTestId("checker-step-1")).toBeVisible();
  await container.locator("#visa-nationality").selectOption(answers.nationality);
  await chooseRadio(container, "visa-passport-type", "ordinary");
  await chooseRadio(container, "visa-passport-validity", answers.passportValidity);
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-2")).toBeVisible();
  await container.locator("#visa-immediate-origin").fill(answers.origin);
  await container.locator("#visa-immediate-onward").fill(answers.onward);
  await chooseRadio(container, "visa-multiple-mainland-entries", answers.multipleEntries);
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-3")).toBeVisible();
  await chooseRadio(container, "visa-onward-ticket", answers.ticket);
  await chooseRadio(container, "visa-onward-window", answers.withinWindow);
  await container.locator("#visa-planned-stay-hours").fill(String(answers.hours));
  await chooseRadio(container, "visa-journey-type", answers.journey);
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-4")).toBeVisible();
  await container.locator("#visa-entry-port").selectOption(answers.entryPort);
  await container.locator("#visa-exit-port").selectOption(answers.exitPort);
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-5")).toBeVisible();
  await container.locator("#visa-planned-stay-area").selectOption(answers.stayArea);
  await chooseRadio(container, "visa-permitted-area", answers.withinArea);
  await chooseRadio(container, "visa-individual-review", answers.individualReview);
  await container.locator("#visa-purpose").selectOption(answers.purpose);
  await container.getByRole("button", { name: "Check this route", exact: true }).click();
}

async function restartChecker(page: Page) {
  const button = checker(page).getByRole("button", { name: "Check another route", exact: true });
  await expect(button).toHaveCount(1);
  await button.click();
  await expect(checker(page).getByTestId("checker-step-1")).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  const response = await page.goto("/visa-free-transit", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Can You Visit China Visa-Free During a Transit?");
});

test("the five-step checker validates fields, supports Back and returns the cautious 240-hour result", async ({ page }) => {
  const container = checker(page);
  await expect(container.getByText("Route checker · Step 1 of 5", { exact: true })).toBeVisible();

  await continueChecker(container);
  await expect(container.getByRole("alert")).toHaveCount(3);
  await expect(container.locator("#visa-nationality")).toBeFocused();

  await container.locator("#visa-nationality").selectOption("US");
  await chooseRadio(container, "visa-passport-type", "ordinary");
  await chooseRadio(container, "visa-passport-validity", "over-6-months");
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-2")).toBeVisible();
  const backButton = container.getByRole("button", { name: "Back", exact: true });
  await expect(backButton).toHaveCount(1);
  await backButton.click();
  await expect(container.getByTestId("checker-step-1")).toBeVisible();
  await expect(container.locator("#visa-nationality")).toHaveValue("US");

  await continueChecker(container);
  await continueChecker(container);
  await expect(container.getByRole("alert")).toHaveCount(3);
  await expect(container.locator("#visa-immediate-origin")).toBeFocused();
  await container.locator("#visa-immediate-origin").fill("Japan");
  await container.locator("#visa-immediate-onward").fill("Singapore");
  await chooseRadio(container, "visa-multiple-mainland-entries", "no");
  await continueChecker(container);

  await chooseRadio(container, "visa-onward-ticket", "yes");
  await chooseRadio(container, "visa-onward-window", "yes");
  await container.locator("#visa-planned-stay-hours").fill("72");
  await chooseRadio(container, "visa-journey-type", "connecting");
  await continueChecker(container);

  await container.locator("#visa-entry-port-search").fill("PVG");
  await expect(container.locator("#visa-entry-port option")).toHaveCount(2);
  await container.locator("#visa-entry-port").selectOption("shanghai-pudong");
  await container.locator("#visa-exit-port").selectOption("shanghai-hongqiao");
  await expect(container.getByText("Selected: Shanghai Pudong International Airport", { exact: true })).toBeVisible();
  await continueChecker(container);

  await container.getByRole("button", { name: "Check this route", exact: true }).click();
  await expect(container.getByRole("alert")).toHaveCount(4);
  await expect(container.locator("#visa-planned-stay-area")).toBeFocused();
  await container.locator("#visa-planned-stay-area").selectOption("shanghai-municipality");
  await chooseRadio(container, "visa-permitted-area", "yes");
  await chooseRadio(container, "visa-individual-review", "no");
  await container.locator("#visa-purpose").selectOption("tourism");
  await container.getByRole("button", { name: "Check this route", exact: true }).click();

  await expect(container).toHaveAttribute("data-outcome", "likely-240-hour-transit");
  const resultHeading = container.getByRole("heading", {
    name: "Your route appears to meet the main 240-hour transit conditions",
  });
  await expect(resultHeading).toBeVisible();
  await expect(resultHeading).toBeFocused();
  await expect(container.getByText("Nationality appears on the current eligible list.", { exact: true })).toBeVisible();
  await expect(container.getByText("The final decision is made by immigration inspection officers at the port of entry.", { exact: true })).toBeVisible();
  await expect(container.getByRole("link", { name: /prepare payments and essential apps/i })).toHaveAttribute("href", "/payments-and-apps");
  expect(await container.innerText()).not.toMatch(/you are approved|definitely eligible|guaranteed entry/i);

  await container.getByRole("link", { name: /prepare payments and essential apps/i }).click();
  await expect(page).toHaveURL(/\/payments-and-apps$/);
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/visa-free-transit$/);
});

test("the checker exposes unilateral and ineligible outcomes with restart", async ({ page }) => {
  await completeChecker(page, {
    nationality: "JP",
    origin: "Japan",
    onward: "Japan",
  });
  await expect(checker(page)).toHaveAttribute("data-outcome", "likely-unilateral-visa-free");
  await expect(checker(page).getByRole("heading", { name: "You may not need the 240-hour transit policy" })).toBeVisible();

  await restartChecker(page);
  await completeChecker(page, { origin: "Japan", onward: "Japan" });
  await expect(checker(page)).toHaveAttribute("data-outcome", "not-eligible-from-answers");
  await expect(checker(page).getByText(/same country or region/i)).toBeVisible();
});

test("the checker exposes manual-review and 24-hour outcomes with restart", async ({ page }) => {
  await completeChecker(page, { journey: "through-flight" });
  await expect(checker(page)).toHaveAttribute("data-outcome", "manual-review");
  await expect(
    checker(page).getByRole("heading", {
      name: "This itinerary needs confirmation from the airline or immigration authorities.",
    }),
  ).toBeVisible();
  await expect(checker(page).getByRole("link", { name: /12367/i })).toHaveAttribute("href", "tel:+8612367");

  await restartChecker(page);
  await completeChecker(page, { hours: 20 });
  await expect(checker(page)).toHaveAttribute("data-outcome", "likely-24-hour-direct-transit");
  await expect(checker(page).getByText(/does not mean you may freely enter the city/i)).toBeVisible();
});

test("all four policy cards preset the checker with distinct context", async ({ page }) => {
  const choices = [
    ["30-Day Visa-Free Entry", "unilateral-30-day", /30-day entry context selected/i],
    ["240-Hour Visa-Free Transit", "transit-240-hour", /240-hour transit context selected/i],
    ["24-Hour Direct Transit", "direct-transit-24-hour", /24-hour direct-transit context selected/i],
    ["Visa Required or Manual Check", "manual-review", /manual-review context selected/i],
  ] as const;

  for (const [title, context, prompt] of choices) {
    const choice = page.locator("#which-policy a").filter({ hasText: title });
    await expect(choice).toHaveCount(1);
    await choice.click();
    const contextBanner = checker(page).locator("[data-policy-context]");
    await expect(contextBanner).toHaveAttribute("data-policy-context", context);
    await expect(contextBanner).toContainText(prompt);
  }
});

test("port explorer, time calculator, FAQ, official sources and the local checklist remain operable", async ({ page }) => {
  const explorer = page.getByTestId("eligible-ports-explorer");
  await expect(explorer).toBeVisible();
  await explorer.locator("#visa-port-search").focus();
  await explorer.locator("#visa-port-search").pressSequentially("PVG");
  await expect(explorer.getByText("1 matching ports from the official 65-port dataset", { exact: true })).toBeVisible();
  const pudongDisclosure = explorer.locator('details[data-port-id="shanghai-pudong"]');
  await expect(pudongDisclosure).toHaveCount(1);
  await pudongDisclosure.locator("summary").click();
  await expect(pudongDisclosure).toHaveAttribute("open", "");
  await expect(pudongDisclosure.getByText("Shanghai Municipality", { exact: true })).toBeVisible();
  await expect(pudongDisclosure.getByRole("link", { name: "Official source" })).toHaveAttribute("href", /^https:\/\/(?:en\.)?nia\.gov\.cn\//);

  const calculator = page.getByTestId("visa-time-calculator");
  await calculator.getByRole("button", { name: "Calculate the planning window" }).click();
  await expect(calculator.getByRole("alert")).toHaveText("Enter both dates and times in China Standard Time.");
  await calculator.locator("#visa-entry-time").fill("2026-08-01T12:00");
  await calculator.locator("#visa-departure-time").fill("2026-08-05T12:00");
  await calculator.getByRole("button", { name: "Calculate the planning window" }).click();
  await expect(calculator.getByTestId("visa-time-result")).toContainText("inside the theoretical 240-hour window");
  await expect(calculator.getByTestId("visa-time-result")).toContainText("Policy clock starts");
  await expect(calculator.getByTestId("visa-time-result")).toContainText("This calculator does not replace the decision of immigration officers.");

  const faq = page.locator("#faq");
  const firstFaq = faq
    .locator("details")
    .filter({ hasText: "Is 240 hours the same as 10 calendar days?" });
  await expect(firstFaq).toHaveCount(1);
  await firstFaq.locator("summary").click();
  await expect(firstFaq).toHaveAttribute("open", "");
  await expect(firstFaq.getByText(/not exactly/i)).toBeVisible();

  const sourceLinks = page.locator('#official-sources a[target="_blank"]');
  expect(await sourceLinks.count()).toBeGreaterThanOrEqual(5);
  const sourceHrefs = await sourceLinks.evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href),
  );
  expect(
    sourceHrefs.every((href) => {
      const hostname = new URL(href).hostname;
      return hostname === "nia.gov.cn" || hostname.endsWith(".nia.gov.cn") || hostname === "mfa.gov.cn" || hostname.endsWith(".mfa.gov.cn");
    }),
  ).toBe(true);

  const checklist = page.getByTestId("visa-documents-checklist");
  const firstChecklistItem = checklist.getByLabel("Valid passport or international travel document");
  await firstChecklistItem.check();
  await checklist.getByRole("button", { name: "Save locally" }).click();
  await expect(checklist.getByRole("status")).toContainText("Checklist saved on this device.");
});

test("visa analytics events use only approved non-sensitive parameters", async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("__visaEvents", "[]");
    window.gtag = (_command, eventName, params) => {
      const events = JSON.parse(sessionStorage.getItem("__visaEvents") || "[]") as Array<{
        eventName: string;
        params?: Record<string, unknown>;
      }>;
      events.push({ eventName, params });
      sessionStorage.setItem("__visaEvents", JSON.stringify(events));
    };
  });
  await page.reload({ waitUntil: "domcontentloaded" });

  await completeChecker(page);

  const events = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__visaEvents") || "[]") as Array<{
      eventName: string;
      params?: Record<string, unknown>;
    }>,
  );
  const eventNames = events.map((event) => event.eventName);
  expect(eventNames).toEqual(
    expect.arrayContaining([
      "visa_hub_view",
      "visa_checker_started",
      "visa_checker_step_completed",
      "visa_checker_completed",
      "visa_checker_result_viewed",
    ]),
  );
  const allowedKeys = new Set(["result_category", "step_number", "interaction_type", "policy_version"]);
  for (const event of events) {
    expect(Object.keys(event.params || {}).every((key) => allowedKeys.has(key))).toBe(true);
    expect(JSON.stringify(event.params || {})).not.toMatch(/US|Japan|Singapore|passport|shanghai|ticket/i);
  }
});
