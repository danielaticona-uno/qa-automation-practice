import { MenuPage } from "../pages/MenuPage";
import { CartPage } from "../pages/CartPage";
import { ProductsPage } from "../pages/ProductsPage";

export async function addBackpackToCart(menuPage: MenuPage, productsPage: ProductsPage, cartPage: CartPage) {

    await menuPage.clickCatalog();

    // Producto
    await productsPage.openRedBackPack();
    await productsPage.addFirstProductToCart();
    await productsPage.verifyCartCount();

    // Carrito
    await productsPage.openCart();

    await cartPage.isCartDisplayed();
    await productsPage.verifyProducName();
    await cartPage.verifyProductPrice();
}