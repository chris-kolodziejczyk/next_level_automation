import { type Page } from '@playwright/test';

export class BasePage {
	constructor(
		protected readonly page: Page,
		private readonly defaultPath = '/'
	) {}

	async open(path = this.defaultPath) {
		await this.page.goto(path);
	}
}
