import { Page } from "@playwright/test";

declare global {
  interface Window {
    hcaptcha: {
      render: () => any;
    };
    grecaptcha: {
      render: () => any;
    };
  }
}

export async function bypassCaptcha(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.hcaptcha = {
      render: () => {},
    };

    window.grecaptcha = {
      render: () => {},
    };
  });
}
