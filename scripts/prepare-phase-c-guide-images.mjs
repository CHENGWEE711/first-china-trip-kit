import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const downloadDate = "2026-07-13";
const pexelsLicense = "https://www.pexels.com/license/";

const assets = [
  {
    slug: "how-to-pay-in-china-as-a-foreigner",
    photoId: "12935051",
    sourcePage: "https://www.pexels.com/photo/a-close-up-shot-of-a-person-scanning-a-qr-code-12935051/",
    photographer: "iMin Technology",
    theme: "traveler presenting a QR payment code at checkout",
    heroPosition: "attention",
    cardFocus: [0.48, 0.58],
  },
  {
    slug: "best-apps-for-traveling-in-china",
    photoId: "31216218",
    sourcePage: "https://www.pexels.com/photo/people-using-phones-in-a-subway-station-31216218/",
    photographer: "Elif",
    theme: "travelers using phones in a metro station",
    heroPosition: "attention",
    cardFocus: [0.62, 0.52],
  },
  {
    slug: "how-to-book-high-speed-trains-in-china",
    photoId: "7494174",
    sourcePage: "https://www.pexels.com/photo/high-speed-train-at-a-station-in-china-7494174/",
    photographer: "Leon Huang",
    theme: "Chinese high-speed train at a station platform",
    heroPosition: "attention",
    cardFocus: [0.36, 0.54],
  },
  {
    slug: "how-to-use-alipay-and-wechat-pay-in-china",
    photoId: "33792076",
    sourcePage: "https://www.pexels.com/photo/cafe-interior-with-coffee-grinders-and-qr-code-33792076/",
    photographer: "Ali Askar",
    theme: "merchant QR payment sign at a cafe counter",
    heroPosition: "attention",
    cardFocus: [0.68, 0.54],
  },
  {
    slug: "china-travel-packing-list",
    photoId: "5405596",
    sourcePage: "https://www.pexels.com/photo/travel-documents-and-necessities-5405596/",
    photographer: "Taryn Elliott",
    theme: "travel documents and practical packing essentials",
    heroPosition: "attention",
    cardFocus: [0.46, 0.54],
  },
  {
    slug: "basic-chinese-phrases-for-travelers",
    photoId: "13639635",
    sourcePage: "https://www.pexels.com/photo/hand-taking-a-photo-of-a-food-with-a-smart-phone-13639635/",
    photographer: "Kuiyibo Campos",
    theme: "traveler using a phone to understand a restaurant setting",
    heroPosition: "attention",
    cardFocus: [0.58, 0.56],
  },
  {
    slug: "china-esim-guide-for-tourists",
    photoId: "15068317",
    sourcePage: "https://www.pexels.com/photo/person-holding-a-phone-15068317/",
    photographer: "Towfiqu barbhuiya",
    theme: "traveler checking a phone beside airport luggage",
    heroPosition: "attention",
    cardFocus: [0.50, 0.50],
  },
  {
    slug: "china-food-ordering-guide",
    photoId: "24349885",
    sourcePage: "https://www.pexels.com/photo/street-food-market-shanghai-china-24349885/",
    photographer: "Maria Burnay",
    theme: "cook preparing food at a Shanghai street stall",
    heroPosition: "attention",
    cardFocus: [0.50, 0.48],
  },
  {
    slug: "can-americans-travel-to-china-in-2026",
    photoId: "6726195",
    sourcePage: "https://www.pexels.com/photo/busy-people-on-the-airport-terminal-6726195/",
    photographer: "Magic K",
    theme: "international passengers moving through an airport terminal",
    heroPosition: "attention",
    cardFocus: [0.54, 0.56],
  },
  {
    slug: "china-240-hour-visa-free-transit-guide",
    photoId: "4606721",
    sourcePage: "https://www.pexels.com/photo/crop-traveler-with-smartphone-and-boarding-pass-in-airport-4606721/",
    photographer: "Natã Romualdo",
    theme: "traveler holding a boarding pass and phone during an airport transit",
    heroPosition: "attention",
    cardFocus: [0.58, 0.46],
  },
  {
    slug: "how-to-use-alipay-in-china-as-a-tourist",
    photoId: "278430",
    sourcePage: "https://www.pexels.com/photo/qr-code-on-screengrab-278430/",
    photographer: "Pixabay",
    theme: "smartphone showing a QR code for a customer-presented payment flow",
    heroPosition: "attention",
    cardFocus: [0.52, 0.48],
  },
  {
    slug: "how-to-use-wechat-pay-in-china-as-a-foreigner",
    photoId: "31713078",
    sourcePage: "https://www.pexels.com/photo/casual-interaction-at-a-modern-cafe-bar-counter-31713078/",
    photographer: "Sıla Onorevole",
    theme: "customer using a phone while speaking with cafe staff",
    heroPosition: "attention",
    cardFocus: [0.46, 0.48],
  },
  {
    slug: "3-days-in-shanghai-for-first-time-visitors",
    photoId: "35554911",
    sourcePage: "https://www.pexels.com/photo/bustling-street-scene-in-shanghai-china-35554911/",
    photographer: "Margo Evardson",
    theme: "Shanghai street connecting historic storefronts and modern towers",
    heroPosition: "attention",
    cardFocus: [0.52, 0.54],
  },
  {
    slug: "china-travel-checklist-before-you-fly",
    photoId: "7310015",
    sourcePage: "https://www.pexels.com/photo/close-up-shot-of-a-passport-and-tickets-on-top-of-a-laptop-7310015/",
    photographer: "RDNE Stock project",
    theme: "passport, boarding passes and laptop arranged for a pre-flight check",
    heroPosition: "attention",
    cardFocus: [0.48, 0.48],
  },
];

const outputRoot = path.join(root, "public/images/guides/phase-c");
const sourceRoot = path.join(root, ".codex-tmp/phase-c-guide-sources");
fs.mkdirSync(outputRoot, { recursive: true });
fs.mkdirSync(sourceRoot, { recursive: true });

async function download(asset) {
  const url = `https://images.pexels.com/photos/${asset.photoId}/pexels-photo-${asset.photoId}.jpeg?auto=compress&cs=tinysrgb&w=3200`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed ${asset.slug}: ${response.status} ${response.statusText}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const sourceFile = path.join(sourceRoot, `${asset.slug}.jpg`);
  fs.writeFileSync(sourceFile, buffer);
  const metadata = await sharp(buffer).metadata();
  if ((metadata.width || 0) < 2000) throw new Error(`${asset.slug} source is only ${metadata.width}px wide`);
  return { buffer, metadata, sourceFile };
}

const records = [];
for (const asset of assets) {
  const { buffer, metadata } = await download(asset);
  const directory = path.join(outputRoot, asset.slug);
  fs.mkdirSync(directory, { recursive: true });
  const heroFile = path.join(directory, "hero.webp");
  const cardFile = path.join(directory, "card.webp");

  const heroBuffer = await sharp(buffer)
    .rotate()
    .resize(2400, 1600, { fit: "cover", position: asset.heroPosition })
    .webp({ quality: 82, effort: 5, smartSubsample: true })
    .toBuffer();
  fs.writeFileSync(heroFile, heroBuffer);

  const cardBase = await sharp(buffer)
    .rotate()
    .resize(2400, 1600, { fit: "cover", position: asset.heroPosition })
    .toBuffer();
  const left = Math.round(asset.cardFocus[0] * 600);
  const top = Math.round(asset.cardFocus[1] * 400);
  const cardBuffer = await sharp(cardBase)
    .extract({ left, top, width: 1800, height: 1200 })
    .webp({ quality: 82, effort: 5, smartSubsample: true })
    .toBuffer();
  fs.writeFileSync(cardFile, cardBuffer);

  const common = {
    sourcePlatform: "Pexels",
    sourcePage: asset.sourcePage,
    photographer: asset.photographer,
    downloadDate,
    license: "Pexels License",
    licenseUrl: pexelsLicense,
    licenseChecked: true,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
  };
  records.push(
    {
      creditId: `phase-c-${asset.slug}-hero`,
      localFile: `/images/guides/phase-c/${asset.slug}/hero.webp`,
      usage: `${asset.slug} Guide Hero: ${asset.theme}`,
      ...common,
    },
    {
      creditId: `phase-c-${asset.slug}-card`,
      localFile: `/images/guides/phase-c/${asset.slug}/card.webp`,
      usage: `${asset.slug} Guide Card crop: ${asset.theme}`,
      ...common,
    },
  );
}

const creditsFile = path.join(root, "data/image-credits.json");
const credits = JSON.parse(fs.readFileSync(creditsFile, "utf8"));
const ids = new Set(records.map((record) => record.creditId));
const firstPartyRecord = {
  creditId: "internal-payment-apps-guide-store-cover",
  localFile: "/products/previews/payment-apps-guide-store-cover.png",
  sourcePlatform: "First China Trip Kit",
  sourcePage: "scripts/generate-product-cover-images.py",
  photographer: "First China Trip Kit",
  downloadDate,
  usage: "Payment and Apps Guide CTA preview on Guide and product surfaces",
  license: "First-party internal asset",
  licenseChecked: true,
  assetType: "internal",
  sourceOwner: "First China Trip Kit",
  generatedBy: "scripts/generate-product-cover-images.py",
  verificationDate: downloadDate,
};
ids.add(firstPartyRecord.creditId);
const updatedCredits = [
  ...credits.filter((credit) => !ids.has(credit.creditId)),
  ...records,
  firstPartyRecord,
];
fs.writeFileSync(creditsFile, `${JSON.stringify(updatedCredits, null, 2)}\n`);

const manifest = assets.map((asset) => {
  const directory = path.join(outputRoot, asset.slug);
  return {
    slug: asset.slug,
    sourcePage: asset.sourcePage,
    photographer: asset.photographer,
    theme: asset.theme,
    hero: {
      path: `/images/guides/phase-c/${asset.slug}/hero.webp`,
      width: 2400,
      height: 1600,
      bytes: fs.statSync(path.join(directory, "hero.webp")).size,
    },
    card: {
      path: `/images/guides/phase-c/${asset.slug}/card.webp`,
      width: 1800,
      height: 1200,
      bytes: fs.statSync(path.join(directory, "card.webp")).size,
    },
  };
});
fs.writeFileSync(path.join(root, "docs/PHASE_C_GUIDE_ASSET_MANIFEST.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${records.length} Guide Hero/Card assets and 1 Guide-scope first-party provenance record.`);

