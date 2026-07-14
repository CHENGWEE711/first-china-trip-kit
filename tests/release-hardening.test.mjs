import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("conversion thank-you pages stay out of search results and the sitemap", async () => {
  const [sitemap, checklistThankYou, productThankYou] = await Promise.all([
    read("app/sitemap.ts"),
    read("app/thank-you/page.tsx"),
    read("app/payment-apps-guide/thank-you/page.tsx"),
  ]);

  assert.doesNotMatch(sitemap, /["']\/thank-you["']/);
  assert.doesNotMatch(sitemap, /payment-apps-guide\/thank-you/);
  assert.match(checklistThankYou, /index:\s*false/);
  assert.match(productThankYou, /index:\s*false/);
});

test("public forms include spam traps and bounded fields", async () => {
  const [contactRoute, newsletterRoute, contactForm, newsletterForm] = await Promise.all([
    read("app/api/contact/route.ts"),
    read("app/api/newsletter/route.ts"),
    read("components/ContactForm.tsx"),
    read("components/NewsletterForm.tsx"),
  ]);

  for (const source of [contactRoute, newsletterRoute, contactForm, newsletterForm]) {
    assert.match(source, /website/);
  }
  assert.match(contactRoute, /mainQuestion\.length > 5000/);
  assert.match(newsletterRoute, /email\.length > 254/);
  assert.match(contactForm, /maxLength=\{5000\}/);
  assert.match(newsletterForm, /maxLength=\{254\}/);
});

test("baseline security headers are configured globally", async () => {
  const config = await read("next.config.mjs");

  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /Permissions-Policy/);
});

test("reduced-motion users do not inherit animated scrolling or long transitions", async () => {
  const styles = await read("app/globals.css");

  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /scroll-behavior:\s*auto/);
  assert.match(styles, /transition-duration:\s*0\.01ms/);
});
