import fs from "fs";
import path from "path";

export async function captureFailure(driver: WebdriverIO.Browser, testName: string) {
    try {
        const folder = "reports/appium";

        fs.mkdirSync(folder, { recursive: true });

        await driver.saveScreenshot(
            path.join(folder, `${testName}.png`)
        );

        const pageSource = await driver.getPageSource();

        fs.writeFileSync(
            path.join(folder, `${testName}.xml`),
            pageSource
        );

        console.log(`Screenshot and Page Source saved for ${testName}`);
    } catch (e) {
        console.error("Could not capture failure artifacts", e);
    }
}