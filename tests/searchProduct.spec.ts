import { test, expect } from '@fixtures/base.fixture';
import { macbookPro } from '@data/products/product.data';

test('Verify that user can search product by Product Name successfully from Home Page', async ({ homePage, productSearchResultPage }) => {
    await homePage.goto();
    await homePage.searchProduct(macbookPro.name, null);

    await productSearchResultPage.waitForFilterSidebar();
    const productNames: string[] = await productSearchResultPage.getAllDisplayedProductsNames();
    productNames.forEach(name => {
        expect(name).toContain(macbookPro.name);
    });
})

test('Verify that user can search product by Product Name with Category successfully from Home Page', async ({ homePage, productSearchResultPage }) => {
    await homePage.goto();
    await homePage.searchProduct(macbookPro.name, macbookPro.category);

    await productSearchResultPage.waitForFilterSidebar();
    const productNames: string[] = await productSearchResultPage.getAllDisplayedProductsNames();
    productNames.forEach(name => {
        expect(name).toContain(macbookPro.name);
    });
});