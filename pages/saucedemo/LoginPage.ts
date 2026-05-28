import { Page, Locator } from '@playwright/test';

/**
 * LoginPage - Page Object Model for Sauce Demo Login Page
 * URL: https://www.saucedemo.com/
 *
 * Purpose: Encapsulates all interactions with the Sauce Demo login page
 *
 * Test Credentials (provided by Sauce Demo):
 * - Valid users: standard_user, problem_user, performance_glitch_user
 * - Password (all users): secret_sauce
 * - Locked user: locked_out_user (used for negative testing)
 */
export class LoginPage {
  // Page instance reference
  readonly page: Page;

  // Locators - Define all page elements using ID and data-test attributes
  readonly usernameInput: Locator;     // Input field for username (id="user-name")
  readonly passwordInput: Locator;     // Input field for password (id="password")
  readonly loginButton: Locator;       // Login button (id="login-button")
  readonly errorMessage: Locator;      // Error message container (data-test="error")

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Initialize all locators using ID selectors
    // Sauce Demo uses ID attributes for main form elements
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');

    // Error message uses data-test attribute
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigate to the login page (home page)
   * Uses baseURL from playwright.config.ts + relative path
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Perform login with given credentials
   * @param username - Username to enter
   * @param password - Password to enter
   */
  async login(username: string, password: string) {
    // Fill username field
    await this.usernameInput.fill(username);

    // Fill password field
    await this.passwordInput.fill(password);

    // Click login button (triggers navigation to inventory page on success)
    await this.loginButton.click();
  }

  /**
   * Get the error message text
   * Useful for assertions in negative test cases
   * @returns The text content of error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if error message is visible
   * @returns true if error message is displayed
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}
