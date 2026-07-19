import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const previewUrl = process.env.PREVIEW_URL;
const cookieFile = process.env.VERCEL_PREVIEW_COOKIE_FILE;

assert(previewUrl, "PREVIEW_URL is required.");
assert(cookieFile, "VERCEL_PREVIEW_COOKIE_FILE is required.");

const outputDirectory = path.resolve("docs/screenshots/v3-phase3");
fs.mkdirSync(outputDirectory, { recursive: true });

function parseNetscapeCookies(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .filter((line) => line && (!line.startsWith("#") || line.startsWith("#HttpOnly_")))
    .map((line) => {
      const [rawDomain, , cookiePath, secure, expires, name, value] = line.split("\t");
      return {
        name,
        value,
        domain: rawDomain.replace(/^#HttpOnly_/, ""),
        path: cookiePath,
        secure: secure === "TRUE",
        httpOnly: rawDomain.startsWith("#HttpOnly_"),
        expires: Number(expires),
      };
    });
}

const authCookies = parseNetscapeCookies(cookieFile);
assert(authCookies.some((cookie) => cookie.name === "_vercel_jwt"), "Preview authorization cookie is missing.");

const browser = await chromium.launch({ headless: true });

async function createPage(viewport) {
  const context = await browser.newContext({
    viewport,
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  await context.addCookies(authCookies);
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`${previewUrl}/visa-free-transit`, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator("h1").innerText(),
    "Can You Use China’s 240-Hour Visa-Free Transit?",
    "The protected Preview did not load the Phase 3 Hub.",
  );
  return {
    page,
    context,
    assertClean() {
      assert.deepEqual(pageErrors, [], "Preview produced page errors.");
      assert.deepEqual(consoleErrors, [], "Preview produced console errors.");
    },
  };
}

async function chooseRadio(container, name, value) {
  const input = container.locator(`input[name="${name}"][value="${value}"]`);
  await container.locator(`label:has(input[name="${name}"][value="${value}"])`).click();
  assert.equal(await input.isChecked(), true, `${name}=${value} was not selected.`);
}

async function continueChecker(container) {
  await container.getByRole("button", { name: "Continue", exact: true }).click();
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

async function completeChecker(page, overrides = {}) {
  const answers = {
    nationality: "US",
    origin: "JP",
    onward: "SG",
    ...overrides,
  };
  const container = page.getByTestId("transit-eligibility-checker");

  await container.locator("#visa-nationality").selectOption(answers.nationality);
  await chooseRadio(container, "visa-passport-type", "ordinary");
  await chooseRadio(container, "visa-passport-validity", "over-6-months");
  await container.locator("#visa-expected-entry-date").fill("2026-08-01");
  await container.locator("#visa-purpose").selectOption("tourism");
  await continueChecker(container);

  await container.locator("#visa-immediate-origin").selectOption(answers.origin);
  await container.locator("#visa-immediate-onward").selectOption(answers.onward);
  await chooseRadio(container, "visa-multiple-mainland-entries", "no");
  await continueChecker(container);

  await container.locator("#visa-entry-port").selectOption("shanghai-pudong");
  await container.locator("#visa-exit-port").selectOption("shanghai-hongqiao");
  await continueChecker(container);

  await container.locator("#visa-planned-stay-area").selectOption("shanghai-municipality");
  await chooseRadio(container, "visa-permitted-area", "yes");
  await chooseRadio(container, "visa-individual-review", "no");
  await continueChecker(container);

  await chooseRadio(container, "visa-onward-ticket", "yes");
  await chooseRadio(container, "visa-onward-window", "yes");
  await container.locator("#visa-planned-stay-hours").fill("72");
  await chooseRadio(container, "visa-journey-type", "connecting");
  await container.getByRole("button", { name: "Check this route", exact: true }).click();
  return container;
}

async function saveHubScreenshot(viewport, fileName) {
  const run = await createPage(viewport);
  await run.page.screenshot({
    path: path.join(outputDirectory, fileName),
    fullPage: true,
    animations: "disabled",
  });
  run.assertClean();
  await run.context.close();
}

await saveHubScreenshot({ width: 1440, height: 1000 }, "visa-hub-1440.png");
await saveHubScreenshot({ width: 390, height: 844 }, "visa-hub-390.png");

{
  const run = await createPage({ width: 1440, height: 1000 });
  const container = run.page.getByTestId("transit-eligibility-checker");
  await container.locator("#visa-nationality").selectOption("US");
  await chooseRadio(container, "visa-passport-type", "ordinary");
  await chooseRadio(container, "visa-passport-validity", "over-6-months");
  await container.locator("#visa-expected-entry-date").fill("2026-08-01");
  await container.locator("#visa-purpose").selectOption("tourism");
  await continueChecker(container);
  await prepareSectionCapture(run.page);
  await container.screenshot({
    path: path.join(outputDirectory, "visa-screener-route-step.png"),
    animations: "disabled",
  });
  run.assertClean();
  await run.context.close();
}

for (const scenario of [
  {
    fileName: "visa-result-unilateral.png",
    answers: { nationality: "JP", origin: "JP", onward: "JP" },
    resultCategory: "unilateral_30_day_may_apply",
  },
  {
    fileName: "visa-result-transit-240.png",
    answers: {},
    resultCategory: "transit_240_conditions_appear_to_fit",
  },
  {
    fileName: "visa-result-route-issue.png",
    answers: { origin: "JP", onward: "JP" },
    resultCategory: "third_country_route_issue",
  },
]) {
  const run = await createPage({ width: 1440, height: 1000 });
  const container = await completeChecker(run.page, scenario.answers);
  assert.equal(
    await container.getAttribute("data-result-category"),
    scenario.resultCategory,
    `Unexpected result for ${scenario.fileName}.`,
  );
  await prepareSectionCapture(run.page);
  await container.screenshot({
    path: path.join(outputDirectory, scenario.fileName),
    animations: "disabled",
  });
  run.assertClean();
  await run.context.close();
}

{
  const run = await createPage({ width: 1440, height: 1000 });
  const explorer = run.page.getByTestId("eligible-ports-explorer");
  const search = explorer.locator("#visa-port-search");
  await search.pressSequentially("PVG");
  await explorer.locator('details[data-port-id="shanghai-pudong"] summary').click();
  await prepareSectionCapture(run.page);
  await explorer.screenshot({
    path: path.join(outputDirectory, "visa-port-explorer.png"),
    animations: "disabled",
  });
  run.assertClean();
  await run.context.close();
}

await browser.close();
console.log(`Phase 3 Preview screenshots saved to ${outputDirectory}.`);
