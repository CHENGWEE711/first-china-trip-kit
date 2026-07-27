import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { sanitizePlainText } from "../lib/input.ts";
import { subscribeToNewsletter } from "../lib/services/newsletter.ts";

const root = new URL("../", import.meta.url);

async function withEnvironment(values, run) {
  const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return await run();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("Brevo creation includes the approved Phase 5.1 contact attributes and no form-body fields", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input, init = {}) => {
    requests.push({ url: String(input), method: init.method || "GET", body: init.body ? JSON.parse(String(init.body)) : null });
    if (requests.length === 1) return new Response("Not found", { status: 404 });
    return new Response("", { status: 201 });
  };

  try {
    await withEnvironment(
      {
        BREVO_API_KEY: "preview-test-key",
        BREVO_LIST_ID: "42",
        NEXT_PUBLIC_SUPABASE_URL: undefined,
        SUPABASE_SERVICE_ROLE_KEY: undefined,
      },
      async () => {
        const result = await subscribeToNewsletter({
          email: "preview@example.com",
          firstName: "Preview Traveler",
          leadSource: "readiness_checker",
          sourcePage: "/tools/china-arrival-readiness-checker",
          landingPage: "/tools/china-arrival-readiness-checker",
          placement: "readiness-result-email",
          leadMagnet: "China Arrival Readiness Result + PDF Checklist",
          readinessScore: 82,
          readinessRiskLevel: "almost-ready",
          utmSource: "qa",
          utmMedium: "preview",
          utmCampaign: "phase_5_1",
          consentTimestamp: "2026-07-27T00:00:00.000Z",
        });
        assert.equal(result.ok, true);
      },
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(requests.length, 2);
  assert.equal(requests[1].method, "POST");
  assert.equal(requests[1].body.email, "preview@example.com");
  assert.deepEqual(requests[1].body.listIds, [42]);
  assert.deepEqual(requests[1].body.attributes, {
    FIRSTNAME: "Preview Traveler",
    LEAD_SOURCE: "readiness_checker",
    LANDING_PAGE: "/tools/china-arrival-readiness-checker",
    SIGNUP_PAGE: "/tools/china-arrival-readiness-checker",
    UTM_SOURCE: "qa",
    UTM_MEDIUM: "preview",
    UTM_CAMPAIGN: "phase_5_1",
    UTM_CONTENT: "",
    LEAD_MAGNET: "China Arrival Readiness Result + PDF Checklist",
    CONSENT_TIMESTAMP: "2026-07-27T00:00:00.000Z",
    READINESS_SCORE: 82,
    READINESS_RISK_LEVEL: "almost-ready",
  });
  assert.doesNotMatch(JSON.stringify(requests[1].body), /main_question|passport|card_number/i);
});

test("Brevo updates an existing contact idempotently and provider failures have a safe response", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input, init = {}) => {
    requests.push({ url: String(input), method: init.method || "GET", body: init.body ? JSON.parse(String(init.body)) : null });
    if (requests.length === 1) return Response.json({ listIds: [42] });
    return new Response(null, { status: 204 });
  };

  try {
    await withEnvironment(
      { BREVO_API_KEY: "preview-test-key", BREVO_LIST_ID: "42", NEXT_PUBLIC_SUPABASE_URL: undefined, SUPABASE_SERVICE_ROLE_KEY: undefined },
      async () => {
        const result = await subscribeToNewsletter({ email: "existing@example.com", leadSource: "free_checklist" });
        assert.equal(result.ok, true);
      },
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(requests.length, 2);
  assert.equal(requests[1].method, "PUT");
  assert.deepEqual(requests[1].body.listIds, [42]);

  globalThis.fetch = async () => {
    throw new Error("network unavailable");
  };
  try {
    await withEnvironment(
      { BREVO_API_KEY: "preview-test-key", BREVO_LIST_ID: "42", NEXT_PUBLIC_SUPABASE_URL: undefined, SUPABASE_SERVICE_ROLE_KEY: undefined },
      async () => {
        const result = await subscribeToNewsletter({ email: "failure@example.com" });
        assert.equal(result.ok, false);
        assert.equal(result.status, 503);
        assert.doesNotMatch(result.message, /failure@example\.com/i);
      },
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Preview integration keeps indexing, analytics debug, Payhip variables and input filtering behind safe contracts", async () => {
  const [layout, robots, nextConfig, analytics, payhip, newsletterRoute, contactRoute] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/robots.ts", root), "utf8"),
    readFile(new URL("next.config.mjs", root), "utf8"),
    readFile(new URL("components/GoogleAnalytics.tsx", root), "utf8"),
    readFile(new URL("lib/payhip.ts", root), "utf8"),
    readFile(new URL("app/api/newsletter/route.ts", root), "utf8"),
    readFile(new URL("app/api/contact/route.ts", root), "utf8"),
  ]);

  assert.match(layout, /isPreviewDeployment/);
  assert.match(layout, /index: false/);
  assert.match(robots, /disallow: "\/"/);
  assert.match(nextConfig, /X-Robots-Tag/);
  assert.match(analytics, /enablePreviewDebug/);
  assert.match(analytics, /debug_mode: true/);
  for (const name of ["NEXT_PUBLIC_PAYHIP_FREE_CHECKLIST_URL", "NEXT_PUBLIC_PAYHIP_PAYMENT_GUIDE_URL", "NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL"]) {
    assert.match(payhip, new RegExp(name));
  }
  assert.match(newsletterRoute, /maxRequestBytes/);
  assert.match(contactRoute, /newsletter_opt_in/);
  assert.doesNotMatch(`${newsletterRoute}\n${contactRoute}`, /console\.(log|info|warn|error)/);
  assert.equal(sanitizePlainText('<img src=x onerror="alert(1)"> First\u0000 traveler ', 120), "First traveler");
});
