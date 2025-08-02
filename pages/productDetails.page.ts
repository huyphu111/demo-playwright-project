import { Product, ProductCheckout } from '@data/products/productModel';
import { Cart } from './common-components/cart';
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
    readonly cart: Cart;
    readonly toastCloseButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cart = new Cart(this.page);
        this.productCode = this.page.locator('//span[contains(text(), "Product Code")]/following-sibling::span');
        this.productBrand = this.page.locator('//span[contains(text(), "Brand")]/following-sibling::a');
        this.productAvailability = this.page.locator('//span[contains(text(), "Availability")]/following-sibling::span');
        this.productViews = this.page.locator('//span[contains(text(), "Viewed")]/following-sibling::span');
        this.addToCartButton = this.page.getByRole('button', { name: "Add to Cart" });
        this.buyNowButton = this.page.getByRole('button', { name: "Buy Now" });
        this.toastMessageBody = this.page.locator('//*[@class="toast-body"]//p');
        this.toastCloseButton = this.page.getByRole('button', { name: 'Close' });
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
        await this.cart.openCart();
    }

    async getAllItemsInCart(): Promise<CartItems> {
        return await this.cart.getAllItemsInCart();
    }

    async closeToast(): Promise<void> {
        await this.toastCloseButton.click();
    }
}