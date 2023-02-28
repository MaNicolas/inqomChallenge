const { expect } = require('@playwright/test');

exports.AccountPageObject = class AccountPageObject {
    //Constructor
    constructor(page) {
        this.page = page;
        this.inputLocator = 'input[name=avatar]';
        this.uploadButton = page.getByRole('button', { name: 'Importer une image' });
        this.saveButton = page.getByTestId('account-edit-button-submit');
        this.sucessMessage1 = page.getByText('Mise à jour réussie !');
        this.sucessMessage2 = page.getByText('Vos informations personnelles ont bien été mises à jour.');
    }

    //Methods
    async uploadImage(filePath) {
        await this.page.setInputFiles(this.inputLocator, filePath);
    }

    async save() {
        await this.saveButton.click();
    }

    getUploadButton(){
        return this.uploadButton;
    }

    getSuccessMessage1(){
        return this.sucessMessage1;
    }

    getSuccessMessage2(){
        return this.sucessMessage2;
    }

}