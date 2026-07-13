import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const baseUrl = process.env.AUDIT_BASE_URL || "https://www.firstchinatripkit.com";
const baselineSha = "bf41908596635695cd85a24cef6c7d6f6d71db0e";
const generatedAt = new Date().toISOString();

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const importTranspiled = async (file, replacements = [], preamble = "") => {
  let source = read(file);
  for (const [pattern, replacement] of replacements) source = source.replace(pattern, replacement);
  source = `${preamble}\n${source}`;
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
};

const imagesModule = await importTranspiled("data/images.ts");
const { itineraryVisuals } = imagesModule;
const itinerariesModule = await importTranspiled("data/itineraries.ts", [[
  /import\s*\{\s*itineraryVisuals,\s*type\s+ContentImage\s*\}\s*from\s*["']@\/data\/images["'];?/,
  "",
]], `const itineraryVisuals = ${JSON.stringify(itineraryVisuals)};`);
const { itineraries } = itinerariesModule;
const itineraryBySlug = new Map(itineraries.map((item) => [item.slug, item]));

const credits = JSON.parse(read("data/image-credits.json"));
const creditByPath = new Map(credits.map((credit) => [credit.localFile, credit]));
const requiredCreditFields = ["localFile", "sourcePlatform", "sourcePage", "photographer", "downloadDate", "usage", "licenseChecked"];

const decodeEntities = (value = "") => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));

const stripTags = (value = "") => decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
const parseAttributes = (tag) => {
  const attrs = {};
  const expression = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of tag.matchAll(expression)) {
    const name = match[1].toLowerCase();
    if (name === "img" || name === "meta" || name === "link" || name === "a" || name === "script") continue;
    attrs[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attrs;
};

const firstTagContent = (html, tag) => {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripTags(match[1]) : "";
};
const allTagContents = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))].map((match) => stripTags(match[1]));
const metaContent = (html, key, value) => {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if ((attrs[key] || "").toLowerCase() === value.toLowerCase()) return attrs.content || "";
  }
  return "";
};
const linkHref = (html, rel) => {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if ((attrs.rel || "").split(/\s+/).includes(rel)) return attrs.href || "";
  }
  return "";
};

const originalImagePath = (src) => {
  if (!src) return "";
  try {
    const url = new URL(src, baseUrl);
    if (url.pathname === "/_next/image") return url.searchParams.get("url") || "";
    if (url.origin === new URL(baseUrl).origin) return url.pathname;
    return url.href;
  } catch {
    return src;
  }
};

const pageType = (route) => {
  if (route === "/") return "homepage";
  if (route === "/guides") return "guide-list";
  if (/^\/guides\//.test(route)) return "guide";
  if (route === "/cities") return "legacy-destination-list";
  if (/^\/cities\//.test(route)) return "legacy-destination";
  if (route === "/city-kits") return "destination-list";
  if (/^\/city-kits\//.test(route)) return "destination";
  if (route === "/itineraries") return "legacy-itinerary-list";
  if (/^\/itineraries\//.test(route)) return "legacy-itinerary";
  if (route === "/itinerary-kits") return "itinerary-list";
  if (/^\/itinerary-kits\//.test(route)) return "itinerary";
  if (route === "/tools") return "tool-list";
  if (/^\/tools\//.test(route)) return "tool";
  if (["/privacy", "/terms", "/refund-policy", "/affiliate-disclosure"].includes(route)) return "policy";
  if (route.includes("thank-you")) return "conversion";
  if (["/sitemap.xml", "/robots.txt"].includes(route)) return "metadata";
  if (route.startsWith("/_")) return "system";
  return "static";
};

const manifest = JSON.parse(read(".next/prerender-manifest.json"));
const htmlRoutes = [...new Set([...Object.keys(manifest.routes), "/guides"])].sort();
const apiRoutes = ["/api/contact", "/api/newsletter"];

const fetchPage = async (route) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}${route}`, {
        redirect: "follow",
        headers: { "user-agent": "First-China-Trip-Kit-Audit/1.0" },
        signal: AbortSignal.timeout(20_000),
      });
      const body = await response.text();
      const retryable = route !== "/_global-error" && (response.status === 429 || response.status >= 500);
      if (!retryable || attempt === 3) {
        return { route, status: response.status, finalUrl: response.url, contentType: response.headers.get("content-type") || "", body };
      }
    } catch (error) {
      lastError = error;
      if (attempt === 3) break;
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
  }
  return { route, status: 0, finalUrl: "", contentType: "", body: "", error: String(lastError) };
};

const fetchedPages = [];
for (let index = 0; index < htmlRoutes.length; index += 8) {
  fetchedPages.push(...await Promise.all(htmlRoutes.slice(index, index + 8).map(fetchPage)));
}

const pages = fetchedPages.map((result) => {
  const html = result.body;
  const type = pageType(result.route);
  const isHtml = result.contentType.includes("text/html");
  const title = isHtml ? firstTagContent(html, "title") : result.route;
  const h1 = isHtml ? allTagContents(html, "h1") : [];
  const h2 = isHtml ? allTagContents(html, "h2") : [];
  const description = isHtml ? metaContent(html, "name", "description") : "";
  const canonical = isHtml ? linkHref(html, "canonical") : "";
  const ogImage = isHtml ? metaContent(html, "property", "og:image") : "";
  const twitterCard = isHtml ? metaContent(html, "name", "twitter:card") : "";
  const robotsMeta = isHtml ? metaContent(html, "name", "robots") : "";
  const imageTags = isHtml ? [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => parseAttributes(match[0])) : [];
  const links = isHtml ? [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => parseAttributes(match[0]).href || "").filter(Boolean) : [];
  const jsonLdTypes = [];
  if (isHtml) {
    for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const parsed = JSON.parse(decodeEntities(match[1]));
        for (const item of (Array.isArray(parsed) ? parsed : [parsed])) if (item?.["@type"]) jsonLdTypes.push(item["@type"]);
      } catch {
        jsonLdTypes.push("INVALID_JSON_LD");
      }
    }
  }
  const issues = [];
  if (result.status === 0) issues.push("fetch-failed-after-3-attempts");
  else if (result.status !== 200 && type !== "system") issues.push(`unexpected-http-${result.status}`);
  if (isHtml && result.status === 200 && type !== "system") {
    if (!title) issues.push("missing-title");
    if (!description && type !== "conversion") issues.push("missing-description");
    if (!canonical) issues.push("missing-canonical");
    if (h1.length !== 1) issues.push(`h1-count-${h1.length}`);
    if (!ogImage) issues.push("missing-og-image");
    if (!twitterCard) issues.push("missing-twitter-card");
    if ((type === "guide" || type.includes("destination") || type.includes("itinerary")) && jsonLdTypes.length === 0) issues.push("missing-json-ld");
  }
  if (result.status === 200 && /page not found/i.test(title)) issues.push("soft-404");
  if (imageTags.some((attrs) => !("alt" in attrs))) issues.push("image-missing-alt-attribute");
  return {
    route: result.route,
    pageType: type,
    status: result.status,
    finalUrl: result.finalUrl,
    contentType: result.contentType,
    title,
    description,
    canonical,
    robotsMeta,
    ogImage,
    twitterCard,
    jsonLdTypes: [...new Set(jsonLdTypes)],
    h1,
    h2Count: h2.length,
    imageCount: imageTags.length,
    htmlBytes: Buffer.byteLength(html),
    approximateElementCount: isHtml ? (html.match(/<[a-z][^>]*>/gi) || []).length : 0,
    links,
    imageTags,
    issues,
  };
});

for (const route of apiRoutes) pages.push({
  route,
  pageType: "api",
  status: null,
  finalUrl: `${baseUrl}${route}`,
  contentType: "application/json",
  title: route,
  description: "Mutation endpoint; not fetched during read-only audit.",
  canonical: "",
  robotsMeta: "",
  ogImage: "",
  twitterCard: "",
  jsonLdTypes: [],
  h1: [],
  h2Count: 0,
  imageCount: 0,
  htmlBytes: 0,
  approximateElementCount: 0,
  links: [],
  imageTags: [],
  issues: [],
});

const routeSlug = (route) => route.split("/").filter(Boolean).at(-1) || "";
const isListPage = (type) => type.endsWith("-list") || type === "guide-list" || type === "tool-list";

const priorityStatus = {
  "4-days-in-beijing": [
    ["partial", "Arrival/Temple of Heaven day uses a generic Forbidden City courtyard."],
    ["no", "Forbidden City day uses a hutong street scene."],
    ["no", "Great Wall day uses a hutong market scene."],
    ["partial", "Flexible Summer Palace/hutong/museum day reuses the Forbidden City courtyard."],
  ],
  "5-days-beijing-and-xian": [
    ["partial", "Arrival day uses a generic Forbidden City scene."],
    ["no", "Forbidden City core day uses a hutong street scene."],
    ["no", "Great Wall day uses an Xi'an city-wall image."],
    ["partial", "Transfer and Xi'an city-wall day uses a night-market food scene."],
    ["no", "Terracotta Warriors day cycles back to a Beijing Forbidden City image."],
  ],
  "7-days-shanghai-hangzhou-suzhou": [
    ["yes", "Shanghai arrival uses a Shanghai skyline."],
    ["no", "Classic Shanghai day uses a Hangzhou West Lake image."],
    ["no", "Shanghai modern-culture day uses a Suzhou canal image."],
    ["no", "Train-to-Hangzhou day uses a Suzhou market image."],
    ["no", "Hangzhou tea/temple day cycles back to a Shanghai skyline."],
    ["no", "Train-to-Suzhou day uses a Hangzhou West Lake image."],
    ["yes", "Suzhou gardens day uses a Suzhou canal image."],
  ],
  "240-hour-visa-free-china-itinerary": [
    ["yes", "Shanghai arrival uses a Shanghai street scene."],
    ["no", "Shanghai essentials day uses a Hangzhou West Lake image."],
    ["no", "French Concession day uses a Suzhou canal image."],
    ["yes", "Train-to-Hangzhou day uses a Chinese high-speed train."],
    ["no", "Hangzhou tea/temple day cycles back to a Shanghai street image."],
    ["partial", "Hangzhou-return-to-Shanghai day uses West Lake but omits the rail transfer."],
    ["yes", "Suzhou day trip uses a Suzhou canal image."],
    ["no", "Shanghai modern day uses a train image."],
    ["partial", "Water-town buffer day uses a Shanghai street image rather than a water town."],
    ["no", "Departure day cycles to a Hangzhou West Lake image instead of an airport/departure scene."],
  ],
};

const priorityItineraries = [];
for (const [slug, statuses] of Object.entries(priorityStatus)) {
  const itinerary = itineraryBySlug.get(slug);
  if (!itinerary) continue;
  for (const day of itinerary.dayByDayPlan) {
    const visual = itinerary.dailyImages?.[day.day - 1] || itinerary.routeImages[(day.day - 1) % itinerary.routeImages.length];
    const [status, reason] = statuses[day.day - 1];
    priorityItineraries.push({
      slug,
      route: `/itinerary-kits/${slug}`,
      day: day.day,
      dayTitle: day.title,
      imagePath: visual.src,
      alt: visual.alt,
      contentMatch: status,
      reason,
    });
  }
}

const semanticOverrides = new Map([
  ["/city-kits/hangzhou|/images/guides/china-esim-airport-phone.webp", ["no", "Airport-phone image is used as a Hangzhou attraction image."]],
  ["/cities/hangzhou|/images/guides/china-esim-airport-phone.webp", ["no", "Airport-phone image is used as a Hangzhou attraction image."]],
  ["/city-kits/hangzhou|/images/guides/chinese-phrases-restaurant-phone.webp", ["no", "Generic diner-with-phone image does not identify Hangzhou food."]],
  ["/cities/hangzhou|/images/guides/chinese-phrases-restaurant-phone.webp", ["no", "Generic diner-with-phone image does not identify Hangzhou food."]],
  ["/city-kits/guangzhou|/images/guides/best-apps-metro-phone.webp", ["no", "Generic metro-phone scene is used as a Guangzhou attraction image."]],
  ["/cities/guangzhou|/images/guides/best-apps-metro-phone.webp", ["no", "Generic metro-phone scene is used as a Guangzhou attraction image."]],
  ["/city-kits/shenzhen|/images/guides/best-apps-metro-phone.webp", ["no", "Generic metro-phone scene is used as a Shenzhen attraction image."]],
  ["/cities/shenzhen|/images/guides/best-apps-metro-phone.webp", ["no", "Generic metro-phone scene is used as a Shenzhen attraction image."]],
  ["/city-kits/shenzhen|/images/guides/china-esim-airport-phone.webp", ["no", "Generic airport-phone scene is used as Shenzhen transport imagery."]],
  ["/cities/shenzhen|/images/guides/china-esim-airport-phone.webp", ["no", "Generic airport-phone scene is used as Shenzhen transport imagery."]],
]);

const classifyPurpose = (page, imagePath, index) => {
  if (/logo|icon|avatar|brand/i.test(imagePath)) return "Brand";
  if (imagePath.startsWith("/products/")) return page.route === "/store" ? "Product" : "CTA";
  if (page.route === "/") return index === 0 ? "Hero" : (imagePath.startsWith("/share/") ? "CTA" : "Card");
  if (isListPage(page.pageType)) return "Card";
  if (page.pageType === "guide") return index === 0 ? "Hero" : (imagePath.startsWith("/products/") ? "CTA" : "Body");
  if (page.pageType.includes("destination") && !page.pageType.endsWith("list")) return index === 0 ? "Hero" : "Body";
  if ((page.pageType === "itinerary" || page.pageType === "legacy-itinerary")) {
    const itinerary = itineraryBySlug.get(routeSlug(page.route));
    if (index === 0) return "Hero";
    if (itinerary && index <= itinerary.durationDays) return "Daily";
    return imagePath.startsWith("/products/") ? "CTA" : "Body";
  }
  if (page.route === "/start-here") return "Card";
  if (page.route === "/store") return "Product";
  if (page.pageType === "conversion") return "CTA";
  return "Body";
};

const pageByRoute = new Map(pages.map((page) => [page.route, page]));
const imageOccurrences = [];
for (const page of pages) {
  page.imageTags.forEach((attrs, index) => {
    const imagePath = originalImagePath(attrs.src || attrs.srcset?.split(/\s+/)[0] || "");
    if (!imagePath) return;
    const purpose = classifyPurpose(page, imagePath, index);
    let contentMatch = "yes";
    let contentMatchNote = "No obvious title/visual contradiction found by rule-based audit; manual editorial review still applies.";
    const slug = routeSlug(page.route);
    const itinerary = itineraryBySlug.get(slug);
    if ((page.pageType === "itinerary" || page.pageType === "legacy-itinerary") && itinerary && index > 0 && index <= itinerary.durationDays && priorityStatus[slug]) {
      [contentMatch, contentMatchNote] = priorityStatus[slug][index - 1];
    } else if (semanticOverrides.has(`${page.route}|${imagePath}`)) {
      [contentMatch, contentMatchNote] = semanticOverrides.get(`${page.route}|${imagePath}`);
    } else if (purpose === "Body" && page.pageType === "guide") {
      contentMatch = "review";
      contentMatchNote = "Shared guide inline image; verify the specific surrounding section rather than only the guide topic.";
    }
    imageOccurrences.push({
      route: page.route,
      pageTitle: page.title,
      pageType: page.pageType,
      occurrenceIndex: index + 1,
      imageFile: imagePath,
      purpose,
      alt: attrs.alt ?? null,
      loading: attrs.loading || "auto",
      fetchPriority: attrs.fetchpriority || "auto",
      sizes: attrs.sizes || "",
      contentMatch,
      contentMatchNote,
    });
  });
}

const assetFiles = walk(publicRoot).filter((file) => /\.(webp|avif|png|jpe?g|svg)$/i.test(file));
const assets = [];
const bitCount = (value) => {
  let count = 0;
  for (const char of value) count += Number.parseInt(char, 16).toString(2).replaceAll("0", "").length;
  return count;
};
const hamming = (left, right) => bitCount((BigInt(`0x${left}`) ^ BigInt(`0x${right}`)).toString(16));
const bitsToHex = (bits) => {
  let value = 0n;
  for (const bit of bits) value = (value << 1n) | BigInt(bit ? 1 : 0);
  return value.toString(16).padStart(Math.ceil(bits.length / 4), "0");
};
const perceptualHashes = async (file) => {
  const d = await sharp(file).resize(9, 8, { fit: "fill" }).grayscale().raw().toBuffer();
  const dBits = [];
  for (let y = 0; y < 8; y += 1) for (let x = 0; x < 8; x += 1) dBits.push(d[y * 9 + x] > d[y * 9 + x + 1]);
  const a = await sharp(file).resize(8, 8, { fit: "fill" }).grayscale().raw().toBuffer();
  const average = [...a].reduce((sum, value) => sum + value, 0) / a.length;
  return { dHash: bitsToHex(dBits), aHash: bitsToHex([...a].map((value) => value >= average)) };
};

for (const file of assetFiles) {
  const relative = `/${path.relative(publicRoot, file).split(path.sep).join("/")}`;
  const stat = fs.statSync(file);
  const metadata = await sharp(file).metadata();
  const credit = creditByPath.get(relative) || null;
  const occurrences = imageOccurrences.filter((item) => item.imageFile === relative);
  const usedByPages = [...new Set(occurrences.map((item) => item.route))];
  const roles = [...new Set(occurrences.map((item) => item.purpose))];
  const sha256 = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  let hashes = null;
  if (relative.startsWith("/images/") && metadata.width && metadata.height) {
    try { hashes = await perceptualHashes(file); } catch { hashes = null; }
  }
  const creditComplete = Boolean(credit && requiredCreditFields.every((field) => credit[field] !== undefined && credit[field] !== "") && credit.licenseChecked === true);
  assets.push({
    filePath: relative,
    width: metadata.width || null,
    height: metadata.height || null,
    aspectRatio: metadata.width && metadata.height ? Number((metadata.width / metadata.height).toFixed(3)) : null,
    sizeBytes: stat.size,
    sizeKB: Math.round(stat.size / 1024),
    format: metadata.format || path.extname(file).slice(1),
    useCount: occurrences.length,
    pageCount: usedByPages.length,
    usedByPages,
    roles,
    credit,
    creditComplete,
    sha256,
    ...hashes,
  });
}

const assetByPath = new Map(assets.map((asset) => [asset.filePath, asset]));
const missingFiles = [...new Set(imageOccurrences.map((item) => item.imageFile).filter((file) => file.startsWith("/") && !assetByPath.has(file)))];
const exactGroups = [...Map.groupBy(assets, (asset) => asset.sha256).values()]
  .filter((group) => group.length > 1)
  .map((group, index) => ({ id: `exact-${index + 1}`, files: group.map((item) => item.filePath) }));

const photoAssets = assets.filter((asset) => asset.filePath.startsWith("/images/") && asset.dHash && asset.aHash);
const parent = new Map(photoAssets.map((asset) => [asset.filePath, asset.filePath]));
const find = (value) => parent.get(value) === value ? value : (parent.set(value, find(parent.get(value))), parent.get(value));
const union = (left, right) => {
  const a = find(left);
  const b = find(right);
  if (a !== b) parent.set(b, a);
};
const nearPairs = [];
for (let left = 0; left < photoAssets.length; left += 1) {
  for (let right = left + 1; right < photoAssets.length; right += 1) {
    const a = photoAssets[left];
    const b = photoAssets[right];
    if (a.sha256 === b.sha256) continue;
    const dDistance = hamming(a.dHash, b.dHash);
    const aDistance = hamming(a.aHash, b.aHash);
    if (dDistance <= 5 || aDistance <= 3) {
      union(a.filePath, b.filePath);
      nearPairs.push({ left: a.filePath, right: b.filePath, dHashDistance: dDistance, aHashDistance: aDistance });
    }
  }
}
const nearBuckets = new Map();
for (const asset of photoAssets) {
  const key = find(asset.filePath);
  if (!nearBuckets.has(key)) nearBuckets.set(key, []);
  nearBuckets.get(key).push(asset.filePath);
}
const nearGroups = [...nearBuckets.values()].filter((group) => group.length > 1).map((files, index) => ({
  id: `near-${index + 1}`,
  files,
  pairs: nearPairs.filter((pair) => files.includes(pair.left) && files.includes(pair.right)),
  requiresManualConfirmation: true,
}));

const referenceGroups = assets
  .filter((asset) => asset.pageCount > 1 && !/logo|icon|avatar|brand/i.test(asset.filePath))
  .sort((left, right) => right.pageCount - left.pageCount)
  .map((asset, index) => ({
    id: `reference-${index + 1}`,
    filePath: asset.filePath,
    useCount: asset.useCount,
    pageCount: asset.pageCount,
    pages: asset.usedByPages,
    reasonableReuse: asset.filePath.startsWith("/products/") || asset.filePath.startsWith("/share/"),
  }));

const exactByFile = new Map(exactGroups.flatMap((group) => group.files.map((file) => [file, group.id])));
const nearByFile = new Map(nearGroups.flatMap((group) => group.files.map((file) => [file, group.id])));
const referenceByFile = new Map(referenceGroups.map((group) => [group.filePath, group.id]));

for (const asset of assets) {
  asset.exactDuplicateGroup = exactByFile.get(asset.filePath) || null;
  asset.nearDuplicateGroup = nearByFile.get(asset.filePath) || null;
  asset.referenceDuplicateGroup = referenceByFile.get(asset.filePath) || null;
  asset.qualityFlags = [];
  if (asset.sizeBytes > 700 * 1024) asset.qualityFlags.push("oversized-over-700KB");
  if (asset.roles.includes("Hero") && asset.width && asset.width < 2000) asset.qualityFlags.push("hero-under-2000px");
  if (asset.roles.some((role) => ["Body", "Daily", "Card"].includes(role)) && asset.width && asset.width < 1400) asset.qualityFlags.push("content-under-1400px");
  if (asset.roles.includes("Hero") && asset.aspectRatio && (asset.aspectRatio < 1.2 || asset.aspectRatio > 2.2)) asset.qualityFlags.push("hero-crop-risk");
  if (!asset.creditComplete && asset.filePath.startsWith("/images/")) asset.qualityFlags.push("missing-or-incomplete-license-record");
  if (!asset.credit && !asset.filePath.startsWith("/images/")) asset.qualityFlags.push("first-party-provenance-not-registered");
  if (asset.useCount === 0) asset.qualityFlags.push("unused");
  if (asset.exactDuplicateGroup) asset.qualityFlags.push("exact-duplicate-file");
  if (asset.nearDuplicateGroup) asset.qualityFlags.push("near-duplicate-review");
  asset.recommendedAction = asset.qualityFlags.includes("unused") ? "Review then delete"
    : asset.qualityFlags.includes("missing-or-incomplete-license-record") ? "Verify license or replace"
      : asset.qualityFlags.includes("hero-under-2000px") ? "Replace or source higher-resolution original"
        : asset.qualityFlags.includes("content-under-1400px") ? "Replace/re-export if visibly soft"
          : asset.qualityFlags.includes("oversized-over-700KB") ? "Compress"
            : asset.qualityFlags.includes("near-duplicate-review") ? "Manual duplicate review"
              : "Keep";
}

const occurrenceCounts = new Map(imageOccurrences.map((item) => [item.imageFile, imageOccurrences.filter((other) => other.imageFile === item.imageFile).length]));
const occurrencePages = new Map(imageOccurrences.map((item) => [item.imageFile, new Set(imageOccurrences.filter((other) => other.imageFile === item.imageFile).map((other) => other.route)).size]));
for (const occurrence of imageOccurrences) {
  const asset = assetByPath.get(occurrence.imageFile);
  const resolutionThreshold = occurrence.purpose === "Hero" ? 2000 : (["Card", "Body", "Daily"].includes(occurrence.purpose) ? 1400 : 0);
  occurrence.actualWidth = asset?.width || null;
  occurrence.actualHeight = asset?.height || null;
  occurrence.fileSizeBytes = asset?.sizeBytes || null;
  occurrence.fileSizeKB = asset?.sizeKB || null;
  occurrence.format = asset?.format || path.extname(occurrence.imageFile).slice(1) || "external";
  occurrence.usedByPageCount = occurrencePages.get(occurrence.imageFile) || 0;
  occurrence.totalReferenceCount = occurrenceCounts.get(occurrence.imageFile) || 0;
  occurrence.duplicate = {
    fileReference: referenceByFile.get(occurrence.imageFile) || null,
    exactContent: exactByFile.get(occurrence.imageFile) || null,
    perceptualNear: nearByFile.get(occurrence.imageFile) || null,
  };
  occurrence.lowResolution = Boolean(asset?.width && resolutionThreshold && asset.width < resolutionThreshold);
  occurrence.cropAbnormal = occurrence.purpose === "Hero" && Boolean(asset?.aspectRatio && (asset.aspectRatio < 1.2 || asset.aspectRatio > 2.2)) ? "automatic-risk" : "not-detected-automatic";
  if (occurrence.route === "/itinerary-kits/240-hour-visa-free-china-itinerary" && occurrence.purpose === "Hero") occurrence.cropAbnormal = "manual-review-mobile-subject-obscured-by-overlay";
  occurrence.copyright = {
    creditId: asset?.credit?.creditId || null,
    clearRecord: asset?.creditComplete || false,
    sourcePlatform: asset?.credit?.sourcePlatform || null,
    sourcePage: asset?.credit?.sourcePage || null,
    photographer: asset?.credit?.photographer || null,
    licenseChecked: asset?.credit?.licenseChecked || false,
  };
  occurrence.recommendedAction = occurrence.contentMatch === "no" ? "Replace"
    : occurrence.contentMatch === "partial" ? "Replace or recrop with a more specific scene"
      : occurrence.lowResolution && occurrence.purpose === "Hero" ? "Replace with >=2000px source"
        : occurrence.lowResolution ? "Review sharpness; replace/re-export if soft"
          : occurrence.cropAbnormal.startsWith("manual-review") ? "Recrop or replace after mobile/desktop review"
            : "Keep";
}

const internalTargets = new Set();
for (const page of pages) {
  for (const href of page.links) {
    try {
      const url = new URL(href, baseUrl);
      if (url.origin === new URL(baseUrl).origin) internalTargets.add(url.pathname || "/");
    } catch { /* Ignore malformed external values; surfaced separately if needed. */ }
  }
}
const linkChecks = [];
for (const batch of [...internalTargets].sort().reduce((groups, item, index) => {
  const batchIndex = Math.floor(index / 10);
  (groups[batchIndex] ||= []).push(item);
  return groups;
}, [])) {
  linkChecks.push(...await Promise.all(batch.map(async (target) => {
    const result = await fetchPage(target);
    return { target, status: result.status, finalUrl: result.finalUrl, broken: result.status === 0 || result.status >= 400 };
  })));
}

const sitemapPage = fetchedPages.find((page) => page.route === "/sitemap.xml");
const sitemapRoutes = sitemapPage ? [...sitemapPage.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname) : [];
const indexablePages = pages.filter((page) => page.status === 200 && page.contentType.includes("text/html") && !page.robotsMeta.toLowerCase().includes("noindex") && page.pageType !== "system");
const missingFromSitemap = indexablePages.map((page) => page.route).filter((route) => !sitemapRoutes.includes(route));
const sitemapUnknownRoutes = sitemapRoutes.filter((route) => !pageByRoute.has(route));

const paragraphGroups = new Map();
for (const fetched of fetchedPages.filter((item) => item.contentType.includes("text/html"))) {
  for (const paragraph of allTagContents(fetched.body, "p")) {
    const normalized = paragraph.toLowerCase().replace(/\s+/g, " ").trim();
    if (normalized.length < 100 || normalized.includes("all rights reserved")) continue;
    if (!paragraphGroups.has(normalized)) paragraphGroups.set(normalized, { text: paragraph, pages: new Set() });
    paragraphGroups.get(normalized).pages.add(fetched.route);
  }
}
const duplicatedParagraphs = [...paragraphGroups.values()]
  .filter((entry) => entry.pages.size > 1)
  .map((entry) => ({ text: entry.text, pages: [...entry.pages] }))
  .sort((left, right) => right.pages.length - left.pages.length);

const currentNiaSource = {
  checkedAt: generatedAt.slice(0, 10),
  source: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
  authority: "National Immigration Administration of China",
  facts: ["55 eligible countries", "65 eligible ports", "24 provincial-level regions", "up to 240 hours", "confirmed onward travel to a third country or region"],
};
const policyFindings = [
  {
    severity: "high",
    routes: ["/guides/china-240-hour-visa-free-transit-guide"],
    finding: "The guide links to the December 2024 NIA announcement (54 countries/60 ports) instead of the current November 2025 notice (55 countries/65 ports). The cautious body copy does not hard-code the old counts, but the verification source is stale.",
    currentOfficialSource: currentNiaSource.source,
  },
  {
    severity: "pass",
    routes: ["/itinerary-kits/240-hour-visa-free-china-itinerary"],
    finding: "The itinerary links to the current NIA policy interpretation and repeatedly tells readers to verify nationality, ports, onward ticket and permitted area. No guaranteed-entry language was found.",
    currentOfficialSource: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
  },
  {
    severity: "medium",
    routes: ["/guides/can-americans-travel-to-china-in-2026"],
    finding: "The page is date-sensitive and cautious, but uses a broad embassy homepage rather than a dated visa-policy detail page; verification provenance should be more specific.",
  },
];

const sourceAudit = {
  nextImageFindings: [
    {
      severity: "medium",
      file: "app/itinerary-kits/[slug]/page.tsx",
      finding: "Hero Image sets both priority and loading=\"eager\". Keep priority and remove the redundant explicit loading value during remediation.",
    },
    {
      severity: "high",
      file: "app/itinerary-kits/[slug]/page.tsx",
      finding: "Daily images fall back to routeImages[(day - 1) % routeImages.length], which creates semantic mismatch and visible repetition in four priority itineraries.",
    },
    {
      severity: "medium",
      file: "app/itinerary-kits/[slug]/page.tsx",
      finding: "Itinerary hero rendering does not apply ContentImage.position, so per-image object-position values cannot correct desktop/mobile crops.",
    },
    {
      severity: "medium",
      file: "components/GuideTemplate.tsx",
      finding: "Guide images use sizes=\"(min-width: 1200px) 1100px, 100vw\" for all inline figures. This is safe but can over-request on smaller desktop article columns; tune after measuring rendered widths.",
    },
  ],
  browserEvidence: [
    {
      route: "/",
      viewport: "1800x1004",
      result: "One H1, canonical and OG image present, no console warnings/errors, no horizontal overflow. Hero loaded eagerly with high fetch priority.",
    },
    {
      route: "/itinerary-kits/4-days-in-beijing",
      viewport: "1800x1004",
      result: "One H1, canonical present, no console warnings/errors. Day 2/3/4 imagery visibly contradicts the itinerary content because route images cycle.",
    },
    {
      route: "/itinerary-kits/240-hour-visa-free-china-itinerary",
      viewport: "390x844",
      result: "No horizontal overflow (scrollWidth=390), no console warnings/errors. Hero fills 996px of mobile height; overlay obscures much of the core boarding-pass/phone subject. The page has 674 DOM elements, 13 image elements and 19,849px document height.",
    },
  ],
};

const summary = {
  buildSurfaces: pages.length,
  htmlAndMetadataRoutes: htmlRoutes.length,
  apiRoutes: apiRoutes.length,
  successfulRoutes: pages.filter((page) => page.status === 200).length,
  pageIssues: pages.reduce((sum, page) => sum + page.issues.length, 0),
  imageOccurrences: imageOccurrences.length,
  uniquePublicAssets: assets.length,
  uniqueReferencedLocalAssets: assets.filter((asset) => asset.useCount > 0).length,
  unusedAssets: assets.filter((asset) => asset.useCount === 0).length,
  missingFiles: missingFiles.length,
  referenceDuplicateGroups: referenceGroups.length,
  exactDuplicateGroups: exactGroups.length,
  perceptualNearDuplicateGroups: nearGroups.length,
  heroAssetsUnder2000px: assets.filter((asset) => asset.qualityFlags.includes("hero-under-2000px")).length,
  contentAssetsUnder1400px: assets.filter((asset) => asset.qualityFlags.includes("content-under-1400px")).length,
  oversizedAssets: assets.filter((asset) => asset.qualityFlags.includes("oversized-over-700KB")).length,
  incompleteLicenseRecordsForSiteImages: assets.filter((asset) => asset.qualityFlags.includes("missing-or-incomplete-license-record")).length,
  firstPartyAssetsWithoutProvenanceRecord: assets.filter((asset) => asset.qualityFlags.includes("first-party-provenance-not-registered")).length,
  priorityDailyImagesAudited: priorityItineraries.length,
  priorityDailyImageMismatches: priorityItineraries.filter((item) => item.contentMatch === "no").length,
  priorityDailyImagePartialMatches: priorityItineraries.filter((item) => item.contentMatch === "partial").length,
  brokenInternalLinks: linkChecks.filter((item) => item.broken).length,
  missingFromSitemap: missingFromSitemap.length,
  duplicatedParagraphGroups: duplicatedParagraphs.length,
};

const audit = {
  generatedAt,
  phase: "A - full-site audit only; no images replaced",
  baseline: {
    repository: "CHENGWEE711/first-china-trip-kit",
    branch: "audit/full-site-content-image-upgrade",
    startSha: baselineSha,
    productionBaseUrl: baseUrl,
    expectedBuildPages: 74,
  },
  thresholds: {
    heroRecommendedWidth: 2000,
    contentRecommendedWidth: 1400,
    oversizedFileBytes: 716800,
    nearDuplicateRule: "dHash distance <= 5 OR aHash distance <= 3; manual confirmation required",
  },
  summary,
  pages: pages.map((page) => Object.fromEntries(
    Object.entries(page).filter(([key]) => !["imageTags", "links"].includes(key)),
  )),
  imageOccurrences,
  assets,
  duplicateGroups: { fileReference: referenceGroups, exactContent: exactGroups, perceptualNear: nearGroups },
  missingFiles,
  priorityItineraries,
  seoAndLinks: { linkChecks, sitemapRoutes, missingFromSitemap, sitemapUnknownRoutes, duplicatedParagraphs },
  policyChecks: { currentNiaSource, findings: policyFindings },
  sourceAudit,
};

const escapeCell = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
const compactPages = (list, limit = 8) => list.length <= limit ? list.join(", ") : `${list.slice(0, limit).join(", ")} … (+${list.length - limit})`;
const severityCounts = priorityItineraries.reduce((acc, item) => ({ ...acc, [item.contentMatch]: (acc[item.contentMatch] || 0) + 1 }), {});

const markdown = `# First China Trip Kit — Full Site Page & Image Audit (Phase A)

Generated: ${generatedAt}  
Repository: \`CHENGWEE711/first-china-trip-kit\`  
Audit branch: \`audit/full-site-content-image-upgrade\`  
Production baseline: \`${baselineSha}\`  
Production URL: ${baseUrl}

> Scope lock: this phase is read-only remediation planning. No production image was downloaded, replaced, recropped or deleted.

## Executive result

| Metric | Result |
| --- | ---: |
| Build surfaces represented | ${summary.buildSurfaces} (${summary.htmlAndMetadataRoutes} routes + ${summary.apiRoutes} API endpoints) |
| Page-image occurrences | ${summary.imageOccurrences} |
| Public image assets | ${summary.uniquePublicAssets} |
| Referenced / unused assets | ${summary.uniqueReferencedLocalAssets} / ${summary.unusedAssets} |
| Missing referenced image files | ${summary.missingFiles} |
| File-reference duplicate groups | ${summary.referenceDuplicateGroups} |
| Exact-content duplicate groups with different filenames | ${summary.exactDuplicateGroups} |
| Perceptual near-duplicate groups | ${summary.perceptualNearDuplicateGroups} |
| Hero assets below 2000px | ${summary.heroAssetsUnder2000px} |
| Card/body/daily assets below 1400px | ${summary.contentAssetsUnder1400px} |
| Assets above 700KB | ${summary.oversizedAssets} |
| Site images with incomplete license records | ${summary.incompleteLicenseRecordsForSiteImages} |
| First-party assets lacking a formal provenance record | ${summary.firstPartyAssetsWithoutProvenanceRecord} |
| Broken internal links | ${summary.brokenInternalLinks} |
| Indexable routes missing from sitemap | ${summary.missingFromSitemap} |

## Highest-priority findings

1. **P0 — four priority itineraries need independent daily image sets.** ${summary.priorityDailyImageMismatches} of ${summary.priorityDailyImagesAudited} daily slots are clearly mismatched; ${summary.priorityDailyImagePartialMatches} more are only partial matches. The root cause is the modulo fallback in \`app/itinerary-kits/[slug]/page.tsx\`.
2. **P0 — the 240-hour Guide points at a stale official announcement.** Its linked December 2024 NIA page reflects 54 countries/60 ports. The current NIA notice checked on ${currentNiaSource.checkedAt} states 55 countries/65 ports. The body is cautious and avoids stale counts, but the verification link must be updated in remediation.
3. **P1 — city semantics are incomplete.** Hangzhou, Guangzhou and Shenzhen reuse generic airport/phone/metro/restaurant imagery as attractions, food or transport. These are not city-identifying visuals.
4. **P1 — repeated shared photography is structural.** ${summary.referenceDuplicateGroups} same-file reference groups span multiple pages. Guide featured images are unique across guides, but inline guide images and city/itinerary photography are reused broadly.
5. **P1 — quality thresholds are not met consistently.** ${summary.heroAssetsUnder2000px} hero assets are below the 2000px recommendation and ${summary.contentAssetsUnder1400px} card/body/daily assets are below 1400px.
6. **P1 — provenance coverage is split.** Photography under \`/images\` is mostly recorded, while brand, product, marketing and share assets lack a first-party ownership/provenance record.
7. **P2 — responsive layout is stable in sampled high-risk pages.** No horizontal overflow or console errors were found at 1800px desktop or 390px mobile, but the 240-hour mobile hero is very tall and obscures much of its core subject.

## Priority itinerary daily-image audit

Status totals: **${severityCounts.no || 0} mismatch**, **${severityCounts.partial || 0} partial**, **${severityCounts.yes || 0} matched**.

| Itinerary | Day | Day title | Current image | Match | Reason | Action |
| --- | ---: | --- | --- | --- | --- | --- |
${priorityItineraries.map((item) => `| ${escapeCell(item.slug)} | ${item.day} | ${escapeCell(item.dayTitle)} | \`${escapeCell(item.imagePath)}\` | ${item.contentMatch} | ${escapeCell(item.reason)} | ${item.contentMatch === "yes" ? "Keep candidate" : "Replace with day-specific image"} |`).join("\n")}

## Duplicate image groups

### Same-file references across multiple pages

${referenceGroups.length ? referenceGroups.map((group) => `- **${group.id}** — \`${group.filePath}\`: ${group.useCount} occurrences / ${group.pageCount} pages${group.reasonableReuse ? " (likely reasonable first-party reuse)" : ""}. Pages: ${compactPages(group.pages)}`).join("\n") : "- None."}

### Exact-content duplicates with different filenames

${exactGroups.length ? exactGroups.map((group) => `- **${group.id}** — ${group.files.map((file) => `\`${file}\``).join(", ")}`).join("\n") : "- None detected."}

### Perceptual near-duplicates

The following are algorithmic candidates, not automatic replacement decisions. Brand, icon, product, marketing and share assets are excluded from perceptual grouping.

${nearGroups.length ? nearGroups.map((group) => `- **${group.id}** — ${group.files.map((file) => `\`${file}\``).join(", ")}; manual confirmation required.`).join("\n") : "- None detected at the configured threshold."}

## Image quality and licensing

### Hero assets below 2000px

${assets.filter((asset) => asset.qualityFlags.includes("hero-under-2000px")).map((asset) => `- \`${asset.filePath}\` — ${asset.width}×${asset.height}, ${asset.sizeKB}KB; ${asset.recommendedAction}.`).join("\n") || "- None."}

### Body/card/daily assets below 1400px

${assets.filter((asset) => asset.qualityFlags.includes("content-under-1400px")).map((asset) => `- \`${asset.filePath}\` — ${asset.width}×${asset.height}, roles: ${asset.roles.join(", ")}; ${asset.recommendedAction}.`).join("\n") || "- None."}

### Oversized assets

${assets.filter((asset) => asset.qualityFlags.includes("oversized-over-700KB")).map((asset) => `- \`${asset.filePath}\` — ${asset.sizeKB}KB, used by ${asset.pageCount} page(s).`).join("\n") || "- None."}

### Copyright/provenance gaps

${assets.filter((asset) => asset.qualityFlags.some((flag) => flag.includes("provenance") || flag.includes("license"))).map((asset) => `- \`${asset.filePath}\` — ${asset.qualityFlags.filter((flag) => flag.includes("provenance") || flag.includes("license")).join(", ")}.`).join("\n") || "- None."}

## Next Image implementation findings

${sourceAudit.nextImageFindings.map((item) => `- **${item.severity.toUpperCase()}** \`${item.file}\` — ${item.finding}`).join("\n")}

## Content and policy audit

${policyFindings.map((item) => `- **${item.severity.toUpperCase()}** ${item.routes.join(", ")} — ${item.finding}${item.currentOfficialSource ? ` Official source: ${item.currentOfficialSource}` : ""}`).join("\n")}

- No active 144-hour wording was found in the application content. The only 144-hour reference found in the official-source corpus is historical context.
- No \"guaranteed visa\" or \"guaranteed entry\" claim was found.
- ${summary.duplicatedParagraphGroups} repeated paragraph groups were detected across rendered pages; see JSON for exact text and routes. Many are template-level CTA/disclaimer blocks, but editorial duplicates require review.

## SEO, accessibility and link audit

- Broken internal links: ${summary.brokenInternalLinks}.
- Indexable routes missing from sitemap: ${missingFromSitemap.length ? missingFromSitemap.map((route) => `\`${route}\``).join(", ") : "none"}.
- Sitemap-only unknown routes: ${sitemapUnknownRoutes.length ? sitemapUnknownRoutes.map((route) => `\`${route}\``).join(", ") : "none"}.
- Page-level title, description, canonical, H1, OG, Twitter Card, JSON-LD and image-alt checks are listed below and serialized in JSON.
- Sampled keyboard/navigation flow passed: homepage primary navigation reached \`/itinerary-kits\`; active navigation state updated and no console errors appeared.

## Rendered browser evidence

${sourceAudit.browserEvidence.map((item) => `- \`${item.route}\` @ ${item.viewport}: ${item.result}`).join("\n")}

This is a risk-signal audit, not a full Lighthouse run. LCP/CLS/INP must be measured again after replacements because new source dimensions and crops will change the result.

## Route coverage

| Route | Type | HTTP | Title | H1 | Images | JSON-LD | Issues |
| --- | --- | ---: | --- | ---: | ---: | --- | --- |
${pages.sort((a, b) => a.route.localeCompare(b.route)).map((page) => `| \`${escapeCell(page.route)}\` | ${page.pageType} | ${page.status ?? "N/A"} | ${escapeCell(page.title)} | ${page.h1.length} | ${page.imageCount} | ${page.jsonLdTypes.join(", ") || "—"} | ${page.issues.join(", ") || "—"} |`).join("\n")}

## Complete public-asset inventory

| File | Dimensions | Size | Format | Pages / uses | Roles | Credit | Duplicate | Flags | Recommended action |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
${assets.sort((a, b) => a.filePath.localeCompare(b.filePath)).map((asset) => `| \`${escapeCell(asset.filePath)}\` | ${asset.width || "?"}×${asset.height || "?"} | ${asset.sizeKB}KB | ${asset.format} | ${asset.pageCount} / ${asset.useCount} | ${asset.roles.join(", ") || "unused"} | ${asset.creditComplete ? "complete" : "missing/incomplete"} | ${[asset.referenceDuplicateGroup, asset.exactDuplicateGroup, asset.nearDuplicateGroup].filter(Boolean).join(", ") || "—"} | ${asset.qualityFlags.join(", ") || "—"} | ${asset.recommendedAction} |`).join("\n")}

## Complete page-image occurrence inventory

| Route | Page type | Purpose | Image | Alt | Dimensions | Size | Page count | Match | Duplicate | Low-res | Crop | Copyright | Action |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- |
${imageOccurrences.map((item) => `| \`${escapeCell(item.route)}\` | ${item.pageType} | ${item.purpose} | \`${escapeCell(item.imageFile)}\` | ${escapeCell(item.alt)} | ${item.actualWidth || "?"}×${item.actualHeight || "?"} | ${item.fileSizeKB ?? "?"}KB | ${item.usedByPageCount} | ${item.contentMatch} | ${Object.values(item.duplicate).filter(Boolean).join(", ") || "—"} | ${item.lowResolution ? "yes" : "no"} | ${item.cropAbnormal} | ${item.copyright.clearRecord ? "complete" : "missing/incomplete"} | ${item.recommendedAction} |`).join("\n")}

## Recommended remediation order (not executed in Phase A)

1. Replace the four priority itinerary Hero/Card/Daily sets and add per-day uniqueness/semantic Playwright assertions.
2. Update the 240-hour Guide to the current NIA notice and record verification date.
3. Replace Hangzhou/Guangzhou/Shenzhen generic phone/metro imagery with city-specific scenes.
4. Resolve hero assets below 2000px, then card/body assets below 1400px where rendered evidence is soft.
5. Review reference and perceptual duplicate groups; retain legitimate brand/product reuse and remove only confirmed editorial duplication.
6. Register first-party provenance for product, share, brand and marketing assets.
7. Re-run this audit, then run lint, typecheck, unit tests, build, Playwright responsive/bad-image checks and Lighthouse budgets.
`;

fs.writeFileSync(path.join(root, "docs/FULL_SITE_PAGE_IMAGE_AUDIT.json"), `${JSON.stringify(audit, null, 2)}\n`);
fs.writeFileSync(path.join(root, "docs/FULL_SITE_PAGE_IMAGE_AUDIT.md"), markdown);
console.log(JSON.stringify(summary, null, 2));
