import { expect, test } from "@playwright/test";
import { gotoWithNetworkRetry } from "./helpers";

const ALLOWED_EVENTS = [
  "landing_view",
  "landing_cta_clicked",
  "landing_checklist_download",
  "landing_hub_clicked",
  "landing_newsletter_signup",
] as const;

const ALLOWED_PARAMS = [
  "landing_name",
  "traffic_source",
  "cta_name",
  "interaction_type",
] as const;

type RecordedEvent = {
  eventName: string;
  params: Record<string, unknown>;
};

const installRecorder = () => {
  if (!sessionStorage.getItem("__landingEvents")) {
    sessionStorage.setItem("__landingEvents", "[]");
  }
  window.gtag = (_command, eventName, params = {}) => {
    const events = JSON.parse(sessionStorage.getItem("__landingEvents") || "[]") as RecordedEvent[];
    events.push({ eventName, params });
    sessionStorage.setItem("__landingEvents", JSON.stringify(events));
  };
};

async function recordedEvents(page: import("@playwright/test").Page): Promise<RecordedEvent[]> {
  return page.evaluate(() => {
    const stored = JSON.parse(
      sessionStorage.getItem("__landingEvents") || "[]",
    ) as RecordedEvent[];
    const fromDataLayer = (window.dataLayer || []).flatMap((entry) => {
      const candidate = entry as Record<string | number, unknown>;
      if (candidate[0] === "event" && typeof candidate[1] === "string") {
        return [{
          eventName: candidate[1],
          params:
            candidate[2] && typeof candidate[2] === "object"
              ? candidate[2] as Record<string, unknown>
              : {},
        }];
      }

      if (typeof candidate.event === "string") {
        const { event, ...params } = candidate;
        return [{ eventName: event, params }];
      }

      return [];
    });

    return [...stored, ...fromDataLayer].filter(
      (event, index, events) =>
        events.findIndex((candidate) => JSON.stringify(candidate) === JSON.stringify(event)) === index,
    );
  });
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(installRecorder);
});

test("landing views and CTA clicks use only the approved privacy-safe schema", async ({ page }) => {
  await gotoWithNetworkRetry(page, "/landing/pay-in-china?utm_source=instagram&utm_campaign=private-campaign");
  await expect.poll(async () => (await recordedEvents(page)).length).toBeGreaterThan(0);
  await page.getByRole("link", { name: "Open Payments Hub", exact: true }).first().click();
  await expect(page).toHaveURL(/\/payments-and-apps(?:#.*)?$/);

  const events = await recordedEvents(page);
  const landingEvents = events.filter(({ eventName }) => eventName.startsWith("landing_"));
  expect(landingEvents.map(({ eventName }) => eventName)).toContain("landing_view");
  expect(landingEvents.map(({ eventName }) => eventName)).toContain("landing_hub_clicked");
  for (const event of landingEvents) {
    expect(ALLOWED_EVENTS).toContain(event.eventName as (typeof ALLOWED_EVENTS)[number]);
    for (const key of Object.keys(event.params)) {
      expect(ALLOWED_PARAMS, `${event.eventName}.${key}`).toContain(
        key as (typeof ALLOWED_PARAMS)[number],
      );
    }
  }

  const serialized = JSON.stringify(landingEvents);
  expect(serialized).not.toContain("private-campaign");
  expect(serialized).not.toMatch(/email|passport|location|destination_url|utm_campaign|user_input/i);
  expect(landingEvents.find(({ eventName }) => eventName === "landing_view")?.params).toMatchObject({
    landing_name: "pay_in_china",
    traffic_source: "instagram",
  });
});

test("checklist signup records a safe conversion without the submitted email", async ({ page }) => {
  await page.route("**/api/newsletter", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Your checklist is ready." }),
    });
  });

  await gotoWithNetworkRetry(page, "/landing/china-checklist?utm_source=tiktok");
  await page.getByRole("link", { name: "Download Free Checklist", exact: true }).first().click();
  await page.getByRole("textbox", { name: "Email address" }).fill("sensitive-address@example.test");
  await page.getByRole("button", { name: /get|download/i }).click();
  await expect(page).toHaveURL(/\/thank-you$/, { timeout: 5_000 });

  const events = await recordedEvents(page);
  const landingEvents = events.filter(({ eventName }) => eventName.startsWith("landing_"));
  const signup = landingEvents.find(({ eventName }) => eventName === "landing_newsletter_signup");
  expect(landingEvents.map(({ eventName }) => eventName)).toContain("landing_cta_clicked");
  expect(signup).toBeTruthy();
  expect(
    Object.keys(signup?.params || {}).every((key) =>
      (ALLOWED_PARAMS as readonly string[]).includes(key),
    ),
  ).toBe(true);
  expect(JSON.stringify(landingEvents)).not.toContain("sensitive-address@example.test");
  expect(JSON.stringify(landingEvents)).not.toMatch(/email|passport|country|location|user_input/i);
});

test("the payment checklist CTA preserves the Landing-to-Checklist funnel", async ({ page }) => {
  await gotoWithNetworkRetry(page, "/landing/pay-in-china?utm_source=pinterest");
  await page.getByRole("link", { name: "Download Checklist", exact: true }).first().click();
  await expect(page).toHaveURL(/\/landing\/china-checklist#free-checklist$/);

  const events = (await recordedEvents(page)).filter(({ eventName }) =>
    eventName.startsWith("landing_"),
  );
  const checklistEvent = events.find(
    ({ eventName, params }) =>
      eventName === "landing_cta_clicked" && params.cta_name === "download_checklist",
  );
  expect(checklistEvent?.params).toMatchObject({
    landing_name: "pay_in_china",
    traffic_source: "pinterest",
    cta_name: "download_checklist",
    interaction_type: "click",
  });
});
