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

    test("Registration with incorrect data", async () =>{
        await page.goto(host);
        await page.click("//a[@href='/register']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", "@test.com");
        await page.fill("//input[@id='register-password']", "123456");
        await page.fill("//input[@id='confirm-password']", "123456");
        await page.click("//input[@type='submit']");

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe("Please enter a part followed by '@'.'@test.com' is incomplete.");
            await dialog.accept();
        })

        expect(page.url()).toBe(host + "register");
    });

    test("Registration with just one empty field", async() =>{
        await page.goto(host);
        await page.click("//a[@href='/register']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='register-password']", "123456");
        await page.fill("//input[@id='confirm-password']", "123456");
        await page.click("//input[@type='submit']");

        page.on('dialog', async () =>{
            expect(dialog.message()).toBe("No empty fields are allowed and confirm password has to match password!");
            await dialog.accept();
        })

        expect(page.url()).toBe(host + "register");
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

    test("Login with empty fields", async () =>{
        await page.goto(host);
        await page.click("//a[@href='/login']");
        await page.waitForSelector("form");

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe("Unable to log in!");
            await dialog.accept();
        });

        expect(page.url()).toBe(host + "login");
    })
    
    test("Logout from the application", async () =>{
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='login-password']", user.password);
        await page.click("//input[@type='submit']");

        await page.click("//a[text()='Logout']");
        

        await expect(page.locator("//a[text()='Login']")).toBeVisible();
        expect(page.url()).toBe(host);
    })

});

describe("Navigation Bar Tests", () => {
    test("Verify that 'All Games', 'Create Game', 'Logout' are visible", async () => {
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='login-password']", user.password);
        await page.click("//input[@type='submit']");

        await expect(page.locator("//a[text()='All games']")).toBeVisible();
        await expect(page.locator("//a[@href='/create']")).toBeVisible();
        await expect(page.locator("//a[text()='Logout']")).toBeVisible();
        await expect(page.locator("//a[text()='Login']")).toBeHidden();
        await expect(page.locator("//a[text()='Register']")).toBeHidden();
    })

    test("All buttons are correct and visible", async () => {
        await page.goto(host);

        await expect(page.locator("//a[text()='Login']")).toBeVisible();
        await expect(page.locator("//a[text()='Register']")).toBeVisible();
        await expect(page.locator("//a[text()='All games']")).toBeVisible();
        await expect(page.locator("//a[@href='/create']")).toBeHidden();
        await expect(page.locator("//a[text()='Logout']")).toBeHidden();
    })
});

describe("CRUD Operations Tests", () => {
    beforeEach(async () =>{
        await page.goto(host);
        await page.click("//a[text()='Login']");
        await page.waitForSelector('form');

        await page.fill("//input[@id='email']", user.email);
        await page.fill("//input[@id='login-password']", user.password);
        await page.click("//input[@type='submit']");
    });

    test("Create a Game with Empty Fields", async () => {
        await page.click("//a[text()='Create Game']");
        await page.waitForSelector('form');

        await page.click("//input[@type='submit']");

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe("All fields are required!");
            await dialog.accept();
        });

        expect(page.url()).toBe(host + "create");
    })

    test("Create a Game with Valid Input Values", async () => {
        let random = Math.floor(Math.random() * 1000);
        game.title = `Game title ${random}`;
        game.category = `Game category ${random}`;
        
        await page.click("//a[text()='Create Game']");
        await page.waitForSelector('form');
        await page.fill("//input[@id='title']", game.title)
        await page.fill("//input[@id='category']", game.category);
        await page.fill("//input[@id='maxLevel']", game.maxLevel);
        await page.fill("//input[@id='imageUrl']", game.imageUrl);
        await page.fill("//textarea[@id='summary']", game.summary);

        await page.click("//input[@type='submit']");

        await expect(page.locator("//div[@class='game']//h3", {hasText: game.title})).toBeVisible();
        expect(page.url()).toBe(host);
    });

    test("Verify 'Edit' and 'Delete' Buttons are visible", async () =>{
        
        await page.goto(host + "catalog");
        await page.click("//section[@id='catalog-page']/*[2]//a", {hasText: game.title});

        game.id = page.url().split("/").pop();

        await expect(page.locator("//a[text()='Edit']")).toBeVisible();
        await expect(page.locator("//a[text()='Delete']")).toBeVisible();
    })
    
    test("Non owner cannot see Edit and Delete button", async () => {
        await page.goto(host + "catalog");
        await page.click("//div[@class='allGames']//h2[text()='CoverFire']/parent::div//a");

        await expect(page.locator("//a[text()='Edit']")).toBeHidden();
        await expect(page.locator("//a[text()='Delete']")).toBeHidden();
    })

    test("Edit Button for Game Owner", async () => {
        await page.goto("http://localhost:3000/catalog");
        await page.click("//section[@id='catalog-page']/*[2]//a", {hasText: game.title});
        await page.click("//a[text()='Edit']");

        await page.waitForSelector('form');

        game.title = `${game.title}_edited`;
        await page.fill("//input[@id='title']", game.title);
        await page.click("//input[@type='submit']");

        await expect(page.locator(`//div[@class='game-header']/h1[text()='${game.title}']`)).toBeVisible();
        expect(page.url()).toBe(host +`details/${game.id}`);
    })

    test("Delete game" , async() =>{
        await page.goto("http://localhost:3000/catalog");
        await page.click("//section[@id='catalog-page']/*[2]//a", {hasText: game.title});
        await page.click("//a[text()='Delete']");

        await expect(page.locator(`//div[@class='game']/h3[text()='${game.title}']`)).toBeHidden();
        expect(page.url()).toBe(host);
    })
});

describe("Home Page Tests", () => {
    test("show home page", async () => {
        await page.goto(host);

        expect(page.locator("//div[@class='welcome-message']/h2")).toHaveText("ALL new games are");
        expect(page.locator("//div[@class='welcome-message']/h3")).toHaveText("Only in GamesPlay");
        expect(page.locator("//div[@id='home-page']/h1")).toHaveText("Latest Games");

        const divGames = await page.locator("//div[@class='game']").all();

        expect(divGames.length).toBeGreaterThanOrEqual(3);

    })
});



});
