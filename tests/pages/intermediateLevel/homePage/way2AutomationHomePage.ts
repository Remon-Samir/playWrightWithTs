import {type Page, type Locator, expect} from "@playwright/test"
import { Utils } from "../utils";
import { RegisterPage } from "../otherPages/registerPage";
import { MultiFormPage } from "../otherPages/multiFormPage";
import { WebTablePage } from "../otherPages/webTablePage";
import {BankingPage} from "../otherPages/bankingPage";


export class Way2AutomationHomePage {
    ///1- bt3rf awl 7aga l page hna gwa l class w gwa l constructor
    readonly page : Page;
    //2- bt3rf l locators

    //task 201
    readonly regisertationCard : Locator;


    //task204
    readonly multiFormCard : Locator;

    //task205
    readonly webTableCard : Locator;

    //task207
    readonly bankingCard : Locator;

    




    constructor (page : Page){
        this.page = page;

        //task201
        this.regisertationCard = page.getByAltText("Registration");

        //task204
        this.multiFormCard = page.getByAltText("Multi form");

        //task205
        this.webTableCard = page.getByAltText("webtabes");

        //task207
        this.bankingCard = page.getByAltText("banking");
    }


    async OpenHomePage(){
        await Utils.navigateToHomePage(this.page);
    }

    async clickOnRegistrationCard(){
      const regPage =  await Utils.clickOnElementAndOpenNewTab(this.page, this.regisertationCard);
        return new RegisterPage(regPage);
    }

async clickonMultiFormCard(){
    const multiFormpage = await Utils.clickOnElementAndOpenNewTab(this.page, this.multiFormCard);
    return new MultiFormPage(multiFormpage);
}

async clickOnWebTableCard(){
    const webTablePage = await Utils.clickOnElementAndOpenNewTab(this.page, this.webTableCard);
    return new WebTablePage(webTablePage);
}
async clickOnBankingCard(){
    const bankingPage = await Utils.clickOnElementAndOpenNewTab(this.page, this.bankingCard);
    return new BankingPage(bankingPage);
}
}