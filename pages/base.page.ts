// TODO: write a base page class for all pages to extend
// TODO: then refracttor all pages to extend this base page class

import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToProductDetails(productId: string) {
        await this.page.goto(`/index.php?route=product/product&product_id=${productId}`);
    }
}