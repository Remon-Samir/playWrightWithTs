import {test,expect, Locator} from '@playwright/test';

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
    await page.screenshot({path : 'screenShots/formScreen.png'})
    await page.getByRole("button", {name : 'Login'}).click();
    const deleteButtons = page.locator("//*[@data-icon='trash']");
    await deleteButtons.first().waitFor({ state: 'visible' });
    while (await deleteButtons.count() > 0) {
    await deleteButtons.first().click();
    }
    await expect(deleteButtons).toHaveCount(0);
    await page.pause();

});