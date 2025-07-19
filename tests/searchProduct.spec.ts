import { test } from '@fixtures/base.fixture';
import { expect } from '@playwright/test';
import { macbookPro } from '@data/products/productModel';

test('Verify that user can search product by Product Name successfully from Home Page', async ({ homePage, productSearchResultPage }) => {
    await homePage.navigateToHomePage();
    await homePage.searchForProduct(macbookPro.name, null);

    await productSearchResultPage.waitForFilterSidebar();
    const productNames: string[] = await productSearchResultPage.getAllDisplayedProductsNames();
    productNames.forEach(name => {
        expect(name).toContain(macbookPro.name);
    });
})

test('Verify that user can search product by Product Name with Category successfully from Home Page', async ({ homePage, productSearchResultPage }) => {
    await homePage.navigateToHomePage();
    await homePage.searchForProduct(macbookPro.name, macbookPro.category);

    await productSearchResultPage.waitForFilterSidebar();
    const productNames: string[] = await productSearchResultPage.getAllDisplayedProductsNames();
    productNames.forEach(name => {
        expect(name).toContain(macbookPro.name);
    });
});