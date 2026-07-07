export const defaultLocale = "en";

export const supportedLocales = [
  {
    code: "en",
    label: "English",
  },
] as const;

export type SupportedLocale = (typeof supportedLocales)[number]["code"];

export function localizedPath(path: string, locale: SupportedLocale = defaultLocale) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}
