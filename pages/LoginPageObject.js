exports.loginPageObject = class LoginPageObject {
    //Constructor
    constructor(page) {
        this.page = page;
        this.usernameLocator = page.getByTestId('login-field-email');
        this.passwordLocator = page.getByTestId('login-field-password');
        this.loginButton = page.getByTestId('login-button-submit');
    }

    //Methods
    async login(username, password) {
        await this.usernameLocator.fill(username);
        await this.passwordLocator.fill(password);
        await this.loginButton.click();
    }
}