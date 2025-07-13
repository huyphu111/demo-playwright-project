import { BasePage } from "@pages/base.page";
import { test } from "@fixtures/base.fixture";
import { expect } from "@playwright/test";
import { Product } from "@data/products/productModel";
import { JsonUtils } from "@utils/JsonUtils";

test.describe('Product Favorite Tests', () => {
    let outOfStockProduct: Product;
    let availableProduct: Product;
    test.beforeAll(async () => {
        // Initialize all products
        const productDataPath = '../data/products/product.json';
        const productsData = await JsonUtils.readJsonFile<{ products: Product[] }>(productDataPath);
        [outOfStockProduct, availableProduct] = [productsData[1], productsData[2]]; // Assuming we want the first product for testing
        expect(outOfStockProduct.id.toString()).toBeDefined();
        expect(availableProduct.id.toString()).toBeDefined();
    });

    test("Verify that error message appears when user tries to add a product to favorites without logging in", async ({ homePage, productSearchResultPage }) => {
        await homePage.navigateToHomePage();
        await homePage.searchForProduct(outOfStockProduct.name, null);
        await productSearchResultPage.waitForFilterSidebar();
        const displayedProducts = await productSearchResultPage.getAllDisplayedProducts();
        expect(displayedProducts.length).toBeGreaterThan(0);
        await productSearchResultPage.addProductToFavorites(outOfStockProduct.id.toString());
        await productSearchResultPage.waitForMustLoginNotification();
        await expect(productSearchResultPage.mustLoginNotificationMessage).toBeVisible();
    });

    test("Verify that add to favorite button is unavailable for out-of-stock product", async ({loggedInPage, productDetailsPage}) => {
        await loggedInPage.navigateToProductDetailsViaURL(outOfStockProduct.id.toString());
        // TODO: Finish the test case
    });
});