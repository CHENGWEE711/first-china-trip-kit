#!/usr/bin/env node

export const DEFAULT_CAMPAIGN = "china_first_trip_launch";

export function normalizeUtmValue(value, fieldName) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  if (!normalized) {
    throw new Error(`${fieldName} must not be empty.`);
  }

  return normalized;
}

export function buildUtmUrl({ url, source, medium, campaign, content }) {
  if (!url) throw new Error("url must not be empty.");

  let destination;
  try {
    destination = new URL(url);
  } catch {
    throw new Error("url must be a valid absolute URL.");
  }

  if (!/^https?:$/.test(destination.protocol)) {
    throw new Error("url must use http or https.");
  }

  const values = {
    utm_source: normalizeUtmValue(source, "source"),
    utm_medium: normalizeUtmValue(medium, "medium"),
    utm_campaign: normalizeUtmValue(campaign, "campaign"),
    utm_content: normalizeUtmValue(content, "content"),
  };

  for (const [key, value] of Object.entries(values)) {
    destination.searchParams.set(key, value);
  }

  return destination.toString();
}

function parseArgs(args) {
  const values = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(
        "Usage: node scripts/build-utm-url.mjs --url <url> --source <source> --medium <medium> --campaign <campaign> --content <content>",
      );
    }
    values[key.slice(2)] = value;
  }
  return values;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const args = parseArgs(process.argv.slice(2));
    process.stdout.write(`${buildUtmUrl(args)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
