import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login';
import { HomePage } from '@pages/home';
import { MyAccountPage } from '@pages/myAccount';
import { ProductSearchResultPage } from '@pages/productSearchResult';
import { ProductDetailsPage } from '@pages/productDetails.page';

type BaseFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  myAccountPage: MyAccountPage;
  productSearchResultPage: ProductSearchResultPage;
  productDetailsPage: ProductDetailsPage;
}

export const test = base.extend<BaseFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage);
  },
  productSearchResultPage: async ({ page }, use) => {
    const productSearchResultPage = new ProductSearchResultPage(page);
    await use(productSearchResultPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },
});