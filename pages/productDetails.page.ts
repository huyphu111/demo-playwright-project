import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage extends BasePage {
    readonly productCode: Locator;
    readonly productBrand: Locator;
    readonly productViews: Locator;
    readonly productAvailability: Locator;
    readonly productTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.productCode = this.page.locator('//span[contains(text(), "Product Code")]/following-sibling::span');
        this.productBrand = this.page.locator('//span[contains(text(), "Brand")]/following-sibling::a');
        this.productAvailability = this.page.locator('//span[contains(text(), "Availability")]/following-sibling::span');
        this.productViews = this.page.locator('//span[contains(text(), "Viewed")]/following-sibling::span');
    }

    async waitForProductTiles(productName: string) {
        await this.page.waitForSelector(`//h1[contains(text(), "${productName}")]`, { state: 'visible' });
    }

    async getProductCode(): Promise<string> {
        return await this.productCode.textContent() || '';
    }

    async getProductBrand(): Promise<string> {
        return await this.productBrand.textContent() || '';
    }

    async getProductViews(): Promise<string> {
        return await this.productViews.textContent() || '';
    }

    async getProductAvailability(): Promise<string> {
        return await this.productAvailability.textContent() || '';
    }

}