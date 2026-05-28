import { Page, Locator } from '@playwright/test';

/**
 * DynamicLoadingPage - Page Object Model for The Internet Dynamic Loading Page
 * URL: https://the-internet.herokuapp.com/dynamic_loading/
 *
 * Purpose: Encapsulates interactions with dynamically loaded content
 *
 * This page has two examples:
 * - Example 1: Element is hidden and becomes visible after loading
 * - Example 2: Element is rendered after loading (not present in DOM initially)
 *
 * Both examples practice Playwright's auto-waiting capabilities
 */
export class DynamicLoadingPage {
  // Page instance reference
  readonly page: Page;

  // Locators
  readonly startButton: Locator;      // Button to start loading
  readonly loadingBar: Locator;       // Loading indicator (appears during loading)
  readonly finishMessage: Locator;    // Message that appears after loading completes

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Locator for "Start" button
    // This button triggers the dynamic loading process
    this.startButton = page.locator('button', { hasText: 'Start' });

    // Locator for loading indicator
    // This element appears during loading and shows "Loading..."
    this.loadingBar = page.locator('#loading');

    // Locator for the finish message
    // This element appears after loading completes with text "Hello World!"
    this.finishMessage = page.locator('#finish');
  }

  /**
   * Navigate to Dynamic Loading main page
   * Uses baseURL from playwright.config.ts + relative path
   */
  async goto() {
    await this.page.goto('/dynamic_loading');
  }

  /**
   * Navigate to Dynamic Loading Example 1
   * Example 1: Element on page that is hidden
   * After clicking Start, the hidden element becomes visible
   */
  async gotoExample1() {
    await this.page.goto('/dynamic_loading/1');
  }

  /**
   * Navigate to Dynamic Loading Example 2
   * Example 2: Element rendered after the fact
   * After clicking Start, a new element is added to the DOM
   */
  async gotoExample2() {
    await this.page.goto('/dynamic_loading/2');
  }

  /**
   * Click the Start button to begin dynamic loading
   * This triggers the loading process
   */
  async clickStart() {
    await this.startButton.click();
  }

  /**
   * Wait for the loading bar to appear
   * Useful for verifying that loading process has started
   */
  async waitForLoadingToStart() {
    await this.loadingBar.waitFor({ state: 'visible' });
  }

  /**
   * Wait for the loading bar to disappear
   * Indicates that loading process has completed
   * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
   */
  async waitForLoadingToComplete(timeout: number = 10000) {
    // Wait for loading bar to become hidden
    // This is important because the finish message only appears after loading
    await this.loadingBar.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for the finish message to be visible
   * This is the final step - message appears after loading completes
   * @param timeout - Maximum time to wait in milliseconds (default: 10000ms)
   */
  async waitForFinishMessage(timeout: number = 10000) {
    await this.finishMessage.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get the finish message text
   * @returns The text content of the finish message (should be "Hello World!")
   */
  async getFinishMessageText(): Promise<string> {
    // Wait for message to be visible first
    await this.waitForFinishMessage();

    // Get and return the text content
    const text = await this.finishMessage.textContent();
    return text?.trim() || '';
  }

  /**
   * Complete full loading flow and get result message
   * This is a convenience method that combines all steps:
   * 1. Click Start button
   * 2. Wait for loading to complete
   * 3. Get the finish message
   *
   * @returns The finish message text
   */
  async completeLoadingAndGetMessage(): Promise<string> {
    // Step 1: Click Start button
    await this.clickStart();

    // Step 2: Wait for loading to complete (loading bar disappears)
    await this.waitForLoadingToComplete();

    // Step 3: Wait for finish message to appear
    await this.waitForFinishMessage();

    // Step 4: Get and return the message text
    return await this.getFinishMessageText();
  }

  /**
   * Check if the loading bar is currently visible
   * @returns true if loading is in progress
   */
  async isLoading(): Promise<boolean> {
    return await this.loadingBar.isVisible();
  }

  /**
   * Check if the finish message is visible
   * @returns true if loading has completed and message is shown
   */
  async isFinishMessageVisible(): Promise<boolean> {
    return await this.finishMessage.isVisible();
  }
}
