import {type Page, type Locator, expect} from '@playwright/test'

export class RegisterPage {
    readonly page : Page    
    readonly username : Locator;
    readonly passowrd : Locator;
    readonly userNameDesc : Locator;
    readonly loginButton : Locator;
    readonly successfullRegisMsg : Locator ;



    constructor (page : Page){
        this.page = page;
        this.username = page.locator("//input[@id='username']") ;
        this.passowrd = page.locator("//input[@id='password']");
        this.userNameDesc= page.getByLabel("Username *");
        this.loginButton= page.getByRole('button' , {name : 'Login'});
        this.successfullRegisMsg= page.getByText("You're logged in!!");
    }

    async fillRegisertationFOrm(){
        await this.username.fill("angular");
        await this.passowrd.fill("password");
        await this.userNameDesc.fill("angular");
        await this.loginButton.click();
    }
    
    async displyingSuccMsgForRegis(){
        await expect(this.successfullRegisMsg).toBeVisible();
    }
}