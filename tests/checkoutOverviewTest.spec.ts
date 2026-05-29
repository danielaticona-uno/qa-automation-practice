import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../data/users';
import { CheckOutPage } from '../pages/CheckOutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';



test.describe('Tests the Checkout: Overview page', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckOutPage(page);

        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();
        await inventoryPage.CartItemButton();
        await cartPage.checkout();
        await checkoutPage.fillCheckoutInformation('Pablo', 'Calvo', '15477');
        await checkoutPage.continueCheckout();

    })

    test('Validate Items and Prices selected', async ({ page }) => {
        const checkoutOverview = new CheckoutOverviewPage(page);
        const itemNames = await checkoutOverview.getItemsNames();
        const itemPrices = await checkoutOverview.getItemPrices();

        //assertion
        expect(itemNames).toContain('Sauce Labs Backpack');
        expect(itemPrices).toContain(29.99);

        expect(itemNames).toContain('Sauce Labs Onesie');
        expect(itemPrices).toContain(7.99);

    })

    test('Validate the Subtotal prices', async ({ page }) => {
        const checkoutOverview = new CheckoutOverviewPage(page);
        const subtotal = await checkoutOverview.getSubtotal();
        //assertion
        expect(subtotal).toBe(37.98);
    })

    test('Validate the Total price', async ({ page }) => {
        const checkoutOverview = new CheckoutOverviewPage(page);
        const totalPrice = await checkoutOverview.getTotalPrice();
        //assertion
        expect(totalPrice).toBe(41.02);
    })

    test('Validate Payment Information', async ({ page }) => {

        const checkoutOverview = new CheckoutOverviewPage(page);
        const paymentInfo = await checkoutOverview.getPaymentInfo();
        //assertion
        expect (paymentInfo).toBe('SauceCard #31337');

    })

    test('Validate Shipping Information Information', async ({ page }) => {
        
        const checkoutOverview = new CheckoutOverviewPage(page);
        const shippinngInfo = await checkoutOverview.getShippingInfo();
        //assertion
        expect (shippinngInfo).toBe('Free Pony Express Delivery!');

    })


    test ('Validate Finish Checkout flow', async ({ page }) => {
        const checkoutOverview = new CheckoutOverviewPage(page);
        checkoutOverview.finishCheckout();

        //assertion
        await expect(page).toHaveURL(/checkout-complete.html/);
        
    })

    test ('Validate that is possible to cancel ', async ({ page }) => {

        const checkoutOverview = new CheckoutOverviewPage(page);
        checkoutOverview.cancelCheckout();

        //assertion
        await expect(page).toHaveURL(/inventory.html/);

    })
    
    



})