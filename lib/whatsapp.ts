const configuredWhatsAppUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "";

export function isValidWhatsAppContactUrl(value: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "wa.me") return false;

    const path = url.pathname.replace(/^\/+|\/+$/g, "");
    return (
      /^\d{7,15}$/.test(path) ||
      /^message\/[A-Za-z0-9_-]+$/.test(path) ||
      /^[A-Za-z][A-Za-z0-9._-]{2,29}$/.test(path)
    );
  } catch {
    return false;
  }
}

export function getWhatsAppUrl() {
  return isValidWhatsAppContactUrl(configuredWhatsAppUrl)
    ? configuredWhatsAppUrl
    : "";
}

export function hasWhatsAppContact() {
  return Boolean(getWhatsAppUrl());
}
