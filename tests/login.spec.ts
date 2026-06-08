import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users, loginErrors } from "../test-data/users";

test.describe("Login regression", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("standard_user can log in and see inventory page", async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test("locked_out_user cannot log in and sees correct error", async () => {
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrors.lockedOut);
  });

  test("wrong password shows error message", async () => {
    await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrors.wrongPassword);
  });

  test("empty username shows validation error", async () => {
    await loginPage.login("", users.standard.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrors.emptyUsername);
  });
});