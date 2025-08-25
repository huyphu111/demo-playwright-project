import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to login page and perform login

    // TODO: Add remove all cart items

    // Wait for navigation or some element that confirms login


    // Save storage state to file
    await context.storageState({ path: 'storageState.json' });

    await browser.close();
}

export default globalSetup;