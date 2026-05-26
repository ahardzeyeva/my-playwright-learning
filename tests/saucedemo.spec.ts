import { test, expect } from '@playwright/test';

test.describe('SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Login', () => {
    test('Task - 1: should login with valid credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page).toHaveURL(/inventory/);
    });

    test('Task - 2: should show error for wrong password', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('wrong_password');

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(
        page.locator('[data-test="error"]'),
        'Error should appear for wrong credentials'
      ).toBeVisible();
    });

    ///Week 5 - Scenario 1 
    test.only('Task-3: should show error for locked out user', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
  });

    test('Task - 5: should show validation error when login form is empty updated', async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(
        page.locator('[data-test="error"]'),
        'Error should appear when login form is empty'
      ).toContainText('Username is required');
    });

    test('Task - 5.1: should show validation error when only username is entered', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('standard_user');

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(
        page.locator('[data-test="error"]'),
        'Error should appear when password is empty'
      ).toContainText('Password is required');
    });

    test('Task - 5.2: should show validation error when only password is entered', async ({ page }) => {
      await page.getByPlaceholder('Password').fill('secret_sauce');

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(
        page.locator('[data-test="error"]'),
        'Error should appear when username is empty'
      ).toContainText('Username is required');
    });
  });

  test.describe('Authenticated user', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page).toHaveURL(/inventory/);
    });

    test('Task - 3: should add one product to the cart', async ({ page }) => {
      const backpackItem = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Backpack',
      });

      await backpackItem.getByRole('button', { name: 'Add to cart' }).click();

      await expect(
        page.locator('.shopping_cart_badge'),
        'Cart badge should show 1 after adding a product'
      ).toHaveText('1');
    });

    test('Task - 4: should remove product from the cart', async ({ page }) => {
      const backpackItem = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Backpack',
      });

      await backpackItem.getByRole('button', { name: 'Add to cart' }).click();

      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

      await backpackItem.getByRole('button', { name: 'Remove' }).click();

      await expect(
        page.locator('.shopping_cart_badge'),
        'Cart badge should not be visible after removing product'
      ).not.toBeVisible();
    });

    /// Task - 6: stability check
    //// npx playwright test tests/saucedemo.spec.ts --repeat-each=3
    /// Running 36 tests using 4 workers
    /// 36 passed (41.7s)

    test('Task - 7: Bug - should not allow checkout with an empty cart', async ({ page }) => {
      await page.locator('.shopping_cart_link').click();

      await expect(page).toHaveURL(/cart/);

      await expect(
        page.locator('.cart_item'),
        'Cart should be empty before checkout'
      ).toHaveCount(0);

      await page.getByRole('button', { name: 'Checkout' }).click();

      await expect(
        page,
        'User should not be redirected to checkout with an empty cart'
      ).not.toHaveURL(/checkout-step-one/);
    });

    test('Bonus Task - Multiple Products: should update cart badge after adding and removing multiple products', async ({ page }) => {
      const backpackItem = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Backpack',
      });

      const bikeLightItem = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Bike Light',
      });

      const boltTShirtItem = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Bolt T-Shirt',
      });

      await backpackItem.getByRole('button', { name: 'Add to cart' }).click();
      await bikeLightItem.getByRole('button', { name: 'Add to cart' }).click();
      await boltTShirtItem.getByRole('button', { name: 'Add to cart' }).click();

      await expect(
        page.locator('.shopping_cart_badge'),
        'Cart badge should show 3 after adding three products'
      ).toHaveText('3');

      await backpackItem.getByRole('button', { name: 'Remove' }).click();

      await expect(
        page.locator('.shopping_cart_badge'),
        'Cart badge should show 2 after removing one product'
      ).toHaveText('2');
    });

    test('Bonus Task - Sorting: should change first product after sorting by price low to high', async ({ page }) => {
      const firstProductName = page.locator('.inventory_item_name').first();

      await expect(firstProductName).toHaveText('Sauce Labs Backpack');

      await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

      await expect(
        firstProductName,
        'First product should change after sorting by price low to high'
      ).toHaveText('Sauce Labs Onesie');
    });

    test('Bonus Task - State After Refresh: should keep cart item after page refresh', async ({ page }) => {
      const backpackItem = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Backpack',
      });

      await backpackItem.getByRole('button', { name: 'Add to cart' }).click();

      await expect(
        page.locator('.shopping_cart_badge'),
        'Cart badge should show 1 after adding a product'
      ).toHaveText('1');

      await page.reload();

      await expect(
        page.locator('.shopping_cart_badge'),
        'Cart badge should still show 1 after page refresh'
      ).toHaveText('1');
    });
  });
});