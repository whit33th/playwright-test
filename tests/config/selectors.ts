export const SELECTORS = {
  cookies: { acceptButton: "#cookiescript_accept" },
  landing: {
    mobileToggleNav: ".main-navigation-toggle",
    supportButton: "[data-testid='support-button'], button:text-is('Support')",
    rdForumsLink: "[data-testid='r&d-forums'], a:text-is('R&D Forums')",
  },
  forums: {
    table: ".forabg",
    authForm: {
      form: "form.login-form",
      registerLink: "a:text-is('Register')",
    },
    registration: {
      agreement: {
        div: "#agreement",
        agreeButton: "inpu[name='agreed']",
        disagreeButton: "input[name='not_agreed']",
        agreementText: ".agreement",
      },
      usernameInput: "input[name='username']",
      emailInput: "input[name='email']",
      passwordInput: "input[name='new_password']",
      confirmPasswordInput: "input[name='password_confirm']",
      fullNameInput: "input[name='pf_fullname']",
      submitButton: "input#submit[type='submit']",
      errorMessages: "dd.error",
    },
  },
};
