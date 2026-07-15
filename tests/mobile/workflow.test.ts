import { hostname } from "node:os";
import { remote } from "webdriverio";
import { MenuPage } from "../../appium/pages/MenuPage";
import { LoginPage } from "../../appium/pages/LoginPage";
import { ProductsPage } from "../../appium/pages/ProductsPage";
import { CartPage } from "../../appium/pages/CartPage";
import { CheckoutPage } from "../../appium/pages/CheckoutPage";
import { PaymentPage } from "../../appium/pages/PaymentPage";
import { ReviewOrderPage } from "../../appium/pages/ReviewOrderPage";
import { CheckoutCompletePage } from "../../appium/pages/CheckoutCompletePage";

async function runTest() {
    const driver = await remote({
        hostname: "127.0.0.1",
        port: 4723,
        capabilities: {
            platformName: "Android",
            "appium:automationName": "UiAutomator2",
            "appium:deviceName": "emulator-5554",
            "appium:platformVersion": "15",
            "appium:app": "C:\\Users\\daniela.ticona\\Downloads\\mda-2.2.0-25.apk",
        }
    });
 
    console.log("Saucedemo test :)");

    const menuPage = new MenuPage(driver);
    const loginPage = new LoginPage(driver);
    const productsPage = new ProductsPage(driver);
    const cartPage = new CartPage(driver);
    const checkoutPage= new CheckoutPage(driver);
    const paymentPage = new PaymentPage(driver);
    const reviewOrderPage = new ReviewOrderPage(driver);
    const checkoutCompletePage=new CheckoutCompletePage(driver);

    await menuPage.openMenu();
    
    await menuPage.clickLogin();
   
    await loginPage.enterUsername("bob@example.com");
    await loginPage.enterPassword("10203040");
    await loginPage.clickLogin();

    await menuPage.openMenu();
    await menuPage.isLoggedIN();

    await menuPage.clickCatalog()


    await productsPage.openRedBackPack();
    await productsPage.addFirstProductToCart();
    await productsPage.verifyCartCount();

    await cartPage.isCartDisplayed();
    await productsPage.openCart();
    await productsPage.verifyProducName();

    
    await cartPage.verifyProductPrice();

    await cartPage.proceedToCheckout();

    await checkoutPage.enterFullname("Caraxes Malo");
    await checkoutPage.enterAddressL1("calle 1 numero 12");
    await checkoutPage.enterCity("Cochabamba");
    await checkoutPage.enterZipCode("12345");
    await checkoutPage.enterCountry("Bolivia");
    await checkoutPage.clicktoPayment();

    await paymentPage.fullNameET("carachiz");
    await paymentPage.cardNumberET("3258 1452 2145 2569");
    await paymentPage.expirationDateET("03/28");
    await paymentPage.securityCodeET("146");
    await paymentPage.reviewOrderBtn();

    await reviewOrderPage.verifyProductName();
    await reviewOrderPage.verifyShippingAddress();
    await reviewOrderPage.verifyTotalPrice();
    await reviewOrderPage.placeOrder();

    await checkoutCompletePage.verifyCheckoutComplete();
    await checkoutCompletePage.verifyMessage();


    //await cartPage.removeProduct();
    //await cartPage.verifyEmptyCart();


    await driver.deleteSession();

}

runTest();