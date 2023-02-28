const { test, expect } = require('@playwright/test');
import { loginPageObject } from '../pages/LoginPageObject';
import { HeaderPageObject } from '../pages/HeaderPageObject';
import { AccountPageObject } from '../pages/AccountPageObject';

test.beforeEach(async ({ page, baseURL }) => {
    //Visit page
    await page.goto('/fr/signin');
    await page.waitForURL(baseURL + '/fr/signin');
    await expect(page).toHaveTitle('Welcome to the Jungle - Le guide de l\'emploi');
})

test('login and upload test', async function ({ page, browserName, baseURL }) {
    //Fill email and password, then click on "Se connecter"
    const loginPage = new loginPageObject(page);
    loginPage.login('inqom.qaautomationapplicant@gmail.com', 'o5N,d5ZR@R7^');

    //Go to account page
    const headerPage = new HeaderPageObject(page, baseURL);
    headerPage.goToAccountPage();

    //Upload a photo
    const AccountPage = new AccountPageObject(page);
    AccountPage.uploadImage('./tests/fixtures/tree.jpg');

    //Wait for response
    /* if (browserName == 'Chromium') {
        const response = await page.waitForResponse(resp => resp.url().includes('blob') && resp.status() === 200);
        expect(response.status()).toEqual(200);
        expect(response.url()).toContain('blob');
        expect(response.ok()).toBeTruthy();
    } */

    //Click on Save
    await AccountPage.save();

    //Assertions
    await expect(AccountPage.getUploadButton()).not.toBeVisible();
    await expect(AccountPage.getSuccessMessage1()).toBeVisible();
    await expect(AccountPage.getSuccessMessage2()).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.3 });
})