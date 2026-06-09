import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly firstProductAddButton: Locator;
  readonly secondProductAddButton: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.firstProductAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.secondProductAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async addFirstProductToCart() {
    await this.firstProductAddButton.click();
  }

  async addSecondProductToCart() {
    await this.secondProductAddButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  async getProductPrices() {
    const pricesText = await this.productPrices.allTextContents();

    return pricesText.map((price) => Number(price.replace("$", "")));
  }
}