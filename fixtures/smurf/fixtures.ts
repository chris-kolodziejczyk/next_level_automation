import { test as base, expect } from '@playwright/test';
import { WorkshopLoginPage } from '../../src/pageobjects/WorkshopLoginPage';

type TestUser = {
  email: string;
  password: string;
};

type SmurfFixtures = {
  loginPage: WorkshopLoginPage;
  testUser: TestUser;
};

export const test = base.extend<SmurfFixtures>({
  testUser: async ({}, use, testInfo) => {
    // TODO: Przygotuj dane użytkownika: email i password.
    // Użyj testInfo do izolacji danych między testami, workerami i retry.
    // Przekaż użytkownika do testu przez await use(...).
    // Jeśli tworzysz użytkownika przez API, dodaj cleanup po await use(...).
    throw new Error('TODO: Zaimplementuj fixture testUser');
  },

  loginPage: async ({ page }, use) => {
    // TODO: Utwórz WorkshopLoginPage dla page i otwórz lokalną aplikację.
    // Przekaż Page Object do testu przez await use(...).
    throw new Error('TODO: Zaimplementuj fixture loginPage');
  },
});

export { expect };
