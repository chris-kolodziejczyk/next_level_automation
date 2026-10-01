import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
	readonly menu: Locator;

	constructor(page: Page) {
		super(page, '/');
		this.menu = this.page.locator('div[id="wrapper"]>ul[class="menu"]');

	}

	async goToMenuOptionPage(menuOptionName: string = 'Baza testów') {
		await this.menu.getByText(menuOptionName).click();
	}
}
