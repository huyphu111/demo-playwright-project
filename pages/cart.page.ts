import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";


export class CartPage extends BasePage {
    readonly productDeleteBtn: Locator;
    readonly emptyMessageP: Locator;

    constructor(page: Page) {
        super(page);
        this.productDeleteBtn = this.page.locator("//button[@class='btn btn-danger']");
        this.emptyMessageP = this.page.locator('#content').getByText('Your shopping cart is empty!')
    }

    async goto() {
        await this.page.goto("/index.php?route=checkout/cart");
        await this.page.waitForLoadState("networkidle");
    }

    async removeAllProducts() {
        if (await this.emptyMessageP.isVisible()) {
            console.log("Cart is already empty");
            return;
        }
        const buttons: Locator[] = await this.productDeleteBtn.all();

        for (const button of buttons) {
            await button.click();
        }
        await this.emptyMessageP.waitFor({ state: "visible" })
    }
}