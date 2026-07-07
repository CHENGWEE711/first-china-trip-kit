import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const defaults = JSON.parse(readFileSync("lib/site-defaults.json", "utf8"));
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaults.defaultSiteUrl).replace(/\/$/, "");
const outputPaths = [
  "public/china-first-time-visitor-checklist.pdf",
  "output/pdf/china-first-time-visitor-checklist.pdf",
];

const pageWidth = 612;
const pageHeight = 792;
const margin = 48;

function escapePdfText(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function drawText(ops, text, x, y, options = {}) {
  const {
    font = "F1",
    size = 10,
    color = "0.176 0.157 0.149",
  } = options;
  ops.push(`${color} rg`);
  ops.push(`BT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawWrapped(ops, text, x, y, options = {}) {
  const { maxChars = 84, size = 10, lineHeight = 14, font = "F1", color } = options;
  let nextY = y;
  for (const line of wrapText(text, maxChars)) {
    drawText(ops, line, x, nextY, { font, size, color });
    nextY -= lineHeight;
  }
  return nextY;
}

function drawHeaderFooter(ops, pageNumber) {
  drawText(ops, defaults.name, margin, 756, {
    font: "F2",
    size: 11,
    color: "0.694 0.227 0.184",
  });
  drawText(ops, siteUrl, 360, 756, {
    font: "F1",
    size: 9,
    color: "0.333 0.302 0.286",
  });
  ops.push("0.82 0.78 0.72 RG 0.5 w 48 742 m 564 742 l S");
  ops.push("0.82 0.78 0.72 RG 0.5 w 48 52 m 564 52 l S");
  drawText(ops, `${defaults.name} - ${siteUrl}`, margin, 34, {
    font: "F1",
    size: 9,
    color: "0.333 0.302 0.286",
  });
  drawText(ops, `Page ${pageNumber}`, 520, 34, {
    font: "F1",
    size: 9,
    color: "0.333 0.302 0.286",
  });
}

function drawSection(ops, title, items, x, y) {
  drawText(ops, title, x, y, {
    font: "F2",
    size: 13,
    color: "0.176 0.157 0.149",
  });
  y -= 20;
  for (const item of items) {
    y = drawWrapped(ops, `[ ] ${item}`, x, y, {
      maxChars: 72,
      size: 10,
      lineHeight: 13,
      color: "0.333 0.302 0.286",
    });
    y -= 6;
  }
  return y - 8;
}

function createPageOne() {
  const ops = [];
  drawHeaderFooter(ops, 1);
  drawText(ops, "China First-Time Visitor Checklist", margin, 710, {
    font: "F2",
    size: 24,
    color: "0.176 0.157 0.149",
  });
  drawWrapped(
    ops,
    "A practical pre-flight and arrival-day checklist for foreign visitors planning their first China trip.",
    margin,
    680,
    { maxChars: 86, size: 11, lineHeight: 15, color: "0.333 0.302 0.286" },
  );

  let y = 632;
  y = drawSection(ops, "Before you fly", [
    "Confirm visa, visa-free transit, or entry eligibility for your passport.",
    "Save flights, hotels, train tickets, attraction bookings, and insurance offline.",
    "Keep passport name format consistent across bookings and payment apps.",
  ], margin, y);
  y = drawSection(ops, "Arrival day", [
    "Set up mobile data before leaving the airport or train station.",
    "Save your hotel name, Chinese address, phone number, and nearest landmark.",
    "Make one small payment test before relying on mobile payment for the day.",
  ], margin, y);
  y = drawSection(ops, "Payment", [
    "Prepare Alipay as the main wallet and WeChat Pay as a backup if available.",
    "Carry one physical card for hotels and deposits.",
    "Keep a small RMB cash backup for taxis, late arrivals, and app problems.",
  ], margin, y);
  drawSection(ops, "Apps", [
    "Prepare payment, maps, translation, ride-hailing, and train support.",
    "Log in before arrival when possible and keep screenshots of key bookings.",
    "Download offline Chinese translation support before the flight.",
  ], margin, y);

  return ops.join("\n");
}

function createPageTwo() {
  const ops = [];
  drawHeaderFooter(ops, 2);

  let y = 710;
  y = drawSection(ops, "Internet", [
    "Choose roaming, eSIM, SIM card, or pocket Wi-Fi before landing.",
    "Keep payment, maps, and translation usable even if one app fails.",
  ], margin, y);
  y = drawSection(ops, "Hotel address", [
    "Save the Chinese address as text and screenshot.",
    "Keep the hotel phone number ready for taxis, ride-hailing, and late check-in.",
  ], margin, y);
  y = drawSection(ops, "Transport", [
    "Check the exact railway station name before booking high-speed trains.",
    "Arrive 45-60 minutes early at large stations for passport checks and security.",
    "Keep train number, gate, carriage, and seat details screenshotted.",
  ], margin, y);
  y = drawSection(ops, "Food", [
    "Use camera translation for menus and keep short dietary phrases ready.",
    "Try simple local meals near your hotel on the first day.",
  ], margin, y);
  y = drawSection(ops, "Packing", [
    "Bring a power bank, adapter, comfortable shoes, tissues, medicine, and a small umbrella.",
    "Keep luggage light enough for station walks, metro transfers, and train boarding.",
  ], margin, y);
  drawSection(ops, "Emergency phrases", [
    "Please help me: Qing bang bang wo.",
    "I need to go to the hospital: Wo xu yao qu yi yuan.",
    "Please take me to this address: Qing dai wo qu zhe ge di zhi.",
  ], margin, y);

  return ops.join("\n");
}

function buildPdf(contentStreams) {
  const objects = [];
  const reserve = () => {
    objects.push("");
    return objects.length;
  };
  const add = (value) => {
    objects.push(value);
    return objects.length;
  };

  const catalogId = reserve();
  const pagesId = reserve();
  const fontRegularId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];

  for (const stream of contentStreams) {
    const topLinkId = add(
      `<< /Type /Annot /Subtype /Link /Rect [360 748 560 764] /Border [0 0 0] /A << /S /URI /URI (${escapePdfText(siteUrl)}) >> >>`,
    );
    const bottomLinkId = add(
      `<< /Type /Annot /Subtype /Link /Rect [48 26 300 42] /Border [0 0 0] /A << /S /URI /URI (${escapePdfText(siteUrl)}) >> >>`,
    );
    const contentId = add(
      `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    );
    const pageId = add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Annots [${topLinkId} 0 R ${bottomLinkId} 0 R] /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  }

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] =
    `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

const pdf = buildPdf([createPageOne(), createPageTwo()]);

for (const outputPath of outputPaths) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, pdf);
}

console.log(`Generated checklist PDF with site URL: ${siteUrl}`);
