const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage {
    constructor(driver) {
        this.driver = driver;
        this.welcomeMessage = driver.$('android=new UiSelector().descriptionContains("Welcome back")');
        this.welcomeName    = driver.$('android=new UiSelector().descriptionContains("Majedul Islam")');
    }
}

module.exports = SecurePage;



