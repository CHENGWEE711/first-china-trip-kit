import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageSource = fs.readFileSync(path.join(root, "data/images.ts"), "utf8");
const transpiledImages = ts.transpileModule(imageSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { guideVisuals, destinationVisuals, itineraryVisuals, cityImages, editorialImages } = await import(
  `data:text/javascript;base64,${Buffer.from(transpiledImages).toString("base64")}`
);
const credits = JSON.parse(fs.readFileSync(path.join(root, "data/image-credits.json"), "utf8"));
const errors = [];
const warnings = [];
const checks = [];

const expected = { guides: 14, destinations: 8, itineraries: 7 };
const recordCheck = (label, ok, detail) => {
  checks.push({ label, ok, detail });
  if (!ok) errors.push(`${label}: ${detail}`);
};

recordCheck("Guide visual records", Object.keys(guideVisuals).length === expected.guides, `${Object.keys(guideVisuals).length}/${expected.guides}`);
recordCheck("Destination visual records", Object.keys(destinationVisuals).length === expected.destinations, `${Object.keys(destinationVisuals).length}/${expected.destinations}`);
recordCheck("Itinerary visual records", Object.keys(itineraryVisuals).length === expected.itineraries, `${Object.keys(itineraryVisuals).length}/${expected.itineraries}`);

const featuredPaths = new Map();
for (const [slug, visual] of Object.entries(guideVisuals)) {
  recordCheck(`${slug} featuredImage`, Boolean(visual.featuredImage?.src), visual.featuredImage?.src || "missing");
  recordCheck(`${slug} heroImage`, Boolean(visual.heroImage?.src), visual.heroImage?.src || "missing");
  recordCheck(`${slug} inlineImages`, (visual.inlineImages?.length || 0) <= 4, `${visual.inlineImages?.length || 0} configured (0-4 allowed)`);
  recordCheck(
    `${slug} inline placement`,
    visual.inlineImages.every((item) => ["before-steps", "before-common-mistakes", "before-details"].includes(item.placement)),
    visual.inlineImages.map((item) => item.placement).join(", ") || "no inline images",
  );
  const inlinePaths = visual.inlineImages.map((item) => item.src);
  recordCheck(`${slug} distinct inline files`, new Set(inlinePaths).size === inlinePaths.length, `${new Set(inlinePaths).size}/${inlinePaths.length} distinct`);
  recordCheck(`${slug} inline excludes hero`, !inlinePaths.includes(visual.heroImage.src), visual.heroImage.src);
  const existing = featuredPaths.get(visual.featuredImage.src);
  if (existing) errors.push(`Duplicate guide featuredImage: ${existing} and ${slug} use ${visual.featuredImage.src}`);
  featuredPaths.set(visual.featuredImage.src, slug);
}

const collectImages = (value, output = []) => {
  if (!value) return output;
  if (Array.isArray(value)) value.forEach((item) => collectImages(item, output));
  else if (typeof value === "object" && "src" in value && "creditId" in value) output.push(value);
  else if (typeof value === "object") Object.values(value).forEach((item) => collectImages(item, output));
  return output;
};
const allImages = collectImages({ guideVisuals, destinationVisuals, itineraryVisuals, cityImages, editorialImages });
const uniqueImages = [...new Map(allImages.map((item) => [item.src, item])).values()];
const creditById = new Map(credits.map((credit) => [credit.creditId, credit]));
const referencedFiles = new Set();

for (const item of uniqueImages) {
  const localPath = path.join(root, "public", item.src.replace(/^\//, ""));
  referencedFiles.add(path.normalize(localPath));
  if (!item.alt?.trim()) errors.push(`Empty alt: ${item.src}`);
  if (!item.creditId?.trim()) errors.push(`Missing creditId: ${item.src}`);
  if (!fs.existsSync(localPath)) errors.push(`Missing image file: ${item.src}`);
  else if (fs.statSync(localPath).size > 700 * 1024) errors.push(`Image exceeds 700 KB: ${item.src} (${Math.round(fs.statSync(localPath).size / 1024)} KB)`);
  const credit = creditById.get(item.creditId);
  if (!credit) errors.push(`Missing credit record ${item.creditId} for ${item.src}`);
  else {
    const required = ["localFile", "sourcePlatform", "sourcePage", "photographer", "downloadDate", "usage", "licenseChecked"];
    for (const field of required) if (!credit[field]) errors.push(`Incomplete credit ${item.creditId}: ${field}`);
    if (credit.localFile !== item.src) errors.push(`Credit path mismatch ${item.creditId}: ${credit.localFile} != ${item.src}`);
  }
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});
const imageRoot = path.join(root, "public/images");
for (const file of walk(imageRoot)) {
  if (/\.(webp|avif|png|jpe?g)$/i.test(file) && !referencedFiles.has(path.normalize(file))) {
    warnings.push(`Unused image: /${path.relative(path.join(root, "public"), file)}`);
  }
}

const markdown = `# Image Usage Audit

Generated: ${new Date().toISOString()}

## Result

${errors.length === 0 ? "**PASS**" : "**FAIL**"} — ${errors.length} errors, ${warnings.length} warnings.

## Coverage

| Check | Result | Detail |
| --- | --- | --- |
${checks.map((check) => `| ${check.label.replaceAll("|", "\\|")} | ${check.ok ? "PASS" : "FAIL"} | ${String(check.detail).replaceAll("|", "\\|")} |`).join("\n")}

## Featured image uniqueness

${[...featuredPaths].map(([src, slug]) => `- \`${slug}\` → \`${src}\``).join("\n")}

## DOM rendering verification

File and data checks are complemented by \`tests/guides/content-visuals.spec.ts\`. That browser test verifies every Guide route renders one visible Hero and zero to four visible, distinct, intentionally placed inline figures inside \`<article>\`; Related Guide Card images are not counted.

## Errors

${errors.length ? errors.map((item) => `- ${item}`).join("\n") : "- None."}

## Warnings

${warnings.length ? warnings.map((item) => `- ${item}`).join("\n") : "- None."}
`;

fs.writeFileSync(path.join(root, "docs/IMAGE_USAGE_AUDIT.md"), markdown);
console.log(errors.length === 0 ? `PASS: ${uniqueImages.length} unique local images audited; ${warnings.length} warnings.` : `FAIL: ${errors.length} errors; ${warnings.length} warnings.`);
if (errors.length) process.exitCode = 1;
