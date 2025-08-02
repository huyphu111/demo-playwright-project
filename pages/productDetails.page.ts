import { Product, ProductCheckout } from '@data/products/productModel';
import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export type CartItems = Array<Partial<ProductCheckout>>;

export class ProductDetailsPage extends BasePage {
    readonly productCode: Locator;
    readonly productBrand: Locator;
    readonly productViews: Locator;
    readonly productAvailability: Locator;
    readonly productTitle: Locator;
    readonly addToCartButton: Locator;
    readonly buyNowButton: Locator;
    readonly toastMessageBody: Locator;
    readonly cartButton: Locator;
    readonly cartDrawer: Locator;
    readonly toastCloseButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productCode = this.page.locator('//span[contains(text(), "Product Code")]/following-sibling::span');
        this.productBrand = this.page.locator('//span[contains(text(), "Brand")]/following-sibling::a');
        this.productAvailability = this.page.locator('//span[contains(text(), "Availability")]/following-sibling::span');
        this.productViews = this.page.locator('//span[contains(text(), "Viewed")]/following-sibling::span');
        this.addToCartButton = this.page.getByRole('button', { name: "Add to Cart" });
        this.buyNowButton = this.page.getByRole('button', { name: "Buy Now" });
        this.toastMessageBody = this.page.locator('//*[@class="toast-body"]//p');
        this.cartButton = this.page.locator('//*[@class="cart-icon"]').first();
        this.cartDrawer = this.page.locator('#cart-total-drawer');
        this.toastCloseButton = this.page.getByRole('button', { name: 'Close' })
    }

    async waitForProductTitles(productName: string) {
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

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async getToastMessage(): Promise<string> {
        return await this.toastMessageBody.textContent();
    }

    async openCart(): Promise<void> {
        await this.cartButton.click();
        await this.cartDrawer.waitFor({ state: "visible" })
    }

    // TODO: Move Cart functions into commmon-components
    async getAllItemsInCart(): Promise<CartItems> {
        let allItems: CartItems = [];
        const items = await this.page.locator('//*[@id="cart-total-drawer"]//table[@class="table"]//tr').all();
        for (const item of items) {
            let itemData: Partial<ProductCheckout> = {
                name: await item.locator('td a').nth(1).textContent(),
                productCode: (await item.locator('td small').textContent()).replace("Model: ", "").trim(),
                quantity: parseInt((await item.locator('td.text-center').textContent()).toString().replace('x', ''))
            }
            allItems.push(itemData);
        }
        return allItems;
    }

    async closeToast(): Promise<void> {
        await this.toastCloseButton.click();
    }
}