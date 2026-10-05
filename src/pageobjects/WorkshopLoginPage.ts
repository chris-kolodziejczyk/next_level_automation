/**
 * @file Szkielet Page Object do ćwiczeń z formularzem lokalnej aplikacji.
 */
import { type Page } from '@playwright/test';
import { BasePage } from './basePage';

/** URL formularza z LOGIN_URL, odczytany przy imporcie modułu, z lokalną wartością domyślną. */
const loginUrl = process.env.LOGIN_URL ?? 'http://localhost:3000/login';

/**
 * Szkielet obsługi rzeczywistego formularza z komunikatem `login-error`.
 * Locatory i loginAs wymagają implementacji przez uczestnika warsztatu.
 */
export class WorkshopLoginPage extends BasePage {
  // TODO: Zaimportuj typ Locator i zadeklaruj locatory:
  // emailInput, passwordInput, submitButton oraz errorMessage.

  /**
   * Ustawia URL formularza; inicjalizacja locatorów pozostaje zadaniem uczestnika.
   *
   * @param page - Strona Playwrighta używana w bieżącym teście.
   */
  constructor(page: Page) {
    super(page, loginUrl);

    // TODO: Zainicjalizuj locatory dla formularza lokalnej aplikacji.
    // Sprawdź app/server.js i dobierz selektory po labelu, roli lub data-testid.
  }

  /**
   * Miejsce do implementacji wypełnienia i wysłania formularza logowania.
   * Oczekiwany rezultat ma sprawdzać test korzystający z Page Object.
   *
   * @param email - Adres wpisywany do pola Email po uzupełnieniu metody.
   * @param password - Hasło wpisywane do pola Password po uzupełnieniu metody.
   * @returns Obietnica odrzucana błędem TODO w obecnej wersji startera.
   * @throws {Error} Błąd TODO, dopóki metoda nie zostanie zaimplementowana.
   */
  async loginAs(email: string, password: string) {
    // TODO: Wypełnij email i hasło, a następnie wyślij formularz.
    // Asercję wyniku logowania pozostaw w teście.
    throw new Error('TODO: Zaimplementuj WorkshopLoginPage.loginAs');
  }
}
