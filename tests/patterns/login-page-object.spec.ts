import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pageobjects/LoginPage';

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

test.describe('login form - Page Object pattern', () => {
	test('shows an error after invalid email and password', async ({ page }) => {
		await page.route('**/login', async (route) => {
			await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
		});

		const loginPage = new LoginPage(page);

		await loginPage.open();
		await loginPage.loginAs('', 'wrong-password');

		await expect(loginPage.flashMessage).toHaveText('');
	});

	test('shows an error when password is empty', async ({ page }) => {
		await page.route('**/login', async (route) => {
			await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
		});

		const loginPage = new LoginPage(page);

		await loginPage.open();
		await loginPage.loginAs('', '');

		await expect(loginPage.flashMessage).toHaveText('');
	});
});
