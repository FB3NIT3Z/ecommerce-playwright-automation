import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/theinternet/LoginPage';

/**
 * Test Suite: Form Authentication Tests
 * Site: The Internet - Heroku (https://the-internet.herokuapp.com/login)
 *
 * Purpose: Validate login functionality with valid and invalid credentials
 *
 * Test Coverage:
 * - TC060: Successful login with valid credentials
 * - TC061: Failed login with invalid username
 * - TC062: Failed login with invalid password
 */

test.describe('Form Authentication Tests', () => {
  let loginPage: LoginPage;

  /**
   * beforeEach hook - Runs before each test
   * Purpose: Initialize a fresh LoginPage instance and navigate to login page
   * This ensures test isolation - each test starts with a clean state
   */
  test.beforeEach(async ({ page }) => {
    // Create new LoginPage instance
    loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();
  });

  /**
   * TC060 - Successful login with valid credentials
   *
   * Steps:
   * 1. Navigate to login page (done in beforeEach)
   * 2. Enter valid username: tomsmith
   * 3. Enter valid password: SuperSecretPassword!
   * 4. Click login button
   * 5. Verify success message appears
   * 6. Verify user is logged in (logout button visible)
   *
   * Expected Result: User successfully logs in and sees secure area
   */
  test('TC060 - Successful login with valid credentials', async () => {
    // Step: Perform login with valid credentials
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Assertion 1: Verify success message is visible
    await expect(loginPage.successMessage).toBeVisible();

    // Assertion 2: Verify success message contains expected text
    const successText = await loginPage.getSuccessMessage();
    expect(successText).toContain('You logged into a secure area!');

    // Assertion 3: Verify logout button is visible (indicates logged in state)
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  /**
   * TC061 - Failed login with invalid username
   *
   * Steps:
   * 1. Navigate to login page (done in beforeEach)
   * 2. Enter invalid username: invalidUser
   * 3. Enter valid password: SuperSecretPassword!
   * 4. Click login button
   * 5. Verify error message appears
   * 6. Verify user is NOT logged in
   *
   * Expected Result: Login fails and error message is displayed
   */
  test('TC061 - Failed login with invalid username', async () => {
    // Step: Perform login with invalid username
    await loginPage.login('invalidUser', 'SuperSecretPassword!');

    // Assertion 1: Verify error message is visible
    await expect(loginPage.errorMessage).toBeVisible();

    // Assertion 2: Verify error message contains expected text
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Your username is invalid!');

    // Assertion 3: Verify user is NOT logged in (logout button not visible)
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });

  /**
   * TC062 - Failed login with invalid password
   *
   * Steps:
   * 1. Navigate to login page (done in beforeEach)
   * 2. Enter valid username: tomsmith
   * 3. Enter invalid password: wrongPassword
   * 4. Click login button
   * 5. Verify error message appears
   * 6. Verify user is NOT logged in
   *
   * Expected Result: Login fails and error message is displayed
   */
  test('TC062 - Failed login with invalid password', async () => {
    // Step: Perform login with invalid password
    await loginPage.login('tomsmith', 'wrongPassword');

    // Assertion 1: Verify error message is visible
    await expect(loginPage.errorMessage).toBeVisible();

    // Assertion 2: Verify error message contains expected text
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Your password is invalid!');

    // Assertion 3: Verify user is NOT logged in (logout button not visible)
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });
});
