import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../data/users';
import { CheckOutPage } from '../pages/CheckOutPage';

test.describe('Tests the Checkout page', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();
        await inventoryPage.CartItemButton();
        await cartPage.checkout();


    })

    test('Validate the Checkout link', async ({ page }) => {


        //Assertions after checkout
        expect(page).toHaveURL(/checkout-step-one.html/);

    })

    test('Validate successful checkout information', async ({ page }) => {
        const checkoutPage = new CheckOutPage(page);

        await checkoutPage.fillCheckoutInformation('Pablo', 'Calvo', '15477');
        await checkoutPage.continueCheckout();

        //assertions
        expect(page).toHaveURL(/checkout-step-two.html/);
    })

    test('Validate First Name empty', async ({ page }) => {

        const checkoutPage = new CheckOutPage(page);

        await checkoutPage.fillCheckoutInformation('', 'Calvo', '15477');
        await checkoutPage.continueButton.click();

        //assertions
        await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');

    })

    test('Validate Last Name empty', async ({ page }) => {
        const checkoutPage = new CheckOutPage(page);

        await checkoutPage.fillCheckoutInformation('Pablo', '', '15477');
        await checkoutPage.continueButton.click();

        //assertions
        await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
    })

    test('Validate Zip/Postal Code empty', async ({ page }) => {
        const checkoutPage = new CheckOutPage(page);

        await checkoutPage.fillCheckoutInformation('Pablo', 'Calvo', '');
        await checkoutPage.continueButton.click();

        //assertions
        await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
    })

    test('Validate Cancel button', async ({ page }) => {
        const checkoutPage = new CheckOutPage(page);

        await checkoutPage.fillCheckoutInformation('Pablo', 'Calvo', '15477');
        await checkoutPage.cancelCheckout();

        //assertions
        expect(page).toHaveURL(/cart.html/);

    })



})