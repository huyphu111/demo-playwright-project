import { test, expect } from "@fixtures/base.fixture";
import { Product, ipodTouchAvailable, ipodTouchOutOfStock } from "@data/products/productModel";

test.describe('Product Favorite Tests', () => {

    test("Verify that error message appears when user tries to add a product to favorites without logging in", async ({ homePage, productSearchResultPage }) => {
        await homePage.navigateToHomePage();
        await homePage.searchForProduct(ipodTouchOutOfStock.name, null);
        await productSearchResultPage.waitForFilterSidebar();
        const displayedProducts = await productSearchResultPage.getAllDisplayedProducts();
        expect(displayedProducts.length).toBeGreaterThan(0);
        await productSearchResultPage.addProductToFavorites(ipodTouchOutOfStock.id.toString());
        await productSearchResultPage.waitForMustLoginNotification();
        await expect(productSearchResultPage.mustLoginNotificationMessage).toBeVisible();
    });

    test("Verify that add to favorite button is unavailable for out-of-stock product", async ({loggedInPage, productDetailsPage}) => {
        await loggedInPage.navigateToProductDetailsViaURL(ipodTouchOutOfStock.id.toString());
        // TODO: Finish the test case
    });
});