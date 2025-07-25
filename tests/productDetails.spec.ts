import { test, expect } from '@fixtures/base.fixture';
import { ipodTouchAvailable, ipodTouchOutOfStock } from '@data/products/productModel';
import { getAvailabilityLabel } from 'helpers/productHelpers';

test.describe('Product Details Page Tests', () => {
    test('Verify that user can view product details successfully (In stock product)', async ({ homePage, productDetailsPage }) => {
        // Navigate to the product search result page
        await homePage.navigateToProductDetailsViaURL(ipodTouchAvailable.id.toString());

        // Wait for the product details to load
        await productDetailsPage.waitForProductTitles(ipodTouchAvailable.name);

        let productCode = await productDetailsPage.getProductCode();
        let productBrand = await productDetailsPage.getProductBrand();
        let productAvailability = await productDetailsPage.getProductAvailability();

        expect(productCode).toEqual(ipodTouchAvailable.productCode);
        expect(productBrand).toEqual(ipodTouchAvailable.brand);
        expect(productAvailability).toEqual(await getAvailabilityLabel(ipodTouchAvailable.availability));
    });

    test('Verify that user can view product details successfully (Out of stock product)', async ({ homePage, productDetailsPage }) => {
        // Navigate to the product search result page
        await homePage.navigateToProductDetailsViaURL(ipodTouchOutOfStock.id.toString());

        // Wait for the product details to load
        await productDetailsPage.waitForProductTitles(ipodTouchOutOfStock.name);

        let productCode = await productDetailsPage.getProductCode();
        let productBrand = await productDetailsPage.getProductBrand();
        let productAvailability = await productDetailsPage.getProductAvailability();

        expect(productCode).toEqual(ipodTouchOutOfStock.productCode);
        expect(productBrand).toEqual(ipodTouchOutOfStock.brand);
        expect(productAvailability).toEqual(await getAvailabilityLabel(ipodTouchOutOfStock.availability));
    });
});


