const { expect } = require('@wdio/globals')
const LoginActions = require('../pageobjects/login/login.actions')
const SecurePage = require('../pageobjects/secure.page')
const credentials = require('../data/credentials.json')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        try {
            // Instantiate the LoginActions class using the runtime driver context
            const loginActions = new LoginActions(driver)
            
            // Perform login using credentials loaded from JSON file
            const { username, password } = credentials.validUser
            await loginActions.login(username, password)
            
            // Instantiate the SecurePage locators inside the test using the runtime driver context
            const securePage = new SecurePage(driver)
            
            // Assertions to verify welcome header is visible
            await expect(securePage.welcomeMessage).toBeExisting()
            await expect(securePage.welcomeName).toBeExisting()
            
            // Pause to ensure we can view/capture state if needed
            await driver.pause(5000)
        } catch (error) {
            console.error("Test failed, capturing error screenshot...");
            const screenshotPath = '/Users/bluebayitlimited/.gemini/antigravity-ide/brain/f8dd2054-7135-4d7e-b264-efaafe2639dc/login_fail.png';
            await driver.saveScreenshot(screenshotPath);
            console.log(`Screenshot saved to: ${screenshotPath}`);
            throw error;
        }
    })
})
