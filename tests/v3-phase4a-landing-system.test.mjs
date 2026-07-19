import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nodeRequire = createRequire(import.meta.url);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const LANDING_SLUGS = [
  "pay-in-china",
  "china-visa-free",
  "china-checklist",
];

const LANDING_EVENTS = [
  "landing_view",
  "landing_cta_clicked",
  "landing_checklist_download",
  "landing_hub_clicked",
  "landing_newsletter_signup",
];

const SAFE_PARAM_KEYS = [
  "landing_name",
  "traffic_source",
  "cta_name",
  "interaction_type",
];

const moduleCache = new Map();

function resolveLocalModule(specifier, parentFile) {
  const unresolved = specifier.startsWith("@/")
    ? path.join(root, specifier.slice(2))
    : path.resolve(path.dirname(parentFile), specifier);
  const candidates = path.extname(unresolved)
    ? [unresolved]
    : [
        `${unresolved}.ts`,
        `${unresolved}.tsx`,
        `${unresolved}.json`,
        path.join(unresolved, "index.ts"),
      ];
  const resolved = candidates.find((candidate) => fs.existsSync(candidate));
  if (!resolved) throw new Error(`Unable to resolve ${specifier} from ${parentFile}`);
  return resolved;
}

function loadProjectModule(file) {
  if (moduleCache.has(file)) return moduleCache.get(file).exports;
  if (file.endsWith(".json")) return JSON.parse(fs.readFileSync(file, "utf8"));

  const loadedModule = { exports: {} };
  moduleCache.set(file, loadedModule);
  const source = fs.readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;

  const localRequire = (specifier) => {
    if (specifier.startsWith("@/") || specifier.startsWith(".")) {
      return loadProjectModule(resolveLocalModule(specifier, file));
    }
    return nodeRequire(specifier);
  };

  const execute = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    compiled,
  );
  execute(
    loadedModule.exports,
    localRequire,
    loadedModule,
    file,
    path.dirname(file),
  );
  return loadedModule.exports;
}

test("Phase 4A defines exactly the three approved social landing pages", () => {
  const source = read("data/landings.ts");
  for (const slug of LANDING_SLUGS) {
    assert.match(source, new RegExp(`[\"']${slug}[\"']`), slug);
  }

  const configuredSlugs = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
  assert.deepEqual([...new Set(configuredSlugs)].sort(), [...LANDING_SLUGS].sort());
  assert.equal(fs.existsSync(path.join(root, "app/landing/[slug]/page.tsx")), true);
  const routeSource = read("app/landing/[slug]/page.tsx");
  assert.match(routeSource, /export\s+const\s+dynamicParams\s*=\s*false/);
  assert.equal(fs.existsSync(path.join(root, "app/landing/page.tsx")), false);

  for (const forbiddenRoute of [
    "app/ai-planner",
    "app/account",
    "app/community",
    "app/membership",
  ]) {
    assert.equal(
      fs.existsSync(path.join(root, forbiddenRoute)),
      false,
      `${forbiddenRoute} is outside Phase 4A`,
    );
  }
});

test("the shared page composes the complete landing framework", () => {
  const componentFiles = fs
    .readdirSync(path.join(root, "components/landing"))
    .filter((file) => /\.(?:ts|tsx)$/.test(file));
  const source = componentFiles
    .map((file) => read(path.join("components/landing", file)))
    .join("\n");

  for (const component of [
    "LandingHero",
    "LandingQuickAnswer",
    "LandingBenefitGrid",
    "LandingTrustSection",
    "LandingPrimaryCTA",
    "LandingHubPreview",
    "LandingFAQ",
    "LandingRelatedContent",
    "LandingNewsletter",
    "LandingFooterCTA",
  ]) {
    assert.match(source, new RegExp(`\\b${component}\\b`), component);
  }

  assert.doesNotMatch(source, /lorem ipsum|coming soon|placeholder/i);
});

test("landing SEO is reusable and self-canonical with WebPage and breadcrumb schema", () => {
  const seo = read("lib/landing/seo.ts");
  const route = read("app/landing/[slug]/page.tsx");

  assert.match(seo, /buildMetadata/);
  assert.match(seo, /WebPage/);
  assert.match(seo, /BreadcrumbList|breadcrumbJsonLd/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /notFound/);
  assert.match(route, /JsonLd/);
  assert.doesNotMatch(seo, /GovernmentService|AggregateRating|Review/);
});

test("landing analytics exposes only the approved event and parameter allowlists", () => {
  const analyticsFile = path.join(root, "lib/landing/analytics.ts");
  const analyticsSource = fs.readFileSync(analyticsFile, "utf8");
  for (const event of LANDING_EVENTS) {
    assert.match(analyticsSource, new RegExp(`\\b${event}\\b`), event);
  }
  for (const key of SAFE_PARAM_KEYS) {
    assert.match(analyticsSource, new RegExp(`\\b${key}\\b`), key);
  }

  const analytics = loadProjectModule(analyticsFile);
  assert.equal(typeof analytics.sanitizeLandingAnalyticsParams, "function");
  const safe = analytics.sanitizeLandingAnalyticsParams({
    landing_name: "pay_in_china",
    traffic_source: "instagram",
    cta_name: "open_payments_hub",
    interaction_type: "click",
    email: "private@example.com",
    country: "private",
    location: "private",
    passport: "private",
    user_input: "private",
    destination_url: "private",
    utm_campaign: "private",
  });

  assert.deepEqual(safe, {
    landing_name: "pay_in_china",
    traffic_source: "instagram",
    cta_name: "open_payments_hub",
    interaction_type: "click",
  });

  const landingSources = [
    analyticsSource,
    read("data/landings.ts"),
    ...fs
      .readdirSync(path.join(root, "components/landing"))
      .filter((file) => /\.(?:ts|tsx)$/.test(file))
      .map((file) => read(path.join("components/landing", file))),
  ].join("\n");
  const emittedEvents = [
    ...landingSources.matchAll(/(?:trackLandingEvent\(\s*|eventName:\s*)["'](landing_[a-z_]+)["']/g),
  ].map((match) => match[1]);
  assert.ok(emittedEvents.length > 0);
  for (const eventName of emittedEvents) {
    assert.ok(LANDING_EVENTS.includes(eventName), `Unexpected Landing event: ${eventName}`);
  }
});

test("sitemap derives the approved landing routes from the shared data source", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /import\s*\{\s*landingPages\s*\}\s*from\s*["']@\/data\/landings["']/);
  assert.match(sitemap, /landingPages\.map/);
  assert.match(sitemap, /absoluteUrl\(landing\.path\)/);
  assert.match(sitemap, /\.\.\.landingRoutes/);
});

test("Phase 4A test coverage contains no skipped or focused tests", () => {
  const testFiles = [
    "tests/v3-phase4a-landing-system.test.mjs",
    "tests/landing/seo.spec.ts",
    "tests/landing/functional.spec.ts",
    "tests/landing/analytics.spec.ts",
    "tests/landing/responsive-accessibility.spec.ts",
  ];
  const source = testFiles.map(read).join("\n");
  assert.doesNotMatch(source, /\b(?:test|describe)\.(?:skip|only|fixme)\s*\(/);
});
