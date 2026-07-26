import {test, expect, BrowserContext} from "@playwright/test";

test('firstTestWithPage' , async ({ page })=>{
await page.goto("https://playwright.dev/docs/intro");



} );
test('firstTestWithBrowser' , async ({ browser })=>{
 const context  =   await browser.newContext();
 const page = await context.newPage();
await page.goto("https://playwright.dev/docs/intro");



} );
