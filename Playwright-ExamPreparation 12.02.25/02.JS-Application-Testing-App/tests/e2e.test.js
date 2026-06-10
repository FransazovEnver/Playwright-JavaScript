const {test, describe, beforeEach, afterEach, beforeAll, afterAll, expect} = require('@playwright/test');
const {chromium} = require('playwright');

const host = 'http://localhost:3000/';

let browser;
let context;
let page;

let user = {
    email : "",
    password :"123456",
    confirmPass : "123456",
}; 

let petName = "";


describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

describe("authentication", () => {
    test("Registration with Valid Data", async () => {
        await page.goto(host);
        await page.click("//a[text()='Register']");
        await page.waitForSelector('form');

        let random = Math.floor(Math.random() * 1000);
        user.email = `abv_${random}@abv.bg`;

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.fill("//input[@id='repeatPassword']", user.confirmPass);
        await page.click("//button[@type='submit']");

        await expect(page.locator("//a[text()='Logout']")).toBeVisible();
        await expect(page.url()).toBe(host);
    });

    test("Login with Valid Data", async () => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.click("//button[@class='btn']");

        await expect(page.locator("//a[text()='Logout']")).toBeVisible();
        await expect(page.url()).toBe(host);
    });

    test("Logout from the Application", async () => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.click("//button[@class='btn']");
        await page.click("//a[text()='Logout']");

        await expect(page.locator("//a[text()='Login']")).toBeVisible();
        await expect(page.url()).toBe(host);
    });

});

describe("navbar", () => {
    test("Navigation for Logged-In User", async () => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');
        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.click("//button[@class='btn']");

        await expect(page.locator("//a[text()='Home']")).toBeVisible()
        await expect(page.locator("//a[text()='Dashboard']")).toBeVisible();
        await expect(page.locator("//a[text()='Create Postcard']")).toBeVisible()
        await expect(page.locator("//a[text()='Logout']")).toBeVisible();
        await expect(page.locator("//a[text()='Login']")).toBeHidden();
        await expect(page.locator("//a[text()='Register']")).toBeHidden();
    });
    test("Navigation for Guest User", async () => {
        await page.goto(host);

        await expect(page.locator("//a[text()='Home']")).toBeVisible()
        await expect(page.locator("//a[text()='Dashboard']")).toBeVisible();
        await expect(page.locator("//a[text()='Login']")).toBeVisible();
        await expect(page.locator("//a[text()='Register']")).toBeVisible(); 
        await expect(page.locator("//a[text()='Create Postcard']")).toBeHidden();
        await expect(page.locator("//a[text()='Logout']")).toBeHidden();
    });
    
});

describe("CRUD", () => {
    beforeEach(async () => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');
        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.click("//button[@class='btn']");
    });
    test("Create a Postcart", async () => {
        
    });

    test("Edit a Postcart", async () => {

    });

    test("Delete a Postcart", async () => {
        
    }); 
});


});