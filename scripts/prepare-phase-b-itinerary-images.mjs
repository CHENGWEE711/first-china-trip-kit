import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const maxBytes = 700 * 1024;

const assets = [
  {
    id: "unsplash-temple-heaven-hongjin-wang",
    sourceUrl: "https://images.unsplash.com/photo-1769953556486-0e8747232858?auto=format&fit=max&fm=jpg&q=88&w=3000",
    output: "public/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp",
    width: 2400,
    height: 1600,
    minimumSourceWidth: 2000,
  },
  {
    id: "unsplash-forbidden-city-allan-n",
    sourceUrl: "https://images.unsplash.com/photo-1773069688167-468995d1e3af?auto=format&fit=max&fm=jpg&q=88&w=3000",
    output: "public/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp",
    width: 1800,
    height: 1200,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-summer-palace-xiquinhosilva",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/Longevity_Hill_of_the_Summer_Palace.jpg",
    output: "public/images/itineraries/4-days-beijing/day-4-summer-palace.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
  {
    id: "unsplash-xian-bell-tower-jun-huang",
    sourceUrl: "https://images.unsplash.com/photo-1665509760587-8ffb40dad7cc?auto=format&fit=max&fm=jpg&q=88&w=3000",
    output: "public/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp",
    width: 2400,
    height: 1600,
    minimumSourceWidth: 2000,
  },
  {
    id: "wikimedia-terracotta-army-xiquinhosilva",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Terracotta_Army_%2854082561381%29.jpg",
    output: "public/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp",
    width: 1800,
    height: 1200,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-terracotta-pit-will-clayton",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Terracotta_Warriors_-_Xi%27an_%284535488885%29.jpg",
    output: "public/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-west-lake-sunset-wanderingchina",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Aerial_panorama_of_West_Lake_sunset_and_its_lakeside_district._December_2023.jpg",
    output: "public/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp",
    width: 2400,
    height: 1600,
    minimumSourceWidth: 2000,
  },
  {
    id: "wikimedia-suzhou-garden-jason-zhang",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Classical_Gardens_of_Suzhou_pavilion%2C_August_2016.jpg",
    output: "public/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp",
    width: 1800,
    height: 1200,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-longjing-tea-peter-burian",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Longjing_Tea_field%2C_Dragon_Well_area%2C_Meijiawu_China.jpg",
    output: "public/images/itineraries/eastern-china/longjing-tea-fields.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-yu-garden-stefan-fussan",
    sourceUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shanghai_-_Yu_Garden_-_0034.jpg?width=2400",
    output: "public/images/itineraries/eastern-china/yu-garden-shanghai.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
  {
    id: "unsplash-pudong-airport-declan-sun",
    sourceUrl: "https://images.unsplash.com/photo-1757206637677-330df0d7dfe8?auto=format&fit=max&fm=jpg&q=88&w=3000",
    output: "public/images/itineraries/240-hour-transit/hero-pudong-airport.webp",
    width: 2400,
    height: 1600,
    minimumSourceWidth: 2000,
  },
  {
    id: "wikimedia-passport-luggage-aatu-dorochenko",
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/E2A0423.jpg",
    output: "public/images/itineraries/240-hour-transit/card-passport-luggage.webp",
    width: 1800,
    height: 1200,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-west-lake-panorama-bjoertvedt",
    sourceUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/West_Lake_IMG_8756_hangzhou_panorama.jpg?width=2400",
    output: "public/images/itineraries/240-hour-transit/day-6-west-lake.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-pudong-2017-king-of-hearts",
    sourceUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pudong_Shanghai_November_2017.jpg?width=2400",
    output: "public/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
  {
    id: "wikimedia-zhujiajiao-chensiyuan",
    sourceUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1_zhujiajiao_ancient_water_town_2023.jpg?width=2400",
    output: "public/images/itineraries/240-hour-transit/day-9-zhujiajiao.webp",
    width: 2000,
    height: 1125,
    minimumSourceWidth: 1400,
  },
];

async function fetchImage(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "FirstChinaTripKit/1.0 (licensed asset preparation)" },
        signal: AbortSignal.timeout(45_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("image/")) throw new Error(`Unexpected content type ${contentType}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw lastError;
}

for (const asset of assets) {
  const outputPath = path.join(root, asset.output);
  if (process.env.FORCE_PHASE_B_IMAGES !== "1" && fs.existsSync(outputPath)) {
    const existingMetadata = await sharp(outputPath).metadata();
    const existingBytes = fs.statSync(outputPath).size;
    if (existingMetadata.width === asset.width && existingMetadata.height === asset.height && existingBytes <= maxBytes) {
      console.log(JSON.stringify({ id: asset.id, output: asset.output.replace(/^public/, ""), status: "already-prepared", bytes: existingBytes }));
      continue;
    }
  }
  const source = await fetchImage(asset.sourceUrl);
  const sourceMetadata = await sharp(source).metadata();
  if (!sourceMetadata.width || sourceMetadata.width < asset.minimumSourceWidth) {
    throw new Error(`${asset.id}: source width ${sourceMetadata.width || 0}px is below ${asset.minimumSourceWidth}px`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  let encoded;
  let qualityUsed = 84;
  for (const quality of [84, 80, 76, 72]) {
    qualityUsed = quality;
    encoded = await sharp(source)
      .rotate()
      .resize(asset.width, asset.height, { fit: "cover", position: "centre", withoutEnlargement: false })
      .webp({ quality, effort: 5, smartSubsample: true })
      .toBuffer();
    if (encoded.length <= maxBytes) break;
  }
  if (!encoded || encoded.length > maxBytes) throw new Error(`${asset.id}: output still exceeds 700KB`);
  fs.writeFileSync(outputPath, encoded);
  console.log(JSON.stringify({
    id: asset.id,
    output: asset.output.replace(/^public/, ""),
    source: `${sourceMetadata.width}x${sourceMetadata.height}`,
    outputSize: `${asset.width}x${asset.height}`,
    quality: qualityUsed,
    bytes: encoded.length,
  }));
}
