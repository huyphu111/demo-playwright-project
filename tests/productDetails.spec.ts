import { test } from '@fixtures/base.fixture';
import { expect } from '@playwright/test';
import { JsonUtils } from '@utils/JsonUtils';
import { Product } from '@data/products/productModel';

let product : Product;
test.beforeAll(async () => {
    // Load product data from JSON file
    const productDataPath = '../data/products/product.json';
    const productsData = await JsonUtils.readJsonFile<{ products: Product[]}>(productDataPath);
    product = productsData[1]; // Assuming we want the first product for testing
});


test('Verify that user can view product details successfully', async ({ homePage, productSearchResultPage }) => {
    // Navigate to the product search result page
    await homePage.navigateToHomePage();
    await homePage.searchForProduct(product.name, null);
});