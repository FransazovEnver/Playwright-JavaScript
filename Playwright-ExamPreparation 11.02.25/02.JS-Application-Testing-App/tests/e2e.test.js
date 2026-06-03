const {test, describe, beforeEach, afterEach, beforeAll, afterAll, expect} = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000/';

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let albumName = "";

describe("e2e tests", () => {
    
beforeAll(async () => {
    browser = await chromium.launch();
});

afterAll(async() => {
    await browser.close();
});

beforeEach(async() => {
    context = await browser.newContext();
    page = await context.newPage();
});

afterEach(async() => {
    await page.close();
    await context.close();
});

describe("authentication", () => {
    test("registration with valid data", async () => {
        await page.goto(host)
        await page.click("//a[text()='Register']");
        await page.waitForSelector('form');

        let random = Math.floor(Math.random() * 1000);
        user.email = `abv_${random}@abv.bg`;

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.fill("//input[@id='conf-pass']", user.confirmPass);
        await page.click("//button[@type='submit']");

        await expect(page.locator("//a[text()='Logout']")).toBeVisible()
        await expect(page.url()).toBe(host);
    });


    test("login with valid data", async() => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');
        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='password']", user.password);
        await page.click("//button[@type='submit']");

        await expect(page.locator("//a[text()='Logout']")).toBeVisible();
        await expect(page.url()).toBe(host);
    })
});

describe("navbar", () => {

});

describe("CRUD", () => {

});


});





