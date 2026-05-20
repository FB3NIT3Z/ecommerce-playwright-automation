import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Authentication Tests with POM', () => {

  test('TC035 - Login exitoso usando POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('TC036 - Login fallido con contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('do not match');
  });

  test('TC037 - Login con usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    expect(await loginPage.getErrorMessage()).toContain('locked out');
  });

  test('TC038 - Validación campo usuario vacío', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.passwordInput.fill('secret_sauce');
    await loginPage.loginButton.click();

    expect(await loginPage.getErrorMessage()).toContain('Username is required');
  });

  test('TC039 - Validación campo contraseña vacío', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.loginButton.click();

    expect(await loginPage.getErrorMessage()).toContain('Password is required');
  });

});
