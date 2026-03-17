import { BasePage } from "@pages/base.page";
import { ProductCheckout } from '@models/products/product.model';
import { Page, Locator } from '@playwright/test';

export type CartItems = Array<Partial<ProductCheckout>>;

export class Cart extends BasePage {
    readonly cartButton: Locator;
    readonly cartDrawer: Locator;

    constructor(page: Page) {
        super(page);
        this.cartButton = this.page.locator('.cart-icon').first();
        this.cartDrawer = this.page.locator('#cart-total-drawer');
    }

    async openCart(): Promise<void> {
        await this.cartButton.click();
        await this.cartDrawer.waitFor({ state: "visible" })
    }

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
}