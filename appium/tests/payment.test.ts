import { createDriver } from "../utils/driverFactory";
import { user, shipping, payment } from "../data/testData";
import { MenuPage } from "../pages/MenuPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ReviewOrderPage } from "../pages/ReviewOrderPage";
import { login } from "../helpers/loginHelper";
import { addBackpackToCart } from "../helpers/shoppingHelper";
import { checkout} from "../helpers/checkoutHelper";

async function runTest() {

    const driver =await createDriver();

    const menuPage = new MenuPage(driver);
    const loginPage = new LoginPage(driver);
    const productsPage = new ProductsPage(driver);
    const cartPage = new CartPage(driver);
    const checkoutPage = new CheckoutPage(driver);
    const paymentPage = new PaymentPage(driver);
    const reviewOrderPage = new ReviewOrderPage(driver);

    // Login
    await login(menuPage, loginPage);
    
    //addProduct
    await addBackpackToCart(menuPage,productsPage,cartPage);

    // Checkout
    await checkout(cartPage,checkoutPage);

    // Payment
    await paymentPage.fillPaymentForm(payment);

    // Verificación
    await reviewOrderPage.isReviewOrderDisplayed();

    console.log("Payment Test Passed");

    await driver.deleteSession();
}

runTest();