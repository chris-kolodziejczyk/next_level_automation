import { randomUUID } from 'node:crypto';
import { test as base, expect, type APIRequestContext } from '@playwright/test';
import { Zadanie4PageObject } from './zadanie4PageObject';

type TestUser = { email: string; password: string };
type TestFixtures = {
  seedUserId: string;
  testUser: TestUser;
  loginPage: Zadanie4PageObject;
};


type WorkerFixtures = { api: APIRequestContext };

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // Jeden kontekst HTTP na worker ogranicza koszt inicjalizacji.
  // Konta pozostają test-scoped, aby nie współdzielić zmiennego stanu.
  api: [
    async ({ playwright }, use) => {
      //Arrange
      const api = await playwright.request.newContext({
        baseURL: process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'http://localhost:3000',
      });
      try {
        await use(api);
      } finally {
        //Cleanup
        await api.dispose();
      }
    },
    { scope: 'worker' },
  ],

  seedUserId: async ({}, use, testInfo) => {
    //Arrange
    const slug = testInfo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32);
    await use(`seed-${testInfo.workerIndex}-${testInfo.retry}-${slug || 'test'}`);
  },

  testUser: async ({ api, seedUserId }, use) => {
    //Arrange
    const user: TestUser = {
      // seed jest deterministyczny; UUID izoluje równoczesne uruchomienia.
      email: `zadanie4-${seedUserId}-${randomUUID()}@example.com`,
      password: 'correct-password',
    };

    try {
      const response = await api.post('/api/users', { data: { ...user, active: true } });
      expect(response.status()).toBe(201);
      await use(user);
    } finally {
      //Cleanup
      const response = await api.delete(`/api/users/${encodeURIComponent(user.email)}`);
      expect(response.status()).toBe(204);
    }
  },

  loginPage: async ({ page }, use) => {
    //Arrange
    const loginPage = new Zadanie4PageObject(page);
    await loginPage.open();
    await use(loginPage);
  },
});

export { expect };
