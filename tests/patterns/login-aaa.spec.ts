import { expect, test } from '@playwright/test';

const loginPageHtml = `
  <form aria-label="Login form">
    <label>
      Email
      <input name="email" type="email" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <button type="submit">Sign in</button>
    <p data-testid="flash-message" role="status"></p>
  </form>
  <script>
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      document.querySelector('[data-testid="flash-message"]').textContent =
        'Invalid credentials';
    });
  </script>
`;



test.describe('login form - AAA pattern', () => {
	test('shows an error after invalid email and password', async ({ page }) => {
		// Arrange
		await page.route('**/login', async (route) => {
			await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
		});
		await page.goto('/login');

		// Act
		await page.getByLabel('').fill('');
		await page.getByLabel('').fill('');
		await page.getByRole('', { name: '' }).click();

		// Assert
		await expect(page.getByTestId('')).toHaveText('');
	});

	test('shows an error when password is empty', async ({ page }) => {
		// Arrange
		await page.route('**/login', async (route) => {
			await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
		});
		await page.goto('/login');

		// Act
		await page.getByLabel('').fill('');
		await page.getByLabel('').fill('');
		await page.getByRole('', { name: '' }).click();

		// Assert
		await expect(page.getByTestId('')).toHaveText('');
	});
});
