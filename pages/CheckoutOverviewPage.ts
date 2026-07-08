import { Page, Locator } from '@playwright/test';
import { CheckoutCompletePage } from './CheckoutCompletePage';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {

    readonly itemNames: Locator;
    readonly itemPrices: Locator;

    readonly subPrices: Locator;
    readonly tax: Locator;
    readonly totalPrice: Locator;

    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;

    readonly cancelButton: Locator;
    readonly finishButton: Locator;




    constructor(page: Page) {
        super(page);

        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');

        this.subPrices = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.totalPrice = page.locator('[data-test="total-label"]');

        this.paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]');


        this.cancelButton = page.locator('[data-test="cancel"]');
        this.finishButton = page.locator('[data-test="finish"]');

    }

    async finishCheckout(): Promise<CheckoutCompletePage> {
        await this.finishButton.click();
        return new CheckoutCompletePage(this.page);
    }

    async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
    }

    async getItemsNames(): Promise<string[]> {
        return await this.itemNames.allTextContents();

    }

    async getItemPrices(): Promise<number[]> {
        const pricesText = await this.itemPrices.allTextContents();
        return pricesText.map(price => Number(price.replace('$', '')));

    }

    async getSubtotal(): Promise<number> {
        const subTotalText = await this.subPrices.textContent();
        return Number(subTotalText?.replace('Item total: $', '').trim());
    }

    async getTax(): Promise<number> {
        const taxText = await this.tax.textContent();
        return Number(taxText?.replace('Total: $', '').trim());
    }

    async getTotalPrice(): Promise<number> {
        const totalText = await this.totalPrice.textContent();
        return Number(totalText?.replace('Total: $', '').trim());
    }

     async getPaymentInfo(): Promise<string > {
        const paymentText = await this.paymentInfo.textContent();
        return paymentText?.trim() ||"";

    }
    
    async getShippingInfo(): Promise<string > {
        const shippingText = await this.shippingInfo.textContent();
        return shippingText?.trim() ||"";

    }

}