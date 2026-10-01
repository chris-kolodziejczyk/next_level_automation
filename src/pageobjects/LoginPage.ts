import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;
	readonly flashMessage: Locator;
	readonly emailTestArena: Locator;
	readonly testarenaPass: Locator;
	readonly testarenaLoginBtn: Locator;

	constructor(page: Page) {
		super(page, '/login');

		this.emailInput = this.page.getByLabel('Email');
		this.passwordInput = this.page.getByLabel('Password');
		this.submitButton = this.page.getByRole('button', { name: 'Sign in' });
		this.flashMessage = this.page.getByTestId('flash-message');
		this.emailTestArena = this.page.locator('#email');
		this.testarenaPass = this.page.locator('#password');
		this.testarenaLoginBtn = this.page.locator('#login');
	}

	async loginAs(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.submitButton.click();
	}

	async loginAsUser(
		email: string = 'administrator@testarena.pl',
		pass: string = 'sumXQQ72$L'
	) {
		await this.emailTestArena.fill(email);
		await this.testarenaPass.fill(pass);
		await this.testarenaLoginBtn.click();
	}
}
