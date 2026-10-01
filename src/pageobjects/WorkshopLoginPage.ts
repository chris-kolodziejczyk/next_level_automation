import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

const loginUrl = process.env.LOGIN_URL ?? 'http://localhost:3000/login';

export class WorkshopLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, loginUrl);

    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.locator('#submit-login');
    this.errorMessage = this.page.getByTestId('login-error');
  }

  async loginAs(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
