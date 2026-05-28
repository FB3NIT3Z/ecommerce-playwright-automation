import { test, expect } from '@playwright/test';

test.describe('Product Sorting Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    // Esperar a que la página de inventory cargue
    await page.waitForURL(/inventory/);
  });

  test('TC023 - Ordenar productos por nombre A-Z (default)', async ({ page }) => {
    // Verificar orden default
    const firstProduct = await page.locator('.inventory_item_name').first().textContent();
    expect(firstProduct).toBe('Sauce Labs Backpack');
  });

  test('TC024 - Ordenar productos por nombre Z-A', async ({ page }) => {
    // Seleccionar Z-A usando el select element directamente
    await page.locator('select.product_sort_container').selectOption('za');

    // Verificar orden
    const firstProduct = await page.locator('.inventory_item_name').first().textContent();
    expect(firstProduct).toContain('Test.allTheThings()');
  });

  test('TC025 - Ordenar productos por precio bajo-alto', async ({ page }) => {
    await page.locator('select.product_sort_container').selectOption('lohi');

    // Obtener primer precio
    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(firstPrice).toBe('$7.99');
  });

  test('TC026 - Ordenar productos por precio alto-bajo', async ({ page }) => {
    await page.locator('select.product_sort_container').selectOption('hilo');

    // Obtener primer precio
    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(firstPrice).toBe('$49.99');
  });

});
