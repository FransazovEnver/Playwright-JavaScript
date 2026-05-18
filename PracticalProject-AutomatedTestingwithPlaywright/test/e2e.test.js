const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000/';

let browser;
let context;
let page;

let user = {
    email: "",
    password: "123456",
    confirmPass: "123456"
};

let game = {
    title: "",
    category: "",
    id: "",
    maxLevel: "99",
    imageUrl: "SomeImage",
    summary: "Latest Diablo version",
    id: ""
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

describe("Authentication Tests", () => {
    test("Register with valid data", async () => {
        
        await page.goto(host);
        await page.click("//a[@href='/register']");
        await page.waitForSelector("form");

        let random = Math.floor(Math.random() * 1000);
        user.email = `abv_${random}@abv.bg`;

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='register-password']", user.password);
        await page.fill("//input[@id='confirm-password']", user.confirmPass);
        await page.click("//input[@type='submit']");

        await expect(page.locator("//a[@href='/logout']")).toBeVisible();
        expect(page.url()).toBe(host);
    })

    test("Register does not work with empty fields", async () => {
        await page.goto(host);
        await page.click("//a[@href='/register']");
        await page.waitForSelector("form");

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe("No empty fields are allowed and confirm password has to match password!");
            await dialog.accept();
        });
        
        await page.click("//input[@type='submit']");
        expect(page.url()).toBe(host +"register");
    });

    test("Login with valid credentials", async () => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='login-password']", user.password);
        await page.click("//input[@type='submit']");

        await expect(page.locator("//a[@href='/logout']")).toBeVisible();
        expect(page.url()).toBe(host);
    })

    test.only("Login with empty fields", async () =>{
        await page.goto(host);
        await page.click("//a[@href='/login']");
        await page.waitForSelector("form");

        const dialogPromise = page.waitForEvent('dialog');
        await page.click("//input[@type='submit']");
        const dialog = await dialogPromise;

        expect(dialog.message()).toBe("Unable to log in!");
        await dialog.accept();

        expect(page.url()).toBe(host + "login");
    })

});

describe("Navigation Bar Tests", () => {

});

describe("CRUD Operations Tests", () => {

});

describe("Home Page Tests", () => {

});



});
