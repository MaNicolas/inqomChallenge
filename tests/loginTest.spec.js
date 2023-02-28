const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page, baseURL }) => {

    //Visit page
    await page.goto('/fr/signin');
    await page.waitForURL(baseURL + '/fr/signin');
    await expect(page).toHaveTitle('Welcome to the Jungle - Le guide de l\'emploi');
})

test('login and upload test', async function ({ page, browserName }) {

    //Fill email and password
    await page.getByTestId('login-field-email').fill('inqom.qaautomationapplicant@gmail.com');
    await page.getByTestId('login-field-password').fill('o5N,d5ZR@R7^');

    //Click on "Se connecter"
    await page.getByTestId('login-button-submit').click();
    await page.waitForURL('https://www.welcometothejungle.com/fr/');

    //Go to account page
    await page.getByTestId('header-user-links-toggle').click();
    await page.locator('//a[@data-testid=\'header-user-link-account\' and @type=\'button\']').click();
    await page.waitForURL('https://www.welcometothejungle.com/fr/me/settings/account');

    //Upload a photo
    const uploadButton = page.getByRole('button', { name: 'Importer une image' });
    await page.setInputFiles('input[name=avatar]', './tests/fixtures/tree.jpg');

    //Wait for response
    if (browserName != 'firefox') {
        const response = await page.waitForResponse(resp => resp.url().includes('blob') && resp.status() === 200);
        expect(response.status()).toEqual(200);
        expect(response.url()).toContain('blob');
        expect(response.ok()).toBeTruthy();
    }

    //Assertions
    await expect(uploadButton).not.toBeVisible();
    await expect(page).toHaveScreenshot({ timeout: 5000 });

    //Click on Save
})