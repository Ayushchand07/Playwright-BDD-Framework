import {Given, When, Then,} from "@cucumber/cucumber"
import {Page, Browser, BrowserContext, chromium, expect } from "playwright/test"

let browser : Browser;
let context : BrowserContext
let page : Page;

Given('User navigates to the application', async()=>{
browser = await chromium.launch({headless: false});
context = await browser.newContext();
page = await context.newPage();
await page.goto("https://bookcart.azurewebsites.net/")       
})

Given('User click on the login link', async function () {
await page.getByText('Login').first().click()
});
        
Given('User enter the username as {string}', async function (username) {
await page.getByRole('textbox', {name: "Username"}).fill(username)
});
             
Given('User enter the password as {string}', async function (password) {
await page.getByRole('textbox', {name: "Password"}).fill(password)
});
       
When('User click on the login button', async function () {
await page.locator('span').filter({ hasText: 'Login' }).last().click()
});
             
Then('Login should be success', async function () {
expect(page.getByText('account_circle', { exact: true })).toBeVisible()
await page.waitForTimeout(3000);
await browser.close();
});

//  But('Login should fail', async function () {
//    expect(page.getByText("")).toBeVisible()
//  });

        