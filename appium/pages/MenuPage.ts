import { BasePage } from "./BasePage";

export class MenuPage extends BasePage{
    async openMenu(){
        const menuButton= await this.driver.$('~View menu');
        await  menuButton.waitForDisplayed({timeout: 10000});
        await menuButton.click();
    }

    async clickLogin(){
        const loginButton = await this.driver.$("~Login Menu Item");
        await loginButton.waitForDisplayed({timeout:10000});
        await loginButton.click();
    }

    async isLoggedIN(){
        await this.waitForElement("~Logout Menu Item");
        //await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/loginBtn');
    }

    async clickCatalog(){
        await this.click('android=new UiSelector().text("Catalog")');
    }
    
}