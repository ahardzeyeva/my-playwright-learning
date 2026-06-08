import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { users } from "../test-data/users";

test.describe("Cart behavior", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("cart badge shows correct count after adding a product", async () => {
    await inventoryPage.addFirstProductToCart();

    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("cart page shows the name of the selected product", async () => {
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    await expect(cartPage.backpackItem).toBeVisible();
  });

  test("removing a product updates the cart", async () => {
    await inventoryPage.addFirstProductToCart();
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.openCart();
    await cartPage.removeBackpack();

    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("adding multiple products shows correct badge count", async () => {
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.addSecondProductToCart();

    await expect(inventoryPage.cartBadge).toHaveText("2");
  });
});