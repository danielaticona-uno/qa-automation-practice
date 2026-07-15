import { BasePage } from "./BasePage";

export class PaymentPage extends BasePage {

    async fullNameET(NameET: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/nameET', NameET);
    }

    async cardNumberET(cardNumber: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/cardNumberET', cardNumber);
    }

    async expirationDateET(expDate: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/expirationDateET', expDate);
    }

    async securityCodeET(secCode: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/securityCodeET', secCode);
    }

    async reviewOrderBtn() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
        await this.click('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
    }

    async isPaymentDisplayed() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/cardNumberET');
    }

    async fillPaymentForm(payment: any) {
    await this.fullNameET(payment.name);
    await this.cardNumberET(payment.card);
    await this.expirationDateET(payment.expiration);
    await this.securityCodeET(payment.cvv);
    await this.reviewOrderBtn();
}

}