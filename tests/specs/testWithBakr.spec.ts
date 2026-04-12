import {test,expect, Locator} from "@playwright/test";

test("testLocators", async ({page})=>{
   await page.goto("https://practice.expandtesting.com/");
   await page.pause();
    const generealLocator : Locator = page.locator(".card-body");
    //locate by index -1 means last
   await generealLocator.nth(-1).hover();
       await page.pause();

//locate by text
await generealLocator.filter({hasText: "Test Login Page"}).hover();

    await page.pause();

    // locate by filter with another locator like parent and children
    await generealLocator.filter({has : page.locator("//p[contains(text(),'Example can be used for practicing the Forgot Pass')]")}).hover();
    await page.pause();
});

test("testCheckBoxes", async ({page})=>{
       await page.goto("https://practice.expandtesting.com/checkboxes");
       const checkBoxes : Locator []= [
        page.locator("#checkbox1"),
      page.locator("#checkbox2"),
       ];

        for (
            const checkBox of checkBoxes
        ){
           await checkBox.check();
           await expect(checkBox).toBeChecked();
        }
});


test("testDropDown", async ({page}) =>{
    await page.goto("https://practice.expandtesting.com/dropdown");
    let options : string []= await page.locator("#country > option").allTextContents(); 
    let dropDownCount : number = await page.locator("#country > option").count();
    console.log(dropDownCount);
    for(const option of options){
                console.log(option);
      if(option == "Egypt"){
                break;

      } 
    }
});

