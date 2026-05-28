import { Page, Locator } from '@playwright/test';

/**
 * CheckboxesPage - Page Object Model for The Internet Checkboxes Page
 * URL: https://the-internet.herokuapp.com/checkboxes
 *
 * Purpose: Encapsulates interactions with checkbox elements
 *
 * Page Details:
 * - Contains 2 checkboxes
 * - Checkbox 1: Initially unchecked
 * - Checkbox 2: Initially checked
 */
export class CheckboxesPage {
  // Page instance reference
  readonly page: Page;

  // Locators
  readonly checkboxes: Locator;       // All checkboxes on the page
  readonly checkbox1: Locator;        // First checkbox (index 0)
  readonly checkbox2: Locator;        // Second checkbox (index 1)

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Locator for all checkboxes
    // The page has checkboxes inside a form with input[type="checkbox"]
    this.checkboxes = page.locator('input[type="checkbox"]');

    // Individual checkbox locators using nth() selector
    // nth(0) = first checkbox (initially unchecked)
    // nth(1) = second checkbox (initially checked)
    this.checkbox1 = this.checkboxes.nth(0);
    this.checkbox2 = this.checkboxes.nth(1);
  }

  /**
   * Navigate to the Checkboxes page
   * Uses baseURL from playwright.config.ts + relative path
   */
  async goto() {
    await this.page.goto('/checkboxes');
  }

  /**
   * Check a specific checkbox by index
   * @param index - Index of the checkbox (0 for first, 1 for second)
   */
  async checkCheckbox(index: number) {
    const checkbox = this.checkboxes.nth(index);

    // Only check if it's not already checked
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  /**
   * Uncheck a specific checkbox by index
   * @param index - Index of the checkbox (0 for first, 1 for second)
   */
  async uncheckCheckbox(index: number) {
    const checkbox = this.checkboxes.nth(index);

    // Only uncheck if it's currently checked
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }

  /**
   * Check if a specific checkbox is checked
   * @param index - Index of the checkbox (0 for first, 1 for second)
   * @returns true if the checkbox is checked, false otherwise
   */
  async isChecked(index: number): Promise<boolean> {
    const checkbox = this.checkboxes.nth(index);
    return await checkbox.isChecked();
  }

  /**
   * Toggle a checkbox (if checked, uncheck it; if unchecked, check it)
   * @param index - Index of the checkbox (0 for first, 1 for second)
   */
  async toggleCheckbox(index: number) {
    const checkbox = this.checkboxes.nth(index);
    await checkbox.click();
  }

  /**
   * Get the total count of checkboxes on the page
   * @returns Number of checkboxes present
   */
  async getCheckboxCount(): Promise<number> {
    return await this.checkboxes.count();
  }

  /**
   * Get the initial state of all checkboxes
   * Useful for verifying default states in tests
   * @returns Array of boolean values representing checked state of each checkbox
   */
  async getAllCheckboxStates(): Promise<boolean[]> {
    const count = await this.getCheckboxCount();
    const states: boolean[] = [];

    // Loop through all checkboxes and get their checked state
    for (let i = 0; i < count; i++) {
      const isChecked = await this.isChecked(i);
      states.push(isChecked);
    }

    return states;
  }
}
