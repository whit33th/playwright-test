import { Page } from "@playwright/test";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { IUser } from "../../../config/interfaces/User";
import { SELECTORS } from "../../../config/selectors";
import { acceptCookies } from "../../../utils/Cookies";
import { AbstractPage } from "../../AbstractPage";

export class RegistrationPage extends AbstractPage {
  private input: Input;
  private button: Button;

  readonly elements = {
    agreement: {
      disagreeButton: SELECTORS.forums.registration.agreement.disagreeButton,
      agreeButton: SELECTORS.forums.registration.agreement.agreeButton,
      agreementText: SELECTORS.forums.registration.agreement.agreementText,
    },
    form: {
      usernameInput: SELECTORS.forums.registration.usernameInput,
      emailInput: SELECTORS.forums.registration.emailInput,
      passwordInput: SELECTORS.forums.registration.passwordInput,
      confirmPasswordInput: SELECTORS.forums.registration.confirmPasswordInput,
      fullNameInput: SELECTORS.forums.registration.fullNameInput,
      submitButton: SELECTORS.forums.registration.submitButton,
      errorMessage: SELECTORS.forums.registration.errorMessages,
    },
  };

  constructor(page: Page) {
    super(page);
    this.input = new Input(page);
    this.button = new Button(page);
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async acceptTerms(): Promise<void> {
    await this.button.clickAndWait(this.elements.agreement.agreeButton, {
      timeout: 30000,
      waitUntil: "domcontentloaded",
    });
  }

  async declineTerms(): Promise<void> {
    await this.button.clickAndWait(this.elements.agreement.disagreeButton);
  }

  async fillRegistrationForm(userData: IUser): Promise<void> {
    try {
      await this.input.fill(
        this.elements.form.usernameInput,
        userData.username
      );
      await this.input.fill(
        this.elements.form.passwordInput,
        userData.password
      );
      await this.input.fill(
        this.elements.form.confirmPasswordInput,
        userData.password
      );
      await this.input.fill(this.elements.form.emailInput, userData.email);
      await this.input.fill(
        this.elements.form.fullNameInput,
        userData.fullName || ""
      );
    } catch (error) {
      console.error("Error filling registration form:", error);
      throw error;
    }
  }

  async submitRegistrationForm(): Promise<void> {
    await acceptCookies(this.page);
    await this.button.click(this.elements.form.submitButton);
  }

  async registerUser(userData: IUser): Promise<void> {
    await this.acceptTerms();
    await this.fillRegistrationForm(userData);
    await this.submitRegistrationForm();
  }
}
