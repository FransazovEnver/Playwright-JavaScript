const {test, describe, beforeEach, afterEach, beforeAll, afterAll, expect} = require('@playwright/test');
const {chromium} = require('playwright');

const host = '';

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

    });

    test("Login with Valid Data", async () => {

    });

    test("Logout from the Application", async () => {

    });

});

describe("navbar", () => {
    test("Navigation for Logged-In User", async () => {

    });
    test("Navigation for Guest User", async () => {

    });
    
});

describe("CRUD", () => {
    test("Create a Postcart", async () => {

    });

    test("Edit a Postcart", async () => {

    });

    test("Delete a Postcart", async () => {
        
    }); 
});


});