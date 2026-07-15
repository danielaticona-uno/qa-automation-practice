import { config } from "dotenv";
import {remote} from "webdriverio";

config();

export async function createDriver(){
    return await remote({
       hostname:process.env.APPIUM_HOST,
       port:Number(process.env.APPIUM_PORT),
       path:"/",
       capabilities:{
        platformName:"Android", 
        "appium:automationName":"UiAutomator2",
        "appium:deviceName":process.env.DEVICE_NAME,
        "appium:platformVersion":process.env.PLATFORM_VERSION,
        "appium:app":process.env.APP_PATH,
       }
    });
}