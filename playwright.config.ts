import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';
const isCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: '.',
	tsconfig: './tsconfig.json',
	testMatch: [
		'**/tests/**/*.spec.ts',
		'**/tests/**/*.test.ts',
		'**/tests/**/*Test.ts',
		'**/docs/rozwiazania/**/*.spec.ts',
		'**/docs/rozwiazania/**/*.test.ts',
		'**/docs/rozwiazania/**/*Test.ts',
	],
	/* CI runs published tests; workshop examples and local solutions stay local. */
	testIgnore: isCI
		? ['**/tests/patterns/**', '**/docs/rozwiazania/**']
		: [],
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: isCI,
	/* Retry on CI only */
	retries: isCI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: isCI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['list'], ['html', { open: 'never' }]],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('')`. */
		baseURL,

		/* Collect a trace for every test execution. See https://playwright.dev/docs/trace-viewer */
		trace: 'on',
		screenshot: 'only-on-failure',
		video: 'off',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'node app/server.js',
		cwd: __dirname,
		url: new URL('/api/health', baseURL).href,
		env: { PORT: new URL(baseURL).port || '3000' },
		reuseExistingServer: !isCI,
	},
});
