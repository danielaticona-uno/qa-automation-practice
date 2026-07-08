import { Page, Locator } from '@playwright/test';
import { BasePage} from './BasePage';

export class CheckoutCompletePage extends BasePage{

    readonly titlePage :Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomebutton: Locator;
    readonly successIcon: Locator;



    constructor(page: Page) {

        super(page);

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