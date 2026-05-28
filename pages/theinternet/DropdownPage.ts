import { Page, Locator } from '@playwright/test';

/**
 * DropdownPage - Page Object Model for The Internet Dropdown Page
 * URL: https://the-internet.herokuapp.com/dropdown
 *
 * Purpose: Encapsulates interactions with dropdown/select elements
 *
 * Page Details:
 * - Contains 1 dropdown element with 3 options:
 *   - "Please select an option" (default, disabled)
 *   - "Option 1" (value="1")
 *   - "Option 2" (value="2")
 */
export class DropdownPage {
  // Page instance reference
  readonly page: Page;

  // Locators
  readonly dropdown: Locator;         // The dropdown/select element

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Locator for the dropdown element
    // The page has a single <select> element with id="dropdown"
    this.dropdown = page.locator('#dropdown');
  }

  /**
   * Navigate to the Dropdown page
   * Uses baseURL from playwright.config.ts + relative path
   */
  async goto() {
    await this.page.goto('/dropdown');
  }

  /**
   * Select an option by its visible text
   * @param optionText - The visible text of the option to select (e.g., "Option 1")
   */
  async selectOptionByText(optionText: string) {
    // Use Playwright's selectOption with label parameter
    // This selects the option by its visible text
    await this.dropdown.selectOption({ label: optionText });
  }

  /**
   * Select an option by its value attribute
   * @param optionValue - The value attribute of the option (e.g., "1" or "2")
   */
  async selectOptionByValue(optionValue: string) {
    // Use Playwright's selectOption with value parameter
    // This selects the option by its value attribute
    await this.dropdown.selectOption({ value: optionValue });
  }

  /**
   * Select an option by its index
   * @param index - The index of the option (0-based, where 0 is "Please select an option")
   */
  async selectOptionByIndex(index: number) {
    // Use Playwright's selectOption with index parameter
    await this.dropdown.selectOption({ index: index });
  }

  /**
   * Get the currently selected option's text
   * @returns The visible text of the currently selected option
   */
  async getSelectedOptionText(): Promise<string> {
    // Get the selected option element
    const selectedOption = this.dropdown.locator('option:checked');

    // Return its text content
    return (await selectedOption.textContent()) || '';
  }

  /**
   * Get the currently selected option's value
   * @returns The value attribute of the currently selected option
   */
  async getSelectedOptionValue(): Promise<string> {
    // Get the value of the select element (returns the selected option's value)
    return (await this.dropdown.inputValue()) || '';
  }

  /**
   * Get all available options as text
   * @returns Array of all option texts in the dropdown
   */
  async getAllOptions(): Promise<string[]> {
    // Get all option elements
    const options = this.dropdown.locator('option');
    const count = await options.count();
    const optionTexts: string[] = [];

    // Loop through all options and get their text
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) {
        optionTexts.push(text.trim());
      }
    }

    return optionTexts;
  }

  /**
   * Check if a specific option is currently selected
   * @param optionText - The visible text of the option to check
   * @returns true if the option is selected, false otherwise
   */
  async isOptionSelected(optionText: string): Promise<boolean> {
    const selectedText = await this.getSelectedOptionText();
    return selectedText === optionText;
  }
}
