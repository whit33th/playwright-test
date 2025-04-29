import { Page, selectors } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Link extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  //Created the function for clarity (Not used)
  async getHref(selector: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute("href");
  }
}
