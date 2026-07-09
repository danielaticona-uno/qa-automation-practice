import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { users } from '../../data/users';

test.describe('SauceDEmo Test - Login Tests', () => {


    test('loguot test', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const logoutPage = new LogoutPage(page);

        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await logoutPage.logoutUser();

        // Add assertions to verify the error message
        await expect(page).toHaveURL(/saucedemo.com/);
        await expect(loginPage.loginButton).toBeVisible();

    })


})