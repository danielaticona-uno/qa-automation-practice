import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../data/users';


test.describe('Tests the Cart page', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);

    })

    test('list cart items', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const cartItems = await cartPage.getCartItemsNames();

        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();

        await inventoryPage.CartItemButton();
        

        //Assertions
        expect(cartItems).toContain('Sauce Labs Backpack');
        expect(cartItems).toContain('Sauce Labs Onesie');
        await expect(inventoryPage.cartBadge).toHaveText('2');

    });

    test('Remove cart items', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();

        await inventoryPage.CartItemButton();
        const cartItems = await cartPage.getCartItemsNames();

        //Assertions before remove
        expect(cartItems).toContain('Sauce Labs Backpack');
        expect(cartItems).toContain('Sauce Labs Onesie');
        await expect(inventoryPage.cartBadge).toHaveText('2');

        // remove item and get the list again
        await cartPage.removeFromCartBackPack();
        const cartupdate = await cartPage.getCartItemsNames();

        //Assertions after remove
        expect(cartupdate).toContain('Sauce Labs Onesie');
        expect(cartupdate).not.toContain('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');


    });


    test('Continue shopping from cart with items', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();

        await inventoryPage.CartItemButton();
        const cartItems = await cartPage.getCartItemsNames();

        //Assertions
        expect(cartItems).toContain('Sauce Labs Backpack');
        expect(cartItems).toContain('Sauce Labs Onesie');

        await cartPage.continueShopping();

        //Assertions after continue shopping
        expect(page).toHaveURL(/inventory.html/);

        //assertions after continue shopping
        await expect(inventoryPage.titlePage).toHaveText('Products');

    });

    test('Continue shopping from cart without items', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.CartItemButton();
        const cartItems = await cartPage.getCartItemsNames();

        await cartPage.continueShopping();

        //Assertions after continue shopping
        expect(page).toHaveURL(/inventory.html/);
        await expect(inventoryPage.titlePage).toHaveText('Products');

    });

    test('Checkout shopping from cart with items', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();

        await inventoryPage.CartItemButton();
        const cartItems = await cartPage.getCartItemsNames();

        //Assertions
        expect(cartItems).toContain('Sauce Labs Backpack');
        expect(cartItems).toContain('Sauce Labs Onesie');

        await cartPage.checkout();

        //Assertions after checkout
        expect(page).toHaveURL(/checkout-step-one.html/);

    });

    test('Checkout - shopping from cart without items', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.CartItemButton();
        const cartItems = await cartPage.getCartItemsNames();

        await cartPage.checkout();

        //Assertions after checkout
        expect(page).toHaveURL(/checkout-step-one.html/);

    });



})