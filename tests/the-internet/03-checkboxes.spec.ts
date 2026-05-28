import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../../pages/theinternet/CheckboxesPage';

/**
 * Test Suite: Checkboxes Tests
 * Site: The Internet - Heroku (https://the-internet.herokuapp.com/checkboxes)
 *
 * Purpose: Validate checkbox interaction functionality
 *
 * Initial State:
 * - Checkbox 1 (index 0): Unchecked
 * - Checkbox 2 (index 1): Checked
 *
 * Test Coverage:
 * - TC066: Verify initial checkbox states
 * - TC067: Check an unchecked checkbox
 * - TC068: Uncheck a checked checkbox
 */

test.describe('Checkboxes Tests', () => {
  let checkboxesPage: CheckboxesPage;

  /**
   * beforeEach hook - Runs before each test
   * Purpose: Initialize a fresh CheckboxesPage instance and navigate to page
   * Ensures test isolation - each test starts with default checkbox states
   */
  test.beforeEach(async ({ page }) => {
    // Create new CheckboxesPage instance
    checkboxesPage = new CheckboxesPage(page);

    // Navigate to the checkboxes page
    await checkboxesPage.goto();
  });

  /**
   * TC066 - Verify initial checkbox states
   *
   * Steps:
   * 1. Navigate to checkboxes page (done in beforeEach)
   * 2. Verify there are exactly 2 checkboxes
   * 3. Verify checkbox 1 is initially unchecked
   * 4. Verify checkbox 2 is initially checked
   *
   * Expected Result: Default states match expectations
   */
  test('TC066 - Verify initial checkbox states', async () => {
    // Assertion 1: Verify there are exactly 2 checkboxes
    const count = await checkboxesPage.getCheckboxCount();
    expect(count).toBe(2);

    // Assertion 2: Verify checkbox 1 (index 0) is initially unchecked
    const checkbox1State = await checkboxesPage.isChecked(0);
    expect(checkbox1State).toBe(false);

    // Assertion 3: Verify checkbox 2 (index 1) is initially checked
    const checkbox2State = await checkboxesPage.isChecked(1);
    expect(checkbox2State).toBe(true);

    // Alternative: Verify all states at once
    const allStates = await checkboxesPage.getAllCheckboxStates();
    expect(allStates).toEqual([false, true]);
  });

  /**
   * TC067 - Check an unchecked checkbox
   *
   * Steps:
   * 1. Navigate to checkboxes page (done in beforeEach)
   * 2. Verify checkbox 1 is initially unchecked
   * 3. Check checkbox 1
   * 4. Verify checkbox 1 is now checked
   *
   * Expected Result: Checkbox 1 becomes checked after click
   */
  test('TC067 - Check an unchecked checkbox', async () => {
    // Assertion 1: Verify checkbox 1 starts unchecked
    let isChecked = await checkboxesPage.isChecked(0);
    expect(isChecked).toBe(false);

    // Step: Check the first checkbox
    await checkboxesPage.checkCheckbox(0);

    // Assertion 2: Verify checkbox 1 is now checked
    isChecked = await checkboxesPage.isChecked(0);
    expect(isChecked).toBe(true);

    // Assertion 3: Verify checkbox is visually checked using Playwright's matcher
    await expect(checkboxesPage.checkbox1).toBeChecked();
  });

  /**
   * TC068 - Uncheck a checked checkbox
   *
   * Steps:
   * 1. Navigate to checkboxes page (done in beforeEach)
   * 2. Verify checkbox 2 is initially checked
   * 3. Uncheck checkbox 2
   * 4. Verify checkbox 2 is now unchecked
   *
   * Expected Result: Checkbox 2 becomes unchecked after click
   */
  test('TC068 - Uncheck a checked checkbox', async () => {
    // Assertion 1: Verify checkbox 2 starts checked
    let isChecked = await checkboxesPage.isChecked(1);
    expect(isChecked).toBe(true);

    // Step: Uncheck the second checkbox
    await checkboxesPage.uncheckCheckbox(1);

    // Assertion 2: Verify checkbox 2 is now unchecked
    isChecked = await checkboxesPage.isChecked(1);
    expect(isChecked).toBe(false);

    // Assertion 3: Verify checkbox is visually unchecked using Playwright's matcher
    await expect(checkboxesPage.checkbox2).not.toBeChecked();
  });
});
