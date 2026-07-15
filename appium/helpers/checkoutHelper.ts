import { CartPage } from "../pages/CartPage";
import { shipping } from "../data/testData";
import { CheckoutPage } from "../pages/CheckoutPage";

export async function checkout(cartPage:CartPage, checkoutPage:CheckoutPage) {

    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingForm(shipping);
    await checkoutPage.toPayment();
}