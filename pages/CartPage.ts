import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly backpackItem: Locator;
  readonly bikeLightItem: Locator;
  readonly removeBackpackButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.backpackItem = page.getByText("Sauce Labs Backpack");
    this.bikeLightItem = page.getByText("Sauce Labs Bike Light");
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}