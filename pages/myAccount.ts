import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class MyAccountPage extends BasePage {
    readonly myAccountSection: Locator;

    constructor(page: Page) {
        super(page);
        this.myAccountSection = this.page.locator('#content h2:has-text("My Account")');
    }

    async gotoMyAccountPage() {
        await this.page.goto('/index.php?route=account/account');
    }

    async waitForMyAccountSection() {
        await this.myAccountSection.waitFor({ state: 'visible' });
    }

    async verifyMyAccountSectionDisplayed() : Promise<Boolean | null> {
        return await this.myAccountSection.isVisible();
    }
}