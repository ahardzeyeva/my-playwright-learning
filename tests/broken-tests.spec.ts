import { test, expect } from "@playwright/test";

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
// Root cause:     [Wrong Username placeholder]
// Fix:            [changed to getByPlaceholder("Username")]
// How I verified: [ran npx playwright test --headed and confirmed the test passes]


test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator('[data-test="error"]')).toHaveText(
  "Epic sadface: Username and password do not match any user in this service"
);
});
// Root cause:   [the test used `getByTestId("error")`, but the actual attribute is `data-test="error"`. The expected text was also not the full error message.]
// Fix:            [changed the locator to `page.locator('[data-test="error"]')` and used `toContainText("Username and password do not match")`]
// How I verified: [ran npx playwright test --headed and confirmed the test passes]



test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
// Root cause:     [the click action on the Add to cart button was missing `await`, so the test did not wait for the click to complete before checking the cart badge.]
// Fix:            [added `await` before `page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()`.]
// How I verified: [ran `npx playwright test --headed` and confirmed the test passes.]