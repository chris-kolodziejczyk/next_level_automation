import { test, expect, type Page } from '@playwright/test';

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

const invalidCredentials = {
  unknownUser: {
    email: 'unknown.user@example.com',
    password: 'wrong-password',
  },
  emptyPassword: {
    email: 'unknown.user@example.com',
    password: '',
  },
};

async function submitLoginForm(
  page: Page,
  credentials: { email: string; password: string }
) {
  await page.getByLabel('Email').fill(credentials.email);
  await page.getByLabel('Password').fill(credentials.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

test.describe('login form - SMURF with beforeEach', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/login', async (route) => {
      await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
    });
    await page.goto('/login');
  });

  test('shows an error for an unknown user', async ({ page }) => {
    await submitLoginForm(page, invalidCredentials.unknownUser);

    await expect(page.getByTestId('flash-message')).toHaveText(
      'Invalid credentials'
    );
  });

  test('shows an error for an empty password', async ({ page }) => {
    await submitLoginForm(page, invalidCredentials.emptyPassword);

    await expect(page.getByTestId('flash-message')).toHaveText(
      'Invalid credentials'
    );
  });
});
