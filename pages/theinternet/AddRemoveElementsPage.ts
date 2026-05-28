import { Page, Locator } from '@playwright/test';

/**
 * AddRemoveElementsPage - Page Object Model for The Internet Add/Remove Elements Page
 * URL: https://the-internet.herokuapp.com/add_remove_elements/
 *
 * Purpose: Encapsulates interactions with dynamic element addition and removal
 *
 * Use Case: Practice working with dynamically added/removed DOM elements
 * This is useful for testing scenarios where UI elements appear/disappear based on user actions
 */
export class AddRemoveElementsPage {
  // Page instance reference
  readonly page: Page;

  // Locators
  readonly addElementButton: Locator;    // Button to add new elements
  readonly deleteButtons: Locator;       // All "Delete" buttons (dynamically added)

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Locator for "Add Element" button
    // This button has text "Add Element" and is used to create new delete buttons
    this.addElementButton = page.locator('button', { hasText: 'Add Element' });

    // Locator for all "Delete" buttons
    // These buttons are created dynamically when "Add Element" is clicked
    // Using class selector as all delete buttons have class="added-manually"
    this.deleteButtons = page.locator('.added-manually');
  }

  /**
   * Navigate to the Add/Remove Elements page
   * Uses baseURL from playwright.config.ts + relative path
   */
  async goto() {
    await this.page.goto('/add_remove_elements/');
  }

  /**
   * Click the "Add Element" button to create a new delete button
   * Each click adds one new "Delete" button to the page
   */
  async addElement() {
    await this.addElementButton.click();
  }

  /**
   * Add multiple elements at once
   * @param count - Number of elements to add
   */
  async addMultipleElements(count: number) {
    // Loop to click "Add Element" button multiple times
    for (let i = 0; i < count; i++) {
      await this.addElement();
    }
  }

  /**
   * Remove an element by clicking a specific delete button
   * @param index - Index of the delete button to click (0-based)
   */
  async removeElement(index: number = 0) {
    // Get the delete button at the specified index and click it
    await this.deleteButtons.nth(index).click();
  }

  /**
   * Remove all elements by clicking all delete buttons
   * Useful for cleanup or testing bulk deletion
   */
  async removeAllElements() {
    // Get the count of delete buttons
    const count = await this.getElementsCount();

    // Click each delete button (always click the first one since they disappear after click)
    for (let i = 0; i < count; i++) {
      await this.deleteButtons.first().click();
    }
  }

  /**
   * Get the count of currently displayed delete buttons
   * @returns Number of delete buttons present on the page
   */
  async getElementsCount(): Promise<number> {
    // Count all elements matching the deleteButtons locator
    return await this.deleteButtons.count();
  }

  /**
   * Check if any delete buttons are present
   * @returns true if at least one delete button exists
   */
  async hasElements(): Promise<boolean> {
    const count = await this.getElementsCount();
    return count > 0;
  }
}
