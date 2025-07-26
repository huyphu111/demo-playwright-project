import { test, expect } from "@fixtures/base.fixture";
import { Product, ipodTouchAvailable, ipodTouchOutOfStock } from "@data/products/productModel";
import { MESSAGES } from "@data/constants";

test.describe('Product Favorite Tests', () => {

    // TODO: beforeAll, clear all items in cart

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

    test("Verify that add to cart and buy now button is unavailable for out-of-stock product", async ({loggedInPage, productDetailsPage}) => {
        await loggedInPage.navigateToProductDetailsViaURL(ipodTouchOutOfStock.id.toString());
        await productDetailsPage.waitForProductTitles(ipodTouchOutOfStock.name);
        await expect(productDetailsPage.addToCartButton).not.toBeVisible();
        await expect(productDetailsPage.buyNowButton).not.toBeVisible();
    });

    test("Verify that add to cart and buy now button is available for in-stock product", async ({loggedInPage, productDetailsPage}) => {
        await loggedInPage.navigateToProductDetailsViaURL(ipodTouchAvailable.id.toString());
        await productDetailsPage.waitForProductTitles(ipodTouchAvailable.name);
        await expect(productDetailsPage.addToCartButton).toBeVisible();
        await expect(productDetailsPage.buyNowButton).toBeVisible();
    });

    test("Verify that user can add to cart a product", async ({loggedInPage, productDetailsPage}) => {
        await loggedInPage.navigateToProductDetailsViaURL(ipodTouchAvailable.id.toString());
        await productDetailsPage.waitForProductTitles(ipodTouchAvailable.name);
        await productDetailsPage.addToCart();
        let toastMessage = await productDetailsPage.getToastMessage();
        expect(toastMessage).toContain(MESSAGES.PRODUCT.ADD_TO_CART_SUCCESS(ipodTouchAvailable.name));
        await productDetailsPage.closeToast();
        
        await productDetailsPage.openCart();
        console.log(await productDetailsPage.getAllItemsInCart());

        const cartItems = await productDetailsPage.getAllItemsInCart();
        expect(cartItems).toStrictEqual([{
            name: ipodTouchAvailable.name,
            productCode: ipodTouchAvailable.productCode,
            quantity: 1
        }])
    });
});