import { test as base, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { WorkshopLoginPage } from '../../src/pageobjects/WorkshopLoginPage';

type TestUser = {
	email: string;
	password: string;
};

type SmurfFixtures = {
	loginPage: WorkshopLoginPage;
	testUser: TestUser;
};

export const test = base.extend<SmurfFixtures>({
	// testUser: async ({}, use, testInfo) => {
	//   // TODO: Przygotuj dane użytkownika: email i password.
	//   // Użyj testInfo do izolacji danych między testami, workerami i retry.
	//   // Przekaż użytkownika do testu przez await use(...).
	//   // Jeśli tworzysz użytkownika przez API, dodaj cleanup po await use(...).
	//   // throw new Error('TODO: Zaimplementuj fixture testUser');
	// },

	// Jeden kontekst HTTP na worker ogranicza koszt inicjalizacji.
	// Konta pozostają test-scoped, aby nie współdzielić zmiennego stanu.
	api: [
		async ({ playwright }, use) => {
			//Arrange
			const api = await playwright.request.newContext({
				baseURL:
					process.env.API_BASE_URL ??
					process.env.BASE_URL ??
					'http://localhost:3000',
			});
			try {
				await use(api);
			} finally {
				//Cleanup
				await api.dispose();
			}
		},
		{ scope: 'worker' },
	],

	seedUserId: async ({}, use, testInfo) => {
		//Arrange
		const slug = testInfo.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.slice(0, 32);
		await use(
			`seed-${testInfo.workerIndex}-${testInfo.retry}-${slug || 'test'}`
		);
	},

	testUser: async ({ api, seedUserId }, use) => {
		//Arrange
		const user: TestUser = {
			// seed jest deterministyczny; UUID izoluje równoczesne uruchomienia.
			email: `zadanie4-${seedUserId}-${randomUUID()}@example.com`,
			password: 'correct-password',
		};

		try {
			const response = await api.post('/api/users', {
				data: { ...user, active: true },
			});
			expect(response.status()).toBe(201);
			await use(user);
		} finally {
			//Cleanup
			const response = await api.delete(
				`/api/users/${encodeURIComponent(user.email)}`
			);
			expect(response.status()).toBe(204);
		}
	},

	loginPage: async ({ page }, use) => {
		const loginPage = new WorkshopLoginPage(page);
		loginPage.loginAs(this.test.user.email, this.test.user.password);
		// TODO: Utwórz WorkshopLoginPage dla page i otwórz lokalną aplikację.
		// Przekaż Page Object do testu przez await use(...).
		throw new Error('TODO: Zaimplementuj fixture loginPage');
	},
});

export { expect };
