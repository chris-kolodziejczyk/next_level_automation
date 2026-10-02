import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

// Page Object formularza HTML używanego w tests/patterns/login-page-object.spec.ts.
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page, '/login');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.flashMessage = page.getByTestId('flash-message');
  }

  async loginAs(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
