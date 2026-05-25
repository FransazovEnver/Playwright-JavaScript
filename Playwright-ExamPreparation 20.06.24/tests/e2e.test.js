const {test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000/';

let browser;
let context;
let page;

let user = {
    username: "",
    email: "",
    password: "123456",
    confirmPass: "123456"
};

let meme = {
    title: "",
    description: "Some description",
    imageUrl: "Some Image"
}

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

    describe("authentication", () =>{
       test("Registration with Valid Data", async() =>{
            await page.goto(host)
            await page.click("//div[@class='guest']//a[text()='Register']");
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 1000);
            user.username = `Auto_Test_username_${random}`;
            user.email = `abv_${random}@abv.bg`;

            await page.fill("//input[@id='username']", user.username);
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']",user.password);
            await page.fill("//input[@id='repeatPass']",user.confirmPass);
            await page.click("//label[@for='male']");

            await page.click("//input[@value='Register']");

            await expect(page.locator("//div[@class='profile']//span")).toContainText("Welcome,", user.email);
       });
       
        test("Login with Valid Data", async() => {
            await page.goto(host);
            await page.click("//div[@class='profile']//a[text()='Login']");
            await page.waitForSelector('form');
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password)
            await page.click("//input[@value='Login']");

            await expect(page.locator("//div[@class='profile']//span")).toContainText("Welcome,", user.email);
        });

        test("Logout from the Application", async() =>{

        });

    });

    describe("navbar", () =>{

    });

    describe("CRUD", () =>{

    });



});