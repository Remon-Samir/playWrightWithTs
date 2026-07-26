import {test, expect} from "@playwright/test";
import {Way2AutomationHomePage} from "../pages/intermediateLevel/homePage/way2AutomationHomePage";
import {Utils} from "../pages/intermediateLevel/utils";
import { request } from "https";
// import { threadCpuUsage } from "node:process";
// import { request } from "node:http";
import  objectsList  from "../API/endPoints";
let way2AutomationHomePage : Way2AutomationHomePage;

test('task 201' , async ({page})=>{
    way2AutomationHomePage = new Way2AutomationHomePage(page);
    await way2AutomationHomePage.OpenHomePage();
   const registerPage = await way2AutomationHomePage.clickOnRegistrationCard();
    await registerPage.fillRegisertationFOrm();
    await registerPage.displyingSuccMsgForRegis();

})


test('task 204' , async ({page}) => {
    way2AutomationHomePage = new Way2AutomationHomePage(page);
    await way2AutomationHomePage.OpenHomePage();
    const multiFormPage = await way2AutomationHomePage.clickonMultiFormCard();
    await multiFormPage.fillMultiForm();
    await Utils.takeScreenShot(multiFormPage.page , "multiFormPage");

})

test('task 205' , async ({page}) => {   
    way2AutomationHomePage = new Way2AutomationHomePage(page);
    await way2AutomationHomePage.OpenHomePage();
    const webTablePage = await way2AutomationHomePage.clickOnWebTableCard();
    await webTablePage.addNewUser("remon" , "samir" , "rsamwt" , "123456", "Admin" , "mohamed.sayed@example.com" , "1234567890");
    await Utils.takeScreenShot(webTablePage.page , "addUserToWebTablePage");
    await webTablePage.editUserName();
    await webTablePage.deleteUser();
})

test("task 207" , async ({page}) =>{
    way2AutomationHomePage = new Way2AutomationHomePage(page);
    await way2AutomationHomePage.OpenHomePage();
 const bankingPage =   await way2AutomationHomePage.clickOnBankingCard();
 await bankingPage.makingTransaction();
 await Utils.takeScreenShot(bankingPage.page , "bankingPageAfterTransactions");
})

test('task208' , async({page}) =>{
    way2AutomationHomePage = new Way2AutomationHomePage(page);
    await way2AutomationHomePage.OpenHomePage();
    const bankingPage = await way2AutomationHomePage.clickOnBankingCard();
    await bankingPage.addingCustomer();
    await bankingPage.searchingForCustomer();
    await bankingPage.openingAccount();
    await bankingPage.deletingCustomer();
})

test('task 401', async ({request}) =>{
 const res =await request.get("https://jsonplaceholder.typicode.com/posts");
 await expect(res.status()).toBe(200);
 const respJson = await res.json();
    const items =  respJson.find((item :any) => item.userId === 10 && item.id === 100);
    console.log(items.title);


}
)

test('sample api test', async({request}) =>{
const res1 = await objectsList.getObjectsList(request);
const resJson1 = await res1.json();
console.log(resJson1);


const objectById = await objectsList.getObjectById(request , 1);
const objectJson = await objectById.json();
console.log("Color: is " + objectJson[0].data.color);


const res2 = await objectsList.addObject(request);
const resJson2 = await res2.json();
const addedObjectId = resJson2.id;
 console.log("Added Object : " + resJson2);   


const res3 = await objectsList.deleteObject(request , addedObjectId);
const resJson3 = await res3.json();
console.log("Deleted Object Response: " + JSON.stringify(resJson3));
})