import { test, expect } from '@playwright/test';

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
    await page.getByLabel('Email').fill('wrong.user@example.com');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Assert
    await expect(page.getByTestId('flash-message')).toHaveText(
      'Invalid credentials'
    );
  });

  test('shows an error when password is empty', async ({ page }) => {
    // Arrange
    await page.route('**/login', async (route) => {
      await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
    });
    await page.goto('/login');

    // Act
    await page.getByLabel('Email').fill('wrong.user@example.com');
    await page.getByLabel('Password').fill('');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Assert
    await expect(page.getByTestId('flash-message')).toHaveText(
      'Invalid credentials'
    );
  });
});
