import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    async enterUsername(username: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/nameET', username);
    }

    async enterPassword(password: string) {
        await this.type('id=com.saucelabs.mydemoapp.android:id/passwordET', password);
    }

    async clickLogin() {
        await this.driver.pause(2000);
        await this.waitForElement('id=com.saucelabs.mydemoapp.android:id/loginBtn');
        await this.click('id=com.saucelabs.mydemoapp.android:id/loginBtn');
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

}