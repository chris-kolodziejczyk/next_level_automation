import { test as base, expect, type APIRequestContext } from '@playwright/test';
import { WorkshopLoginPage } from '../../src/pageobjects/WorkshopLoginPage';

type TestFixtures = {
	loginPage: WorkshopLoginPage;
	seedUserId: string;
};

type WorkerFixtures = {
	api: APIRequestContext;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
	api: [
		async ({ playwright }, use) => {
			const api = await playwright.request.newContext({
				baseURL:
					process.env.API_BASE_URL ??
					process.env.BASE_URL ??
					'http://localhost:3000',
			});

			await use(api);
			await api.dispose();
		},
		{ scope: 'worker' },
	],

	seedUserId: async ({}, use, testInfo) => {
		const slug = testInfo.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')
			.slice(0, 32);

		await use(
			`seed-${testInfo.workerIndex}-${testInfo.retry}-${slug || 'test'}`
		);
	},

	loginPage: async ({ page }, use) => {
		await use(new WorkshopLoginPage(page));
	},
});

export { expect };
