import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const assets = [
  {
    output: "public/images/home/phase-d/first-trip-phone-metro-hero.webp",
    source:
      "https://unsplash.com/photos/JMUf4pbuTNg/download?force=true",
    width: 1600,
    height: 2000,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/guangzhou-pearl-river-hero.webp",
    source:
      "https://unsplash.com/photos/kMzMK36LCeA/download?force=true",
    width: 2400,
    height: 1600,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/guangzhou-heritage-street-card.webp",
    source:
      "https://images.pexels.com/photos/9811802/pexels-photo-9811802.jpeg?auto=compress&cs=tinysrgb&w=2400",
    width: 1800,
    height: 1200,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/guangzhou-dim-sum.webp",
    source:
      "https://images.pexels.com/photos/32393813/pexels-photo-32393813.jpeg?auto=compress&cs=tinysrgb&w=2400",
    width: 1800,
    height: 1200,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/guangzhou-metro.webp",
    source:
      "https://images.unsplash.com/photo-1607420412485-a1ea520a2f82?auto=format&fit=crop&q=85&w=2400",
    width: 1800,
    height: 1200,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/shenzhen-bay-hero.webp",
    source:
      "https://unsplash.com/photos/O49oxPekLpw/download?force=true",
    width: 2400,
    height: 1600,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/shenzhen-modern-architecture-card.webp",
    source:
      "https://images.pexels.com/photos/29340152/pexels-photo-29340152.jpeg?auto=compress&cs=tinysrgb&w=2400",
    width: 1800,
    height: 1200,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/shenzhen-chaoshan-hot-pot.webp",
    source:
      "https://images.unsplash.com/photo-1677030137853-03a83b0bd630?auto=format&fit=crop&q=85&w=2400",
    width: 1800,
    height: 1200,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/shenzhen-metro.webp",
    source:
      "https://images.unsplash.com/photo-1611250547970-b9419a120d65?auto=format&fit=crop&q=85&w=2400",
    width: 1800,
    height: 1200,
    position: "centre",
  },
  {
    output: "public/images/cities/phase-d/suzhou-pingjiang-canal-hero.webp",
    source:
      "https://unsplash.com/photos/iv7CHH1ukK0/download?force=true",
    width: 2400,
    height: 1600,
    position: "centre",
  },
];

for (const asset of assets) {
  const response = await fetch(asset.source, {
    headers: { "User-Agent": "First China Trip Kit image preparation" },
  });

  if (!response.ok) {
    throw new Error(`Could not download ${asset.source}: ${response.status}`);
  }

  const source = Buffer.from(await response.arrayBuffer());
  const outputPath = path.join(root, asset.output);
  await mkdir(path.dirname(outputPath), { recursive: true });

  const optimized = await sharp(source)
    .rotate()
    .resize(asset.width, asset.height, {
      fit: "cover",
      position: asset.position,
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toBuffer();

  await writeFile(outputPath, optimized);
  const metadata = await sharp(optimized).metadata();
  console.log(
    `${asset.output}: ${metadata.width}x${metadata.height}, ${Math.round(optimized.byteLength / 1024)}KB`,
  );
}

const homeHeroPath = path.join(
  root,
  "public/images/home/phase-d/first-trip-phone-metro-hero.webp",
);
const homeOgPath = path.join(
  root,
  "public/images/home/phase-d/first-trip-phone-metro-og.webp",
);
const homeOgPhoto = await sharp(homeHeroPath)
  .resize(540, 630, { fit: "cover", position: "centre" })
  .toBuffer();
const homeOgOverlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="660" height="630" fill="#F7F1E6"/>
    <rect width="18" height="630" fill="#B8473F"/>
    <rect x="660" width="6" height="630" fill="#B8473F"/>
    <text x="72" y="92" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="4" fill="#B8473F">FIRST CHINA TRIP KIT</text>
    <text x="72" y="206" font-family="Arial, sans-serif" font-size="59" font-weight="700" fill="#2B2A28">Payments, apps and</text>
    <text x="72" y="276" font-family="Arial, sans-serif" font-size="59" font-weight="700" fill="#2B2A28">first-day logistics.</text>
    <text x="72" y="374" font-family="Arial, sans-serif" font-size="28" fill="#5F5A54">Practical planning for a first</text>
    <text x="72" y="414" font-family="Arial, sans-serif" font-size="28" fill="#5F5A54">independent trip to China.</text>
    <line x1="72" y1="490" x2="588" y2="490" stroke="#D8CABA" stroke-width="2"/>
    <text x="72" y="545" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="#4E7D67">firstchinatripkit.com</text>
  </svg>
`);
const homeOg = await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#F7F1E6" },
})
  .composite([
    { input: homeOgPhoto, left: 660, top: 0 },
    { input: homeOgOverlay, left: 0, top: 0 },
  ])
  .webp({ quality: 84, effort: 6, smartSubsample: true })
  .toBuffer();
await writeFile(homeOgPath, homeOg);
console.log(
  `public/images/home/phase-d/first-trip-phone-metro-og.webp: 1200x630, ${Math.round(homeOg.byteLength / 1024)}KB`,
);
