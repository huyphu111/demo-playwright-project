import { BasePage } from "@pages/base.page";
import { test } from "@fixtures/base.fixture";
import { expect } from "@playwright/test";
import { Product } from "@data/products/productModel";
import { JsonUtils } from "@utils/JsonUtils";

test.describe('Product Favorite Tests', () => {
    let product: Product;
    test.beforeAll(async () => {
        const productDataPath = '../data/products/product.json';
        const productsData = await JsonUtils.readJsonFile<{ products: Product[] }>(productDataPath);
        product = productsData[2]; // Assuming we want the first product for testing
        expect(product.id.toString()).toBeDefined();
    });

    test("Verify that error message appears when user tries to add a product to favorites without logging in", async ({ homePage, productSearchResultPage }) => {
        await homePage.navigateToHomePage();
        await homePage.searchForProduct(product.name, null);
        await productSearchResultPage.waitForFilterSidebar();
        const displayedProducts = await productSearchResultPage.getAllDisplayedProducts();
        expect(displayedProducts.length).toBeGreaterThan(0);
        // TODO: Finish test case
        await productSearchResultPage.addProductToFavorites(product.id.toString());
        await productSearchResultPage.waitForMustLoginNotification();
        await expect(productSearchResultPage.mustLoginNotificationMessage).toBeVisible();
    });
});