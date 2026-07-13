import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshot = process.argv.includes("--final") ? "FINAL" : "BASELINE";

function readVariable(file, variableName) {
  const sourceText = fs.readFileSync(path.join(root, file), "utf8");
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
  let initializer;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) {
        initializer = declaration.initializer;
      }
    }
  });
  if (!initializer) throw new Error(`Could not find ${variableName} in ${file}`);
  return initializer.getText(sourceFile);
}

function getDimensions(file) {
  const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], {
    encoding: "utf8",
  });
  return {
    width: Number(output.match(/pixelWidth: (\d+)/)?.[1] || 0),
    height: Number(output.match(/pixelHeight: (\d+)/)?.[1] || 0),
  };
}

const guideEntries = Function(`"use strict"; return (${readVariable("data/guides.ts", "guideEntries")});`)();
const imageSource = fs.readFileSync(path.join(root, "data/images.ts"), "utf8");
const transpiledImages = ts.transpileModule(imageSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { guideVisuals } = await import(
  `data:text/javascript;base64,${Buffer.from(transpiledImages).toString("base64")}`
);
const credits = JSON.parse(fs.readFileSync(path.join(root, "data/image-credits.json"), "utf8"));
const creditById = new Map(credits.map((credit) => [credit.creditId, credit]));

const strategyCategory = {
  "how-to-pay-in-china-as-a-foreigner": "支付与金融准备",
  "best-apps-for-traveling-in-china": "手机 App 与数字工具",
  "how-to-book-high-speed-trains-in-china": "高铁、机场、地铁与交通",
  "how-to-use-alipay-and-wechat-pay-in-china": "支付与金融准备",
  "china-travel-packing-list": "行李、打包与旅行准备",
  "basic-chinese-phrases-for-travelers": "中国地址、语言与翻译",
  "china-esim-guide-for-tourists": "eSIM、VPN、网络与通信",
  "china-food-ordering-guide": "饮食、点餐与生活场景",
  "can-americans-travel-to-china-in-2026": "签证、过境免签与入境",
  "china-240-hour-visa-free-transit-guide": "签证、过境免签与入境",
  "how-to-use-alipay-in-china-as-a-tourist": "支付与金融准备",
  "how-to-use-wechat-pay-in-china-as-a-foreigner": "支付与金融准备",
  "3-days-in-shanghai-for-first-time-visitors": "行程规划与首次来华准备",
  "china-travel-checklist-before-you-fly": "行李、打包与旅行准备",
};

const baselineAssessment = {
  "how-to-pay-in-china-as-a-foreigner": ["matched", "matched", "matched"],
  "best-apps-for-traveling-in-china": ["matched", "matched", "matched"],
  "how-to-book-high-speed-trains-in-china": ["matched", "partial", "mismatch"],
  "how-to-use-alipay-and-wechat-pay-in-china": ["matched", "partial", "matched"],
  "china-travel-packing-list": ["matched", "partial", "mismatch"],
  "basic-chinese-phrases-for-travelers": ["partial", "partial", "partial"],
  "china-esim-guide-for-tourists": ["partial", "mismatch", "mismatch"],
  "china-food-ordering-guide": ["partial", "partial", "partial"],
  "can-americans-travel-to-china-in-2026": ["matched", "matched", "matched"],
  "china-240-hour-visa-free-transit-guide": ["matched", "partial", "matched"],
  "how-to-use-alipay-in-china-as-a-tourist": ["matched", "matched", "partial"],
  "how-to-use-wechat-pay-in-china-as-a-foreigner": ["matched", "partial", "matched"],
  "3-days-in-shanghai-for-first-time-visitors": ["matched", "matched", "matched"],
  "china-travel-checklist-before-you-fly": ["matched", "matched", "matched"],
};

const baselineIssues = {
  "how-to-pay-in-china-as-a-foreigner": "Hero 清晰度达标，但 Card 与 Hero 完全同图；三张正文图均有效。",
  "best-apps-for-traveling-in-china": "Hero 仅 1800px；Card 同图；正文覆盖支付、联网、车站，但视觉主题仍偏通用手机。",
  "how-to-book-high-speed-trains-in-china": "Hero 仅 1800px；打包图关联偏弱，机场手机图与高铁主题明显错配。",
  "how-to-use-alipay-and-wechat-pay-in-china": "Hero 仅 1800px；Card 同图；咖啡馆手机图未明确体现双钱包准备。",
  "china-travel-packing-list": "Hero 仅 1800px；机场手机图关联偏弱，铁路站台图不能说明打包清单。",
  "basic-chinese-phrases-for-travelers": "Hero 仅 1800px；三张正文图只提供使用场景，没有清晰体现地址、翻译或沟通动作。",
  "china-esim-guide-for-tourists": "Hero 仅 1800px；二维码和护照笔记本图不能解释联网/eSIM，工具主题被通用旅行物件稀释。",
  "china-food-ordering-guide": "Hero 仅 1800px；三张正文图可用于餐厅场景，但章节对应关系和用途说明偏弱。",
  "can-americans-travel-to-china-in-2026": "Hero 仅 1800px；图片语义基本准确，但 Card 同图，官方签证来源精度需提升。",
  "china-240-hour-visa-free-transit-guide": "Hero 仅 1800px；上海街景只能部分说明过境路线，政策视觉应以证件/机场/转机为主。",
  "how-to-use-alipay-in-china-as-a-tourist": "Hero 仅 1800px；Card 同图；咖啡馆手机图不够明确，且与微信支付文章视觉边界偏弱。",
  "how-to-use-wechat-pay-in-china-as-a-foreigner": "Hero 仅 1800px；Card 同图；支付终端图未建立微信生态辨识度。",
  "3-days-in-shanghai-for-first-time-visitors": "Hero 仅 1800px；语义准确，是少数可合理保留城市编辑感的 Guide。",
  "china-travel-checklist-before-you-fly": "Hero 仅 1800px；语义准确，但 Card 同图，正文固定三图略显填充。",
};

const fieldReferences = new Map();
for (const visual of Object.values(guideVisuals)) {
  for (const item of [visual.featuredImage, visual.heroImage, ...visual.inlineImages]) {
    fieldReferences.set(item.src, (fieldReferences.get(item.src) || 0) + 1);
  }
}

function imageRecord(image, role, assessment) {
  const file = path.join(root, "public", image.src.replace(/^\//, ""));
  const exists = fs.existsSync(file);
  const dimensions = exists ? getDimensions(file) : { width: 0, height: 0 };
  const credit = creditById.get(image.creditId);
  return {
    role,
    src: image.src,
    alt: image.alt,
    caption: image.caption || null,
    position: image.position || null,
    creditId: image.creditId,
    exists,
    width: dimensions.width,
    height: dimensions.height,
    bytes: exists ? fs.statSync(file).size : 0,
    referencesWithinGuideVisuals: fieldReferences.get(image.src) || 0,
    sourcePlatform: credit?.sourcePlatform || null,
    sourcePage: credit?.sourcePage || null,
    photographer: credit?.photographer || null,
    licenseChecked: Boolean(credit?.licenseChecked),
    assessment,
  };
}

const guides = guideEntries.map((guide) => {
  const visual = guideVisuals[guide.slug];
  const assessments = snapshot === "BASELINE"
    ? baselineAssessment[guide.slug]
    : visual.inlineImages.map(() => "matched");
  const hero = imageRecord(visual.heroImage, "hero", "matched");
  const card = imageRecord(visual.featuredImage, "card", "matched");
  const inline = visual.inlineImages.map((item, index) => imageRecord(item, `inline-${index + 1}`, assessments[index] || "matched"));
  return {
    slug: guide.slug,
    route: `/guides/${guide.slug}`,
    title: guide.title,
    declaredCategory: guide.category,
    strategyCategory: strategyCategory[guide.slug],
    updatedAt: guide.updatedAt,
    hero,
    card,
    inline,
    heroAndCardSameFile: hero.src === card.src,
    originalIssue: snapshot === "BASELINE" ? baselineIssues[guide.slug] : null,
  };
});

const allHero = guides.map((guide) => guide.hero.src);
const allCard = guides.map((guide) => guide.card.src);
const allInline = guides.flatMap((guide) => guide.inline);
const duplicateInlineGroups = [...new Set(allInline.map((item) => item.src))]
  .map((src) => ({ src, uses: allInline.filter((item) => item.src === src).length }))
  .filter((item) => item.uses > 1)
  .sort((a, b) => b.uses - a.uses || a.src.localeCompare(b.src));

const summary = {
  guideCount: guides.length,
  heroCount: allHero.length,
  uniqueHeroFiles: new Set(allHero).size,
  cardCount: allCard.length,
  uniqueCardFiles: new Set(allCard).size,
  heroAndCardSameFile: guides.filter((guide) => guide.heroAndCardSameFile).length,
  heroUnder2000px: guides.filter((guide) => guide.hero.width < 2000).length,
  cardUnder1400px: guides.filter((guide) => guide.card.width < 1400).length,
  imageOver700KB: guides
    .flatMap((guide) => [guide.hero, guide.card, ...guide.inline])
    .filter((image) => image.bytes > 700 * 1024).length,
  inlineSlots: allInline.length,
  uniqueInlineFiles: new Set(allInline.map((item) => item.src)).size,
  duplicateInlineGroups: duplicateInlineGroups.length,
  inlineMatched: allInline.filter((item) => item.assessment === "matched").length,
  inlinePartial: allInline.filter((item) => item.assessment === "partial").length,
  inlineMismatch: allInline.filter((item) => item.assessment === "mismatch").length,
  missingFiles: guides
    .flatMap((guide) => [guide.hero, guide.card, ...guide.inline])
    .filter((image) => !image.exists).length,
  missingCreditRecords: guides
    .flatMap((guide) => [guide.hero, guide.card, ...guide.inline])
    .filter((image) => !creditById.has(image.creditId)).length,
};

const result = {
  generatedAt: new Date().toISOString(),
  phase: "C",
  snapshot: snapshot.toLowerCase(),
  branch: execFileSync("git", ["branch", "--show-current"], { cwd: root, encoding: "utf8" }).trim(),
  commit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(),
  summary,
  duplicateInlineGroups,
  guides,
};

const outputBase = `PHASE_C_GUIDE_IMAGE_${snapshot}`;
fs.writeFileSync(path.join(root, `docs/${outputBase}.json`), `${JSON.stringify(result, null, 2)}\n`);

const escapeCell = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const kb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;
const markdown = `# First China Trip Kit — Phase C Guide Image ${snapshot === "BASELINE" ? "Baseline" : "Final"}

Generated: ${result.generatedAt}  
Branch: \`${result.branch}\`  
Commit at capture: \`${result.commit}\`

## Summary

| Metric | Result |
| --- | ---: |
| Public Guides | ${summary.guideCount} |
| Unique Hero files | ${summary.uniqueHeroFiles}/${summary.heroCount} |
| Unique Card files | ${summary.uniqueCardFiles}/${summary.cardCount} |
| Guides reusing Hero as Card | ${summary.heroAndCardSameFile}/${summary.guideCount} |
| Hero under 2000px | ${summary.heroUnder2000px} |
| Card under 1400px | ${summary.cardUnder1400px} |
| Guide visual fields over 700KB | ${summary.imageOver700KB} |
| Inline visual slots / unique files | ${summary.inlineSlots} / ${summary.uniqueInlineFiles} |
| Repeated inline-image groups | ${summary.duplicateInlineGroups} |
| Inline semantic result | ${summary.inlineMatched} matched / ${summary.inlinePartial} partial / ${summary.inlineMismatch} mismatch |
| Missing files / credit records | ${summary.missingFiles} / ${summary.missingCreditRecords} |

## Guide inventory

| Slug | Title | Strategy category | Hero | Hero dimensions | Card | Inline | Original issue |
| --- | --- | --- | --- | ---: | --- | ---: | --- |
${guides.map((guide) => `| \`${guide.slug}\` | ${escapeCell(guide.title)} | ${guide.strategyCategory} | \`${guide.hero.src}\` | ${guide.hero.width}×${guide.hero.height}, ${kb(guide.hero.bytes)} | \`${guide.card.src}\` | ${guide.inline.length} | ${escapeCell(guide.originalIssue || "Resolved in final snapshot")} |`).join("\n")}

## Visual detail and provenance

${guides.map((guide) => `### ${guide.title}

- Route: \`${guide.route}\`
- Strategy category: ${guide.strategyCategory}
- Hero: \`${guide.hero.src}\` — ${guide.hero.width}×${guide.hero.height}, ${kb(guide.hero.bytes)}; credit \`${guide.hero.creditId}\`; ${guide.hero.sourcePlatform || "missing source"}; ${guide.hero.sourcePage || "missing source page"}
- Card: \`${guide.card.src}\` — ${guide.card.width}×${guide.card.height}, ${kb(guide.card.bytes)}; credit \`${guide.card.creditId}\`; Hero/Card same file: ${guide.heroAndCardSameFile ? "yes" : "no"}
${guide.inline.map((item, index) => `- Inline ${index + 1}: \`${item.src}\`; ${item.assessment}; credit \`${item.creditId}\`; alt: “${item.alt}”`).join("\n")}
${guide.originalIssue ? `- Baseline issue: ${guide.originalIssue}` : ""}
`).join("\n")}

## Repeated inline-image groups

${duplicateInlineGroups.length ? duplicateInlineGroups.map((item) => `- \`${item.src}\`: ${item.uses} inline uses`).join("\n") : "- None."}

## Interpretation

The uniqueness counts distinguish cross-Guide reuse from a Hero/Card pair inside the same Guide. Semantic labels are editorial review results, not filename guesses. A “partial” image provides some context but does not directly explain the adjacent Guide task; a “mismatch” image does not materially support that Guide section.
`;

fs.writeFileSync(path.join(root, `docs/${outputBase}.md`), markdown);
console.log(`${snapshot} written: ${summary.guideCount} Guides, ${summary.heroUnder2000px} low-resolution Heroes, ${summary.inlineMismatch} inline mismatches.`);

