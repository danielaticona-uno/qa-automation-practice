import { createDriver } from "../utils/driverFactory";
import { MenuPage } from "../pages/MenuPage";
import { LoginPage } from "../pages/LoginPage";
import { login } from "../helpers/loginHelper";

async function runTest() {

    const driver = await createDriver();

    const menuPage = new MenuPage(driver);
    const loginPage = new LoginPage(driver);

    await login(menuPage, loginPage);

    console.log("Login Test Passed");
    await driver.deleteSession();

}

runTest();