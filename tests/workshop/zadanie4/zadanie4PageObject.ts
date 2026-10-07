/**
 * @file Page Object logowania i wyniku UI dla konta przygotowanego przez fixture API.
 */
import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '@pageobjects/basePage';

/** Page Object logowania i wyniku UI dla konta przygotowanego przez fixture API. Asercje rezultatu wykonuje test. */
export class Zadanie4PageObject extends BasePage {
  /** Pole Email w formularzu logowania. */
  readonly emailInput: Locator;
  /** Pole Password w formularzu logowania. */
  readonly passwordInput: Locator;
  /** Przycisk Sign in wysyłający formularz. */
  readonly submitButton: Locator;
  /** Nagłówek Dashboard pojawiający się po udanym logowaniu. */
  readonly dashboardHeading: Locator;
  /** Powitanie z adresem zalogowanego konta w welcome-message. */
  readonly welcomeMessage: Locator;

  /**
   * Przygotowuje locatory i ustawia domyślną ścieżkę /login.
   * @param page - Strona bieżącego testu, na której będą wykonywane interakcje.
   */
  constructor(page: Page) {
    super(page, '/login');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', exact: true });
    this.welcomeMessage = page.getByTestId('welcome-message');
  }

  /**
   * Wypełnia oba pola i wysyła formularz przyciskiem Sign in.
   * @param email - Wartość wpisywana do pola Email.
   * @param password - Wartość wpisywana do pola Password, także pusty string.
   * @returns Obietnica zakończenia interakcji z formularzem.
   */
  async loginAs(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
