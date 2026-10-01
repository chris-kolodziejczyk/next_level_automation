import { type Page } from '@playwright/test';
import { BasePage } from './basePage';

const loginUrl = process.env.LOGIN_URL ?? 'http://localhost:3000/login';

export class WorkshopLoginPage extends BasePage {
  // TODO: Zaimportuj typ Locator i zadeklaruj locatory:
  // emailInput, passwordInput, submitButton oraz errorMessage.

  constructor(page: Page) {
    super(page, loginUrl);

    // TODO: Zainicjalizuj locatory dla formularza lokalnej aplikacji.
    // Sprawdź app/server.js i dobierz selektory po labelu, roli lub data-testid.
  }

  async loginAs(email: string, password: string) {
    // TODO: Wypełnij email i hasło, a następnie wyślij formularz.
    // Asercję wyniku logowania pozostaw w teście.
    throw new Error('TODO: Zaimplementuj WorkshopLoginPage.loginAs');
  }
}
