import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // NOTE: baseURL is now defined per-project (see projects section below)
    // This allows us to test multiple applications with different URLs
    // baseURL: 'https://www.saucedemo.com', // Moved to individual projects

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshots on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',

    /* Timeouts */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  /*
   * MULTI-SITE CONFIGURATION (Phase 3)
   * ----------------------------------
   * Each project represents a combination of:
   * - A test site (Sauce Demo, The Internet, etc.)
   * - A browser (Chromium, Firefox, WebKit)
   *
   * Benefits of this approach:
   * - Test different applications independently
   * - Each site has its own baseURL
   * - Tests are organized by folder (testMatch pattern)
   * - Easy to run tests for specific site: npx playwright test --project=theinternet-chromium
   *
   * Naming convention: {sitename}-{browser}
   */
  projects: [
    // ============================================================================
    // SAUCE DEMO - Original E-Commerce Site (Phase 1 & 2)
    // ============================================================================
    // These projects run all tests in the saucedemo folder structure:
    // - tests/saucedemo/01-authentication/
    // - tests/saucedemo/02-shopping/
    // - tests/saucedemo/03-checkout/
    // - tests/saucedemo/04-sorting/
    // - tests/saucedemo/05-e2e/
    // - tests/saucedemo/pom/

    {
      name: 'saucedemo-chromium',
      // testMatch: Regular expression to match only Sauce Demo test files
      // This pattern matches all .spec.ts files inside tests/saucedemo/ folder
      testMatch: /tests\/saucedemo\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    {
      name: 'saucedemo-firefox',
      testMatch: /tests\/saucedemo\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com',
        // Firefox-specific timeout adjustments (Issue #003)
        // Firefox has network stability issues with Sauce Demo after running multiple tests
        // Increased timeouts to handle page navigation delays
        navigationTimeout: 90000,  // Navigation timeout: 90s (increased due to network delays)
        actionTimeout: 20000,      // Action timeout: 20s (default: 10s)
      },
      // Test timeout: 120s (default: 30s) - needed for E2E tests and network delays
      timeout: 120000,
    },

    {
      name: 'saucedemo-webkit',
      testMatch: /tests\/saucedemo\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    // ============================================================================
    // THE INTERNET - Heroku Test Site (Phase 3 - Part A)
    // ============================================================================
    // These projects run tests for The Internet site:
    // - tests/the-internet/
    //
    // Site URL: https://the-internet.herokuapp.com/
    // Purpose: Practice advanced Playwright features with different UI patterns
    // Test scenarios: Form authentication, dynamic elements, checkboxes, dropdowns, etc.

    {
      name: 'theinternet-chromium',
      // testMatch: Only matches test files inside tests/the-internet/ folder
      testMatch: /tests\/the-internet\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://the-internet.herokuapp.com',
      },
    },

    {
      name: 'theinternet-firefox',
      testMatch: /tests\/the-internet\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://the-internet.herokuapp.com',
      },
    },

    {
      name: 'theinternet-webkit',
      testMatch: /tests\/the-internet\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://the-internet.herokuapp.com',
      },
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
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
