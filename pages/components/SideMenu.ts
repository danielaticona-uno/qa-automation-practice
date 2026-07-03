import {Locator, Page} from '@playwright/test';

export class SideMenu{

    readonly menuButton:Locator;
    readonly logoutLink: Locator;
    readonly allItemsLink: Locator;
    readonly closeButton: Locator;

    constructor(private page: Page){

        this.menuButton =page.locator('#react-burger-menu-btn'); 
        this.logoutLink =page.locator('#logout_sidebar_link'); 
        this.allItemsLink =page.locator('#inventory_sidebar_link'); 
        this.closeButton =page.locator('#react-burger-cross-btn'); 


    }

    async open(): Promise<void>{
        await this.menuButton.click();
    }

    async logout(): Promise<void>{
        await this.open();
        await this.logoutLink.click();
    }

    async goToAllItems(): Promise<void>{
        await this.open();
        await this.allItemsLink.click();
    }

    async close(): Promise<void>{
        await this.closeButton.click();
    }



}