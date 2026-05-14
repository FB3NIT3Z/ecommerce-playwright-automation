import { test, expect } from '@playwright/test';

test.describe('End-to-End User Journeys', () => {

  test('TC027 - E2E: Usuario completa compra exitosamente', async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // 2. Agregar productos
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // 3. Verificar badge
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // 4. Ir al carrito
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // 5. Checkout
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Carlos');
    await page.fill('[data-test="lastName"]', 'García');
    await page.fill('[data-test="postalCode"]', '28001');
    await page.click('[data-test="continue"]');

    // 6. Verificar overview
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // 7. Finalizar
    await page.click('[data-test="finish"]');

    // 8. Confirmación
    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

  test('TC028 - E2E: Usuario agrega y remueve productos', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Agregar 3 productos
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    // Ir al carrito
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(3);

    // Remover 1 producto
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // Continuar con checkout
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Ana');
    await page.fill('[data-test="lastName"]', 'López');
    await page.fill('[data-test="postalCode"]', '08001');
    await page.click('[data-test="continue"]');

    // Verificar solo 2 productos en overview
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });

  test('TC029 - E2E: Usuario cancela en diferentes puntos', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    // Cancelar desde carrito
    await page.click('[data-test="continue-shopping"]');
    await expect(page).toHaveURL(/inventory/);

    // Volver al carrito e iniciar checkout
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    // Cancelar desde información
    await page.click('[data-test="cancel"]');
    await expect(page).toHaveURL(/cart/);
  });

});
