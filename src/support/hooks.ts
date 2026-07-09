import { Before, After, setWorldConstructor, World, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import fs from "fs";
import dotenv from "dotenv";

setDefaultTimeout(30*1000);
dotenv.config();

class CustomWorld extends World{
    browser!:Browser;
    page!: Page
}

setWorldConstructor(CustomWorld);

Before(async function(this:CustomWorld){
    this.browser = await chromium.launch({
        headless: false
    });
    this.page= await this.browser.newPage();
});

After( async function (this: CustomWorld, scenario) {
 if (scenario.result?.status===Status.FAILED){

    if (!fs.existsSync("reports/screenshots")){
        fs.mkdirSync("reports/screenshots",{recursive: true})        
    }

    const screenshot = await this.page.screenshot({
        path:`reports/screenshots/${scenario.pickle.name.replace(/\st/g,"_")}.png`,
        fullPage:true
    });
    await this.attach(screenshot,"image/png");
 }                                                                  
 await this.browser.close();

});