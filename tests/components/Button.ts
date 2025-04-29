import { Page, selectors } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Button extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  //Created test function for clarity (Not used)
  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }
}
