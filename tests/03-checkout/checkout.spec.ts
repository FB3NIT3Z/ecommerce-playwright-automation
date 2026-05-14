import { test, expect } from '@playwright/test';

test.describe('Checkout Flow Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Login y agregar producto
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
  });

  test('TC015 - Checkout exitoso con información válida', async ({ page }) => {
    // Iniciar checkout
    await page.click('[data-test="checkout"]');

    // Llenar información
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Verificar página de resumen
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(page.locator('.inventory_item_name'))
      .toContainText('Sauce Labs Backpack');

    // Finalizar compra
    await page.click('[data-test="finish"]');

    // Verificar confirmación
    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text'))
      .toContainText('Your order has been dispatched');
  });

  test('TC016 - Validación de campo First Name requerido', async ({ page }) => {
    await page.click('[data-test="checkout"]');

    // Dejar First Name vacío
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Verificar error
    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  test('TC017 - Validación de campo Last Name requerido', async ({ page }) => {
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });

  test('TC018 - Validación de Postal Code requerido', async ({ page }) => {
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.click('[data-test="continue"]');

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });

  test('TC019 - Cancelar checkout desde información', async ({ page }) => {
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="cancel"]');

    // Debe regresar al carrito
    await expect(page).toHaveURL(/cart/);

    // Producto sigue en carrito
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('TC020 - Cancelar checkout desde overview', async ({ page }) => {
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Cancelar desde overview
    await page.click('[data-test="cancel"]');

    // Debe regresar a inventory
    await expect(page).toHaveURL(/inventory/);
  });

});
