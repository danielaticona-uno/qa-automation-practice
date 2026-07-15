import { createDriver } from "../utils/driverFactory";
import { MenuPage } from "../pages/MenuPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ReviewOrderPage } from "../pages/ReviewOrderPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { login } from "../helpers/loginHelper";
import { user, shipping, payment } from "../data/testData";
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
    const checkoutCompletePage = new CheckoutCompletePage(driver);

    // LOGIN
    await login(menuPage, loginPage);
    await addBackpackToCart(menuPage,productsPage,cartPage);

    // CHECKOUT
    await checkout(cartPage,checkoutPage);

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

    await driver.deleteSession();
}

runTest();