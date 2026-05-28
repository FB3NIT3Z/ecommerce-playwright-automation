import { Page, Locator } from '@playwright/test';

/**
 * CheckoutPage - Page Object Model for Sauce Demo Checkout Flow
 * URLs:
 * - Step 1: https://www.saucedemo.com/checkout-step-one.html (Customer Information)
 * - Step 2: https://www.saucedemo.com/checkout-step-two.html (Order Overview)
 * - Complete: https://www.saucedemo.com/checkout-complete.html (Order Confirmation)
 *
 * Purpose: Encapsulates the entire checkout flow (3 steps)
 *
 * Checkout Flow:
 * 1. Enter customer information (First Name, Last Name, Postal Code)
 * 2. Review order overview (items, prices, total)
 * 3. Complete purchase and see confirmation
 */
export class CheckoutPage {
  // Page instance reference
  readonly page: Page;

  // Locators - Step 1: Customer Information Form
  readonly firstNameInput: Locator;      // First Name input (data-test="firstName")
  readonly lastNameInput: Locator;       // Last Name input (data-test="lastName")
  readonly postalCodeInput: Locator;     // Postal Code input (data-test="postalCode")
  readonly continueButton: Locator;      // "Continue" button to go to step 2
  readonly cancelButton: Locator;        // "Cancel" button to return to cart
  readonly errorMessage: Locator;        // Error message for validation failures

  // Locators - Step 2: Order Overview & Step 3: Completion
  readonly finishButton: Locator;        // "Finish" button to complete purchase
  readonly completeHeader: Locator;      // Success header "Thank you for your order!"
  readonly completeText: Locator;        // Success message text

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Step 1: Customer Information locators (all use data-test attributes)
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2 & 3: Finish and completion locators
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  /**
   * Fill customer information form (Step 1)
   * @param firstName - Customer's first name
   * @param lastName - Customer's last name
   * @param postalCode - Customer's postal/zip code
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    // Fill all three required fields
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click "Continue" button to proceed from Step 1 to Step 2
   * Navigates to checkout overview page
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Click "Finish" button to complete the purchase (Step 2 to Step 3)
   * Navigates to checkout complete page
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Click "Cancel" button to return to cart
   * Can be clicked from Step 1 or Step 2
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Get error message text (appears when validation fails)
   * @returns Error message text (e.g., "Error: First Name is required")
   *
   * Common errors:
   * - "First Name is required"
   * - "Last Name is required"
   * - "Postal Code is required"
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Get the completion success header
   * @returns Success header text (typically "Thank you for your order!")
   *
   * Only available on checkout-complete.html page
   */
  async getCompleteMessage(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }
}
