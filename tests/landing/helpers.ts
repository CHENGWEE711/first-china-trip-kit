import type { Page, Response } from "@playwright/test";

type GotoOptions = NonNullable<Parameters<Page["goto"]>[1]>;

const retryableNavigationError =
  /NS_ERROR_NET_INTERRUPT|ERR_CONNECTION_RESET|ERR_NETWORK_CHANGED|ECONNRESET|socket hang up|Client network socket disconnected/i;

export async function gotoWithNetworkRetry(
  page: Page,
  url: string,
  options?: GotoOptions,
): Promise<Response | null> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await page.goto(url, options);
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      if (!retryableNavigationError.test(message) || attempt === 2) throw error;
      await page.waitForTimeout(250 * (attempt + 1));
    }
  }

  throw lastError;
}
