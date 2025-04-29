import { Page } from "@playwright/test";
import { Link } from "../../components/Link";
import { SELECTORS } from "../../config/selectors";
import { AbstractPage } from "../AbstractPage";

export class ForumsPage extends AbstractPage {
  private link: Link;
  readonly elements = {
    auth: {
      registerLink: SELECTORS.forums.authForm.registerLink,
    },
  };
  constructor(page: Page) {
    super(page);
    this.link = new Link(page);
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async startRegistrationProcess(): Promise<void> {
    await this.link.clickAndWait(this.elements.auth.registerLink);
  }
}
