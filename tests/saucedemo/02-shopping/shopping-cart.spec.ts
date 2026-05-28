import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Tests', () => {

  // Hook para login antes de cada test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC008 - Agregar un producto al carrito', async ({ page }) => {
    // Agregar producto
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Verificar badge del carrito
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Ir al carrito
    await page.click('.shopping_cart_link');

    // Verificar producto en carrito
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name'))
      .toContainText('Sauce Labs Backpack');
  });

  test('TC009 - Agregar múltiples productos al carrito', async ({ page }) => {
    // Agregar 3 productos diferentes
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    // Verificar badge
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Ir al carrito
    await page.click('.shopping_cart_link');

    // Verificar cantidad de items
    await expect(page.locator('.cart_item')).toHaveCount(3);
  });

  test('TC010 - Remover producto del carrito', async ({ page }) => {
    // Agregar producto
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    // Remover producto
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Verificar carrito vacío
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('TC011 - Continuar comprando desde carrito', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    // Hacer clic en "Continue Shopping"
    await page.click('[data-test="continue-shopping"]');

    // Verificar que regresa a inventory
    await expect(page).toHaveURL(/inventory/);

    // Badge debe seguir mostrando 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('TC012 - Verificar persistencia del carrito al navegar', async ({ page }) => {
    // Agregar producto
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Navegar a detalle de otro producto
    await page.click('.inventory_item_name >> nth=1');

    // Badge debe seguir visible
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Regresar a inventory
    await page.click('[data-test="back-to-products"]');

    // Badge sigue ahí
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

});
