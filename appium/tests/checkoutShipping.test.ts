import { createDriver } from "../utils/driverFactory";
import { MenuPage } from "../pages/MenuPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import { login } from "../helpers/loginHelper";
import { user, shipping } from "../data/testData";
import { addBackpackToCart } from "../helpers/shoppingHelper";
import { checkout} from "../helpers/checkoutHelper";

async function runTest() {

    const driver = await createDriver();

    const menuPage = new MenuPage(driver);
    const loginPage = new LoginPage(driver);
    const productsPage = new ProductsPage(driver);
    const cartPage = new CartPage(driver);
    const checkoutPage = new CheckoutPage(driver);
    const paymentPage = new PaymentPage(driver);

    // Login
    await login(menuPage, loginPage);

    await addBackpackToCart(menuPage, productsPage, cartPage);

    await checkout(cartPage,checkoutPage);

    console.log("Checkout Shipping Test Passed");

    await driver.deleteSession();
}

runTest();