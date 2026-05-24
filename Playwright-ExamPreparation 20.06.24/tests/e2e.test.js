const {test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('@playwright');

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

