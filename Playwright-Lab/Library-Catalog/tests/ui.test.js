const {test, expect} = require('@playwright/test');
const { join } = require('node:path');

//Navigation Bar for Guest Users Tests

//Verify That the "All Books" Link Is Visible
test('Verify That the "All Books" Link Is Visible', async ({page}) =>{
    
    //act
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const allBooksLink = page.locator("//a[@href='/catalog']");
    const isLinkVisible = await allBooksLink.isVisible();

    //assert
    expect(isLinkVisible).toBe(true);
});

//Verify That the "Login" Button Is Visible
test('Verify That the "Login" Button Is Visible', async ({page}) =>{
    //act
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.locator('#guest a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    //assert
    expect(isLoginButtonVisible).toBe(true);
});

//Verify That the "Register" Button Is Visible
test('Verify That the "Register" Button Is Visible', async ({page}) =>{
    //act
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const registerButton = await page.locator('#guest a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();

    //assert
    expect(isRegisterButtonVisible).toBe(true);
});

//Verify That the "All Books" Link Is Visible
test('Verify That the "All Books" Link Is Visible after user login', async ({page}) =>{
    //arrange
    await page.goto('http://localhost:3000/login');

    //act
    await page.fill("//input[@name='email']", "test@test.com");
    await page.fill("//input[@name='password']", "123456");
    await page.click("//input[@type='submit']");

    //assert
    const allBookLink = await page.locator("//a[@href='/catalog']");
    const allBookIsVisible = await allBookLink.isVisible();
    expect(allBookIsVisible).toBe(true);
});

//Verify That the "My Books", "AddBooks", "LogOutButton", "Email Address" Links are Visible
test('Verify That the Then login "My Books" Link Is Visible', async ({page}) =>{
    
    //arrange
    await page.goto('http://localhost:3000/login');

    //act
    await page.fill("//input[@name='email']", "test@test.com");
    await page.fill("//input[@name='password']", "123456");
    await page.click("//input[@type='submit']");

    //assert
    const myBooksLink = await page.locator("//a[@href='/profile']");
    const addBooksLink = await page.locator("//a[@href='/create']");
    const logOutButton = await page.locator("//a[@id='logoutBtn']");
    const emailAddress = await page.locator("//div[@id='user']/*[1]");

    const myBooksLinkIsVisible = await myBooksLink.isVisible();
    const addBooksIsVisible = await addBooksLink.isVisible();
    const logOutBtnIsVisible = await logOutButton.isVisible();
    const emailAddressIsVisible = await emailAddress.isVisible();
    
    expect(myBooksLinkIsVisible).toBe(true);
    expect(addBooksIsVisible).toBe(true)
    expect(logOutBtnIsVisible).toBe(true);
    expect(emailAddressIsVisible).toBe(true);
});
//=================================================================================

//Login Page Tests

//Submit the Form with Valid Credentials
test("Submit the Form with Valid Credentials", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill("//input[@name='email']", "john@abv.bg");
    await page.fill("//input[@name='password']", "123456");

    //act
    await page.click("//input[@type='submit']");
    await expect(page.locator("//a[@href='/catalog']")).toBeVisible();

    //expect
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

//Submit the Form with Empty Input Fields
test("Submit the Form with Empty Input Fields", async ({page}) =>{
    //act
    await page.goto('http://localhost:3000/login');
    await page.click("//input[@type='submit']");

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All field are required!');
        await dialog.accept();
    });
    await page.locator("//a[@href='/login']");
    expect(page.url()).toBe("http://localhost:3000/login");
});

//Submit the Form with Empty Email Input Field
test("Submit the Form with Empty Email Input Field", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill("//input[@name='password']", "123456");
    await page.click("//input[@type='submit']");

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.locator();
});

//Submit the Form with Empty Password Input Field
test("Submit the Form with Empty Password Input Field", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill("//input[@name='email']", "john@abv.bg")
    await page.click("//input[@type='submit']");

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.locator();
});

//===========================================================================

//Register Page Tests

//Submit the Form with Valid Values
test("Submit the Form with Valid Values", async ({page}) =>{
    //arrange
    await page.goto('http://localhost:3000/register');

    //act
    const email = `john_${Date.now()}@abv.bg`;
    await page.fill("//input[@name='email']", email);
    await page.fill("//input[@name='password']", "123456");
    await page.fill("//input[@name='confirm-pass']" , "123456");
    await page.click("//input[@type='submit']");

    //assert
    await page.waitForURL('http://localhost:3000/catalog');
});

//Submit the Form with Empty Values
test("Submit the Form with Empty Values", async ({page}) =>{
     //arrange
    await page.goto('http://localhost:3000/register')

    //act
    await page.click("//input[@type='submit']");

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All field are required!');
        await dialog.accept();
    });

    await page.locator("//a[@href='/register']");
    await page.waitForURL('http://localhost:3000/register');

})

//Submit the Form with Empty Email
test("Submit the Form with Empty Email", async ({page}) =>{
     //arrange
    await page.goto('http://localhost:3000/register')

    //act
    await page.fill("//input[@name='password']", "123456");
    await page.fill("//input[@name='confirm-pass']" , "123456");
    await page.click("//input[@type='submit']");

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All field are required!');
        await dialog.accept();
    });

    await page.locator("//a[@href='/register']");
    await page.waitForURL('http://localhost:3000/register');
})

//Submit the Form with Empty Password
test("Submit the Form with Empty Password", async ({page}) =>{
     //arrange
    await page.goto('http://localhost:3000/register')
    
    //act
    const email = `john_${Date.now()}@abv.bg`;
    await page.fill("//input[@name='email']", email);
    await page.fill("//input[@name='confirm-pass']" , "123456");
    await page.click("//input[@type='submit']");
    
    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All field are required!');
        await dialog.accept();
    });

    await page.locator("//a[@href='/register']");
    await page.waitForURL('http://localhost:3000/register');
})

//Submit the Form with Empty Confirm Password
test("Submit the Form with Empty Confirm Password", async ({page}) => {
     //arrange
    await page.goto('http://localhost:3000/register')
    
    //act
    const email = `john_${Date.now()}@abv.bg`;
    await page.fill("//input[@name='email']", email);
    await page.fill("//input[@name='password']", "123456");;
    await page.click("//input[@type='submit']");
    
    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All field are required!');
        await dialog.accept();
    });

    await page.locator("//a[@href='/register']");
    await page.waitForURL('http://localhost:3000/register')
})
//Submit the Form with Different Passwords
test("Submit the Form with Different Passwords", async({page}) =>{
    //arrange
    await page.goto('http://localhost:3000/register');

    //act
    const email = `john_${Date.now()}@abv.bg`;
    await page.fill("//input[@name='email']", email);
    await page.fill("//input[@name='password']", "654321");
    await page.fill("//input[@name='confirm-pass']" , "123456");
    await page.click("//input[@type='submit']");

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });

    await page.locator("//a[@href='/register']");
    await page.waitForURL('http://localhost:3000/register');
})

//=============================================================================

//Add Book Page Tests

//Submit the Form with Correct Data

//Submit the Form with Empty Title Field

//Submit the Form with Empty Description Field

//Submit the Form with Empty Image URL Field
//==============================================================================

//All Books Page Tests

//Verify That All Books Are Displayed

//Verify That No Books Are Displayed
//===============================================================================

//Details Page Tests

//Verify That Logged-In User Sees Details Button and Button Works Correctly

//Verify That Guest User Sees Details Button and Button Works Correctly

//Verify That All Info Is Displayed Correctly

//Verify If Edit and Delete Buttons Are Visible for Creator

//Verify If Edit and Delete Buttons Are Not Visible for Non-Creator

//Verify If Like Button Is Not Visible for Creator

//Verify If Like Button Is Visible for Non-Creator
//==========================================================================

//Logout Functionality Tests

//Verify That the "Logout" Button Is Visible

//Verify That the "Logout" Button Redirects Correctly


