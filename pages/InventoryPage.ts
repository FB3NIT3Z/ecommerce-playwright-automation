// pages/InventoryPage.ts
import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly hamburgerMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('select.product_sort_container');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
  }

  async addToCart(productName: string) {
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.click(`[data-test="add-to-cart-${productSlug}"]`);
  }

  async removeFromCart(productName: string) {
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.click(`[data-test="remove-${productSlug}"]`);
  }

  async getCartItemCount(): Promise<string> {
    return await this.cartBadge.textContent() || '0';
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstProductName(): Promise<string> {
    return await this.page.locator('.inventory_item_name').first().textContent() || '';
  }

  async getFirstProductPrice(): Promise<string> {
    return await this.page.locator('.inventory_item_price').first().textContent() || '';
  }
}
