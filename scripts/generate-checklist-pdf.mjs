import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const sourcePath = "public/china-first-time-visitor-checklist.pdf";
const outputPath = "output/pdf/china-first-time-visitor-checklist.pdf";

if (!existsSync(sourcePath)) {
  throw new Error(
    `Missing ${sourcePath}. Regenerate the checklist PDF before building.`,
  );
}

mkdirSync(path.dirname(outputPath), { recursive: true });
copyFileSync(sourcePath, outputPath);

console.log(`Checklist PDF ready: ${sourcePath}`);
