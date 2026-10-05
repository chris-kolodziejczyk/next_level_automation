import { expect, test } from '@playwright/test';

test.describe('login form - AAA pattern', () => {
	test('shows an error after invalid email and password', async ({ page }) => {
		// Arrange

		await page.goto('/login');
		await page.getByLabel('Email').fill('worksefefhop.user@example.com');
		await page.getByLabel('Password').fill('user');

		//Act
		await page.getByRole('button', { name: 'Sign in' }).click();

		//Assert
		await expect(page.getByTestId('flash-message')).toHaveText(
			'Invalid credentials'
		);
	});
});
