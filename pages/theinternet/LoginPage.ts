import { Page, Locator } from '@playwright/test';

/**
 * LoginPage - Page Object Model for The Internet Login Page
 * URL: https://the-internet.herokuapp.com/login
 *
 * Purpose: Encapsulates all interactions with the login page
 *
 * Test Credentials:
 * - Valid Username: tomsmith
 * - Valid Password: SuperSecretPassword!
 */
export class LoginPage {
  // Page instance reference
  readonly page: Page;

  // Locators - Define all page elements using selectors we identified
  readonly usernameInput: Locator;     // Input field for username (id="username")
  readonly passwordInput: Locator;     // Input field for password (id="password")
  readonly loginButton: Locator;       // Submit button (type="submit")
  readonly successMessage: Locator;    // Success flash message (class="flash success")
  readonly errorMessage: Locator;      // Error flash message (class="flash error")
  readonly logoutButton: Locator;      // Logout button (appears after successful login)

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Initialize all locators using CSS selectors
    // Using ID selectors (#) for input fields - most stable and unique
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');

    // Using attribute selector for submit button
    this.loginButton = page.locator('button[type="submit"]');

    // Using class selectors for flash messages
    // Note: We use .flash.success syntax to select element with BOTH classes
    this.successMessage = page.locator('.flash.success');
    this.errorMessage = page.locator('.flash.error');

    // Logout button - uses href attribute selector
    this.logoutButton = page.locator('a[href="/logout"]');
  }

  /**
   * Navigate to the login page
   * Uses baseURL from playwright.config.ts + relative path
   */
  async goto() {
    await this.page.goto('/login');
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

    // Click login button and wait for navigation
    await this.loginButton.click();
  }

  /**
   * Get the success message text
   * Useful for assertions in tests
   * @returns The text content of success message
   */
  async getSuccessMessage(): Promise<string> {
    // Wait for success message to be visible
    await this.successMessage.waitFor({ state: 'visible' });

    // Get and return the text content, removing extra whitespace
    const text = await this.successMessage.textContent();
    return text?.trim() || '';
  }

  /**
   * Get the error message text
   * Useful for assertions in tests
   * @returns The text content of error message
   */
  async getErrorMessage(): Promise<string> {
    // Wait for error message to be visible
    await this.errorMessage.waitFor({ state: 'visible' });

    // Get and return the text content, removing extra whitespace
    const text = await this.errorMessage.textContent();
    return text?.trim() || '';
  }

  /**
   * Check if success message is visible
   * @returns true if success message is displayed
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  /**
   * Check if error message is visible
   * @returns true if error message is displayed
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Perform logout action
   * Only available after successful login
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Check if user is logged in
   * @returns true if logout button is visible (indicates logged in state)
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }
}
