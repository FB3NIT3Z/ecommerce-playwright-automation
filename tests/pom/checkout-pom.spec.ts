import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Tests with POM', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();
  });

  test('TC045 - Checkout completo exitoso', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Carlos', 'García', '28001');
    await checkoutPage.continue();
    await checkoutPage.finish();

    expect(await checkoutPage.getCompleteMessage())
      .toBe('Thank you for your order!');
  });

  test('TC046 - Validación First Name requerido', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('', 'García', '28001');
    await checkoutPage.continue();

    expect(await checkoutPage.getErrorMessage())
      .toContain('First Name is required');
  });

  test('TC047 - Validación Last Name requerido', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Carlos', '', '28001');
    await checkoutPage.continue();

    expect(await checkoutPage.getErrorMessage())
      .toContain('Last Name is required');
  });

  test('TC048 - Validación Postal Code requerido', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Carlos', 'García', '');
    await checkoutPage.continue();

    expect(await checkoutPage.getErrorMessage())
      .toContain('Postal Code is required');
  });

  test('TC049 - Cancelar checkout', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.proceedToCheckout();
    await checkoutPage.cancel();

    await expect(page).toHaveURL(/cart/);
  });

  test('TC050 - E2E completo con POM', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Verificar producto en carrito
    expect(await cartPage.getItemCount()).toBe(1);

    // Proceder con checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Ana', 'López', '08001');
    await checkoutPage.continue();

    // Verificar overview y finalizar
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finish();

    // Verificar confirmación
    await expect(page).toHaveURL(/checkout-complete/);
    expect(await checkoutPage.getCompleteMessage()).toBe('Thank you for your order!');
  });

});
