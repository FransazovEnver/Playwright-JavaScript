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

       });
       
        test("Login with Valid Data", async() => {
            await page.goto(host);
        });

        test("Logout from the Application", async() =>{

        });

    });

    describe("navbar", () =>{

    });

    describe("CRUD", () =>{

    });



});