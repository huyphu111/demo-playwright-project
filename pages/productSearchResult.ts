import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductSearchResultPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly categorySelect: Locator;
    readonly categoryList: Locator;
    readonly productList: Locator;
    readonly productSearchBody: Locator;
    readonly mustLoginNotificationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = this.page.getByRole('textbox', { name: 'Search For Products' });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.categorySelect = this.page.getByRole('button', { name: 'All Categories' });
        this.categoryList = this.page.locator('#input-category');
        this.productList = this.page.locator('div[class="product-thumb"]');
        this.productSearchBody = this.page.locator('#product-search');
        this.mustLoginNotificationMessage = this.page.getByText('You must login or create an account');
    }

    async waitForFilterSidebar() {
        await this.productSearchBody.waitFor({ state: 'visible' });
    }

    async getAllDisplayedProducts(): Promise<Locator[]> {
        return await this.productList.all();
    }

    async getAllDisplayedProductsNames(): Promise<string[]> {
        const products = await this.getAllDisplayedProducts();
        const productNames = await Promise.all(products.map(async (product) => {
            const nameElement = await product.locator('h4.title').first();
            return await nameElement.textContent();
        }));
        return productNames.filter(name => name !== null) as string[];
    }

    async addProductToFavorites(productId: string) {
        await this.page.locator(`a[id*="mz-product-grid-image-${productId}"]`).hover();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`.product-action button[class*="wishlist-${productId}"]`).click();
    }

    async waitForMustLoginNotification() {
        await this.mustLoginNotificationMessage.waitFor({ state: 'visible' });
    }
}