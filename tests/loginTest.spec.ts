import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';


test.describe('SauceDEmo Test - Login Tests', () => {

    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        const inventoryPage = await loginPage.login(users.standardUser.username, users.standardUser.password);

       // Add assertions to verify successful login, e.g., check for a specific element on the landing page
        await expect(inventoryPage.title).toHaveText('Products');
    });


    test('Login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.invalidCredentialsUser.username, users.invalidCredentialsUser.password);

        // Add assertions to verify the error message
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

});