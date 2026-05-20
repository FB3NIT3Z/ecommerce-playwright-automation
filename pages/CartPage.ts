// pages/CartPage.ts
import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItem(productName: string) {
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.click(`[data-test="remove-${productSlug}"]`);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}
