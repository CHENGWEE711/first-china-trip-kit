import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nodeRequire = createRequire(import.meta.url);
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

const data = loadProjectModule(path.join(root, "data/visa/index.ts"));
const evaluator = loadProjectModule(
  path.join(root, "lib/visa/evaluate-transit-eligibility.ts"),
);
const analytics = loadProjectModule(path.join(root, "lib/visa/analytics.ts"));
const entryPort = data.TRANSIT_PORTS.find((port) => port.canEnter);

function validInput(overrides = {}) {
  assert.ok(entryPort, "The policy dataset must contain an eligible entry port");
  return {
    nationalityIso2: "US",
    passportType: "ordinary",
    passportValidity: "over-6-months",
    immediateOriginRegionId: "JP",
    immediateOnwardRegionId: "SG",
    entryPortId: entryPort.id,
    onwardTicketConfirmed: true,
    onwardWithin240Hours: true,
    stayingWithinPermittedArea: true,
    journeyType: "connecting",
    purpose: "tourism",
    plannedStayHours: 72,
    ...overrides,
  };
}

test("Phase 3 policy data and evaluator run in the npm unit-test gate", () => {
  assert.equal(data.TRANSIT_ELIGIBLE_COUNTRIES.length, 55);
  assert.equal(new Set(data.TRANSIT_ELIGIBLE_COUNTRIES).size, 55);
  assert.equal(data.TRANSIT_PORTS.length, 65);
  assert.equal(new Set(data.TRANSIT_PORTS.map((port) => port.id)).size, 65);
  assert.equal(data.VISA_POLICY_META.provinceLevelRegionCount, 24);
  assert.equal(data.VISA_POLICY_META.lastVerifiedAt, "2026-07-18");

  const likely = evaluator.evaluateTransitEligibility(validInput());
  assert.equal(likely.outcome, "likely-240-hour-transit");
  assert.match(likely.warnings.join(" "), /final decision.*immigration inspection officers/i);

  const roundTrip = evaluator.evaluateTransitEligibility(
    validInput({ immediateOnwardRegionId: "JP" }),
  );
  assert.equal(roundTrip.outcome, "not-eligible-from-answers");

  const throughFlight = evaluator.evaluateTransitEligibility(
    validInput({ journeyType: "through-flight" }),
  );
  assert.equal(throughFlight.outcome, "manual-review");

  const unknownUnilateralValidity = evaluator.evaluateTransitEligibility(
    validInput({ nationalityIso2: "FR", passportValidity: "unknown" }),
  );
  assert.equal(unknownUnilateralValidity.outcome, "manual-review");

  const invalidDirectTransitPort = evaluator.evaluateTransitEligibility(
    validInput({ plannedStayHours: 20, entryPortId: "unverified-port" }),
  );
  assert.equal(invalidDirectTransitPort.outcome, "manual-review");

  const invalidZeroHourStay = evaluator.evaluateTransitEligibility(
    validInput({ plannedStayHours: 0 }),
  );
  assert.equal(invalidZeroHourStay.outcome, "manual-review");

  const multipleEntries = evaluator.evaluateTransitEligibility(
    validInput({ multipleMainlandEntries: true }),
  );
  assert.equal(multipleEntries.outcome, "manual-review");
});

test("Phase 3 npm gate strips sensitive analytics fields at runtime", () => {
  const safe = analytics.sanitizeVisaAnalyticsParams({
    result_category: "likely_240_hour_transit",
    step_number: 5,
    interaction_type: "complete",
    policy_version: "2025-11-05",
    nationalityIso2: "US",
    passport_number: "private",
    immediate_origin: "JP",
    immediate_onward: "SG",
    planned_stay_hours: 72,
    user_text: "private itinerary",
  });

  assert.deepEqual(safe, {
    result_category: "likely_240_hour_transit",
    step_number: 5,
    interaction_type: "complete",
    policy_version: "2025-11-05",
  });
});
