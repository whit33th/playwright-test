import test, { expect } from "@playwright/test";
import { ENDPOINTS } from "../../config/endpoints";
import { SELECTORS } from "../../config/selectors";
import { ForumsPage } from "../../pages/Forum/ForumsPage";
import { acceptCookies } from "../../utils/Cookies";

test.describe("Forums page tests", () => {
  let forumsPage: ForumsPage;

  test.beforeEach(async ({ page }) => {
    forumsPage = new ForumsPage(page);
    await forumsPage.navigateTo(ENDPOINTS.forums.baseUrl);
    await acceptCookies(page);
  });

  test("Initiate registration process by clicking the Register link", async ({
    page,
  }) => {
    await forumsPage.startRegistrationProcess();

    //Title check
    await expect(page).toHaveTitle("R&D ForumsUser Control Panel  - ");

    //Agreement div
    const agreementElement = page.locator(
      SELECTORS.forums.registration.agreement.div
    );
    await expect(agreementElement).toBeVisible();

    //Agreement buttons
    const agreeButton = page.locator(
      SELECTORS.forums.registration.agreement.agreeButton
    );
    const disagreeButton = page.locator(
      SELECTORS.forums.registration.agreement.disagreeButton
    );
    await expect(agreeButton).toBeVisible();
    await expect(disagreeButton).toBeVisible();
  });
});
