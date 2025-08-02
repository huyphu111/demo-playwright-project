import { Locator, Page } from '@playwright/test';

export class Navbar {
    private readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly categorySelect: Locator;
    readonly categoryList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.getByRole('textbox', { name: 'Search For Products' });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.categorySelect = this.page.getByRole('button', { name: 'All Categories' });
        // this.categoryList = this.page.locator('#input-category');
    }

    async searchProduct(productName: string, category: string | null) {
        if (category) {
            await this.categorySelect.click();
            const categoryOption = this.page.getByRole('link', { name: category, exact: true })
            await categoryOption.click();
        }
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
}