import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    async enterFullname(fullName: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/fullNameET', fullName);
    }

    async enterAddressL1(fullAddress: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/address1ET', fullAddress);
    }

    async enterCity(city: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/cityET', city);
    }

    async enterZipCode(zipCode: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/zipET', zipCode);
    }

    async enterCountry(country: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/countryET', country);
    }

    async clicktoPayment() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
        await this.click('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
    }

    async toPayment() {
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
        await this.click('id=com.saucelabs.mydemoapp.android:id/paymentBtn');
    }

    async fillShippingForm(shipping: any) {
        await this.enterFullname(shipping.fullName);
        await this.enterAddressL1(shipping.address);
        await this.enterCity(shipping.city);
        await this.enterZipCode(shipping.zip);
        await this.enterCountry(shipping.country);
    }


}