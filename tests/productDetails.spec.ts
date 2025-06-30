import { test } from '@fixtures/base.fixture';
import { expect } from '@playwright/test';
import { JsonUtils } from '@utils/JsonUtils';
import { Product } from '@data/products/productModel';
import { getAvailabilityLabel } from 'helpers/productHelpers';

let product: Product;
let outOfStockProduct: Product;
test.beforeAll(async () => {
    // Load product data from JSON file
    const productDataPath = '../data/products/product.json';
    const productsData = await JsonUtils.readJsonFile<{ products: Product[] }>(productDataPath);
    product = productsData[1]; // Assuming we want the first product for testing
    outOfStockProduct = productsData[2]; // Assuming the first product is out of stock
});

test.describe('Product Details Page Tests', () => {
    test('Verify that user can view product details successfully (In stock product)', async ({ homePage, productDetailsPage }) => {
        // Navigate to the product search result page
        await homePage.navigateToProductDetails(product.id.toString());

        // Wait for the product details to load
        await productDetailsPage.waitForProductTiles(product.name);

        let productCode = await productDetailsPage.getProductCode();
        let productBrand = await productDetailsPage.getProductBrand();
        let productAvailability = await productDetailsPage.getProductAvailability();

        expect(productCode).toEqual(product.productCode);
        expect(productBrand).toEqual(product.brand);
        expect(productAvailability).toEqual(await getAvailabilityLabel(product.availability));
    });

    test('Verify that user can view product details successfully (Out of stock product)', async ({ homePage, productDetailsPage }) => {
        // Navigate to the product search result page
        await homePage.navigateToProductDetails(outOfStockProduct.id.toString());

        // Wait for the product details to load
        await productDetailsPage.waitForProductTiles(outOfStockProduct.name);

        let productCode = await productDetailsPage.getProductCode();
        let productBrand = await productDetailsPage.getProductBrand();
        let productAvailability = await productDetailsPage.getProductAvailability();

        expect(productCode).toEqual(outOfStockProduct.productCode);
        expect(productBrand).toEqual(outOfStockProduct.brand);
        expect(productAvailability).toEqual(await getAvailabilityLabel(outOfStockProduct.availability));
    });
});


