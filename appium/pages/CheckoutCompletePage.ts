import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {


    async verifyCheckoutComplete() {
        const messageComp = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/completeTV').getText();
        if (messageComp !== "Checkout Complete") {
            throw new Error(`Expected message is Checkout complete,but got ${messageComp}`);
        }
        console.log("Message is CORRECT!!!");
    }

    async verifyMessage() {
        const messageComp = await this.driver.$('id=com.saucelabs.mydemoapp.android:id/orderTV').getText();
        if (messageComp !== "Your order has been dispatched and will arrive as fast as the pony gallops!") {
            throw new Error(`Expected message is Your order has been dispatched and will arrive as fast as the pony gallops! ,but got ${messageComp}`);
        }
        console.log("Message is CORRECT!!!");
    }

    async isCheckoutCompleted() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/completeTV');

        console.log("Checkout completed successfully");
    }


}