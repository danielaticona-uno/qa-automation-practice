import { createDriver } from "../../appium/utils/driverFactory";
import { MenuPage } from "../../appium/pages/MenuPage";
import { LoginPage } from "../../appium/pages/LoginPage";
import { login } from "../../appium/helpers/loginHelper";
import { captureFailure } from "../../appium/helpers/failureHelper";

async function runTest() {

    const driver = await createDriver();

    try {
        const menuPage = new MenuPage(driver);
        const loginPage = new LoginPage(driver);

        await login(menuPage, loginPage);

        console.log("Login Test Passed");
    } catch (error) {
        await captureFailure(driver, "login");
        throw error;
    } finally {
        await driver.deleteSession();

    }
}
runTest();