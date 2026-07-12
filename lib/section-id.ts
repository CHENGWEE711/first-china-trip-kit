export function createSectionId(title: string) {
  return title
    .normalize("NFKD")
    .toLocaleLowerCase("en")
    .replace(/\p{Mark}+/gu, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}
