import { MenuPage } from "../pages/MenuPage";
import { LoginPage } from "../pages/LoginPage";
import { user } from "../data/testData";


export async function login(menuPage: MenuPage, loginPage: LoginPage) {
    await menuPage.openMenu();
    await menuPage.clickLogin();

    await loginPage.login(user.email, user.password);

    await menuPage.openMenu();
    await menuPage.isLoggedIN();
}