import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

const testArenaEmail =
	process.env.TESTARENA_USER_EMAIL ?? 'email nie został podany';
const testArenaPassword = process.env.TESTARENA_USER_PASSWORD ?? 'hasło nie zostało podane';

export class TestArenaLoginPage extends BasePage {
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		super(page, '/zaloguj');

		this.emailInput = this.page.locator('#email');
		this.passwordInput = this.page.locator('#password');
		this.loginButton = this.page.locator('#login');
	}

	async loginAsUser(
		email: string = testArenaEmail,
		password: string = testArenaPassword
	) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}
}
