import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { resolveViewportSize } from "./regression-viewport";

function resolveHeadless(): boolean {
  if (process.env.PLAYWRIGHT_HEADFUL === "1") return false;
  if (process.env.PLAYWRIGHT_HEADLESS === "0") return false;
  if (process.env.PLAYWRIGHT_HEADLESS === "1" || process.env.CI === "true") return true;
  return false;
}

export class CustomWorld extends World {
  browser: Browser | null = null;
  context!: BrowserContext;
  page!: Page;

  async launchBrowser(): Promise<void> {
    const viewport = resolveViewportSize();
    const headless = resolveHeadless();
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext({ viewport, ignoreHTTPSErrors: true });
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(120_000);
  }

  async destroy(): Promise<void> {
    try {
      await this.context?.close();
    } catch {
      // Ignore cleanup failures.
    }
    try {
      await this.browser?.close();
    } catch {
      // Ignore cleanup failures.
    }
    this.browser = null;
  }
}

setWorldConstructor(CustomWorld);
