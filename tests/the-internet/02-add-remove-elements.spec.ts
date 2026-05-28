import { test, expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../../pages/theinternet/AddRemoveElementsPage';

/**
 * Test Suite: Add/Remove Elements Tests
 * Site: The Internet - Heroku (https://the-internet.herokuapp.com/add_remove_elements/)
 *
 * Purpose: Validate dynamic element addition and removal functionality
 *
 * Test Coverage:
 * - TC063: Add a single element
 * - TC064: Add multiple elements
 * - TC065: Remove a single element
 */

test.describe('Add/Remove Elements Tests', () => {
  let addRemovePage: AddRemoveElementsPage;

  /**
   * beforeEach hook - Runs before each test
   * Purpose: Initialize a fresh AddRemoveElementsPage instance and navigate to page
   * Ensures test isolation - each test starts with clean state (no elements added)
   */
  test.beforeEach(async ({ page }) => {
    // Create new AddRemoveElementsPage instance
    addRemovePage = new AddRemoveElementsPage(page);

    // Navigate to the add/remove elements page
    await addRemovePage.goto();
  });

  /**
   * TC063 - Add a single element
   *
   * Steps:
   * 1. Navigate to add/remove elements page (done in beforeEach)
   * 2. Verify initially no delete buttons exist
   * 3. Click "Add Element" button once
   * 4. Verify exactly 1 delete button is present
   *
   * Expected Result: One delete button is successfully added
   */
  test('TC063 - Add a single element', async () => {
    // Assertion 1: Verify initially no elements exist
    let count = await addRemovePage.getElementsCount();
    expect(count).toBe(0);

    // Step: Click "Add Element" button
    await addRemovePage.addElement();

    // Assertion 2: Verify exactly 1 element was added
    count = await addRemovePage.getElementsCount();
    expect(count).toBe(1);

    // Assertion 3: Verify the delete button is visible
    await expect(addRemovePage.deleteButtons.first()).toBeVisible();
  });

  /**
   * TC064 - Add multiple elements
   *
   * Steps:
   * 1. Navigate to add/remove elements page (done in beforeEach)
   * 2. Verify initially no delete buttons exist
   * 3. Click "Add Element" button 5 times
   * 4. Verify exactly 5 delete buttons are present
   *
   * Expected Result: Multiple delete buttons are successfully added
   */
  test('TC064 - Add multiple elements', async () => {
    // Define how many elements to add
    const elementsToAdd = 5;

    // Assertion 1: Verify initially no elements exist
    let count = await addRemovePage.getElementsCount();
    expect(count).toBe(0);

    // Step: Add multiple elements
    await addRemovePage.addMultipleElements(elementsToAdd);

    // Assertion 2: Verify correct number of elements were added
    count = await addRemovePage.getElementsCount();
    expect(count).toBe(elementsToAdd);

    // Assertion 3: Verify all delete buttons are visible
    for (let i = 0; i < elementsToAdd; i++) {
      await expect(addRemovePage.deleteButtons.nth(i)).toBeVisible();
    }
  });

  /**
   * TC065 - Remove a single element
   *
   * Steps:
   * 1. Navigate to add/remove elements page (done in beforeEach)
   * 2. Add 3 elements
   * 3. Verify 3 elements exist
   * 4. Remove the first element
   * 5. Verify only 2 elements remain
   *
   * Expected Result: Element is successfully removed
   */
  test('TC065 - Remove a single element', async () => {
    // Setup: Add 3 elements first
    await addRemovePage.addMultipleElements(3);

    // Assertion 1: Verify 3 elements were added
    let count = await addRemovePage.getElementsCount();
    expect(count).toBe(3);

    // Step: Remove the first element
    await addRemovePage.removeElement(0);

    // Assertion 2: Verify only 2 elements remain
    count = await addRemovePage.getElementsCount();
    expect(count).toBe(2);

    // Assertion 3: Verify remaining elements are still visible
    await expect(addRemovePage.deleteButtons.first()).toBeVisible();
  });
});
