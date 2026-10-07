import { WorkshopLoginPage } from '@pageobjects/WorkshopLoginPage';
import { test } from '@playwright/test';




test.describe('login form - AAA pattern', () => {
	test('shows an error after invalid email and password', async ({ page }) => {
		const loginPage = new WorkshopLoginPage(page);

		// Arrange
		// await loginPage.open('/')
		// await loginPage.loginAs('fbweofw', 'giwuegfuiw');

		//Act

		await loginPage.open('/');

		await loginPage.loginAs('fbweofw', 'giwuegfuiw');

		//Assert
		await loginPage.checkTextMsg();
	});
});
