import { test } from '@fixtures/base.fixture';
import { expect } from '@playwright/test';
import { JsonUtils } from '@utils/JsonUtils';
import { Product } from '@data/products/productModel';

let product : Product;
test.beforeAll(async () => {
    // Load product data from JSON file
    const productDataPath = '../data/products/product.json';
    const productsData = await JsonUtils.readJsonFile<{ products: Product[]}>(productDataPath);
    product = productsData[0]; // Assuming we want the first product for testing
});

test('Verify that user can search product by Product Name successfully from Home Page', async ({ homePage, productSearchResultPage }) => {
    await homePage.navigateToHomePage();
    await homePage.searchForProduct(product.name, null);

    await productSearchResultPage.waitForFilterSidebar();
    const productNames: string[] = await productSearchResultPage.getAllDisplayedProductsNames();
    productNames.forEach(name => {
        expect(name).toContain(product.name);
    });
})

test('Verify that user can search product by Product Name with Category successfully from Home Page', async ({ homePage, productSearchResultPage }) => {
    await homePage.navigateToHomePage();
    await homePage.searchForProduct(product.name, product.category);

    await productSearchResultPage.waitForFilterSidebar();
    const productNames: string[] = await productSearchResultPage.getAllDisplayedProductsNames();
    productNames.forEach(name => {
        expect(name).toContain(product.name);
    });
});