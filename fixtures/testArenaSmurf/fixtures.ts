import { test as base, expect } from '@playwright/test';
import { TestArenaLoginPage } from '../../src/pageobjects/testArenaSmurf/TestArenaLoginPage';
import { TestArenaMainPage } from '../../src/pageobjects/testArenaSmurf/TestArenaMainPage';
import {
	TestArenaTestBasePage,
	type TestCaseForm,
} from '../../src/pageobjects/testArenaSmurf/TestArenaTestBasePage';

type TestArenaSmurfFixtures = {
	loginPage: TestArenaLoginPage;
	mainPage: TestArenaMainPage;
	testBasePage: TestArenaTestBasePage;
	testCase: TestCaseForm;
};

function titleSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
		.slice(0, 24)
		.replace(/-$/g, '');
}

function runId() {
	return Date.now().toString(36);
}

export const test = base.extend<TestArenaSmurfFixtures>({
	testCase: async ({}, use, testInfo) => {
		const slug = titleSlug(testInfo.title) || 'test-case';

		await use({
			name: `SMURF-${testInfo.workerIndex}-${testInfo.retry}-${runId()}-${slug}`,
			description: 'Opis przypadku testowego przygotowany przez fixture SMURF',
			result: 'Oczekiwany rezultat przypadku testowego z fixture SMURF',
			type: 'Przypadek testowy',
		});
	},

	loginPage: async ({ page }, use) => {
		const loginPage = new TestArenaLoginPage(page);

		await loginPage.open();
		await loginPage.loginAsUser();
		await use(loginPage);
	},

	mainPage: async ({ page, loginPage }, use) => {
		void loginPage;
		await use(new TestArenaMainPage(page));
	},

	testBasePage: async ({ page, mainPage }, use) => {
		await mainPage.openTestBase();
		await use(new TestArenaTestBasePage(page));
	},
});

export { expect };
