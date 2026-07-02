import { Page, Locator } from '@playwright/test';
import {CheckOutPage} from './CheckOutPage';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;   
    readonly removeCartButtonBackPack: Locator;


    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')
        this.removeCartButtonBackPack = page.locator('[data-test="remove-sauce-labs-backpack"]');

    }

    async removeFromCartBackPack(): Promise<void> {
        await this.removeCartButtonBackPack.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async checkout(): Promise<CheckOutPage> {
        await this.checkoutButton.click();
        return new CheckOutPage(this.page)
    }
    

    async getCartItemsNames(): Promise<string[]> {
        return await this.cartItems.allTextContents();
    }

}