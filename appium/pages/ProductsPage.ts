import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
    async isProductPageDisplayed() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:/productTV');
    }

    async openRedBackPack() {
        await this.click('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productIV").instance(3)');
    }

    async addFirstProductToCart() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/cartBt');
        await this.click('id=com.saucelabs.mydemoapp.android:id/cartBt');
    }

    async verifyCartCount() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/cartTV');
        const count = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/cartTV').getText();
        if (count !== "1") {
            throw new Error(`Expected cart count to be 1 but got ${count}`);
        }

        console.log("EXITOSOOO 11111");
    }

    async openCart() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/cartRL');
        await this.click('id=com.saucelabs.mydemoapp.android:id/cartRL')
    }

    async verifyProducName() {
        const name = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/titleTV').getText();
        if (name !== "Sauce Labs Backpack (red)") {
            throw new Error(`Expected Sauce Labs Backpack(red),but got ${name}`);
        }

        console.log("Product name is CORRECT!!!");
    }

}