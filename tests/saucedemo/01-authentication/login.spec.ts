import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

  test('TC001 - Login exitoso con usuario estándar', async ({ page }) => {
    // Navegar a la página
    await page.goto('/');

    // Ingresar credenciales
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    // Hacer clic en login
    await page.click('#login-button');

    // Verificaciones
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC002 - Login fallido con contraseña incorrecta', async ({ page }) => {
    await page.goto('/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    // Verificar mensaje de error
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  test('TC003 - Login fallido con usuario bloqueado', async ({ page }) => {
    await page.goto('/');

    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toContainText('this user has been locked out');
  });

  test('TC004 - Validación campo usuario vacío', async ({ page }) => {
    await page.goto('/');

    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });

  test('TC005 - Validación campo contraseña vacío', async ({ page }) => {
    await page.goto('/');

    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Password is required');
  });

});
