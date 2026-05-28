import { Page, Locator } from '@playwright/test';

/**
 * InventoryPage - Page Object Model for Sauce Demo Inventory/Products Page
 * URL: https://www.saucedemo.com/inventory.html
 *
 * Purpose: Encapsulates interactions with the product inventory page
 *
 * Features:
 * - Product browsing and listing
 * - Add/Remove products to/from cart
 * - Product sorting (A-Z, Z-A, Price Low-High, Price High-Low)
 * - Navigation to shopping cart
 */
export class InventoryPage {
  // Page instance reference
  readonly page: Page;

  // Locators - Define all page elements
  readonly pageTitle: Locator;         // Page title "Products" (class="title")
  readonly cartBadge: Locator;         // Shopping cart badge showing item count
  readonly cartLink: Locator;          // Link to shopping cart page
  readonly sortDropdown: Locator;      // Dropdown for sorting products
  readonly hamburgerMenu: Locator;     // Menu button (sidebar navigation)

  /**
   * Constructor - Initialize the page and locators
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Initialize locators using class and ID selectors
    this.pageTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');

    // Sort dropdown uses CSS class selector
    // NOTE: This is 'select.product_sort_container' not [data-test] attribute
    this.sortDropdown = page.locator('select.product_sort_container');

    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
  }

  /**
   * Add a product to cart by product name
   * @param productName - Name of product (e.g., "Sauce Labs Backpack")
   *
   * How it works:
   * - Converts product name to slug format (lowercase, spaces to hyphens)
   * - Example: "Sauce Labs Backpack" becomes "sauce-labs-backpack"
   * - Clicks button with data-test="add-to-cart-{slug}"
   */
  async addToCart(productName: string) {
    // Convert product name to slug format for data-test attribute
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');

    // Click the "Add to cart" button for this product
    await this.page.click(`[data-test="add-to-cart-${productSlug}"]`);
  }

  /**
   * Remove a product from cart by product name
   * @param productName - Name of product to remove
   *
   * NOTE: Remove button only appears after product has been added to cart
   */
  async removeFromCart(productName: string) {
    // Convert product name to slug format for data-test attribute
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');

    // Click the "Remove" button for this product
    await this.page.click(`[data-test="remove-${productSlug}"]`);
  }

  /**
   * Get the current cart item count from the badge
   * @returns String with item count, or '0' if badge not visible
   */
  async getCartItemCount(): Promise<string> {
    return await this.cartBadge.textContent() || '0';
  }

  /**
   * Navigate to the shopping cart page
   * Clicks the cart icon in the top-right corner
   */
  async goToCart() {
    await this.cartLink.click();
  }

  /**
   * Sort products by selected option
   * @param option - Sort option: 'az' (A-Z), 'za' (Z-A), 'lohi' (Low-High), 'hilo' (High-Low)
   */
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get the name of the first product in the list
   * Useful for verifying sort order
   * @returns Product name text
   */
  async getFirstProductName(): Promise<string> {
    return await this.page.locator('.inventory_item_name').first().textContent() || '';
  }

  /**
   * Get the price of the first product in the list
   * Useful for verifying price-based sorting
   * @returns Product price text (e.g., "$29.99")
   */
  async getFirstProductPrice(): Promise<string> {
    return await this.page.locator('.inventory_item_price').first().textContent() || '';
  }
}
