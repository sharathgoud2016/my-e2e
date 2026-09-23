import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async gotoPath(baseUrl: string, pathName: string): Promise<void> {
    const url = new URL(pathName.replace(/^\//, ""), baseUrl).toString();
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
