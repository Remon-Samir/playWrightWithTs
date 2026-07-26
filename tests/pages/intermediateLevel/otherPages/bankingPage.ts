import {Utils} from "../utils";
import {type Locator, Page, expect} from "@playwright/test";

export class BankingPage {
readonly page : Page;

//task207
readonly customerLoginBtn : Locator;
readonly usersList : Locator;
readonly loginBtn : Locator;
readonly accId : Locator;
readonly depositBtn : Locator;
readonly withdrawlBtn : Locator;
readonly transactionsBtn : Locator;
readonly submitBtn : Locator;
readonly balance : Locator;
readonly depositedAmount : Locator;
readonly withdrawnAmount : Locator;
readonly transactionsCount : Locator;

//task208
readonly bankManagerLoginBtn : Locator;
readonly addCustomerBtn : Locator;
readonly firstNameInput : Locator   ;
readonly lastNameInput : Locator;
readonly postCodeInput : Locator;
readonly addCustomerSubmitBtn : Locator;
readonly openAccountBtn : Locator;
readonly customerSelect : Locator   ;     
readonly customersBtn : Locator;
readonly searchField : Locator;
readonly customerNameList : Locator;
readonly currencyList : Locator;
readonly deleteCustomerBtn : Locator;      
readonly processBtn : Locator;
readonly accNumTableField : Locator;


readonly firstName : string= "fName";
readonly lastName : string = "lName";
readonly postCode : string = "postCode";

constructor(page : Page){
    this.page = page;

    //task207
    this.customerLoginBtn = page.getByRole('button' , {name : 'Customer Login'});
    this.usersList = page.locator('#userSelect');
    this.loginBtn = page.getByRole('button' , {name : 'Login'});
    this.accId = page.locator("#accountSelect");
    this.depositBtn = page.getByRole('button' , {name : 'Deposit'});
    this.withdrawlBtn = page.getByRole('button' , {name : 'Withdrawl'});
    this.transactionsBtn = page.getByRole('button' , {name : 'Transactions'});
    this.submitBtn = page.locator("button[type='submit']");
    this.balance = page.locator(".center strong").nth(1);
this.depositedAmount = page.locator('.form-group')
    .filter({ hasText: 'Amount to be Deposited' })
    .getByPlaceholder('amount');
this.withdrawnAmount = page.locator('.form-group')
    .filter({ hasText: 'Amount to be Withdrawn' })
    .getByPlaceholder('amount');
this.transactionsCount = page.locator('tbody tr');


    //task208
    this.bankManagerLoginBtn = page.getByRole('button' , {name : 'Bank Manager Login'});
    this.addCustomerBtn = page.getByRole('button' , {name : 'Add Customer'});
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postCodeInput = page.getByPlaceholder("Post Code");
    this.addCustomerSubmitBtn = page.locator("button[type='submit']");
    this.openAccountBtn = page.getByRole('button' , {name : 'Open Account'});
    this.customerSelect = page.locator('#userSelect');
    this.customersBtn = page.getByRole('button' , {name : 'Customers'});
    this.deleteCustomerBtn = page.getByRole('button' , {name : 'Delete'});
    this.searchField = page.getByPlaceholder('Search Customer');
    this.customerNameList = page.locator("userSelect");
    this.currencyList = page.locator('#currency');
    this.processBtn = page.getByRole('button' , {name : 'Process'});
    this.accNumTableField = page.locator('tbody tr td').nth(4);



}

async makingTransaction(){
    await Utils.clickOnElement(this.customerLoginBtn);
    await this.usersList.selectOption({index : 1});
    await Utils.clickOnElement(this.loginBtn);
    await this.accId.selectOption({label : "1002"});

    //deposit
    await Utils.clickOnElement(this.depositBtn);
    await this.depositedAmount.fill("1000");
    await Utils.clickOnElement(this.submitBtn);
    await expect(this.balance).toHaveText("1000");

    //withdrawl
    await Utils.clickOnElement(this.withdrawlBtn);
    await this.withdrawnAmount.fill("900");
    await Utils.clickOnElement(this.submitBtn);
    await expect(this.balance).toHaveText("100");

    //transactions
    await Utils.clickOnElement(this.transactionsBtn);
    await expect(this.transactionsCount).toHaveCount(2);
}

async addingCustomer(){
    await Utils.clickOnElement(this.bankManagerLoginBtn);
    await Utils.clickOnElement(this.addCustomerBtn);
    await this.firstNameInput.fill(this.firstName);
    await this.lastNameInput.fill(this.lastName);
    await this.postCodeInput.fill(this.postCode);
    this.page.once('dialog', async dialog => {
    await expect(dialog.message()).toContain("Customer added successfully");
    await dialog.accept();}
);
    await Utils.clickOnElement(this.addCustomerSubmitBtn);          
}

async searchingForCustomer(){
    await Utils.clickOnElement(this.customersBtn);
    await this.searchField.fill(this.firstName);
    await expect(this.page.locator('tbody tr')).toHaveCount(1);

}

async openingAccount(){
    await Utils.clickOnElement(this.openAccountBtn);
    await this.customerSelect.selectOption({label : '${this.firstName} ${this.lastName}'});
    await this.currencyList.selectOption({label : "Dollar"});  
    this.page.once('dialog', async dialog => {
        await expect(dialog.message()).toContain("Account created successfully");
        await dialog.accept();}     
);
        await Utils.clickOnElement(this.processBtn);         

}

async deletingCustomer(){
    //assert that accNum is existed before deleting
    await Utils.clickOnElement(this.customersBtn);
    await this.searchField.fill(this.firstName);
    await expect(this.accNumTableField).not.toBeEmpty();
//deleting the customer
    await Utils.clickOnElement(this.deleteCustomerBtn);
    await expect(this.page.locator('tbody tr')).toHaveCount(0);
}
}