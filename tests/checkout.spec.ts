import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users, checkoutInfo } from "../test-data/users";

test.describe("Checkout flow", () => {
  test("user can complete checkout and see success message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step("Login as standard user", async () => {
      await loginPage.open();
      await loginPage.login(users.standard.username, users.standard.password);

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step("Add product to cart", async () => {
      await inventoryPage.addFirstProductToCart();

      await expect(inventoryPage.cartBadge).toHaveText("1");
    });

    await test.step("Open cart and start checkout", async () => {
      await inventoryPage.openCart();

      await expect(cartPage.backpackItem).toBeVisible();

      await cartPage.startCheckout();
    });

    await test.step("Enter checkout information", async () => {
      await checkoutPage.fillCheckoutInformation(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode
      );

      await expect(checkoutPage.firstNameInput).toHaveValue(checkoutInfo.firstName);
      await expect(checkoutPage.lastNameInput).toHaveValue(checkoutInfo.lastName);
      await expect(checkoutPage.postalCodeInput).toHaveValue(checkoutInfo.postalCode);

      await checkoutPage.continueCheckout();
    });

    await test.step("Verify overview and finish order", async () => {
      await expect(checkoutPage.backpackItem).toBeVisible();

      await checkoutPage.finishCheckout();

      await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
    });
  });
});