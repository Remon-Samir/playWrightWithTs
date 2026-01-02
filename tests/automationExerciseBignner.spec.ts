import {test,expect} from '@playwright/test';

test('Task 103', async ({page})=>{
    await page.goto(" https://www.tutorialspoint.com/selenium/practice/text-box.php");
    const radioButton = page.locator("a[href='radio-button.php']");
    await radioButton.click();
    const impressiveRadioButton = page.locator(".form-check-input").nth(1);
    await impressiveRadioButton.check();
    const assertMessage = page.locator("//div[@id='check1']");
   await expect(assertMessage).toHaveText("You have checked Impressive");
});