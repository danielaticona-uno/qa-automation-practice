import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../data/users';


test.describe('Tests the Product page', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);

    })


    test('Verify that is possible to add product to the cart', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        // Add the products
        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();
        await expect(inventoryPage.cartBadge).toHaveText('2');

    })


    test('Remove items', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Add the products
        await inventoryPage.addBackPackToCart();
        await inventoryPage.addOnesietoCart();
        await inventoryPage.removeBackPackButtonToCart();
        await expect(inventoryPage.cartBadge).toHaveText('1');

    })


    test('Order by Price - A to Z', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortbyAtoZ();
        const ActualItemName = await inventoryPage.getInventoryItemNames();

        const expectItems = [...ActualItemName].sort((a, b) => a.localeCompare(b));

        // assertion
        expect(ActualItemName).toEqual(expectItems);
    })


    test('Order by Price - Z to A', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortbyZtoA();

        const ActualItemName = await inventoryPage.getInventoryItemNames();
        const expectItems = [...ActualItemName].sort((a, b) => a.localeCompare(b)).reverse();

        // assertion
        expect(ActualItemName).toEqual(expectItems);
    })


    test('Order by Price - Low to High', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortbyLowtoHigh();

        const ActualItemPrice = await inventoryPage.getInventoryPrices();

        const expectPrices = [...ActualItemPrice].sort((a, b) => a - b);

        //assertion
        expect(ActualItemPrice).toEqual(expectPrices);
    })


    test('Order by Price - High to Low', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortbyHightoLow();

        const ActualItemPrice = await inventoryPage.getInventoryPrices();

        const expectPrices = [...ActualItemPrice].sort((a, b) => a - b).reverse();
        //assertion
        expect(ActualItemPrice).toEqual(expectPrices);
    })


    test('Verify Links redirect to the correct page', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        inventoryPage.redirectPage();

        //assertion
        await expect(page).toHaveURL(/inventory-item.html/);

        await expect(inventoryPage.productTilePage).toHaveText('Sauce Labs Bike Light');
    })


})