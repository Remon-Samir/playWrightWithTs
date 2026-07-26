import {Page, type Locator, expect} from "@playwright/test";
import { Utils } from "../utils";

export class WebTablePage {
    readonly page : Page;

    readonly addUserBtn : Locator;

    readonly firstName : Locator;
    readonly lastName : Locator;
    readonly userName : Locator;
    readonly password : Locator;
    readonly customer : Locator;
    readonly role : Locator;
    readonly email : Locator;
    readonly cellPhone : Locator;
    readonly saveBtn : Locator;

    readonly editBtn : Locator;
    readonly firstNameEdit : Locator;

    readonly deleteBtn : Locator;

    constructor(page : Page){
        this.page = page;
        this.addUserBtn = page.getByRole('button' , {name : ' Add User'});
        this.firstName = page.locator('input[name="FirstName"]');
        this.lastName = page.locator('input[name="LastName"]');
        this.userName = page.locator('input[name="UserName"]');
        this.password = page.locator('input[name="Password"]');
        this.customer = page.locator('label').filter({ hasText: 'Company BBB' });
        this.role = page.locator('select[name="RoleId"]');
        this.email = page.locator('input[name="Email"]');
        this.cellPhone = page.locator('input[name="Mobilephone"]');
        this.saveBtn = page.getByRole('button' , {name : 'Save'});

        this.editBtn = page.getByRole('button' , {name : 'Edit'}).first();
        this.firstNameEdit = page.locator("//td[@class='smart-table-data-cell']");
        // this.deleteBtn = page.locator("(//button[@class='btn btn-link'])[2]");
        // this.deleteBtn = page.locator("(//i[@class='icon icon-remove'])[1]");

                 this.deleteBtn = page.locator("//i[@class='icon icon-remove'][1]").first();

    }

    async addNewUser(firstName : string , lastName : string , userName : string , password : string , role : string , email : string , cellPhone : string){
        await Utils.clickOnElement(this.addUserBtn);
        await Utils.clickOnElement(this.firstName);
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.customer.check();
        await this.role.selectOption(role);
        await this.email.fill(email);
        await this.cellPhone.fill(cellPhone);
        await this.saveBtn.click();
    }
    async editUserName(){
        await this.editBtn.click();
        await this.firstName.fill("editedFirstName");
        await this.saveBtn.click();
        await expect(this.firstNameEdit.first()).toHaveText("editedFirstName");
        await Utils.takeScreenShot(this.page , "editedUser");
    }

    async deleteUser(){    
        this.page.once("dialog", dialog => dialog.accept());
        await this.deleteBtn.click();
        await Utils.takeScreenShot(this.page , "afterDeletingUser");
    }

    /////generated code by chat gpt
//     async deleteSpecificUser() {
//     // 1. Find the specific row containing the text
//     const row = this.page.locator('tr').filter({ hasText: "editedFirstName" });

//     // 2. Find the delete button INSIDE that specific row
//     // We use the unique ng-click attribute shown in your HTML to be very precise
//     const specificDeleteBtn = row.locator('button[ng-click="delUser()"]');

//     // 3. Handle the alert and click
//     this.page.once("dialog", dialog => dialog.accept()); 
//     await specificDeleteBtn.click();
//     await Utils.takeScreenShot(this.page , "afterDeletingUser");
// }

}

