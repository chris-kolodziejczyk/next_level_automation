import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts', 'fixtures/**/*.ts', 'utils/**/*.ts', 'docs/rozwiazania/**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      'max-depth': ['error', 4],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
    },
  },
  {
    files: ['fixtures/**/*.ts', 'tests/**/*Fixture.ts', 'docs/rozwiazania/**/*Fixture.ts'],
    rules: {
      // Playwright requires a destructured first argument even without dependencies.
      'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }],
    },
  },
);
