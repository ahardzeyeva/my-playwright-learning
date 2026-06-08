# Final Project — Playwright Test Suite

## Test target

SauceDemo: https://www.saucedemo.com

## Covered user journey

Login → product selection → cart → checkout

## Test cases

* Valid user can log in and see the inventory page
* Locked user cannot log in and sees the correct error message
* Wrong password shows an error message
* Empty username shows a validation error
* User can add a product to the cart and verify the cart badge
* User can add multiple products to the cart and verify the badge count
* User can open the cart and see the selected product
* User can remove a product from the cart
* User can complete checkout and see the success message
* User can sort products by price from low to high

## Project structure

* `pages/` — Page Object classes:

  * `LoginPage.ts`
  * `InventoryPage.ts`
  * `CartPage.ts`
  * `CheckoutPage.ts`
* `tests/` — Playwright test specs:

  * `login.spec.ts`
  * `cart.spec.ts`
  * `checkout.spec.ts`
  * `sorting.spec.ts`
* `test-data/` — credentials and test input data
* `playwright.config.ts` — Playwright configuration

## How to run

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run tests in Chromium only:

```bash
npx playwright test --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

## Notes

* Tests use the Page Object Model.
* User actions are stored in Page Object classes.
* Assertions are kept in test files.
* No hard waits (`waitForTimeout`) are used.
* Test data is stored separately from test logic.
* Locators use stable and readable strategies such as `getByRole`, `getByPlaceholder`, and `data-test` attributes.

## Known limitations

* This suite covers only the selected SauceDemo user journey.
* It does not cover all possible edge cases.
* The tests are focused on login, cart behavior, checkout, and basic product sorting.
