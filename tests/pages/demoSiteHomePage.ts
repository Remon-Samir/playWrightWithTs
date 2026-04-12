import { expect, type Page, type Locator, Browser, BrowserContext } from "@playwright/test";   
import { TIMEOUT } from "dns";
import path from "path";
import { Context } from "vm";
export class DemoSiteHomePage {
    // 1-locators==========================
    readonly page : Page;

    readonly radioButton : Locator;
    readonly impressiveRadioButton  : Locator;
    readonly assertMessage  : Locator;


    readonly webTableButton : Locator;
    readonly addButton : Locator;
    readonly firstName : Locator;
    readonly lastName : Locator;
    readonly email : Locator;
    readonly age : Locator;
    readonly salary : Locator;
    readonly departement : Locator;
    readonly loginButton : Locator;
    readonly deleteButton : Locator;


    readonly buttons : Locator;
    readonly clickMeButton : Locator;
    readonly displayedMsg : Locator;

    //task106
    readonly linkButton : Locator;
    readonly notFoundLinkText : Locator;
    readonly homeLinkTextButton : Locator;

    //task107
    readonly uploadButton: Locator;
    readonly uplaodFileButton: Locator;

    
    //task108
    readonly dynamicPropertyButton : Locator;
    readonly colorChangeButton : Locator;
    readonly buttonToBeVisibleAfterWhile : Locator;


    //task109
    readonly formsDropDown : Locator;
    readonly practiceFormButton: Locator;
    readonly dateOfBirth: Locator;
    readonly checkBoxes : Locator;
    readonly picture: Locator;


    //taks110
    readonly alertDropDown: Locator;
    readonly BrwoserWindowButton: Locator;
    readonly newTabButton: Locator;
    readonly pageBody: Locator;

    //task114
    readonly widgetDropDown : Locator;
    readonly autoCompleteButton : Locator;
    readonly tagsFieldToWrite : Locator;
    readonly suggestions: Locator;

    // 2-variables=======================
    
    
    readonly baseUrl : string="https://www.tutorialspoint.com/selenium/practice/text-box.php";
    // 3-constructor=============================
    constructor(page : Page){
        //general
        this.page = page;
        //Task103
        this.radioButton = page.locator("a[href='radio-button.php']");
        this.impressiveRadioButton = page.locator(".form-check-input").nth(1);
        this.assertMessage = page.locator("//div[@id='check1']");
        this.webTableButton = page.locator("//a[@href='webtables.php']");
        //Task104
        this.addButton = page.getByRole("button",{name :'Add'});
        this.firstName=  page.getByPlaceholder("First Name");
        this.lastName =page.getByPlaceholder("Last Name");
        this.email = page.getByPlaceholder("Enter Email");
        this.age = page.getByPlaceholder("Enter Age");
        this.salary = page.getByPlaceholder("Enter Salary");
        this.departement = page.getByPlaceholder("Enter Department");
        this.loginButton = page.getByRole("button", {name : 'Login'});
        this.deleteButton = page.locator("//*[@data-icon='trash']");
        //task105
        this.buttons =  page.locator("a[href='buttons.php']");
        this.clickMeButton = page.getByRole("button", {name:"Click Me"}).first();
        this.displayedMsg = page.locator("#welcomeDiv");
        //task106
        this.linkButton = page.locator("a[href='links.php']");
        this.notFoundLinkText = page.locator('#not-found');
        this.homeLinkTextButton = page.locator("a[href='https://www.tutorialspoint.com/index.htm']");
        //task107
        this.uploadButton = page.locator("a[href='upload-download.php']");
        this.uplaodFileButton = page.locator('#uploadFile');
        //task108
        this.dynamicPropertyButton = page.locator("a[href='dynamic-prop.php']");
        this.colorChangeButton = page.locator("#colorChange");
        this.buttonToBeVisibleAfterWhile = page.locator("#visibleAfter");
        //task109
         this.formsDropDown = page.locator(".svg-inline--fa.fa-rectangle-list.toc-icons");
     this.practiceFormButton =  page.locator("a[href='selenium_automation_practice.php']");
     this.dateOfBirth= page.locator("#dob");
     this.checkBoxes= page.locator("input.form-check-input[type='checkbox']");
     this.picture=  page.locator('#picture').first();
        //task110
        this.alertDropDown = page.locator(".svg-inline--fa.fa-bell.toc-icons");
        this.BrwoserWindowButton= page.locator("//a[@href='browser-windows.php']");
        this.newTabButton = page.getByRole("button", {name : "New Tab"});
        this.pageBody = page.locator("body");
        //task114
        this.widgetDropDown =page.locator("//button[@aria-controls='collapseFour']") ;
     this.autoCompleteButton = page.locator("//a[@href='auto-complete.php']");
     this.tagsFieldToWrite = page.locator(".ui-autocomplete-input");
     this.suggestions = page.locator('li', { hasText: 'Haskell' });

    }
    // 4-methods=====================
    //general
    async openDemoSite (){
        await this.page.goto(this.baseUrl);
        }

        //Task104
        async fillWebTableForm (firstName : string, lastName : string, email : string, age : string, salary : string, deparment : string){
          await this.addButton.click();
          await  this.firstName.fill(firstName);
          await  this.lastName.fill(lastName);
           await this.email.fill(email);
           await this.age.fill(age);
          await  this.salary.fill(salary);
          await  this.departement.fill(deparment);
        }
        //task105
        async takeScreenShotForWebTable (){
            await this.page.screenshot({path: 'screenShots/formScreen.png'});
        }
        async clickOnLoginButtonToSubmit (){
            await this.loginButton.click();
        }
        async deleteAllWebElements(){
           await this.deleteButton.first().waitFor({ state: 'visible' });
        while (await this.deleteButton.count() > 0) {
        await this.deleteButton.first().click();
    }
        }
        //task106
        async clickOnLinkButton(){
            await this.linkButton.click();
        }
        async clicOnnotFoundMsgVisible(){
            await this.notFoundLinkText.click();
    }
    //task109
    async chooseSpecificDate(element:Locator){
    const date = new Date();
    const today = date.getDate();
    date.setMonth(date.getMonth() - 2);
    date.setDate(today); 
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    await element.fill(`${yyyy}-${mm}-${dd}`);
    await expect(element).toHaveValue (`${yyyy}-${mm}-${dd}`);

    }
    async checkAllCheckBoxes(){
        for(let i = 0; i < await this.checkBoxes.count(); i++ ){
    await this.checkBoxes.nth(i).check();
}
    }
    async uploadPicture(){
        await this.picture.setInputFiles(path.join('screenShots', 'formScreen.png'));
    }
   async takeScreenShotregisterationForm (){
            await this.page.screenshot({path: 'screenShots/registerationScreen.png'});
        }

    //task107
    async uploadFile(){
        await this.uplaodFileButton.setInputFiles(path.join('screenShots', 'dummy.pdf'));
    }
    async takeScreenShotForUploadedFile (){
            await this.page.screenshot({path: 'screenShots/uploadScreen.png'});
        }
        //task114
       


    // 5-actions=======================

    //general methods
    async clickOn (element : Locator){
        await element.click();
    }
     async write(element:Locator,text:string){
            await element.fill(text);
        }
        //this method to handle different tabs Focus.......
    async  clickOnAndOpenNewTab(element : Locator):Promise<Page>{
    const promise =  this.page.context().waitForEvent('page');
    await this.clickOn(element);
    const newPage = await promise ;
    return newPage;
   
    }



    // 6-assertion=====================
        //Task103
    async assertDisplaySuccessMsg(msg : string){
        await expect(this.assertMessage).toHaveText(msg);
    }
    //Task104
    async assertdeleteAllwebElements(){
        await expect(this.deleteButton).toHaveCount(0);
    }
    //Task105
        async assertDisplaySuccessMsgAfterClickButton(msg : string){
        await expect(this.displayedMsg).toHaveText(msg);
    }
    //task108
    async assertToBeVisibleAfterWhile(element : Locator){
        await expect(element).toBeVisible({timeout:10000});
    }
    //task109
    //task110
    async assertToConatinSpecificText(element:Locator, text:string){
        await expect(element).toContainText (text);
    }

        //task114
    async assertToHaveValue(element:Locator, text:string){
        await expect(element).toContainText (text);
    }
}