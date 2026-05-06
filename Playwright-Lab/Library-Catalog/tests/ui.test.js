const {test, expect} = require('@playwright/test')

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
    })
})