export class BasePage{

    constructor(protected driver: WebdriverIO.Browser){}

    async click(selector:string){
        await this.driver.$(selector).click();
    }

    async goBack(){
        await this.driver.back();
    }

    async pause(milliseconds:number){
        await this.driver.pause(milliseconds);
    }

    async type(selector:string,text:string){
        await this.driver.$(selector).setValue(text);       
    }

    async waitForElement(selector:string,timeout: number=10000){
        await this.driver.$(selector).waitForDisplayed({timeout:timeout});
    }
}