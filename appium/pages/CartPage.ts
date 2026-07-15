import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    async verifyProductPrice() {
        const price = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/priceTV').getText();
        if (price !== "$ 29.99") {
            throw new Error(`Expected Price is $29.99,but got ${price}`);
        }

        console.log("Product price is CORRECT!!!");
    }

    async isCartDisplayed(){
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/cartTV')
    }

    async removeProduct() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/minusIV')
        await this.click('id=com.saucelabs.mydemoapp.android:id/minusIV');
    }

    async verifyEmptyCart() {
        const empty = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/noItemTitleTV').getText();
        if (empty !== "No Items") {
            throw new Error(`Expected texte is No Items,but got ${empty}`);
        } console.log("Product price is CORRECT!!!");
    }

    async proceedToCheckout(){
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/cartBt');
        await this.click('id=com.saucelabs.mydemoapp.android:id/cartBt');
    }

}