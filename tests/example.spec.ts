import { test, expect } from '@playwright/test';   // 1. Import Playwright test tools

test('has title', async ({ page }) => {           // 2. Test case: checks the page title
  await page.goto('https://playwright.dev/');    // 3. Open the Playwright website

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);  // 4. Check that the page title contains "Playwright"
});

test('get started link', async ({ page }) => { // 5. Test case: checks the Get started link
  await page.goto('https://playwright.dev/');  // 6. Open the Playwright website

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click(); // 7. Find and click the "Get started" link
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); // 8. Check that the "Installation" heading is visible
});

