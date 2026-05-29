import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../data/users';
import { CheckOutPage } from '../pages/CheckOutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Tests the Checkout: Overview page', () => {


    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckOutPage(page);
        const checkoutOverview = new CheckoutOverviewPage(page);

        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();
        await inventoryPage.CartItemButton();
        await cartPage.checkout();
        await checkoutPage.fillCheckoutInformation('Pablo', 'Calvo', '15477');
        await checkoutPage.continueCheckout();
        await checkoutOverview.finishCheckout();

    })

    test ('Validate that is possible to cancel ', async ({ page }) => {

        const checkoutComplete = new CheckoutCompletePage(page);
        checkoutComplete.backInventoryButton();

        //assertion
        await expect(page).toHaveURL(/inventory.html/);
    })


    test ('Validate successl checkout complete', async ({ page }) => {

        const checkoutComplete = new CheckoutCompletePage(page);


        //assertion
        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(checkoutComplete.successIcon).toBeVisible();
        await expect(checkoutComplete.completeHeader).toHaveText('Thank you for your order!');
        await expect(checkoutComplete.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(checkoutComplete.titlePage).toHaveText('Checkout: Complete!');
        await expect(checkoutComplete.backHomebutton).toBeVisible();
        await expect(checkoutComplete.backHomebutton).toHaveText('Back Home');

    })










})