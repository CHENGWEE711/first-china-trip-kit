import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
const storageState = process.env.PLAYWRIGHT_STORAGE_STATE;

export default defineConfig({
  testDir: "./tests",
  outputDir: "./tests/visual/diff",
  snapshotPathTemplate: "{testDir}/visual/approved/{testFileName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: externalBaseUrl || "http://localhost:3000",
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    storageState: storageState || undefined,
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
  projects: [
    {
      name: "chromium-desktop",
      grepInvert: /@chromium-mobile-only/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "chromium-mobile",
      grepInvert: /@chromium-desktop-only/,
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
      },
    },
    {
      name: "chromium-mobile-320",
      grepInvert: /@chromium-(?:desktop|mobile)-only/,
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        viewport: { width: 320, height: 568 },
      },
    },
    {
      name: "webkit-desktop",
      grepInvert: /@chromium-(?:desktop|mobile)-only/,
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "webkit-mobile",
      grepInvert: /@chromium-(?:desktop|mobile)-only/,
      use: {
        ...devices["iPhone 13"],
      },
    },
    {
      name: "firefox-desktop",
      grepInvert: /@chromium-(?:desktop|mobile)-only/,
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
