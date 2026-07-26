import {Page, type Locator, expect} from "@playwright/test"
import { Utils } from "../utils";

export class MultiFormPage {
    readonly page : Page;
    readonly name : Locator;
    readonly email : Locator;

    readonly nextSectionBtn : Locator;

    readonly iLikePS : Locator;

    readonly submitBtn : Locator;


    constructor(page : Page ){
        this.page = page;
        this.name = page.locator('input[name="name"]');
        this.email = page.locator('input[name="email"]');
        this.nextSectionBtn = page.getByRole('link' , {name : 'Next Section'});   
        this.iLikePS = page.getByLabel("I like PS4");
        this.submitBtn = page.getByRole('button');

    }

    async fillMultiForm(){
        await this.name.fill("test");
        await this.email.fill("test@example.com");
        await Utils.clickOnElement(this.nextSectionBtn);
        await this.iLikePS.check();
        await Utils.clickOnElement(this.nextSectionBtn);
        this.page.on("dialog" ,   dialog => {
        expect(dialog.message()).toContain("awesome!"); 
        dialog.accept();}
        )
         await Utils.clickOnElement(this.submitBtn);

    }
}