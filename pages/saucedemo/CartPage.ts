import { Page, Locator } from '@playwright/test';

/**
 * CartPage - Page Object Model for Sauce Demo Shopping Cart Page
 * URL: https://www.saucedemo.com/cart.html
 *
 * Purpose: Encapsulates interactions with the shopping cart page
 *
 * Features:
 * - View cart items
 * - Remove items from cart
 * - Continue shopping (go back to inventory)
 * - Proceed to checkout
 */
export class CartPage {
  // Page instance reference
  readonly page: Page;

  // Locators - Define all page elements
  readonly pageTitle: Locator;              // Page title "Your Cart" (class="title")
  readonly cartItems: Locator;              // All cart items (class="cart_item")
  readonly checkoutButton: Locator;         // "Checkout" button (data-test="checkout")
  readonly continueShoppingButton: Locator; // "Continue Shopping" button (data-test="continue-shopping")

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Initialize locators using class and data-test selectors
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Get the count of items currently in the cart
   * @returns Number of cart items
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Remove a specific item from cart by product name
   * @param productName - Name of product to remove (e.g., "Sauce Labs Backpack")
   *
   * How it works:
   * - Converts product name to slug format (lowercase, spaces to hyphens)
   * - Clicks the "Remove" button for that specific product
   */
  async removeItem(productName: string) {
    // Convert product name to slug format for data-test attribute
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');

    // Click the "Remove" button for this product
    await this.page.click(`[data-test="remove-${productSlug}"]`);
  }

  /**
   * Click "Checkout" button to proceed to checkout flow
   * Navigates to checkout step 1 (customer information)
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Click "Continue Shopping" button to return to inventory page
   * Useful when user wants to add more items
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Get all product names currently in the cart
   * @returns Array of product name strings
   *
   * Useful for:
   * - Verifying correct items are in cart
   * - Validating cart persistence across navigation
   */
  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}
