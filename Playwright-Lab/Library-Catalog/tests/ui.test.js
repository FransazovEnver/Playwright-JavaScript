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
})