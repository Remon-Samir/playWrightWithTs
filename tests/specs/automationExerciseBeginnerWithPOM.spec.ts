import {test,expect,Locator} from '@playwright/test';
import { DemoSiteHomePage } from '../pages/demoSiteHomePage';
import { NewPage } from '../pages/newPage';

let demoSiteHomePage : DemoSiteHomePage;
// demoSiteHomePage = new DemoSiteHomePage(page); >>????? fe tre2a a handle beha de ?

test('Task 103', async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
    await demoSiteHomePage.openDemoSite();
    await demoSiteHomePage.radioButton.click();
    await demoSiteHomePage.impressiveRadioButton.check();
    const successMsg : string = "You have checked Impressive"    ;
    await demoSiteHomePage.assertDisplaySuccessMsg(successMsg);
});

test('Task 104', async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
    await demoSiteHomePage.openDemoSite();
    await demoSiteHomePage.webTableButton.click();
     await demoSiteHomePage.fillWebTableForm("test firstName","test lastName",'testmail@gmail.com','30 years old','1500 test expected or actual salary','chemisty');
    await demoSiteHomePage.takeScreenShotForWebTable();
    await demoSiteHomePage.loginButton.click();
    await demoSiteHomePage.deleteAllWebElements();
    await demoSiteHomePage.assertdeleteAllwebElements();
});

test('Task 105', async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
// 1-	Go to https://www.tutorialspoint.com/selenium/practice/text-box.php
    demoSiteHomePage.openDemoSite();
    // 2-	From Side Navigation, select “Elements > Buttons”
   
  await demoSiteHomePage.buttons.click();
    // 3-	Click on Button of “Click Me”
    await demoSiteHomePage.clickMeButton.click();
    // 4-	Assert that the message appeared
   await demoSiteHomePage.assertDisplaySuccessMsgAfterClickButton("You have done a dynamic click");
});

//Need to check it with Anotony cause of multiple tabs
test('Task 106', async ({page})=>{
demoSiteHomePage = new DemoSiteHomePage(page);
await  demoSiteHomePage.openDemoSite();
await demoSiteHomePage.clickOnLinkButton();
await demoSiteHomePage.clicOnnotFoundMsgVisible();
await expect(page.getByText('Link has responded with staus 404 and status text Not Found')).toBeVisible();
const newPage = await demoSiteHomePage.clickOnAndOpenNewTab(demoSiteHomePage.homeLinkTextButton);    
await expect(newPage.locator('body')).toContainText('Login');


});

test('Task 107', async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
    await demoSiteHomePage.openDemoSite();
    await demoSiteHomePage.clickOn(demoSiteHomePage.uploadButton);
    // const uploadButton = page.locator("a[href='upload-download.php']");
    //uplaod file
    await demoSiteHomePage.uploadFile();
    await demoSiteHomePage.takeScreenShotForUploadedFile();
   
});

test('Task 108', async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
    await demoSiteHomePage.openDemoSite();
    await demoSiteHomePage.clickOn(demoSiteHomePage.dynamicPropertyButton);
    await demoSiteHomePage.clickOn(demoSiteHomePage.colorChangeButton);
    await demoSiteHomePage.assertToBeVisibleAfterWhile(demoSiteHomePage.buttonToBeVisibleAfterWhile);
});

test('Task 109', async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
    await demoSiteHomePage.openDemoSite();
    await demoSiteHomePage.clickOn(demoSiteHomePage.formsDropDown);
    await demoSiteHomePage.clickOn(demoSiteHomePage.practiceFormButton);
    await demoSiteHomePage.clickOn(demoSiteHomePage.dateOfBirth);
    await demoSiteHomePage.chooseSpecificDate(demoSiteHomePage.dateOfBirth);
    await demoSiteHomePage.checkAllCheckBoxes();
    await demoSiteHomePage.uploadPicture();
    await demoSiteHomePage.takeScreenShotregisterationForm();
});

// hna b initiate new tab w b3da kda a3mlha pass fl page l gdeda line 115 & 116
test("Task 110" , async ({page})=>{
demoSiteHomePage = new DemoSiteHomePage(page);
await demoSiteHomePage.openDemoSite();
await demoSiteHomePage.clickOn(demoSiteHomePage.alertDropDown);
await demoSiteHomePage.clickOn(demoSiteHomePage.BrwoserWindowButton);
const newTab = await demoSiteHomePage.clickOnAndOpenNewTab(demoSiteHomePage.newTabButton);
const newPage = new NewPage(newTab);
// hna b2a ana mafrok akon 3aml l assert f file lw7daha 3shan 22dr asdt5dmha f diff pages s7 kda ?
await demoSiteHomePage.assertToConatinSpecificText(newPage.pageBody,"New Tab");
});

test("Task 114" , async ({page})=>{
    demoSiteHomePage = new DemoSiteHomePage(page);
    await demoSiteHomePage.openDemoSite();
    await demoSiteHomePage.clickOn(demoSiteHomePage.widgetDropDown);
    await demoSiteHomePage.clickOn(demoSiteHomePage.autoCompleteButton);
    await demoSiteHomePage.write(demoSiteHomePage.tagsFieldToWrite, "a");
    await demoSiteHomePage.assertToBeVisibleAfterWhile(demoSiteHomePage.suggestions);
    await demoSiteHomePage.clickOn(demoSiteHomePage.suggestions);
    await expect(demoSiteHomePage.tagsFieldToWrite).toHaveValue("Haskell");
});