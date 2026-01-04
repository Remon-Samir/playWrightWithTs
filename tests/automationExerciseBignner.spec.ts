import {test,expect, Locator} from '@playwright/test';
import path from 'path';

test('Task 103', async ({page})=>{
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    const radioButton = page.locator("a[href='radio-button.php']");
    await radioButton.click();
    const impressiveRadioButton = page.locator(".form-check-input").nth(1);
    await impressiveRadioButton.check();
    const assertMessage = page.locator("//div[@id='check1']");
   await expect(assertMessage).toHaveText("You have checked Impressive");
});

test('Task 104', async ({page})=>{
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    const webTableButton = page.locator("//a[@href='webtables.php']");
    await webTableButton.click();
    await page.getByRole("button",{name :'Add'}).click();
    await page.getByPlaceholder("First Name").fill('test firstname');
    await page.getByPlaceholder("Last Name").fill('test lastname');
    await page.getByPlaceholder("Enter Email").fill('testemail@gmail.com');
    await page.getByPlaceholder("Enter Age").fill('test age');
    await page.getByPlaceholder("Enter Salary").fill('test expected or actual salary');
    await page.getByPlaceholder("Enter Department").fill('test deparment');
    // take a screenshot
    await page.screenshot({path : 'screenShots/formScreen.png'})
    await page.getByRole("button", {name : 'Login'}).click();
    const deleteButtons = page.locator("//*[@data-icon='trash']");
    // loop for clicking on Delete icon
    await deleteButtons.first().waitFor({ state: 'visible' });
    while (await deleteButtons.count() > 0) {
    await deleteButtons.first().click();
    }
    await expect(deleteButtons).toHaveCount(0);
});

test('Task 105', async ({page})=>{
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    const Buttons = page.locator("a[href='buttons.php']");
    await Buttons.click();
    const clickMeButton = page.getByRole("button", {name:"Click Me"}).first();
    await clickMeButton.click();
    const assertMessage = page.locator("#welcomeDiv");
   await expect(assertMessage).toHaveText("You have done a dynamic click");
});

test('Task 106', async ({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    const linkButton = page.locator("a[href='links.php']");
    await linkButton.click();
    const notFoundLinkText = page.locator('#not-found');
    await notFoundLinkText.click();
    await expect(page.getByText('Link has responded with staus 404 and status text Not Found')).toBeVisible();
    //2 different signature to handle new tab
    const [newPage]= await Promise.all([
        context.waitForEvent('page'),
        page.locator("a[href='https://www.tutorialspoint.com/index.htm']").click()
    ]);
    // const promise =  context.waitForEvent('page');
    // await page.locator("a[href='https://www.tutorialspoint.com/index.htm']").click();
    // const newPage = await promise ;
    await expect(newPage.locator('body')).toContainText('Login');


});

test('Task 107', async ({page})=>{
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    const uploadButton = page.locator("a[href='upload-download.php']");
    await uploadButton.click();
    //uplaod file
    await page.locator('#uploadFile').setInputFiles(path.join('screenShots', 'dummy.pdf'));
    await page.screenshot({path : 'screenShots/uploadScreen.png'})
});

test.only('Task 109', async ({page})=>{
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    
    await page.locator(".svg-inline--fa.fa-rectangle-list.toc-icons").click();
    await page.locator("a[href='selenium_automation_practice.php']").click();
    // await page.getByPlaceholder('First Name').fill('Test First Name');
    // await page.getByPlaceholder('name@example.com').fill('playwright@microsoft.com');
    // await page.locator("//input[@id='gender']").click();
    // await page.getByPlaceholder('Enter Mobile Number').fill('0123456789');
    await page.locator("#dob").click();
    const dob = page.locator('#dob');
//////////////this code was generating by Ai, if there is an easier way, good to know!
const date = new Date();
const today = date.getDate();
date.setMonth(date.getMonth() - 2);
date.setDate(today); 
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0');
const dd = String(date.getDate()).padStart(2, '0');

await dob.fill(`${yyyy}-${mm}-${dd}`);
await expect(dob).toHaveValue(`${yyyy}-${mm}-${dd}`);
///////////////////////////////////////////////////////////////
// await page.getByPlaceholder('Enter Subject').fill('test Subject');
const checkBoxes  = page.locator("input.form-check-input[type='checkbox']");
for(let i = 0; i < await checkBoxes.count(); i++ ){
    await checkBoxes.nth(i).check();
}
await page.locator('#picture').first().setInputFiles(path.join('screenShots', 'formScreen.png'));
await page.getByRole("button", {name:"Login"}).click();
// await page.getByPlaceholder('Currend Address').fill('test Current Address');
// await page.locator("#state").selectOption("NCR");
// await page.locator("#city").selectOption("Agra");
await page.screenshot({path : 'screenShots/registerationScreen.png'});
});



