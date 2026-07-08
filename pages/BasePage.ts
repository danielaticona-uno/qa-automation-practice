import { Page } from '@playwright/test';

export class BasePage{
    constructor(protected page: Page){ }

    async goto(url: string){
        await this.page.goto(url);
    }

    async getTitle(){
        return await this.page.title();
    }

    async reload(){
        await this.page.reload();
    }
    async currentURL(){
        return this.page.url();
    }
}