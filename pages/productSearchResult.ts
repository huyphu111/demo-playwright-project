import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductSearchResultPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly categorySelect: Locator;   
    readonly categoryList: Locator;
    readonly productList: Locator;
    readonly productSearchBody: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = this.page.getByRole('textbox', { name: 'Search For Products' });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.categorySelect = this.page.getByRole('button', { name: 'All Categories' });
        this.categoryList = this.page.locator('#input-category');
        this.productList = this.page.locator('div[class="product-thumb"]');
        this.productSearchBody = this.page.locator('#product-search');
    }

    async waitForFilterSidebar() {
        await this.productSearchBody.waitFor({ state: 'visible' });
    }

    async getAllDisplayedProducts() {
        return await this.productList.all();
    }

    async getAllDisplayedProductsNames() {
        const products = await this.getAllDisplayedProducts();
        const productNames = await Promise.all(products.map(async (product) => {
            const nameElement = await product.locator('h4[class="title"]').first();
            return await nameElement.textContent();
        }));
        return productNames.filter(name => name !== null) as string[];
    }
}