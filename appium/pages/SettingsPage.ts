import { BasePage } from "./BasePage";

export class SettingsPage extends BasePage{

    async openNetworkAndInternet(){
        const selector = 'android=new UiSelector().text("Network & internet")';
        await this.waitForElement(selector);
        await this.click(selector);
    }
    

    async openInternet(){
        const selector= 'android=new UiSelector().text("Internet")';
        await this.waitForElement(selector);
        await this.click(selector);

    }

    async goBack(){
        await super.goBack();
    }
}

