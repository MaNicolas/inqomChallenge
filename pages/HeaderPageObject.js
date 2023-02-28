exports.HeaderPageObject = class HeaderPageObject {
    //Constructor
    constructor(page, baseURL) {
        this.page = page;
        this.baseURL = baseURL;
        this.dropdownMenu = page.getByTestId('header-user-links-toggle');
        this.accountLocator = page.locator('//a[@data-testid=\'header-user-link-account\' and @type=\'button\']');
    }

    //Methods
    async goToAccountPage() {
        await this.dropdownMenu.click();
        await this.accountLocator.click();
        await this.page.waitForURL(this.baseURL + '/fr/me/settings/account');
    }
}