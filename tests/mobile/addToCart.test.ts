import { createDriver } from "../../appium/utils/driverFactory";
import { MenuPage } from "../../appium/pages/MenuPage";
import { LoginPage } from "../../appium/pages/LoginPage";
import { ProductsPage } from "../../appium/pages/ProductsPage";
import { CartPage } from "../../appium/pages/CartPage";
import { login } from "../../appium/helpers/loginHelper";
import { addBackpackToCart } from "../../appium/helpers/shoppingHelper";
import { captureFailure } from "../../appium/helpers/failureHelper";


async function runTest() {

    const driver = await createDriver();
    try {
        const menuPage = new MenuPage(driver);
        const loginPage = new LoginPage(driver);
        const productsPage = new ProductsPage(driver);
        const cartPage = new CartPage(driver);

        await login(menuPage, loginPage);

        await addBackpackToCart(menuPage, productsPage, cartPage);

        console.log("Add To Cart Test Passed!");

    } catch (error) {
        await captureFailure(driver, "add to cart");
        throw error;
    } finally {
        await driver.deleteSession();
    }

}

runTest();