import { test, expect } from '@playwright/test';
import { DropdownPage } from '../../pages/theinternet/DropdownPage';

/**
 * Test Suite: Dropdown Tests
 * Site: The Internet - Heroku (https://the-internet.herokuapp.com/dropdown)
 *
 * Purpose: Validate dropdown/select element interaction
 *
 * Dropdown Options:
 * - "Please select an option" (default, disabled)
 * - "Option 1" (value="1")
 * - "Option 2" (value="2")
 *
 * Test Coverage:
 * - TC069: Select Option 1 from dropdown
 * - TC070: Select Option 2 from dropdown
 */

test.describe('Dropdown Tests', () => {
  let dropdownPage: DropdownPage;

  /**
   * beforeEach hook - Runs before each test
   * Purpose: Initialize a fresh DropdownPage instance and navigate to page
   * Ensures test isolation - each test starts with default dropdown state
   */
  test.beforeEach(async ({ page }) => {
    // Create new DropdownPage instance
    dropdownPage = new DropdownPage(page);

    // Navigate to the dropdown page
    await dropdownPage.goto();
  });

  /**
   * TC069 - Select Option 1 from dropdown
   *
   * Steps:
   * 1. Navigate to dropdown page (done in beforeEach)
   * 2. Select "Option 1" from the dropdown
   * 3. Verify "Option 1" is selected (by text)
   * 4. Verify the selected value is "1"
   *
   * Expected Result: Option 1 is successfully selected
   */
  test('TC069 - Select Option 1 from dropdown', async () => {
    // Step: Select "Option 1" by its visible text
    await dropdownPage.selectOptionByText('Option 1');

    // Assertion 1: Verify "Option 1" is selected (by text)
    const selectedText = await dropdownPage.getSelectedOptionText();
    expect(selectedText).toBe('Option 1');

    // Assertion 2: Verify the value is "1"
    const selectedValue = await dropdownPage.getSelectedOptionValue();
    expect(selectedValue).toBe('1');

    // Assertion 3: Verify using isOptionSelected method
    const isSelected = await dropdownPage.isOptionSelected('Option 1');
    expect(isSelected).toBe(true);

    // Assertion 4: Verify using Playwright's built-in matcher
    await expect(dropdownPage.dropdown).toHaveValue('1');
  });

  /**
   * TC070 - Select Option 2 from dropdown
   *
   * Steps:
   * 1. Navigate to dropdown page (done in beforeEach)
   * 2. Select "Option 2" from the dropdown using value attribute
   * 3. Verify "Option 2" is selected (by text)
   * 4. Verify the selected value is "2"
   *
   * Expected Result: Option 2 is successfully selected
   */
  test('TC070 - Select Option 2 from dropdown', async () => {
    // Step: Select "Option 2" by its value attribute (alternative method)
    await dropdownPage.selectOptionByValue('2');

    // Assertion 1: Verify "Option 2" is selected (by text)
    const selectedText = await dropdownPage.getSelectedOptionText();
    expect(selectedText).toBe('Option 2');

    // Assertion 2: Verify the value is "2"
    const selectedValue = await dropdownPage.getSelectedOptionValue();
    expect(selectedValue).toBe('2');

    // Assertion 3: Verify using isOptionSelected method
    const isSelected = await dropdownPage.isOptionSelected('Option 2');
    expect(isSelected).toBe(true);

    // Assertion 4: Verify using Playwright's built-in matcher
    await expect(dropdownPage.dropdown).toHaveValue('2');
  });
});
