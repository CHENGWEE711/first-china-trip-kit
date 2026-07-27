const htmlTagPattern = /<[^>]*>/g;
const controlCharacterPattern = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizePlainText(value: unknown, maxLength: number) {
  return String(value || "")
    .replace(htmlTagPattern, "")
    .replace(controlCharacterPattern, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase().slice(0, 254);
}
