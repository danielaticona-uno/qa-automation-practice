import { createDriver } from "../utils/driverFactory";
import { MenuPage } from "../pages/MenuPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { login } from "../helpers/loginHelper";
import { addBackpackToCart } from "../helpers/shoppingHelper";

async function runTest() {

    const driver =await createDriver();

    const menuPage = new MenuPage(driver);
    const loginPage = new LoginPage(driver);
    const productsPage = new ProductsPage(driver);
    const cartPage = new CartPage(driver);

    await login(menuPage, loginPage);

    await addBackpackToCart(menuPage, productsPage, cartPage);

    console.log("Add To Cart Test Passed!");
    await driver.deleteSession();

}

runTest();