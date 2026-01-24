import { test, expect } from "@fixtures/base.fixture";
import { ipodTouchAvailable as pa, ipodTouchOutOfStock as poos } from "@data/products/product.data";
import { MESSAGES } from "const/constants";

test.describe('Product Favorite Tests', () => {
    test("Verify that error message appears when user tries to add a product to favorites without logging in", async ({ homePage, productSearchResultPage }) => {
        await homePage.goto();
        await homePage.navBar.searchProduct(poos.name, null)
        await productSearchResultPage.waitForFilterSidebar();
        const displayedProducts = await productSearchResultPage.getAllDisplayedProducts();
        expect(displayedProducts.length).toBeGreaterThan(0);
        await productSearchResultPage
            .addProductToFavorites(poos.id.toString());
        await productSearchResultPage
            .waitForMustLoginNotification();
        await expect(productSearchResultPage.mustLoginNotificationMessage).toBeVisible();
    });

    test("Verify that add to cart and buy now button is unavailable for out-of-stock product", async ({ productDetailsPage }) => {
        await productDetailsPage.navigateToProductDetailsViaURL(poos.id.toString());
        await productDetailsPage.waitForProductTitles(poos.name);
        await expect(productDetailsPage.addToCartButton).not.toBeVisible();
        await expect(productDetailsPage.buyNowButton).not.toBeVisible();
    });

    test("Verify that add to cart and buy now button is available for in-stock product", async ({ productDetailsPage }) => {
        await productDetailsPage.navigateToProductDetailsViaURL(pa.id.toString());
        await productDetailsPage.waitForProductTitles(pa.name);
        await expect(productDetailsPage.addToCartButton).toBeVisible();
        await expect(productDetailsPage.buyNowButton).toBeVisible();
    });

    test("Verify that user can add to cart a product", async ({ productDetailsPage }) => {
        await productDetailsPage.navigateToProductDetailsViaURL(pa.id.toString());
        await productDetailsPage.waitForProductTitles(pa.name);
        await productDetailsPage.addToCart();
        let toastMessage = await productDetailsPage.getToastMessage();
        let expectedMessage = MESSAGES.PRODUCT.ADD_TO_CART_SUCCESS(pa.name)
        expect(toastMessage).toContain(expectedMessage);

        await productDetailsPage.closeToast();
        await productDetailsPage.openCart();

        const cartItems = await productDetailsPage.getAllItemsInCart();
        expect(cartItems).toStrictEqual([
            {
                name: pa.name,
                productCode: pa.productCode,
                quantity: 1
            }
        ])
    });
});