import { expect } from "@playwright/test";
import { getBaseUrl } from "../core/env";
import { SITE_PATHS } from "../core/site-catalog";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  async openHome(): Promise<void> {
    await this.gotoPath(getBaseUrl(), SITE_PATHS.home);
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.+/);
    expect((await this.getTitle()).trim().length).toBeGreaterThan(0);
  }
}
