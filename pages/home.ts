import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Navbar } from '@common-components/navbar';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly categorySelect: Locator;
    readonly categoryList: Locator;
    readonly navBar: Navbar;

    constructor(page: Page) {
        super(page);
        this.searchInput = this.page.getByRole('textbox', { name: 'Search For Products' });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.categorySelect = this.page.getByRole('button', { name: 'All Categories' });
        this.navBar = new Navbar(this.page);
    }

    async navigateToHomePage() {
        await this.page.goto('/index.php?route=common/home');
    }

    async verifyHomePageTitle(expectedTitle: string) {
        const title = await this.page.title();
        expect(title).toBe(expectedTitle);
    }

    async searchForProduct(productName: string, category: string | null) {
        await this.navBar.searchForProduct(productName, category);
    }
}

