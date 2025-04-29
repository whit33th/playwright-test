import { Page } from "@playwright/test";
import { Button } from "../components/Button";
import { Link } from "../components/Link";
import { SELECTORS } from "../config/selectors";
import { AbstractPage } from "./AbstractPage";

export class LandingPage extends AbstractPage {
  private link: Link;
  private button: Button;

  readonly elements = {
    cookies: {
      acceptButton: SELECTORS.cookies.acceptButton,
    },

    navigation: {
      rdForumsLink: SELECTORS.landing.rdForumsLink,
      supportButton: SELECTORS.landing.supportButton,
      mobileToggleNav: SELECTORS.landing.mobileToggleNav,
    },
  };

  constructor(page: Page) {
    super(page);
    this.link = new Link(page);
    this.button = new Button(page);
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async navigateToForum(isMobile: boolean): Promise<void> {
    try {
      if (isMobile) {
        await this.button.click(this.elements.navigation.mobileToggleNav);
        await this.button.click(this.elements.navigation.supportButton);
        await this.link.clickAndWait(this.elements.navigation.rdForumsLink);
      } else {
        await this.button.hover(this.elements.navigation.supportButton);
        await this.link.clickAndWait(this.elements.navigation.rdForumsLink);
      }
    } catch (error) {
      console.error("Failed to navigate to forum:", error);
      throw error;
    }
  }
}
