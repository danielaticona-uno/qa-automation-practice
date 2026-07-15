import { createDriver } from "../../appium/utils/driverFactory";
import { MenuPage } from "../../appium/pages/MenuPage";
import { LoginPage } from "../../appium/pages/LoginPage";
import { ProductsPage } from "../../appium/pages/ProductsPage";
import { CartPage } from "../../appium/pages/CartPage";
import { CheckoutPage } from "../../appium/pages/CheckoutPage";
import { PaymentPage } from "../../appium/pages/PaymentPage";
import { login } from "../../appium/helpers/loginHelper";
import { user, shipping } from "../../appium/data/testData";
import { addBackpackToCart } from "../../appium/helpers/shoppingHelper";
import { checkout } from "../../appium/helpers/checkoutHelper";
import { captureFailure } from "../../appium/helpers/failureHelper";

async function runTest() {

    const driver = await createDriver();
    try {
        const menuPage = new MenuPage(driver);
        const loginPage = new LoginPage(driver);
        const productsPage = new ProductsPage(driver);
        const cartPage = new CartPage(driver);
        const checkoutPage = new CheckoutPage(driver);
        const paymentPage = new PaymentPage(driver);

        // Login
        await login(menuPage, loginPage);

        await addBackpackToCart(menuPage, productsPage, cartPage);

        await checkout(cartPage, checkoutPage);

        console.log("Checkout Shipping Test Passed");

    } catch (error) {
        await captureFailure(driver, "CheckoutShipping");
        throw error;
    } finally {
        await driver.deleteSession();
    }
}

runTest();