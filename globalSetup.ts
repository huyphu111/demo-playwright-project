import { LoginPage } from '@pages/login';
import { chromium } from '@playwright/test';
import { normalUser } from '@data/account.data';
import { CartPage } from '@pages/cart.page';

const baseURL = process.env.BASE_URL || "https://ecommerce-playground.lambdatest.io";

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to login page and perform login
    await page.goto(`${baseURL}/index.php?route=account/login`);
    const loginPage = new LoginPage(page);
    await loginPage.login(normalUser);
    // Remove all cart items
    await page.goto(`${baseURL}/index.php?route=checkout/cart`);
    const cartPage = new CartPage(page);
    await cartPage.removeAllProducts();

    // Save storage state to file
    await context.storageState({ path: 'storageState.json' });

    await browser.close();
}

export default globalSetup;