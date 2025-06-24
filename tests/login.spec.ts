import { test } from '@fixtures/base.fixture';
import { expect } from '@playwright/test';
import { Account } from '@data/accountModel';
import { JsonUtils } from '@utils/JsonUtils';
import { MESSAGES } from '@data/constants';


const accountsData = '../data/accounts.qa.json';
let account: Account;
let invalidAccount: Account;

test.beforeAll(async () => {
  const data = await JsonUtils.readJsonFile<{ accounts: Record<string, Account> }>(accountsData);
  account = data.accounts.normalUser;
  invalidAccount = data.accounts.invalidUser;
}); 

test('Verify that user can login successfully with valid accounts', async ({ loginPage, myAccountPage }) => {
  await loginPage.login(account.username, account.password);

  await myAccountPage.waitForMyAccountSection();
  await expect(await myAccountPage.verifyMyAccountSectionDisplayed()).toBeTruthy();
})

test('Verify that user cannot login with invalid accounts', async ({ loginPage }) => {
  await loginPage.login(invalidAccount.username, invalidAccount.password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(MESSAGES.LOGIN.INVALID_LOGIN);
});
