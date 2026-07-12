import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const screenshotDirectory = path.resolve("docs/screenshots/before");
const resultDirectory = path.join(screenshotDirectory, "audit-results");

const pages = [
  { name: "homepage", route: "/" },
  { name: "start-here", route: "/start-here" },
  { name: "city-kits", route: "/city-kits" },
  { name: "city-shanghai", route: "/city-kits/shanghai" },
  { name: "city-beijing", route: "/city-kits/beijing" },
  { name: "city-xian", route: "/city-kits/xian" },
  { name: "city-chengdu", route: "/city-kits/chengdu" },
  { name: "itinerary-kits", route: "/itinerary-kits" },
  { name: "itinerary-shanghai-3-days", route: "/itinerary-kits/3-days-in-shanghai" },
  {
    name: "itinerary-classic-china-10-days",
    route: "/itinerary-kits/10-days-classic-china-itinerary",
  },
  { name: "guides", route: "/guides" },
  { name: "guide-payment", route: "/guides/how-to-pay-in-china-as-a-foreigner" },
  { name: "guide-apps", route: "/guides/best-apps-for-traveling-in-china" },
  { name: "guide-visa-free-240-hour", route: "/guides/china-240-hour-visa-free-transit-guide" },
  { name: "travel-essentials", route: "/travel-essentials" },
  { name: "tools", route: "/tools" },
  { name: "store", route: "/store" },
  { name: "about", route: "/about" },
] as const;

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 1000 },
] as const;

const statusPhrases = [
  "Coming soon",
  "Partner link not configured",
  "Printable route kit is being prepared",
  "Future PDF",
  "when configured",
  "Only -1 left",
] as const;

type BrowserIssue = {
  type: "console" | "page";
  message: string;
};

async function wakeLazyImages(page: Page) {
  await page.locator("img").evaluateAll(async (elements) => {
    const images = (elements as HTMLImageElement[]).filter((image) => {
      const rect = image.getBoundingClientRect();
      const style = window.getComputedStyle(image);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    });
    for (const image of images) {
      image.scrollIntoView({ block: "center" });
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }

    await Promise.all(
      images.map(
        (image) =>
          new Promise<void>((resolve) => {
            if (image.complete) {
              resolve();
              return;
            }
            const finish = () => resolve();
            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", finish, { once: true });
            window.setTimeout(finish, 3_000);
          }),
      ),
    );
    window.scrollTo(0, 0);
    await new Promise((resolve) => window.setTimeout(resolve, 50));
  });
}

mkdirSync(resultDirectory, { recursive: true });

test.describe("Phase 2 visual baseline audit", () => {
  test.describe.configure({ mode: "parallel" });

  for (const pageDefinition of pages) {
    for (const viewport of viewports) {
      test(`${pageDefinition.name} at ${viewport.width}x${viewport.height}`, async ({ page }) => {
        const browserIssues: BrowserIssue[] = [];

        page.on("console", (message) => {
          if (message.type() === "error") {
            browserIssues.push({ type: "console", message: message.text() });
          }
        });
        page.on("pageerror", (error) => {
          browserIssues.push({ type: "page", message: error.message });
        });

        await page.setViewportSize(viewport);
        await page.emulateMedia({ reducedMotion: "reduce" });
        const response = await page.goto(pageDefinition.route, { waitUntil: "domcontentloaded" });

        expect(response, `${pageDefinition.route} should return a document`).not.toBeNull();
        expect(response?.status(), `${pageDefinition.route} should not return a 404`).toBeLessThan(400);

        await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important; }" });

        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        await wakeLazyImages(page);
        await page.evaluate(() => window.scrollTo(0, 0));
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
        await page.waitForTimeout(150);

        const metrics = await page.evaluate((phrases) => {
          const isVisible = (element: Element) => {
            const htmlElement = element as HTMLElement;
            const rect = htmlElement.getBoundingClientRect();
            const style = window.getComputedStyle(htmlElement);
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              Number(style.opacity) !== 0 &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const labelFor = (element: Element) => {
            const htmlElement = element as HTMLElement;
            return (
              htmlElement.innerText?.trim() ||
              element.getAttribute("aria-label")?.trim() ||
              element.getAttribute("title")?.trim() ||
              element.querySelector("img")?.getAttribute("alt")?.trim() ||
              ""
            );
          };

          const normalizedImageSource = (image: HTMLImageElement) => {
            try {
              const url = new URL(image.currentSrc || image.src, window.location.href);
              return url.searchParams.get("url") || url.pathname;
            } catch {
              return image.currentSrc || image.src;
            }
          };

          const images = Array.from(document.images).filter(isVisible);
          const failedImages = images
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => normalizedImageSource(image));
          const missingAltImages = images
            .filter((image) => !image.hasAttribute("alt"))
            .map((image) => normalizedImageSource(image));

          const controls = Array.from(document.querySelectorAll("button, [role='button']")).filter(isVisible);
          const emptyButtons = controls.filter((element) => !labelFor(element)).map((element) => element.outerHTML.slice(0, 180));

          const ctaPattern = /get|start|open|explore|download|buy|shop|plan|check|view|read|contact|subscribe|send|join/i;
          const ctas = Array.from(document.querySelectorAll("a, button, [role='button']"))
            .filter(isVisible)
            .filter((element) => ctaPattern.test(labelFor(element)));
          const unclickableCtas = ctas
            .filter((element) => {
              const htmlElement = element as HTMLElement;
              const style = window.getComputedStyle(htmlElement);
              if (style.pointerEvents === "none" || element.getAttribute("aria-disabled") === "true") return true;
              if (element instanceof HTMLButtonElement) return element.disabled;
              if (element instanceof HTMLAnchorElement) {
                const href = element.getAttribute("href")?.trim();
                return !href || href === "#" || href.toLowerCase().startsWith("javascript:");
              }
              return false;
            })
            .map(labelFor);

          const pageText = document.body.innerText;
          const visibleTechnicalStatuses = phrases.filter((phrase) =>
            pageText.toLowerCase().includes(phrase.toLowerCase()),
          );

          const main = document.querySelector("main");
          const mainRect = main?.getBoundingClientRect();
          const overflowingElements = Array.from(main?.querySelectorAll("*") ?? [])
            .filter(isVisible)
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              if (rect.left < -1_000) return false;
              return rect.left < -1 || rect.right > document.documentElement.clientWidth + 1;
            })
            .slice(0, 12)
            .map((element) => ({
              tag: element.tagName.toLowerCase(),
              className: (element as HTMLElement).className?.toString().slice(0, 120) || "",
              left: Math.round(element.getBoundingClientRect().left),
              right: Math.round(element.getBoundingClientRect().right),
            }));

          const mainImages = Array.from(main?.querySelectorAll("img") ?? []).filter(isVisible) as HTMLImageElement[];
          const firstTwoImageSources = mainImages.slice(0, 2).map(normalizedImageSource);
          const repeatedFirstImage =
            firstTwoImageSources.length === 2 && firstTwoImageSources[0] === firstTwoImageSources[1]
              ? firstTwoImageSources[0]
              : null;

          const hero = mainImages.find((image) => image.getBoundingClientRect().top < window.innerHeight);
          const heroRect = hero?.getBoundingClientRect();
          const heroImageRatio = hero && hero.naturalHeight ? hero.naturalWidth / hero.naturalHeight : null;
          const heroDisplayRatio = heroRect?.height ? heroRect.width / heroRect.height : null;
          const heroCropRetention =
            heroImageRatio && heroDisplayRatio
              ? Math.min(heroImageRatio / heroDisplayRatio, heroDisplayRatio / heroImageRatio)
              : null;

          const header = document.querySelector("header");
          const headerRect = header?.getBoundingClientRect();
          const firstHeadingRect = main?.querySelector("h1")?.getBoundingClientRect();
          const navigationObstruction = Boolean(
            headerRect &&
              firstHeadingRect &&
              headerRect.bottom > firstHeadingRect.top + firstHeadingRect.height * 0.2,
          );

          const textBlocks = Array.from(main?.querySelectorAll("h1, h2, h3, p, li") ?? [])
            .filter(isVisible)
            .map((element) => element.getBoundingClientRect());
          const fixedOverlays = Array.from(document.querySelectorAll("body *"))
            .filter(isVisible)
            .filter((element) => !element.matches("header, header *"))
            .filter((element) => {
              const position = window.getComputedStyle(element).position;
              return position === "fixed" || position === "sticky";
            })
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return textBlocks.some((textRect) => {
                const overlapWidth = Math.max(0, Math.min(rect.right, textRect.right) - Math.max(rect.left, textRect.left));
                const overlapHeight = Math.max(0, Math.min(rect.bottom, textRect.bottom) - Math.max(rect.top, textRect.top));
                return overlapWidth * overlapHeight > 400;
              });
            })
            .slice(0, 8)
            .map((element) => ({
              tag: element.tagName.toLowerCase(),
              label: labelFor(element).slice(0, 100),
              position: window.getComputedStyle(element).position,
            }));

          return {
            title: document.title,
            pathname: window.location.pathname,
            viewport: { width: window.innerWidth, height: window.innerHeight },
            documentWidth: document.documentElement.scrollWidth,
            documentHeight: document.documentElement.scrollHeight,
            horizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            h1Count: document.querySelectorAll("h1").length,
            imageCount: images.length,
            failedImages,
            missingAltImages,
            emptyButtons,
            ctaCount: ctas.length,
            unclickableCtas,
            visibleTechnicalStatuses,
            visibleDevelopmentIndicators: document.querySelectorAll("nextjs-portal").length,
            articleCount: main?.querySelectorAll("article").length ?? 0,
            headingCount: main?.querySelectorAll("h1, h2, h3").length ?? 0,
            mainWidth: mainRect ? Math.round(mainRect.width) : null,
            overflowingElements,
            firstTwoImageSources,
            repeatedFirstImage,
            hero: hero
              ? {
                  source: normalizedImageSource(hero),
                  alt: hero.alt,
                  displayWidth: Math.round(heroRect?.width ?? 0),
                  displayHeight: Math.round(heroRect?.height ?? 0),
                  intrinsicWidth: hero.naturalWidth,
                  intrinsicHeight: hero.naturalHeight,
                  objectFit: window.getComputedStyle(hero).objectFit,
                  objectPosition: window.getComputedStyle(hero).objectPosition,
                  cropRetention: heroCropRetention ? Number(heroCropRetention.toFixed(3)) : null,
                }
              : null,
            navigationObstruction,
            fixedOverlays,
          };
        }, statusPhrases);

        const shouldArchiveScreenshot = viewport.width === 390 || viewport.width === 1440;
        const screenshotName = shouldArchiveScreenshot ? `${pageDefinition.name}-${viewport.width}.png` : null;
        if (screenshotName) {
          await page.screenshot({
            path: path.join(screenshotDirectory, screenshotName),
            fullPage: true,
            animations: "disabled",
          });
        }

        const result = {
          page: pageDefinition.name,
          route: pageDefinition.route,
          screenshot: screenshotName,
          responseStatus: response?.status() ?? null,
          browserIssues,
          ...metrics,
        };

        writeFileSync(
          path.join(resultDirectory, `${pageDefinition.name}-${viewport.width}.json`),
          `${JSON.stringify(result, null, 2)}\n`,
        );
      });
    }
  }
});
