import { expect, type Locator, type Page, test } from "@playwright/test";

type CheckerScenario = {
  nationality?: string;
  passportType?: "ordinary" | "other-valid" | "temporary-emergency" | "unknown";
  passportValidity?:
    | "under-3-months"
    | "3-to-6-months"
    | "over-6-months"
    | "unknown";
  expectedEntryDate?: string;
  purpose?:
    | "tourism"
    | "business"
    | "visit"
    | "family"
    | "work"
    | "study"
    | "journalism"
    | "other";
  origin?: string;
  onward?: string;
  multipleEntries?: "yes" | "no" | "unknown";
  entryPort?: string;
  exitPort?: string;
  stayArea?: string;
  withinArea?: "yes" | "no" | "unknown";
  individualReview?: "yes" | "no" | "unknown";
  ticket?: "yes" | "no" | "unknown";
  withinWindow?: "yes" | "no" | "unknown";
  hours?: number;
  journey?: "connecting" | "through-flight" | "technical-stop" | "unknown";
};

const DEFAULT_SCENARIO: Required<CheckerScenario> = {
  nationality: "US",
  passportType: "ordinary",
  passportValidity: "over-6-months",
  expectedEntryDate: "2026-08-01",
  purpose: "tourism",
  origin: "JP",
  onward: "SG",
  multipleEntries: "no",
  entryPort: "shanghai-pudong",
  exitPort: "shanghai-hongqiao",
  stayArea: "shanghai-municipality",
  withinArea: "yes",
  individualReview: "no",
  ticket: "yes",
  withinWindow: "yes",
  hours: 72,
  journey: "connecting",
};

function checker(page: Page): Locator {
  return page.getByTestId("transit-eligibility-checker");
}

async function chooseRadio(container: Locator, name: string, value: string) {
  const control = container.locator(
    `input[name="${name}"][value="${value}"]`,
  );
  await expect(control).toHaveCount(1);
  const label = container.locator(
    `label:has(input[name="${name}"][value="${value}"])`,
  );
  await expect(label).toHaveCount(1);
  await label.click();
  await expect(control).toBeChecked();
}

async function continueChecker(container: Locator) {
  const button = container.getByRole("button", {
    name: "Continue",
    exact: true,
  });
  await expect(button).toHaveCount(1);
  await button.click();
}

async function completeChecker(page: Page, overrides: CheckerScenario = {}) {
  const answers = { ...DEFAULT_SCENARIO, ...overrides };
  const container = checker(page);

  await expect(container.getByTestId("checker-step-1")).toBeVisible();
  await container.locator("#visa-nationality").selectOption(answers.nationality);
  await chooseRadio(
    container,
    "visa-passport-type",
    answers.passportType,
  );
  await chooseRadio(
    container,
    "visa-passport-validity",
    answers.passportValidity,
  );
  await container
    .locator("#visa-expected-entry-date")
    .fill(answers.expectedEntryDate);
  await container.locator("#visa-purpose").selectOption(answers.purpose);
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-2")).toBeVisible();
  await container.locator("#visa-immediate-origin").selectOption(answers.origin);
  await container.locator("#visa-immediate-onward").selectOption(answers.onward);
  await chooseRadio(
    container,
    "visa-multiple-mainland-entries",
    answers.multipleEntries,
  );
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-3")).toBeVisible();
  await container.locator("#visa-entry-port").selectOption(answers.entryPort);
  await container.locator("#visa-exit-port").selectOption(answers.exitPort);
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-4")).toBeVisible();
  await container
    .locator("#visa-planned-stay-area")
    .selectOption(answers.stayArea);
  await chooseRadio(container, "visa-permitted-area", answers.withinArea);
  await chooseRadio(
    container,
    "visa-individual-review",
    answers.individualReview,
  );
  await continueChecker(container);

  await expect(container.getByTestId("checker-step-5")).toBeVisible();
  await chooseRadio(container, "visa-onward-ticket", answers.ticket);
  await chooseRadio(container, "visa-onward-window", answers.withinWindow);
  await container
    .locator("#visa-planned-stay-hours")
    .fill(String(answers.hours));
  await chooseRadio(container, "visa-journey-type", answers.journey);
  await container
    .getByRole("button", { name: "Check this route", exact: true })
    .click();
}

async function restartChecker(page: Page) {
  const button = checker(page).getByRole("button", {
    name: "Start Again",
    exact: true,
  });
  await expect(button).toHaveCount(1);
  await button.click();
  await expect(checker(page).getByTestId("checker-step-1")).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  const response = await page.goto("/visa-free-transit", {
    waitUntil: "networkidle",
  });
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText(
    "Can You Use China’s 240-Hour Visa-Free Transit?",
  );
});

test("the five-step screener validates, supports Back and returns a cautious 240-hour result", async ({
  page,
}) => {
  const container = checker(page);
  await expect(
    container.getByText("Route checker · Step 1 of 5", { exact: true }),
  ).toBeVisible();

  await continueChecker(container);
  await expect(container.getByRole("alert")).toHaveCount(5);
  await expect(container.locator("#visa-nationality")).toBeFocused();

  await container.locator("#visa-nationality").selectOption("US");
  await chooseRadio(container, "visa-passport-type", "ordinary");
  await chooseRadio(
    container,
    "visa-passport-validity",
    "over-6-months",
  );
  await container.locator("#visa-expected-entry-date").fill("2026-08-01");
  await container.locator("#visa-purpose").selectOption("tourism");
  await continueChecker(container);

  const backButton = container.getByRole("button", {
    name: "Back",
    exact: true,
  });
  await backButton.click();
  await expect(container.getByTestId("checker-step-1")).toBeVisible();
  await expect(container.locator("#visa-nationality")).toHaveValue("US");
  await expect(container.locator("#visa-expected-entry-date")).toHaveValue(
    "2026-08-01",
  );
  await continueChecker(container);

  await continueChecker(container);
  await expect(container.getByRole("alert")).toHaveCount(3);
  await expect(container.locator("#visa-immediate-origin")).toBeFocused();
  await container.locator("#visa-immediate-origin").selectOption("JP");
  await container.locator("#visa-immediate-onward").selectOption("SG");
  await chooseRadio(container, "visa-multiple-mainland-entries", "no");
  await continueChecker(container);

  await container.locator("#visa-entry-port-search").fill("PVG");
  await expect(container.locator("#visa-entry-port option")).toHaveCount(2);
  await container.locator("#visa-entry-port").selectOption("shanghai-pudong");
  await container.locator("#visa-exit-port").selectOption("shanghai-hongqiao");
  await expect(
    container.getByText("Selected: Shanghai Pudong International Airport", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(container.getByText(/Official appendix row/)).toContainText(
    "of 65",
  );
  await continueChecker(container);

  await chooseRadio(container, "visa-permitted-area", "yes");
  await chooseRadio(container, "visa-individual-review", "no");
  await continueChecker(container);

  await container
    .getByRole("button", { name: "Check this route", exact: true })
    .click();
  await expect(container.getByRole("alert")).toHaveCount(4);
  await expect(
    container.locator('input[name="visa-onward-ticket"][value="yes"]'),
  ).toBeFocused();
  await chooseRadio(container, "visa-onward-ticket", "yes");
  await chooseRadio(container, "visa-onward-window", "yes");
  await container.locator("#visa-planned-stay-hours").fill("72");
  await chooseRadio(container, "visa-journey-type", "connecting");
  await container
    .getByRole("button", { name: "Check this route", exact: true })
    .click();

  await expect(container).toHaveAttribute(
    "data-outcome",
    "likely-240-hour-transit",
  );
  await expect(container).toHaveAttribute(
    "data-result-category",
    "transit_240_conditions_appear_to_fit",
  );
  const resultHeading = container.getByRole("heading", {
    name: "Your plan appears to match the published planning conditions for 240-hour visa-free transit.",
  });
  await expect(resultHeading).toBeVisible();
  await expect(resultHeading).toBeFocused();
  await expect(
    container.getByText("Nationality appears on the current eligible list.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(container.getByRole("heading", { name: "Documents to prepare" })).toBeVisible();
  await expect(container.getByRole("heading", { name: "Official verification" })).toBeVisible();
  await expect(
    container.getByText(
      "The final decision is made by immigration inspection officers at the port of entry.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    container.getByRole("link", {
      name: /prepare payments and essential apps/i,
    }),
  ).toHaveAttribute("href", "/payments-and-apps");
  expect(await container.innerText()).not.toMatch(
    /you are approved|definitely eligible|guaranteed entry/i,
  );
});

test("the screener exposes unilateral and route-issue outcomes with reset", async ({
  page,
}) => {
  await completeChecker(page, {
    nationality: "JP",
    origin: "JP",
    onward: "JP",
  });
  await expect(checker(page)).toHaveAttribute(
    "data-outcome",
    "likely-unilateral-visa-free",
  );
  await expect(checker(page)).toHaveAttribute(
    "data-result-category",
    "unilateral_30_day_may_apply",
  );
  await expect(
    checker(page).getByRole("heading", {
      name: "A simpler 30-day visa-free option may apply to your trip.",
    }),
  ).toBeVisible();

  await restartChecker(page);
  await completeChecker(page, { origin: "JP", onward: "JP" });
  await expect(checker(page)).toHaveAttribute(
    "data-outcome",
    "not-eligible-from-answers",
  );
  await expect(checker(page)).toHaveAttribute(
    "data-result-category",
    "third_country_route_issue",
  );
  await expect(checker(page).getByText(/same country or region/i)).toBeVisible();
});

test("the screener exposes manual-review and policy-date outcomes without treating a short stay as approval", async ({
  page,
}) => {
  await completeChecker(page, { journey: "through-flight" });
  await expect(checker(page)).toHaveAttribute("data-outcome", "manual-review");
  await expect(
    checker(page).getByRole("link", { name: /12367/i }).first(),
  ).toHaveAttribute("href", "tel:+8612367");

  await restartChecker(page);
  await completeChecker(page, {
    nationality: "FR",
    expectedEntryDate: "2027-01-10",
    origin: "JP",
    onward: "JP",
  });
  await expect(checker(page)).toHaveAttribute(
    "data-outcome",
    "policy-date-needs-verification",
  );
  await expect(checker(page)).toHaveAttribute(
    "data-result-category",
    "policy_date_needs_verification",
  );

  await restartChecker(page);
  await completeChecker(page, { hours: 20 });
  await expect(checker(page)).toHaveAttribute(
    "data-outcome",
    "likely-240-hour-transit",
  );
  await expect(checker(page)).toHaveAttribute(
    "data-result-category",
    "transit_240_conditions_appear_to_fit",
  );
  await expect(
    checker(page).getByText(/not an approval or guarantee of entry/i),
  ).toBeVisible();
});

test("all three policy choices preset the screener with distinct context", async ({
  page,
}) => {
  const choices = [
    ["30-Day Visa-Free Entry", "unilateral-30-day", /30-day entry context selected/i],
    ["240-Hour Visa-Free Transit", "transit-240-hour", /240-hour transit context selected/i],
    ["24-Hour Direct Transit", "direct-transit-24-hour", /24-hour direct-transit context selected/i],
  ] as const;

  for (const [title, context, prompt] of choices) {
    const choice = page.locator("#which-policy a").filter({ hasText: title });
    await expect(choice).toHaveCount(1);
    await choice.click();
    await expect(page).toHaveURL(/#route-check$/);
    const contextBanner = checker(page).locator("[data-policy-context]");
    await expect(contextBanner).toHaveAttribute("data-policy-context", context);
    await expect(contextBanner).toContainText(prompt);
  }
});

test("ports, time calculator, FAQ, sources and local checklist remain operable", async ({
  page,
}) => {
  const explorer = page.getByTestId("eligible-ports-explorer");
  const search = explorer.locator("#visa-port-search");
  await search.pressSequentially("PVG");
  await expect(
    explorer.getByText("1 matching ports from the official 65-port dataset", {
      exact: true,
    }),
  ).toBeVisible();
  const pudongDisclosure = explorer.locator(
    'details[data-port-id="shanghai-pudong"]',
  );
  await pudongDisclosure.locator("summary").click();
  await expect(pudongDisclosure).toHaveAttribute("open", "");
  await expect(
    pudongDisclosure.getByText("Shanghai Municipality", { exact: true }),
  ).toBeVisible();
  await expect(pudongDisclosure.getByText(/of 65/)).toBeVisible();
  await expect(
    pudongDisclosure.getByRole("link", { name: "Official source" }),
  ).toHaveAttribute("href", /^https:\/\/(?:en\.)?nia\.gov\.cn\//);

  await search.press("Escape");
  await expect(search).toHaveValue("");
  await expect(
    explorer.getByRole("link", { name: "View the original official appendix" }),
  ).toHaveAttribute("href", /^https:\/\/(?:en\.)?nia\.gov\.cn\//);

  const calculator = page.getByTestId("visa-time-calculator");
  await calculator
    .getByRole("button", { name: "Calculate the planning window" })
    .click();
  await expect(calculator.getByRole("alert")).toHaveText(
    "Enter both dates and times in China Standard Time.",
  );
  await calculator.locator("#visa-entry-time").fill("2026-08-01T12:00");
  await calculator.locator("#visa-departure-time").fill("2026-08-05T12:00");
  await calculator
    .getByRole("button", { name: "Calculate the planning window" })
    .click();
  await expect(calculator.getByTestId("visa-time-result")).toContainText(
    "inside the theoretical 240-hour window",
  );

  const faq = page.locator("#faq");
  const firstFaq = faq
    .locator("details")
    .filter({ hasText: "Is 240 hours the same as 10 calendar days?" });
  await firstFaq.locator("summary").click();
  await expect(firstFaq).toHaveAttribute("open", "");

  const sourceLinks = page.locator('#official-sources a[target="_blank"]');
  expect(await sourceLinks.count()).toBeGreaterThanOrEqual(5);
  const sourceHrefs = await sourceLinks.evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href),
  );
  expect(
    sourceHrefs.every((href) => {
      const hostname = new URL(href).hostname;
      return (
        hostname === "nia.gov.cn" ||
        hostname.endsWith(".nia.gov.cn") ||
        hostname === "mfa.gov.cn" ||
        hostname.endsWith(".mfa.gov.cn")
      );
    }),
  ).toBe(true);

  const checklist = page.getByTestId("visa-documents-checklist");
  await checklist
    .getByLabel("Valid passport or international travel document")
    .check();
  await checklist.getByRole("button", { name: "Save locally" }).click();
  await expect(checklist.getByRole("status")).toContainText(
    "Checklist saved on this device.",
  );
});

test("visa analytics events use only approved non-sensitive parameters", async ({
  page,
}) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("__visaEvents", "[]");
    window.gtag = (_command, eventName, params) => {
      const events = JSON.parse(
        sessionStorage.getItem("__visaEvents") || "[]",
      ) as Array<{ eventName: string; params?: Record<string, unknown> }>;
      events.push({ eventName, params });
      sessionStorage.setItem("__visaEvents", JSON.stringify(events));
    };
  });
  await page.reload({ waitUntil: "domcontentloaded" });

  await completeChecker(page);

  const events = await page.evaluate(
    () =>
      JSON.parse(sessionStorage.getItem("__visaEvents") || "[]") as Array<{
        eventName: string;
        params?: Record<string, unknown>;
      }>,
  );
  const eventNames = events.map((event) => event.eventName);
  expect(eventNames).toEqual(
    expect.arrayContaining([
      "visa_hub_view",
      "visa_route_screen_started",
      "visa_route_screen_step_viewed",
      "visa_route_screen_completed",
    ]),
  );

  const allowedKeys = new Set([
    "result_category",
    "step_number",
    "interaction_type",
    "policy_version",
  ]);
  for (const event of events) {
    expect(
      Object.keys(event.params || {}).every((key) => allowedKeys.has(key)),
    ).toBe(true);
    expect(JSON.stringify(event.params || {})).not.toMatch(
      /US|JP|SG|2026-08-01|passport|shanghai|ticket|private itinerary/i,
    );
  }
});
