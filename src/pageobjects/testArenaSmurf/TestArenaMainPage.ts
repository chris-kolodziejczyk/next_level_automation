import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class TestArenaMainPage extends BasePage {
	readonly menu: Locator;

	constructor(page: Page) {
		super(page, '/');

		this.menu = this.page.locator('div[id="wrapper"]>ul[class="menu"]');
	}

	async openTestBase() {
		await this.menu.getByText('Baza testów', { exact: true }).click();
	}
}
