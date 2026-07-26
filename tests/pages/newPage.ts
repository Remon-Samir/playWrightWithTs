import {type Page, type Locator, expect}from '@playwright/test';


export class NewPage{
    readonly page:Page;
    readonly pageBody: Locator;



    constructor(page: Page){
        this.page=page;
        this.pageBody = page.locator("body");

    }

}