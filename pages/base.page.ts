import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToProductDetailsViaURL(productId: string) {
        await this.page.goto(`/index.php?route=product/product&product_id=${productId}`);
    }
}