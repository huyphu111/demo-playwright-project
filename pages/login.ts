import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Account } from '@models/account.model';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator('#input-email');
        this.passwordInput = this.page.locator('#input-password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.locator('div[class*="alert alert-danger"]');
    }

    async goto() {
        await this.page.goto('/index.php?route=account/login');
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(account: Account) {
        await this.fillUsername(account.username);
        await this.fillPassword(account.password);
        await this.clickLoginButton();
    }

}