import { Page, Locator } from '@playwright/test';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';
import { CartPage } from './CartPage';

export class CheckOutPage {

    readonly page: Page;
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');

    }    


    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout(): Promise<CheckoutOverviewPage> {
        await this.continueButton.click();
        return new CheckoutOverviewPage(this.page);
    }

    async cancelCheckout(): Promise<CartPage> {
        await this.cancelButton.click();
        return new CartPage(this.page);
    }
    
    async getErrorMessage(): Promise <string>{
        return await this.errorMessage.textContent()||'';
    }


}