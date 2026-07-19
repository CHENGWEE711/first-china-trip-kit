import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

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

  if (!resolved) {
    throw new Error(`Unable to resolve ${specifier} from ${parentFile}`);
  }

  return resolved;
}

function loadProjectModule(file) {
  if (moduleCache.has(file)) {
    return moduleCache.get(file).exports;
  }

  if (file.endsWith(".json")) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }

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

function assertUnique(values, label) {
  assert.equal(
    new Set(values).size,
    values.length,
    `${label} must not contain duplicates`,
  );
}

function assertHttpsSource(record, label) {
  assert.equal(
    typeof record.officialSourceUrl,
    "string",
    `${label} must have an official source URL`,
  );
  assert.match(
    record.officialSourceUrl,
    /^https:\/\//,
    `${label} official source must use HTTPS`,
  );
}

function validateVisaPolicyData() {
  const version = loadProjectModule(
    path.join(root, "data/visa-policy/version.ts"),
  ).VISA_POLICY_VERSION;
  const data = loadProjectModule(path.join(root, "data/visa/index.ts"));

  assert.deepEqual(version, {
    id: "2026-07-19-v1",
    verifiedAt: "2026-07-19",
    transitCountriesEffectiveFrom: "2025-06-12",
    transitPortsEffectiveFrom: "2025-11-05",
    unilateralListAsOf: "2026-02-17",
  });
  assert.equal(data.VISA_POLICY_META.policyVersion, version.id);
  assert.equal(data.VISA_POLICY_META.lastVerifiedAt, version.verifiedAt);

  assert.equal(data.TRANSIT_ELIGIBLE_COUNTRIES.length, 55);
  assertUnique(data.TRANSIT_ELIGIBLE_COUNTRIES, "Transit country ISO codes");
  assert.equal(data.TRANSIT_ELIGIBLE_COUNTRY_RECORDS.length, 55);
  assertUnique(
    data.TRANSIT_ELIGIBLE_COUNTRY_RECORDS.map((country) => country.iso2),
    "Transit country records",
  );
  const indonesia = data.TRANSIT_ELIGIBLE_COUNTRY_RECORDS.find(
    (country) => country.iso2 === "ID",
  );
  assert.ok(indonesia, "Indonesia must exist in the transit-country dataset");
  assert.equal(indonesia.effectiveFrom, "2025-06-12");

  assert.equal(data.TRANSIT_PORTS.length, 65);
  assertUnique(
    data.TRANSIT_PORTS.map((port) => port.id),
    "Transit port IDs",
  );
  assertUnique(
    data.TRANSIT_PORTS.map((port) => port.officialEnglishName),
    "Transit port official English names",
  );
  const appendixRows = data.TRANSIT_PORTS.map((port) => port.appendixRow).sort(
    (left, right) => left - right,
  );
  assertUnique(appendixRows, "Transit port appendix rows");
  assert.deepEqual(
    appendixRows,
    Array.from({ length: 65 }, (_, index) => index + 1),
    "Transit port appendix rows must be exactly 1 through 65",
  );

  assert.equal(data.PERMITTED_STAY_AREA_GROUPS.length, 24);
  assertUnique(
    data.PERMITTED_STAY_AREA_GROUPS.map((area) => area.id),
    "Permitted stay area IDs",
  );
  const provinceLevelRegions = new Set(
    data.PERMITTED_STAY_AREA_GROUPS.flatMap(
      (area) => area.provinceLevelRegions,
    ),
  );
  assert.equal(
    provinceLevelRegions.size,
    24,
    "Permitted stay data must cover 24 province-level regions",
  );
  assert.equal(data.VISA_POLICY_META.provinceLevelRegionCount, 24);

  const areaIds = new Set(
    data.PERMITTED_STAY_AREA_GROUPS.map((area) => area.id),
  );
  const portIds = new Set(data.TRANSIT_PORTS.map((port) => port.id));
  for (const port of data.TRANSIT_PORTS) {
    assert.ok(
      port.permittedAreaGroupIds.length > 0,
      `${port.id} must reference at least one permitted stay area`,
    );
    for (const areaId of port.permittedAreaGroupIds) {
      assert.ok(areaIds.has(areaId), `${port.id} references missing area ${areaId}`);
    }
  }
  for (const area of data.PERMITTED_STAY_AREA_GROUPS) {
    for (const portId of [...area.entryPortIds, ...area.exitPortIds]) {
      assert.ok(portIds.has(portId), `${area.id} references missing port ${portId}`);
    }
  }

  const newGuangdongPortIds = [
    "guangzhou-pazhou-ferry-terminal",
    "zhongshan-port-passenger",
    "hengqin-port",
    "hong-kong-zhuhai-macao-bridge-port",
    "west-kowloon-station-port",
  ];
  for (const portId of newGuangdongPortIds) {
    const port = data.TRANSIT_PORTS.find((candidate) => candidate.id === portId);
    assert.ok(port, `New Guangdong port ${portId} must exist`);
    assert.equal(port.provinceLevelRegion, "Guangdong");
    assert.equal(port.effectiveFrom, "2025-11-05");
  }
  assert.equal(
    data.TRANSIT_PORTS.filter(
      (port) => port.effectiveFrom === "2025-11-05",
    ).length,
    5,
    "Exactly five Guangdong ports must have the 2025-11-05 effective date",
  );

  assert.equal(data.UNILATERAL_VISA_FREE_COUNTRIES.length, 50);
  assertUnique(
    data.UNILATERAL_VISA_FREE_COUNTRIES.map((country) => country.iso2),
    "Unilateral visa-free country ISO codes",
  );
  const brunei = data.UNILATERAL_VISA_FREE_COUNTRIES.find(
    (country) => country.iso2 === "BN",
  );
  const russia = data.UNILATERAL_VISA_FREE_COUNTRIES.find(
    (country) => country.iso2 === "RU",
  );
  assert.ok(brunei, "Brunei must exist in the unilateral dataset");
  assert.ok(russia, "Russia must exist in the unilateral dataset");
  assert.equal(brunei.validUntil, null);
  assert.equal(russia.validUntil, "2027-12-31");
  const otherUnilateralCountries = data.UNILATERAL_VISA_FREE_COUNTRIES.filter(
    (country) => country.iso2 !== "BN" && country.iso2 !== "RU",
  );
  assert.equal(otherUnilateralCountries.length, 48);
  assert.ok(
    otherUnilateralCountries.every(
      (country) => country.validUntil === "2026-12-31",
    ),
    "The other 48 unilateral countries must expire on 2026-12-31",
  );

  assert.ok(
    Array.isArray(data.VISA_OFFICIAL_SOURCES) &&
      data.VISA_OFFICIAL_SOURCES.length > 0,
    "Official policy sources must exist",
  );
  assertUnique(
    data.VISA_OFFICIAL_SOURCES.map((source) => source.id),
    "Official source IDs",
  );
  for (const source of data.VISA_OFFICIAL_SOURCES) {
    assert.match(source.url, /^https:\/\//, `${source.id} must use HTTPS`);
    assert.equal(source.lastVerifiedAt, version.verifiedAt);
  }
  for (const [datasetName, records] of [
    ["transit country", data.TRANSIT_ELIGIBLE_COUNTRY_RECORDS],
    ["transit port", data.TRANSIT_PORTS],
    ["permitted stay area", data.PERMITTED_STAY_AREA_GROUPS],
    ["unilateral country", data.UNILATERAL_VISA_FREE_COUNTRIES],
  ]) {
    for (const record of records) {
      assertHttpsSource(record, `${datasetName} ${record.id ?? record.iso2}`);
      assert.equal(record.lastVerifiedAt, version.verifiedAt);
    }
  }
}

try {
  validateVisaPolicyData();
  console.log(
    "Visa policy data validation passed: version 2026-07-19-v1, 55 transit countries, 65 ports, 24 permitted regions, and 50 unilateral countries.",
  );
} catch (error) {
  console.error("Visa policy data validation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
