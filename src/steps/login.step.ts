import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

let loginPage: LoginPage;

Given("I am on the login page", async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigate();
});

When("I login with valid credentials", async function () {

    console.log("PASS exists:", !!process.env.SAUCE_PASSWORD);

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

});

Then("I should see the inventory page", async function () {

    await this.page.waitForURL("**/inventory.html", {
        timeout: 15000
    });

    await expect(this.page).toHaveURL(/.*inventory\.html/);

});

When("I login with invalid credentials", async function () {
    await loginPage.login(
        "wrong_user",
        "wrong_password"
    );
});

Then("I should see an error message", async function () {
    await expect(loginPage.errorMessage).toBeVisible();
});

When("I login without credentials", async function () {
    await loginPage.login("", "");
});

Then("I should see a required field validation", async function () {
    await expect(loginPage.errorMessage).toBeVisible();
});