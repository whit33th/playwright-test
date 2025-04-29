import test, { expect } from "@playwright/test";
import { ENDPOINTS } from "../../../config/endpoints";
import { USER_DATA } from "../../../config/testData";
import { RegistrationPage } from "../../../pages/Forum/auth/RegistrationPage";

test.describe("Registration on forums page", () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo(ENDPOINTS.forums.registration.baseURL);
    await page.route("**/cookie-consent.js", (route) => route.abort());
  });

  test("Check agreement elements are visible", async ({ page }) => {
    const agreeButton = page.locator(
      registrationPage.elements.agreement.agreeButton
    );
    const disagreeButton = page.locator(
      registrationPage.elements.agreement.disagreeButton
    );
    const agreementText = page.locator(
      registrationPage.elements.agreement.agreementText
    );

    await expect(agreementText).toBeVisible();
    await expect(agreeButton).toBeVisible();
    await expect(disagreeButton).toBeVisible();
  });

  test("Agree with terms", async ({ page }) => {
    await registrationPage.acceptTerms();
    await expect(page).toHaveTitle("R&D ForumsUser Control Panel  - ");
  });

  test("Disagree with terms", async ({ page }) => {
    await registrationPage.declineTerms();
    await expect(page).toHaveTitle("R&D Forums");
  });

  for (let user of Object.values(USER_DATA)) {
    //Testing various registration scenarios with different User data
    test(user.testName, async ({ page }) => {
      await expect(async () => {
        const isCookieButtonVisible = await page
          .locator(registrationPage.elements.cookies.acceptButton)
          .isVisible();

        if (isCookieButtonVisible) {
          await page
            .locator(registrationPage.elements.cookies.acceptButton)
            .click();
        }
        await registrationPage.acceptTerms();
        await expect(
          page.locator(registrationPage.elements.form.usernameInput)
        ).toBeVisible({ timeout: 2000 });
      }).toPass({ timeout: 12000 });

      await registrationPage.fillRegistrationForm(user);
      await registrationPage.submitRegistrationForm();

      await page.waitForSelector(registrationPage.elements.form.errorMessage);

      expect(
        await page
          .locator(registrationPage.elements.form.errorMessage)
          .isVisible()
      ).toBeTruthy();

      if (user.result?.message) {
        const errorText = await page
          .locator(registrationPage.elements.form.errorMessage)
          .textContent();

        expect(errorText).toContain(user.result.message);
      }
    });
  }
});
