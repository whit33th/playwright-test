import { Page, Locator } from "@playwright/test";

export class BaseComponent {
  protected page: Page;
  protected defaultTimeout: number = 10000;

  constructor(page: Page) {
    this.page = page;
  }

  // Common methods all components would need
  async click(
    selector: string,
    options = { timeout: this.defaultTimeout }
  ): Promise<void> {
    try {
      await this.page
        .locator(selector)
        .waitFor({ state: "visible", timeout: options.timeout });
      await this.page.locator(selector).click();
    } catch (error) {
      console.error(`Failed to click on element with selector: ${selector}`);
      throw error;
    }
  }
  async clickAndWait(
    selector: string,
    options = {
      timeout: this.defaultTimeout,
      waitUntil: "domcontentloaded" as
        | "domcontentloaded"
        | "load"
        | "networkidle",
    }
  ): Promise<void> {
    try {
      const link = this.page.locator(selector);
      await link.waitFor({ state: "visible", timeout: options.timeout });

      await Promise.all([
        this.page.waitForNavigation({
          waitUntil: options.waitUntil,
          timeout: options.timeout,
        }),
        link.click({ timeout: options.timeout }),
      ]);

      await this.page.waitForLoadState(options.waitUntil);
    } catch (error) {
      console.error(`Failed to click and wait: ${selector}`, error);
      throw error;
    }
  }

  async hover(
    selector: string,
    options = { timeout: this.defaultTimeout }
  ): Promise<void> {
    try {
      await this.page
        .locator(selector)
        .waitFor({ state: "visible", timeout: options.timeout });
      await this.page.locator(selector).hover({ timeout: options.timeout });
    } catch (error) {
      console.error(`Failed to hover on element with selector: ${selector}`);
      throw error;
    }
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }
}
