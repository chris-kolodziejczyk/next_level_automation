/**
 * @file Wspólna nawigacja dla Page Objects korzystających ze strony Playwrighta.
 */
import { type Page, expect } from '@playwright/test';

/** Przechowuje stronę i domyślną ścieżkę otwieraną przez Page Object. */
export class BasePage {
	/**
	 * @param page - Strona należąca do bieżącego kontekstu testowego.
	 * @param defaultPath - Domyślna ścieżka lub pełny URL, domyślnie `/`.
	 */
	constructor(
		protected readonly page: Page,
		private readonly defaultPath = '/'
	) {}

	/**
	 * Otwiera podaną ścieżkę; względny adres korzysta z Playwrightowego baseURL.
	 *
	 * @param path - Ścieżka lub pełny URL; domyślnie wartość z konstruktora.
	 * @returns Obietnica zakończenia nawigacji przez page.goto.
	 */
	 async  open(path = this.defaultPath) {
		await this.page.goto(path);
	}

	async checkTextMsg(selector: string = 'flash-message', textMsg: string = 'Invalid credentials') {
		await expect(this.page.getByTestId(selector)).toHaveText(
			textMsg
		);
	}
}
