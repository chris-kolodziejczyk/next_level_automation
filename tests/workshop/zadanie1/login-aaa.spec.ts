import { test, expect } from '@playwright/test';

test('pokazuje błąd po wysłaniu niepoprawnych danych logowania', async ({ page }) => {
  //Arrange
  const loginPageHtml = `
    <form aria-label="Login form">
      <label>Email <input name="email" type="email" /></label>
      <label>Password <input name="password" type="password" /></label>
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
  const user = { email: 'unknown.user@example.com', password: 'wrong-password' };

  await page.route('**/login', async (route) => {
    await route.fulfill({ contentType: 'text/html', body: loginPageHtml });
  });
  await page.goto('/login');
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);

  //Act
  await page.getByRole('button', { name: 'Sign in' }).click();

  //Assert
  await expect(page.getByTestId('flash-message')).toHaveText('Invalid credentials');
});
