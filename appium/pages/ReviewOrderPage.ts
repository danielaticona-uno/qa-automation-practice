import { BasePage } from "./BasePage";

export class ReviewOrderPage extends BasePage {

    async placeOrder() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
        await this.click('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
    }

    async verifyProductName() {
        const nameProduct = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/titleTV').getText();
        if (nameProduct !== "Sauce Labs Backpack (red)") {
            throw new Error(`Expected texte is No Items,but got ${nameProduct}`);
        } console.log("Product name is CORRECT!!!");
    }

    async verifyTotalPrice() {
        const priceProduct = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/totalAmountTV').getText();
        if (priceProduct !== "$ 35.98") {
            throw new Error(`Expected price is $ 35.98 ,but got ${priceProduct}`);
        }
    }

    async verifyShippingAddress() {
        const shippinAddress = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/addressTV').getText();
        if (shippinAddress !== "calle 1 numero 12") {
            throw new Error(`Expected address is calle 1 numero 12 ,but got ${shippinAddress}`);
        }
    }

    async isReviewOrderDisplayed() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
    }

}