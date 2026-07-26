import {test,expect, Locator} from "@playwright/test";

test ('runFirstTestLoginInRhaulShettyAcademy', async ({page}) =>{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  let userName : Locator =  page.locator("#userEmail");
  let password : Locator =  page.locator("#userPassword");
  let loginButton : Locator =  page.locator("#login");
  let pageItems : Locator =  page.locator(".row b");  

  await userName.fill("remonsamir532@gmail.com");
  await password.fill('123456');
  await loginButton.click();
  await expect(pageItems.first()).toHaveText("qwerty");

});

test('testRadioButtonAndCheckBox', async ({page})=>{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise");
   let userCheckButton : Locator = page.locator(".checkmark").nth(1);
   let okPopupButton : Locator = page.locator(".btn.btn-success");
   let dropDownList : Locator = page.locator("select.form-control");
  let linkText : Locator = page.locator("//a[@target='_blank']");
   await userCheckButton.click();
   await okPopupButton.click();
   await expect(userCheckButton).toBeChecked();
   //select an option from dropdown that has a tag "select" and add the selected value ex: consultant
   await dropDownList.selectOption("Consultant");
   await expect(linkText).toHaveAttribute("class","blinkingText");
   await page.pause();

});


test('testNewWindoHandle', async ({browser})=>{
 const context = await browser.newContext();
 const page =  await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  let linkText : Locator = page.locator("//a[@target='_blank']");
 const [newPage]= await Promise.all([
   context.waitForEvent("page"),
   linkText.click(),
  ])
  let redTextINnewPage : Locator = newPage.locator(".red");
  let rhaulMail = await redTextINnewPage.textContent();
  let correctMail = rhaulMail?.split('@')[1].split(" ")[0];
  console.log(correctMail);

}); 