import {Page,Locator} from "playwright";

export class LoginPage{

    private page:Page;

    usernmameInput: Locator;
    passwordInput: Locator;
    loginButton:Locator;
    errorMessage:Locator;

    constructor(page:Page){
        this.page =page;
        this.usernmameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.errorMessage = page.locator("[data-test='error']");
    }
    
    async navigate(){
        await this.page.goto(process.env.BASE_URL!);
    }

    async login (username:string,password:string){
        await this.usernmameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}