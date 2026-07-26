import { Page, type Locator } from "@playwright/test";
    export class Utils {
    
    static async navigateToHomePage(page : Page){
            await page.goto("https://www.way2automation.com/protractor-angularjs-practice-website.html");
}
    static async clickOnElementAndOpenNewTab(page : Page, element : Locator) : Promise<Page>{
         const promise = page.context().waitForEvent('page');
          await element.click();
            const newPage = await promise;
        return newPage;     

    }

    static async clickOnElement(element : Locator){
        await element.click();
    }

    static async takeScreenShot(page : Page , name : string){
        await page.screenshot({path : `screenshots/intermediateLevel/${name}.png`});
    }


}
