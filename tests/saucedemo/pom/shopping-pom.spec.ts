import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../../pages/saucedemo/CartPage';

test.describe('Shopping Tests with POM', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC040 - Agregar producto al carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    expect(await inventoryPage.getCartItemCount()).toBe('1');

    await inventoryPage.goToCart();
    expect(await cartPage.getItemCount()).toBe(1);
  });

  test('TC041 - Agregar múltiples productos', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');

    expect(await inventoryPage.getCartItemCount()).toBe('3');

    await inventoryPage.goToCart();
    expect(await cartPage.getItemCount()).toBe(3);
  });

  test('TC042 - Remover producto del carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();

    await cartPage.removeItem('sauce-labs-backpack');
    expect(await cartPage.getItemCount()).toBe(0);
  });

  test('TC043 - Continuar comprando desde carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
    expect(await inventoryPage.getCartItemCount()).toBe('1');
  });

  test('TC044 - Verificar ordenamiento de productos', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Esperar a que la página de inventory esté cargada
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // Verificar orden Z-A
    await inventoryPage.sortBy('za');
    const firstProduct = await inventoryPage.getFirstProductName();
    expect(firstProduct).toContain('Test.allTheThings()');
  });

});
