import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../test-data/users";

test.describe("Product sorting", () => {
  test("user can sort products by price from low to high", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.sortByPriceLowToHigh();

    const actualPrices = await inventoryPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    await expect(actualPrices).toEqual(expectedPrices);
  });
});