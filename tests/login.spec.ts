import { test, expect } from '@fixtures/base.fixture';
import { Account } from '@models/account.model';
import { accounts } from '@data/account.data';
import { MESSAGES } from 'const/constants';

let validAccount: Account = accounts.normalUser;
let invalidAccount: Account = accounts.invalidUser;

test.describe('Login tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // Resets state for this test

  test('Verify that user can login successfully with valid accounts', async ({ loginPage, myAccountPage }) => {
    await loginPage.goto();
    await loginPage.login(validAccount);

    await myAccountPage.waitForMyAccountSection();
    await expect(await myAccountPage.verifyMyAccountSectionDisplayed()).toBeTruthy();
  })

  test('Verify that user cannot login with invalid accounts', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(invalidAccount);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(MESSAGES.LOGIN.INVALID_LOGIN);
  });
});


