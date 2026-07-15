import { createDriver } from "../../appium/utils/driverFactory";
import { MenuPage } from "../../appium/pages/MenuPage";
import { LoginPage } from "../../appium/pages/LoginPage";
import { ProductsPage } from "../../appium/pages/ProductsPage";
import { CartPage } from "../../appium/pages/CartPage";
import { CheckoutPage } from "../../appium/pages/CheckoutPage";
import { PaymentPage } from "../../appium/pages/PaymentPage";
import { ReviewOrderPage } from "../../appium/pages/ReviewOrderPage";
import { CheckoutCompletePage } from "../../appium/pages/CheckoutCompletePage";
import { login } from "../../appium/helpers/loginHelper";
import { user, shipping, payment } from "../../appium/data/testData";
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
        const reviewOrderPage = new ReviewOrderPage(driver);
        const checkoutCompletePage = new CheckoutCompletePage(driver);

        // LOGIN
        await login(menuPage, loginPage);
        await addBackpackToCart(menuPage, productsPage, cartPage);

        // CHECKOUT
        await checkout(cartPage, checkoutPage);

        // PAYMENT
        await paymentPage.fillPaymentForm(payment);

        // REVIEW ORDER
        await reviewOrderPage.isReviewOrderDisplayed();

        await reviewOrderPage.verifyProductName();
        await reviewOrderPage.verifyTotalPrice();
        await reviewOrderPage.verifyShippingAddress();

        await reviewOrderPage.placeOrder();

        // CHECKOUT COMPLETE
        await checkoutCompletePage.isCheckoutCompleted();

        console.log("Complete Order Test Passed");

    } catch (error) {
        await captureFailure(driver, "complete order");
        throw error;
    } finally {
        await driver.deleteSession();
    }
}

runTest();