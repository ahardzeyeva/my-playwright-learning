import { test, expect } from '@playwright/test';

// POSITIVE test — checks that something IS as expected
test('page has the correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// NEGATIVE test — checks that something is NOT present.
// In QA, this is just as important as positive checks.
test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // .not.toBeVisible() = assert the element is NOT visible on the page
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});


/////// Week 3 ///////
///// page.getByTestId('[data-test="login-button"]')
// 
/////page.getByTestId('[data-test="shopping-cart-link"]')
/// Task 3 - list handling
test('Task 3 - list handling', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);

  const items = page.locator('.inventory_item');

  const count = await items.count();
  console.log('Items count:', count);

  await expect(items).toHaveCount(6);

  await items.nth(1).getByRole('button', { name: 'Add to cart' }).click();

  const backpackItem = items.filter({ hasText: 'Sauce Labs Backpack' });
  await backpackItem.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});
////// Task 4 — DevTools only
/// Website: https://playwright.dev
/// HTML: <a class="getStarted_Sjon" href="/docs/intro">Get started</a>
// page.getByRole('link', { name: 'Get started' }) ///
test('Task 4 - DevTools only locator', async ({ page }) => {
  await page.goto('https://playwright.dev');

  const getStartedLink = page.getByRole('link', { name: 'Get started' });

  await expect(getStartedLink).toBeVisible();

  await getStartedLink.click();

  await expect(page).toHaveURL(/docs\/intro/);
});
////// Task 5 -  XPath vs CSS example
// page.locator("//div[@class='item'][2]")
// page.getByTestId("item-2")

///// Task 6 -  Real-world challenge

test('Task 6 - semantic locator on SauceDemo login page', async ({ page }) => {
  await page.goto('/');

  const logo = page.getByText('Swag Labs');

  await expect(logo).toBeVisible();
});