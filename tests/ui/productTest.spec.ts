import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { users } from '../../data/users';


test.describe('Tests the Product page', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);

    })

    test('Add to cart from the product page', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const productPage = new ProductPage(page);

        await inventoryPage.redirectPage();
        await productPage.addToCart();

        await expect(inventoryPage.cartBadge).toHaveText('1');

    })


    test('Remove to cart from the product page', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const productPage = new ProductPage(page);

        await inventoryPage.redirectPage();
        await productPage.addToCart();

        const cartCountadd = await productPage.getCartItemCountP();
        await productPage.removeToCart();

        //assertions
        await expect(inventoryPage.cartBadge).toHaveText('');


    })

    test('Back to Inventory page', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        const productPage = new ProductPage(page);

        await inventoryPage.redirectPage();
        await productPage.returnToInventory();
        //assertions
        expect(page).toHaveURL(/inventory.html/);
        await expect(inventoryPage.titlePage).toHaveText('Products');

    })

})