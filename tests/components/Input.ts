import { Page } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Input extends BaseComponent {
  protected defaultTimeout: number = 10000;
  constructor(page: Page) {
    super(page);
  }

  // Input specific methods
  async fill(
    selector: string,
    value: string,
    options = { timeout: this.defaultTimeout }
  ): Promise<void> {
    await this.page
      .locator(selector)
      .waitFor({ state: "visible", timeout: options.timeout });
    await this.page.locator(selector).fill(value);
  }

  async clear(selector: string): Promise<void> {
    await this.page.locator(selector).fill("");
  }

  async getValue(selector: string): Promise<string | null> {
    return await this.page.locator(selector).inputValue();
  }
}
