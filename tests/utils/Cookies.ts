import { Page } from "@playwright/test";
import { Button } from "../components/Button";
import { SELECTORS } from "../config/selectors";

export async function acceptCookies(page: Page): Promise<void> {
  try {
    const button = new Button(page);
    const cookieSelector = SELECTORS.cookies.acceptButton;

    const cookiesBanner = await page
      .locator(cookieSelector)
      .isVisible({ timeout: 10000 })
      .catch(() => false);

    if (cookiesBanner) {
      await button.click(cookieSelector);
    }
  } catch (error) {
    console.warn("Failed to accept cookies", error);
  }
}
