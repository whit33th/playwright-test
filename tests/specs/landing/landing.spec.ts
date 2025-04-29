import test, { expect } from "@playwright/test";
import { ENDPOINTS } from "../../config/endpoints";
import { SELECTORS } from "../../config/selectors";
import { LandingPage } from "../../pages/LandingPage";
import { acceptCookies } from "../../utils/Cookies";

test.describe("Landing page tests", () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigateTo(ENDPOINTS.landing);
    await acceptCookies(page);
  });

  test("Navigation to Forums page", async ({ page, isMobile }) => {
    await expect(async () => {
      //Verify URL
      const expectedForumUrl =
        ENDPOINTS.forums.baseUrl + ENDPOINTS.forums.params.menuSupport;
      const currentUrl = page.url();

      if (currentUrl !== expectedForumUrl) {
        await landingPage.navigateToForum(isMobile);
        return false;
      }

      return true;
    }).toPass({ timeout: 12000 });

    //Title
    await expect(page).toHaveTitle("R&D Forums");

    //Tables
    const tables = page.locator(SELECTORS.forums.table);
    const count = await tables.count();
    expect(count).toEqual(2);
    for (let i = 0; i < count; i++) {
      const table = tables.nth(i);
      await expect(table).toBeVisible();
    }

    //Auth Form
    const authForm = page.locator(SELECTORS.forums.authForm.form);
    await expect(authForm).toBeVisible();
  });
});
