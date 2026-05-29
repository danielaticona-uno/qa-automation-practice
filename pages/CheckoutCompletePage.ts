import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {

    readonly page: Page;

    readonly titlePage :Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomebutton: Locator;
    readonly successIcon: Locator;



    constructor(page: Page) {

        this.page = page;

        this.titlePage = page.locator('[data-test="title"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.backHomebutton = page.locator('[data-test="back-to-products"]');
        this.successIcon = page.locator('[data-test="pony-express"]') ;

    }


     async backInventoryButton(): Promise<void> {
        await this.backHomebutton.click();
    }



}