import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const productionUrl = new URL(
  process.env.PRODUCTION_URL ??
    process.env.BASE_URL ??
    "https://www.firstchinatripkit.com",
);
productionUrl.pathname = "/";
productionUrl.search = "";
productionUrl.hash = "";

assert.match(
  productionUrl.protocol,
  /^https?:$/,
  "PRODUCTION_URL must use HTTP or HTTPS.",
);

const baseUrl = productionUrl.origin;
const outputDirectory = path.resolve(
  "docs/screenshots/v3-phase3-production",
);
const expectedEntryDate = process.env.CAPTURE_ENTRY_DATE ?? "2026-08-01";
const approvedVisaAnalyticsParameters = new Set([
  "result_category",
  "step_number",
  "interaction_type",
  "policy_version",
]);
const requiredGa4EventKeys = new Map([
  ["visa_hub_view", ["interaction_type", "policy_version"]],
  ["visa_policy_option_selected", ["interaction_type", "policy_version"]],
  ["visa_route_screen_started", ["interaction_type", "policy_version"]],
  [
    "visa_route_screen_step_viewed",
    ["interaction_type", "policy_version", "step_number"],
  ],
  [
    "visa_route_screen_completed",
    ["interaction_type", "policy_version", "result_category"],
  ],
  [
    "visa_result_action_clicked",
    ["interaction_type", "policy_version", "result_category"],
  ],
  ["visa_port_search_used", ["interaction_type", "policy_version"]],
  [
    "visa_official_source_clicked",
    ["interaction_type", "policy_version", "result_category"],
  ],
]);
const expectedScreenshotFiles = [
  "visa-hub-1440.png",
  "visa-hub-390.png",
  "visa-screener-route-step.png",
  "visa-result-unilateral.png",
  "visa-result-transit-240.png",
  "visa-result-route-issue.png",
  "visa-result-manual-review.png",
  "visa-port-explorer.png",
  "homepage-visa-entry-1440.png",
  "homepage-visa-entry-390.png",
];
const ga4Summaries = new Map();
const ga4ListenerErrors = [];

fs.mkdirSync(outputDirectory, { recursive: true });
for (const fileName of expectedScreenshotFiles) {
  fs.rmSync(path.join(outputDirectory, fileName), { force: true });
}

function sanitizeRuntimeMessage(message) {
  return String(message)
    .replace(/https?:\/\/[^\s"')]+/giu, "[URL redacted]")
    .replace(
      /([?&](?:cid|client_id|uid|user_id|gclid|dclid)=)[^&\s]+/giu,
      "$1[redacted]",
    )
    .slice(0, 800);
}

function sanitizeAnalyticsToken(value) {
  if (!value || !/^[A-Za-z][A-Za-z0-9_]{0,79}$/.test(value)) return null;
  return value;
}

function isGa4CollectRequest(url) {
  try {
    const parsed = new URL(url);
    const googleAnalyticsHost =
      parsed.hostname === "analytics.google.com" ||
      parsed.hostname === "google-analytics.com" ||
      parsed.hostname.endsWith(".google-analytics.com");
    return googleAnalyticsHost && parsed.pathname.endsWith("/g/collect");
  } catch {
    return false;
  }
}

function summarizeGa4ParameterSet(parameters) {
  const eventName = sanitizeAnalyticsToken(parameters.get("en"));
  if (!eventName) return;

  const customParameterKeys = Array.from(parameters.keys())
    .map((key) => {
      if (key.startsWith("ep.")) return key.slice(3);
      if (key.startsWith("epn.")) return key.slice(4);
      return null;
    })
    .map(sanitizeAnalyticsToken)
    .filter(Boolean)
    .sort();
  const uniqueCustomParameterKeys = Array.from(new Set(customParameterKeys));

  if (eventName.startsWith("visa_")) {
    const unexpectedKeys = uniqueCustomParameterKeys.filter(
      (key) => !approvedVisaAnalyticsParameters.has(key),
    );
    assert.deepEqual(
      unexpectedKeys,
      [],
      `Visa analytics event ${eventName} exposed unapproved custom parameter keys.`,
    );
  }

  const summary = {
    eventName,
    customParameterKeys: uniqueCustomParameterKeys,
  };
  ga4Summaries.set(JSON.stringify(summary), summary);
}

function recordGa4Request(request) {
  if (!isGa4CollectRequest(request.url())) return;

  try {
    const requestUrl = new URL(request.url());
    const postData = request.postData();
    const bodySegments = postData
      ? postData
          .split(/\r?\n/u)
          .map((segment) => segment.trim())
          .filter(Boolean)
      : [""];

    if (process.env.CAPTURE_GA4_DEBUG === "true") {
      const urlEvent = sanitizeAnalyticsToken(requestUrl.searchParams.get("en"));
      const bodyEvents = bodySegments
        .map((segment) => sanitizeAnalyticsToken(new URLSearchParams(segment).get("en")))
        .filter(Boolean);
      if (
        urlEvent?.startsWith("visa_") ||
        bodyEvents.some((eventName) => eventName.startsWith("visa_"))
      ) {
        console.log(
          `GA4 transport debug: ${JSON.stringify({ urlEvent, bodyEvents })}`,
        );
      }
    }

    for (const bodySegment of bodySegments) {
      const parameters = new URLSearchParams(requestUrl.searchParams);
      if (bodySegment) {
        for (const [key, value] of new URLSearchParams(bodySegment)) {
          parameters.append(key, value);
        }
      }
      summarizeGa4ParameterSet(parameters);
    }
  } catch (error) {
    ga4ListenerErrors.push(
      sanitizeRuntimeMessage(
        error instanceof Error ? error.message : "Unknown GA4 listener error",
      ),
    );
  }
}

function missingRequiredGa4Events() {
  const summaries = Array.from(ga4Summaries.values());
  return Array.from(requiredGa4EventKeys, ([eventName, expectedKeys]) => ({
    eventName,
    expectedKeys,
  })).filter(({ eventName, expectedKeys }) =>
    !summaries.some(
      (summary) =>
        summary.eventName === eventName &&
        JSON.stringify(summary.customParameterKeys) ===
          JSON.stringify([...expectedKeys].sort()),
    ),
  );
}

async function waitForRequiredGa4Events(page) {
  const deadline = Date.now() + 12_000;
  while (Date.now() < deadline && missingRequiredGa4Events().length > 0) {
    await page.waitForTimeout(250);
  }

  const missingEvents = missingRequiredGa4Events();
  const observedSummaries = Array.from(ga4Summaries.values()).sort((a, b) =>
    a.eventName.localeCompare(b.eventName),
  );
  assert.deepEqual(
    missingEvents,
    [],
    `The formal-domain GA4 flow did not emit every required event with the expected privacy-safe custom parameter keys. Observed summaries: ${JSON.stringify(observedSummaries)}`,
  );
}

async function waitForFontsAndImages(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;

    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 60));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });

  await page.waitForLoadState("networkidle", { timeout: 30_000 });

  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map(async (image) => {
        if (!image.complete) {
          await new Promise((resolve, reject) => {
            const timeout = window.setTimeout(
              () => reject(new Error(`Image timed out: ${image.alt || "unnamed image"}`)),
              15_000,
            );
            image.addEventListener(
              "load",
              () => {
                window.clearTimeout(timeout);
                resolve();
              },
              { once: true },
            );
            image.addEventListener(
              "error",
              () => {
                window.clearTimeout(timeout);
                reject(new Error(`Image failed: ${image.alt || "unnamed image"}`));
              },
              { once: true },
            );
          });
        }

        if (typeof image.decode === "function") {
          await image.decode().catch(() => undefined);
        }
        if (image.naturalWidth === 0) {
          throw new Error(`Broken image: ${image.alt || "unnamed image"}`);
        }
      }),
    );
    window.scrollTo(0, 0);
  });
}

async function assertPageQuality(page, label) {
  const quality = await page.evaluate(() => ({
    horizontalOverflow:
      document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    brokenImages: Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.alt || "unnamed image"),
  }));

  assert.equal(
    quality.horizontalOverflow,
    false,
    `${label} overflows horizontally: ${quality.scrollWidth}px for a ${quality.viewportWidth}px viewport.`,
  );
  assert.deepEqual(
    quality.brokenImages,
    [],
    `${label} contains broken images.`,
  );
}

async function assertPageIdentity(page, route) {
  assert.equal(
    new URL(page.url()).pathname,
    route,
    `${route} did not remain on the expected production route.`,
  );
  assert.equal(await page.locator("main").count(), 1, `${route} must have one main element.`);
  assert.equal(await page.locator("h1").count(), 1, `${route} must have one H1.`);

  if (route === "/visa-free-transit") {
    assert.equal(
      (await page.locator("h1").innerText()).trim(),
      "Can You Use China’s 240-Hour Visa-Free Transit?",
      "The formal domain did not render the Phase 3 Hub H1.",
    );
    const hero = page.getByTestId("visa-hub-hero");
    await hero.waitFor({ state: "visible" });
    const primaryAction = hero.getByRole("link", {
      name: "Check My Route",
      exact: true,
    });
    assert.equal(await primaryAction.count(), 1, "The Hub primary route action is missing.");
    assert.equal(await primaryAction.getAttribute("href"), "#route-check");
    await page.getByTestId("transit-eligibility-checker").waitFor({
      state: "visible",
    });
  } else if (route === "/") {
    assert.equal(
      (await page.locator("h1").innerText()).trim(),
      "China Looks Incredible. Your First Trip Doesn't Have to Feel Complicated.",
      "The formal domain did not render the Phase 1 homepage H1.",
    );
    await page.getByTestId("home-hero").waitFor({ state: "visible" });
    const visaEntry = page
      .getByTestId("homepage-task-grid")
      .locator('a[href="/visa-free-transit"]');
    assert.equal(await visaEntry.count(), 1, "The homepage Visa Hub entry is missing.");
    assert.match(
      await visaEntry.innerText(),
      /Can I Enter Visa-Free\?/u,
      "The homepage Visa Hub entry has unexpected copy.",
    );
  }
}

const browser = await chromium.launch({ headless: true });

async function openProductionPage(viewport, route = "/visa-free-transit") {
  const context = await browser.newContext({
    viewport,
    colorScheme: "light",
    reducedMotion: "reduce",
    locale: "en-US",
    timezoneId: "Asia/Shanghai",
    extraHTTPHeaders: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(sanitizeRuntimeMessage(message.text()));
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(sanitizeRuntimeMessage(error.message));
  });
  page.on("request", recordGa4Request);

  const response = await page.goto(new URL(route, baseUrl).href, {
    waitUntil: "domcontentloaded",
  });
  assert(response, `${route} did not return a navigation response.`);
  assert.equal(
    response.status(),
    200,
    `${route} returned HTTP ${response.status()} instead of 200.`,
  );

  await assertPageIdentity(page, route);
  await waitForFontsAndImages(page);
  await assertPageQuality(page, `${route} at ${viewport.width}px`);

  return {
    page,
    context,
    async assertClean() {
      await page.waitForTimeout(400);
      await assertPageQuality(page, `${route} at ${viewport.width}px`);
      assert.deepEqual(pageErrors, [], `${route} produced page errors.`);
      assert.deepEqual(consoleErrors, [], `${route} produced console errors.`);
      assert.deepEqual(ga4ListenerErrors, [], "GA4 request summarization failed.");
    },
  };
}

async function chooseRadio(container, name, value) {
  const input = container.locator(`input[name="${name}"][value="${value}"]`);
  const label = container.locator(
    `label:has(input[name="${name}"][value="${value}"])`,
  );
  assert.equal(await input.count(), 1, `${name}=${value} is missing.`);
  assert.equal(await label.count(), 1, `${name}=${value} has no stable label.`);
  await label.click();
  assert.equal(await input.isChecked(), true, `${name}=${value} was not selected.`);
}

async function continueChecker(container) {
  const button = container.getByRole("button", {
    name: "Continue",
    exact: true,
  });
  assert.equal(await button.count(), 1, "The checker Continue action is missing.");
  await button.click();
}

async function prepareSectionCapture(page) {
  await page.addStyleTag({
    content: `
      header,
      body > a[href="#main-content"] {
        display: none !important;
      }
    `,
  });
}

async function completeChecker(
  page,
  overrides = {},
  { analyticsPacingMs = 0 } = {},
) {
  const answers = {
    nationality: "US",
    origin: "JP",
    onward: "SG",
    journey: "connecting",
    ...overrides,
  };
  const container = page.getByTestId("transit-eligibility-checker");
  const paceAnalytics = async () => {
    if (analyticsPacingMs > 0) await page.waitForTimeout(analyticsPacingMs);
  };

  await container.getByTestId("checker-step-1").waitFor({ state: "visible" });
  await container.locator("#visa-nationality").selectOption(answers.nationality);
  await chooseRadio(container, "visa-passport-type", "ordinary");
  await chooseRadio(container, "visa-passport-validity", "over-6-months");
  await container.locator("#visa-expected-entry-date").fill(expectedEntryDate);
  await container.locator("#visa-purpose").selectOption("tourism");
  await paceAnalytics();
  await continueChecker(container);
  await paceAnalytics();

  await container.getByTestId("checker-step-2").waitFor({ state: "visible" });
  await container.locator("#visa-immediate-origin").selectOption(answers.origin);
  await container.locator("#visa-immediate-onward").selectOption(answers.onward);
  await chooseRadio(container, "visa-multiple-mainland-entries", "no");
  await continueChecker(container);
  await paceAnalytics();

  await container.getByTestId("checker-step-3").waitFor({ state: "visible" });
  await container.locator("#visa-entry-port").selectOption("shanghai-pudong");
  await container.locator("#visa-exit-port").selectOption("shanghai-hongqiao");
  await continueChecker(container);
  await paceAnalytics();

  await container.getByTestId("checker-step-4").waitFor({ state: "visible" });
  await container
    .locator("#visa-planned-stay-area")
    .selectOption("shanghai-municipality");
  await chooseRadio(container, "visa-permitted-area", "yes");
  await chooseRadio(container, "visa-individual-review", "no");
  await continueChecker(container);
  await paceAnalytics();

  await container.getByTestId("checker-step-5").waitFor({ state: "visible" });
  await chooseRadio(container, "visa-onward-ticket", "yes");
  await chooseRadio(container, "visa-onward-window", "yes");
  await container.locator("#visa-planned-stay-hours").fill("72");
  await chooseRadio(container, "visa-journey-type", answers.journey);
  await container
    .getByRole("button", { name: "Check this route", exact: true })
    .click();
  await paceAnalytics();
  return container;
}

async function saveHubScreenshot(viewport, fileName) {
  const run = await openProductionPage(viewport);
  await run.page.screenshot({
    path: path.join(outputDirectory, fileName),
    fullPage: true,
    animations: "disabled",
    caret: "hide",
  });
  await run.assertClean();
  await run.context.close();
}

async function saveCheckerResultScreenshot({
  fileName,
  viewport = { width: 1440, height: 1000 },
  answers = {},
  expectedOutcome,
  resultCategory,
  verifyResult,
}) {
  const run = await openProductionPage(viewport);
  const container = await completeChecker(run.page, answers);
  await container.waitFor({ state: "visible" });
  assert.equal(
    await container.getAttribute("data-outcome"),
    expectedOutcome,
    `Unexpected outcome for ${fileName}.`,
  );
  assert.equal(
    await container.getAttribute("data-result-category"),
    resultCategory,
    `Unexpected result for ${fileName}.`,
  );
  await verifyResult(container);
  await prepareSectionCapture(run.page);
  await container.screenshot({
    path: path.join(outputDirectory, fileName),
    animations: "disabled",
    caret: "hide",
  });
  await run.assertClean();
  await run.context.close();
}

async function saveHomepageVisaEntry(viewport, fileName) {
  const run = await openProductionPage(viewport, "/");
  const section = run.page.locator("#home-tasks");
  await section.waitFor({ state: "visible" });
  await section.locator('a[href="/visa-free-transit"]').waitFor({
    state: "visible",
  });
  await prepareSectionCapture(run.page);
  await section.screenshot({
    path: path.join(outputDirectory, fileName),
    animations: "disabled",
    caret: "hide",
  });
  await run.assertClean();
  await run.context.close();
}

async function runGa4AcceptanceFlow() {
  ga4Summaries.clear();
  const analyticsPacingMs = 1_500;
  const run = await openProductionPage({ width: 1440, height: 1000 });
  const policyOption = run.page
    .locator("#which-policy a")
    .filter({ hasText: "240-Hour Visa-Free Transit" });
  assert.equal(
    await policyOption.count(),
    1,
    "The 240-hour policy option is missing from the production Hub.",
  );
  await policyOption.click();
  await run.page.waitForTimeout(analyticsPacingMs);
  assert.equal(
    new URL(run.page.url()).hash,
    "#route-check",
    "The policy option did not open the route checker.",
  );

  const container = await completeChecker(run.page, {}, { analyticsPacingMs });
  assert.equal(
    await container.getAttribute("data-result-category"),
    "transit_240_conditions_appear_to_fit",
    "The GA4 acceptance route did not reach the expected 240-hour result.",
  );

  const explorer = run.page.getByTestId("eligible-ports-explorer");
  const portSearch = explorer.locator("#visa-port-search");
  await portSearch.pressSequentially("PVG");
  await explorer
    .getByText("1 matching ports from the official 65-port dataset", {
      exact: true,
    })
    .waitFor({ state: "visible" });
  await run.page.waitForTimeout(analyticsPacingMs);

  const officialSource = container.getByRole("link", {
    name: "Check official policy",
    exact: true,
  });
  assert.equal(
    await officialSource.count(),
    1,
    "The result's official policy action is missing.",
  );
  const popupPromise = run.page
    .waitForEvent("popup", { timeout: 6_000 })
    .catch(() => null);
  await officialSource.click();
  const popup = await popupPromise;
  await run.page.waitForTimeout(analyticsPacingMs);
  if (process.env.CAPTURE_GA4_DEBUG === "true") {
    const dataLayerSummary = await run.page.evaluate(() =>
      Array.from(window.dataLayer ?? [])
        .map((entry) => {
          const values =
            entry && typeof entry.length === "number" ? Array.from(entry) : [];
          if (values[0] === "event" && typeof values[1] === "string") {
            const params =
              values[2] && typeof values[2] === "object"
                ? Object.keys(values[2]).sort()
                : [];
            return { eventName: values[1], customParameterKeys: params };
          }
          if (
            entry &&
            typeof entry === "object" &&
            "event" in entry &&
            typeof entry.event === "string"
          ) {
            return {
              eventName: entry.event,
              customParameterKeys: Object.keys(entry).filter((key) => key !== "event").sort(),
            };
          }
          return null;
        })
        .filter((entry) => entry?.eventName.startsWith("visa_")),
    );
    console.log(`In-page GA4 debug summary: ${JSON.stringify(dataLayerSummary)}`);
  }
  await waitForRequiredGa4Events(run.page);
  if (popup) await popup.close().catch(() => undefined);

  await run.assertClean();
  await run.context.close();
}

if (process.env.CAPTURE_GA4_ONLY === "true") {
  try {
    await runGa4AcceptanceFlow();
    console.log(
      JSON.stringify(
        Array.from(ga4Summaries.values()).sort((a, b) =>
          a.eventName.localeCompare(b.eventName),
        ),
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
  process.exit(0);
}

try {
  await saveHubScreenshot(
    { width: 1440, height: 1000 },
    "visa-hub-1440.png",
  );
  await saveHubScreenshot({ width: 390, height: 844 }, "visa-hub-390.png");

  {
    const run = await openProductionPage({ width: 1440, height: 1000 });
    const container = run.page.getByTestId("transit-eligibility-checker");
    await container.locator("#visa-nationality").selectOption("US");
    await chooseRadio(container, "visa-passport-type", "ordinary");
    await chooseRadio(container, "visa-passport-validity", "over-6-months");
    await container.locator("#visa-expected-entry-date").fill(expectedEntryDate);
    await container.locator("#visa-purpose").selectOption("tourism");
    await continueChecker(container);
    await container.getByTestId("checker-step-2").waitFor({ state: "visible" });
    await prepareSectionCapture(run.page);
    await container.screenshot({
      path: path.join(outputDirectory, "visa-screener-route-step.png"),
      animations: "disabled",
      caret: "hide",
    });
    await run.assertClean();
    await run.context.close();
  }

  await saveCheckerResultScreenshot({
    fileName: "visa-result-unilateral.png",
    answers: { nationality: "JP", origin: "JP", onward: "JP" },
    expectedOutcome: "likely-unilateral-visa-free",
    resultCategory: "unilateral_30_day_may_apply",
    verifyResult: async (container) => {
      const heading = container.getByRole("heading", {
        name: "A simpler 30-day visa-free option may apply to your trip.",
      });
      await heading.waitFor({ state: "visible" });
    },
  });
  await saveCheckerResultScreenshot({
    fileName: "visa-result-transit-240.png",
    expectedOutcome: "likely-240-hour-transit",
    resultCategory: "transit_240_conditions_appear_to_fit",
    verifyResult: async (container) => {
      const heading = container.getByRole("heading", {
        name: "Your plan appears to match the published planning conditions for 240-hour visa-free transit.",
      });
      await heading.waitFor({ state: "visible" });
      assert.match(
        await container.innerText(),
        /The final decision is made by immigration inspection officers at the port of entry\./u,
        "The 240-hour result is missing the final-decision disclaimer.",
      );
    },
  });
  await saveCheckerResultScreenshot({
    fileName: "visa-result-route-issue.png",
    answers: { origin: "JP", onward: "JP" },
    expectedOutcome: "not-eligible-from-answers",
    resultCategory: "third_country_route_issue",
    verifyResult: async (container) => {
      assert.match(
        await container.innerText(),
        /same country or region/iu,
        "The route-issue result does not explain the same-region problem.",
      );
    },
  });
  await saveCheckerResultScreenshot({
    fileName: "visa-result-manual-review.png",
    viewport: { width: 390, height: 844 },
    answers: { journey: "through-flight" },
    expectedOutcome: "manual-review",
    resultCategory: "manual_official_verification_required",
    verifyResult: async (container) => {
      assert.match(
        await container.innerText(),
        /airline or immigration authorit/iu,
        "The manual-review result is missing its official-confirmation guidance.",
      );
      const hotline = container.getByRole("link", { name: /12367/u }).first();
      assert.equal(await hotline.getAttribute("href"), "tel:+8612367");
    },
  });

  {
    const run = await openProductionPage({ width: 1440, height: 1000 });
    const explorer = run.page.getByTestId("eligible-ports-explorer");
    const search = explorer.locator("#visa-port-search");
    await search.fill("PVG");
    await explorer
      .getByText("1 matching ports from the official 65-port dataset", {
        exact: true,
      })
      .waitFor({ state: "visible" });
    const pudong = explorer.locator(
      'details[data-port-id="shanghai-pudong"]',
    );
    await pudong.locator("summary").click();
    assert.equal(await pudong.getAttribute("open"), "");
    await prepareSectionCapture(run.page);
    await explorer.screenshot({
      path: path.join(outputDirectory, "visa-port-explorer.png"),
      animations: "disabled",
      caret: "hide",
    });
    await run.assertClean();
    await run.context.close();
  }

  await saveHomepageVisaEntry(
    { width: 1440, height: 1000 },
    "homepage-visa-entry-1440.png",
  );
  await saveHomepageVisaEntry(
    { width: 390, height: 844 },
    "homepage-visa-entry-390.png",
  );

  for (const fileName of expectedScreenshotFiles) {
    const screenshotPath = path.join(outputDirectory, fileName);
    assert(fs.existsSync(screenshotPath), `${fileName} was not created.`);
    assert(fs.statSync(screenshotPath).size > 0, `${fileName} is empty.`);
  }

  await runGa4AcceptanceFlow();

  console.log("GA4 request summaries (event name and custom parameter keys only):");
  for (const summary of Array.from(ga4Summaries.values()).sort((a, b) =>
    a.eventName.localeCompare(b.eventName),
  )) {
    console.log(
      `- ${summary.eventName}: ${
        summary.customParameterKeys.length
          ? summary.customParameterKeys.join(", ")
          : "no custom parameter keys"
      }`,
    );
  }
  console.log(`Phase 3 Production screenshots saved to ${outputDirectory}.`);
} finally {
  await browser.close();
}
