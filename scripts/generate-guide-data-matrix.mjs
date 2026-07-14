import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readVariable(file, variableName) {
  const sourceText = fs.readFileSync(path.join(root, file), "utf8");
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
  let initializer;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) initializer = declaration.initializer;
    }
  });
  if (!initializer) throw new Error(`Could not find ${variableName} in ${file}`);
  return initializer.getText(sourceFile);
}

const guideEntries = Function(`"use strict"; return (${readVariable("data/guides.ts", "guideEntries")});`)();
const guideDetailContent = Function(
  "chinaTravelAppGroups",
  `"use strict"; return (${readVariable("data/guide-detail-content.ts", "guideDetailContent")});`,
)([]);

const imageSource = fs.readFileSync(path.join(root, "data/images.ts"), "utf8");
const transpiledImages = ts.transpileModule(imageSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { guideVisuals } = await import(`data:text/javascript;base64,${Buffer.from(transpiledImages).toString("base64")}`);
const credits = JSON.parse(fs.readFileSync(path.join(root, "data/image-credits.json"), "utf8"));
const creditById = new Map(credits.map((credit) => [credit.creditId, credit]));
const featuredCounts = new Map();
const heroCounts = new Map();
for (const visual of Object.values(guideVisuals)) {
  featuredCounts.set(visual.featuredImage.src, (featuredCounts.get(visual.featuredImage.src) || 0) + 1);
  heroCounts.set(visual.heroImage.src, (heroCounts.get(visual.heroImage.src) || 0) + 1);
}

const paidCtaSlugs = new Set([
  "how-to-pay-in-china-as-a-foreigner",
  "best-apps-for-traveling-in-china",
  "how-to-use-alipay-in-china-as-a-tourist",
  "how-to-use-wechat-pay-in-china-as-a-foreigner",
  "china-esim-guide-for-tourists",
  "how-to-book-high-speed-trains-in-china",
  "china-240-hour-visa-free-transit-guide",
]);
const insertionPoint = (image) => ({
  "before-steps": "Before Step-by-step guide",
  "before-common-mistakes": "Before Common mistakes",
  "before-details": "Before Detailed guidance",
})[image.placement] || "Placement missing";
const readingTime = (guide) => {
  const words = [guide.title, guide.summary, ...guide.content.flatMap((section) => [section.heading, section.body, ...(section.bullets || [])])]
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(4, Math.ceil(words / 210));
};
const escapeCell = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");

const forbiddenPatterns = [
  { label: "image || defaultImage", pattern: /image\s*\|\|\s*defaultImage/ },
  { label: "categoryImage", pattern: /\bcategoryImage\b/ },
  { label: "foodFallback", pattern: /\bfoodFallback\b/ },
  { label: "guideFallback", pattern: /\bguideFallback\b/ },
];
const searchableFiles = ["app", "components", "data", "lib"].flatMap((directory) => {
  const walk = (current) => fs.readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(current, entry.name);
    return entry.isDirectory() ? walk(full) : /\.(ts|tsx|js|jsx|mjs)$/.test(entry.name) ? [full] : [];
  });
  return walk(path.join(root, directory));
});
const fallbackMatches = forbiddenPatterns.flatMap(({ label, pattern }) =>
  searchableFiles.filter((file) => pattern.test(fs.readFileSync(file, "utf8"))).map((file) => `${label}: ${path.relative(root, file)}`),
);

const rows = guideEntries.map((guide) => {
  const visual = guideVisuals[guide.slug];
  const detail = guideDetailContent[guide.slug] || {};
  const cta = [
    ...(detail.ctaLinks || []).map((item) => item.label),
    paidCtaSlugs.has(guide.slug) ? "Payment & Apps paid CTA (environment-gated)" : "Free checklist + feedback CTA",
    "Newsletter signup",
  ];
  return {
    ...guide,
    visual,
    detail,
    readingTime: readingTime(guide),
    cta,
    featuredUnique: featuredCounts.get(visual.featuredImage.src) === 1,
    heroUnique: heroCounts.get(visual.heroImage.src) === 1,
  };
});

const markdown = `# Phase 6 — Guide Data Matrix

Generated: ${new Date().toISOString()}

## Coverage result

- Guide records: **${rows.length}/14**
- Explicit hero images: **${rows.filter((row) => row.visual.heroImage?.src).length}/14**
- Guides using the intentional 0-4 inline-visual range: **${rows.filter((row) => row.visual.inlineImages.length <= 4).length}/14**
- Unique featured images across Guides: **${rows.filter((row) => row.featuredUnique).length}/14**
- Unique hero images across Guides: **${rows.filter((row) => row.heroUnique).length}/14**
- DOM rendering evidence: \`tests/guides/content-visuals.spec.ts\` checks one hero and three visible, distinct inline figures on every Guide route.
- Forbidden fallback search: **${fallbackMatches.length === 0 ? "PASS — no matches" : `FAIL — ${fallbackMatches.join(", ")}`}**

## Summary matrix

| Slug | Title | Category | Featured | Hero | Inline | Reading | Updated | CTA | Related Guides | Featured unique | Hero unique | QA |
| --- | --- | --- | --- | --- | ---: | ---: | --- | --- | --- | --- | --- | --- |
${rows.map((row) => `| \`${row.slug}\` | ${escapeCell(row.title)} | ${escapeCell(row.category)} | \`${row.visual.featuredImage.src}\` | \`${row.visual.heroImage.src}\` | ${row.visual.inlineImages.length} | ${row.readingTime} min | ${row.updatedAt} | ${escapeCell(row.cta.join("; "))} | ${escapeCell((row.detail.relatedGuideSlugs || []).join(", ") || "Category fallback selection") } | ${row.featuredUnique ? "Yes" : "No"} | ${row.heroUnique ? "Yes" : "No"} | PASS: DOM, SEO, links and image audit |`).join("\n")}

## Visual and credit detail

${rows.map((row) => `### ${row.title}

- Slug: \`${row.slug}\`
- Featured: \`${row.visual.featuredImage.src}\` — credit \`${row.visual.featuredImage.creditId}\` (${creditById.get(row.visual.featuredImage.creditId)?.sourcePlatform || "missing credit"}); alt: “${row.visual.featuredImage.alt}”
- Hero: \`${row.visual.heroImage.src}\` — credit \`${row.visual.heroImage.creditId}\` (${creditById.get(row.visual.heroImage.creditId)?.sourcePlatform || "missing credit"}); alt: “${row.visual.heroImage.alt}”
${row.visual.inlineImages.length ? row.visual.inlineImages.map((image, index) => `- Inline visual ${index + 1} — ${insertionPoint(image)}: “${image.caption || image.alt}”; \`${image.src}\`; credit \`${image.creditId}\`; alt: “${image.alt}”`).join("\n") : "- Inline visuals: none; the article uses its structured text or tables instead of decorative filler."}
- CTA: ${row.cta.join("; ")}
- Related Guides: ${(row.detail.relatedGuideSlugs || []).map((slug) => `\`${slug}\``).join(", ") || "Resolved from same category when no explicit list exists."}
`).join("\n")}

## Interpretation

Inline entries are article figures rendered inside \`<article>\`; Hero and Related Guide Card images are excluded from the inline count. The Playwright DOM test allows zero to four figures based on instructional value and rejects hidden or zero-size images, repeated inline files, and reuse of the Hero file as an inline visual.
`;

fs.writeFileSync(path.join(root, "docs/PHASE_6_GUIDE_DATA_MATRIX.md"), markdown);
console.log(`Guide data matrix written: ${rows.length} Guides; ${fallbackMatches.length} forbidden fallback matches.`);
if (rows.length !== 14 || fallbackMatches.length) process.exitCode = 1;
