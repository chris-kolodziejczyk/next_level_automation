import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../src/pageobjects/LoginPage';
import { loginFormHtml, validPassword } from './loginForm';

type TestUser = {
  email: string;
  password: string;
};

type SmurfFixtures = {
  loginPage: LoginPage;
  testUser: TestUser;
};

export const test = base.extend<SmurfFixtures>({
  testUser: async ({}, use, testInfo) => {
    const slug = testInfo.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 32);

    await use({
      email: `smurf-${testInfo.workerIndex}-${testInfo.retry}-${slug}@example.com`,
      password: validPassword,
    });
  },

  loginPage: async ({ page }, use) => {
    await page.setContent(loginFormHtml);
    await use(new LoginPage(page));
  },
});

export { expect };
