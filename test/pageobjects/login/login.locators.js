const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing only the selectors/locators for the Login flow
 */
class LoginLocators {
    constructor(driver) {
        this.driver = driver;
        this.getStartedText = driver.$('~Get Started');
        this.btnSignIn      = driver.$('~Sign In');
        this.inputUsername  = driver.$('//android.widget.EditText[@password="false"]');
        this.inputPassword  = driver.$('//android.widget.EditText[@password="true"]');
        this.btnSubmit      = driver.$('~Log In');
        this.btnAutoFill    = driver.$('~Auto-fill test credentials');
    }

    /**
     * selector for the quick-login selection buttons
     */
    quickLoginButton (username) {
        return this.driver.$(`android=new UiSelector().descriptionContains("${username}")`);
    }
}

module.exports = LoginLocators;


