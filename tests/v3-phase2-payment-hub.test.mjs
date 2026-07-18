import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("Phase 2 creates one Hub route and keeps later V3 phases out of scope", () => {
  const page = read("app/payments-and-apps/page.tsx");
  assert.match(page, /Set Up China Before You Land/);
  assert.match(page, /15 Minute Setup/);
  assert.match(page, /Payment Readiness Score/);
  assert.match(page, /The First Hour in China/);
  assert.match(page, /People Always Ask/);
  assert.doesNotMatch(page, /Visa Hub|AI Planner|Zhangjiajie Hub|Chongqing Hub/i);
  assert.equal(fs.existsSync(path.join(root, "app/visa-hub")), false);
  assert.equal(fs.existsSync(path.join(root, "app/ai-planner")), false);
});

test("Phase 2 implements every required GA4 event name", () => {
  const files = read("app/payments-and-apps/page.tsx") + read("components/PaymentHubInteractive.tsx");
  for (const event of [
    "payment_hub_view",
    "payment_step_clicked",
    "payment_readiness_started",
    "payment_readiness_completed",
    "interactive_checklist_started",
    "interactive_checklist_completed",
    "guide_preview_opened",
    "guide_buy_clicked",
    "offline_backup_opened",
  ]) assert.match(files, new RegExp(`\\b${event}\\b`), event);
});

test("Phase 2 uses versioned browser-only storage and the approved real image library", () => {
  const tools = read("components/PaymentHubInteractive.tsx");
  const page = read("app/payments-and-apps/page.tsx");
  assert.match(tools, /fctk:payment-readiness:v1/);
  assert.match(tools, /fctk:payment-hub-checklist:v1/);
  assert.match(tools, /try\s*\{/);
  assert.match(page, /phase-c\/how-to-pay-in-china-as-a-foreigner\/hero\.webp/);
  assert.match(page, /phase-c\/best-apps-for-traveling-in-china\/hero\.webp/);
  assert.match(page, /phase-c\/how-to-book-high-speed-trains-in-china\/hero\.webp/);
  assert.doesNotMatch(page, /generated_images|\/api\/openai|data:image\//);
});

test("Sitemap and high-intent navigation include the Hub", () => {
  assert.match(read("app/sitemap.ts"), /payments-and-apps/);
  assert.match(read("app/page.tsx"), /href:\s*"\/payments-and-apps"/);
  assert.match(read("components/StartHerePath.tsx"), /\/payments-and-apps#payments/);
  assert.match(read("components/Footer.tsx"), /Payments & Apps/);
});
