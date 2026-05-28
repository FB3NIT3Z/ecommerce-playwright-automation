import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../../pages/theinternet/DynamicLoadingPage';

/**
 * Test Suite: Dynamic Loading Tests
 * Site: The Internet - Heroku (https://the-internet.herokuapp.com/dynamic_loading/)
 *
 * Purpose: Validate Playwright's ability to handle dynamically loaded content
 *
 * This suite tests two scenarios:
 * - Example 1: Element hidden, then revealed (element exists in DOM but hidden)
 * - Example 2: Element rendered after the fact (element added to DOM after loading)
 *
 * Both scenarios demonstrate Playwright's auto-waiting capabilities
 *
 * Test Coverage:
 * - TC071: Dynamic Loading Example 1 (Hidden element)
 * - TC072: Dynamic Loading Example 2 (Rendered element)
 */

test.describe('Dynamic Loading Tests', () => {
  let dynamicLoadingPage: DynamicLoadingPage;

  /**
   * beforeEach hook - Runs before each test
   * Purpose: Initialize a fresh DynamicLoadingPage instance
   * Note: Navigation happens inside each test (different examples have different URLs)
   */
  test.beforeEach(async ({ page }) => {
    // Create new DynamicLoadingPage instance
    dynamicLoadingPage = new DynamicLoadingPage(page);
  });

  /**
   * TC071 - Dynamic Loading Example 1 (Hidden element)
   *
   * Scenario: Element exists in DOM but is hidden (display:none)
   * After clicking Start, the element becomes visible (display:block)
   *
   * Steps:
   * 1. Navigate to Example 1 page
   * 2. Click "Start" button
   * 3. Wait for loading bar to appear
   * 4. Wait for loading bar to disappear
   * 5. Wait for finish message to become visible
   * 6. Verify message text is "Hello World!"
   *
   * Expected Result: Hidden element becomes visible with correct text
   */
  test('TC071 - Dynamic Loading Example 1 (Hidden element)', async () => {
    // Step 1: Navigate to Example 1
    await dynamicLoadingPage.gotoExample1();

    // Step 2: Click Start button
    await dynamicLoadingPage.clickStart();

    // Step 3: Verify loading bar appears (indicates loading started)
    await dynamicLoadingPage.waitForLoadingToStart();
    const isLoading = await dynamicLoadingPage.isLoading();
    expect(isLoading).toBe(true);

    // Step 4: Wait for loading to complete (loading bar disappears)
    await dynamicLoadingPage.waitForLoadingToComplete();

    // Step 5: Wait for finish message to be visible
    await dynamicLoadingPage.waitForFinishMessage();

    // Assertion 1: Verify finish message is visible
    await expect(dynamicLoadingPage.finishMessage).toBeVisible();

    // Assertion 2: Verify message text is "Hello World!"
    const messageText = await dynamicLoadingPage.getFinishMessageText();
    expect(messageText).toBe('Hello World!');

    // Assertion 3: Verify loading is no longer in progress
    const stillLoading = await dynamicLoadingPage.isLoading();
    expect(stillLoading).toBe(false);
  });

  /**
   * TC072 - Dynamic Loading Example 2 (Rendered element)
   *
   * Scenario: Element does NOT exist in DOM initially
   * After clicking Start, a new element is rendered and added to the DOM
   *
   * Steps:
   * 1. Navigate to Example 2 page
   * 2. Verify finish message is NOT in DOM yet
   * 3. Click "Start" button
   * 4. Wait for loading to complete
   * 5. Wait for finish message to appear
   * 6. Verify message text is "Hello World!"
   *
   * Expected Result: New element is rendered with correct text
   */
  test('TC072 - Dynamic Loading Example 2 (Rendered element)', async () => {
    // Step 1: Navigate to Example 2
    await dynamicLoadingPage.gotoExample2();

    // Step 2: Verify finish message is not visible initially
    // (Element doesn't exist in DOM yet)
    const initiallyVisible = await dynamicLoadingPage.isFinishMessageVisible();
    expect(initiallyVisible).toBe(false);

    // Step 3: Use convenience method to complete full flow
    // This clicks Start, waits for loading, and gets the message
    const messageText = await dynamicLoadingPage.completeLoadingAndGetMessage();

    // Assertion 1: Verify message text is "Hello World!"
    expect(messageText).toBe('Hello World!');

    // Assertion 2: Verify finish message is now visible
    await expect(dynamicLoadingPage.finishMessage).toBeVisible();

    // Assertion 3: Verify the message is in the DOM (can get text content)
    const visibleText = await dynamicLoadingPage.finishMessage.textContent();
    expect(visibleText?.trim()).toBe('Hello World!');
  });
});
