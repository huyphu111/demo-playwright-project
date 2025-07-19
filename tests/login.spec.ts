import { test } from '@fixtures/base.fixture';
import { expect } from '@playwright/test';
import { Account, accounts } from '@data/accountModel';
import { MESSAGES } from '@data/constants';

let validAccount: Account = accounts.normalUser;
let invalidAccount: Account = accounts.invalidUser;

test('Verify that user can login successfully with valid accounts', async ({ loginPage, myAccountPage }) => {
  await loginPage.login(validAccount.username, validAccount.password);

  await myAccountPage.waitForMyAccountSection();
  await expect(await myAccountPage.verifyMyAccountSectionDisplayed()).toBeTruthy();
})

test('Verify that user cannot login with invalid accounts', async ({ loginPage }) => {
  await loginPage.login(invalidAccount.username, invalidAccount.password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(MESSAGES.LOGIN.INVALID_LOGIN);
});
