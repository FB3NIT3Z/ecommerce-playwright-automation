import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../../pages/saucedemo/CheckoutPage';
import { users, products, checkoutData } from '../../../utils/testData';

test.describe('Data-Driven Tests', () => {

  test.describe('Login con múltiples usuarios', () => {
    const validUsers = [users.standard, users.problem, users.performance];

    validUsers.forEach((user, index) => {
      test(`TC051.${index} - Login con ${user.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(user.username, user.password);

        await expect(inventoryPage.pageTitle).toHaveText('Products');
      });
    });
  });

  test.describe('Agregar diferentes productos', () => {
    products.slice(0, 3).forEach((product, index) => {
      test(`TC052.${index} - Agregar ${product} al carrito`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        await inventoryPage.addToCart(product);
        expect(await inventoryPage.getCartItemCount()).toBe('1');
      });
    });
  });

  test.describe('Checkout con diferentes datos válidos', () => {
    checkoutData.valid.forEach((data, index) => {
      test(`TC053.${index} - Checkout con ${data.firstName}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addToCart(products[0]);
        await inventoryPage.goToCart();

        await cartPage.proceedToCheckout();
        await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);
        await checkoutPage.continue();
        await checkoutPage.finish();

        expect(await checkoutPage.getCompleteMessage()).toBe('Thank you for your order!');
      });
    });
  });

  test.describe('Validaciones de checkout con datos inválidos', () => {
    checkoutData.invalid.forEach((data, index) => {
      test(`TC054.${index} - Validación: ${data.error}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addToCart(products[0]);
        await inventoryPage.goToCart();

        await cartPage.proceedToCheckout();
        await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);
        await checkoutPage.continue();

        expect(await checkoutPage.getErrorMessage()).toContain(data.error);
      });
    });
  });

});
