const Page = require('../page');
const LoginLocators = require('./login.locators');

/**
 * sub page containing action methods for the Login flow
 */
class LoginActions extends Page {
    constructor(driver) {
        super();
        this.driver = driver;
        this.locator = new LoginLocators(driver);
    }

    /**
     * Handles onboarding slide gesture and landing screen if present
     */
    async handleOnboarding () {
        // 1. Onboarding screen (slide-to-unlock gesture)
        if (await this.locator.getStartedText.isExisting() && await this.locator.getStartedText.isDisplayed()) {
            console.log("👉 Onboarding screen detected. Performing slide-to-unlock gesture...");
            
            const size = await this.driver.getWindowRect();
            const y = Math.round(size.height * 0.90);      // ~2160px on 2400px height
            const startX = Math.round(size.width * 0.53);   // ~575px on 1080px width (airplane pill center)
            const endX = Math.round(size.width * 0.88);     // ~950px on 1080px width (track end)
            
            await this.driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 300, x: endX, y: y },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await this.driver.releaseActions();
            console.log("👉 Onboarding slide completed. Waiting for transition...");
            await this.driver.pause(2000); // Wait for transition
        }

        // 2. Landing screen (click Sign In)
        try {
            console.log("👉 Checking for landing screen 'Sign In' button...");
            // Wait up to 5 seconds for Sign In button to show up after the onboarding slide
            await this.locator.btnSignIn.waitForDisplayed({ timeout: 5000 });
            console.log("👉 Landing screen detected. Clicking 'Sign In' button...");
            await this.locator.btnSignIn.click();
            console.log("👉 Clicked 'Sign In' successfully. Waiting for login page to load...");
            await this.driver.pause(2000); // Wait for transition
        } catch (e) {
            console.log("👉 'Sign In' button not displayed, skipping landing screen step.");
        }
    }

    /**
     * Action to log in using username and password
     */
    async login (username, password) {
        // Clear onboarding/landing flows first
        await this.handleOnboarding();

        // Wait for the login screen to be visible
        console.log("👉 Waiting for Login page submit button to be visible...");
        await this.locator.btnSubmit.waitForDisplayed({ timeout: 15000 });
        console.log("👉 Login page loaded successfully.");

        // Direct user-like typing inputs on the fields with explicit clicks and pauses
        console.log("👉 Clicking on Username field...");
        await this.locator.inputUsername.click();
        await this.driver.pause(1000);
        console.log(`👉 Typing username: "${username}"...`);
        await this.locator.inputUsername.setValue(username);
        await this.driver.pause(1000);
        
        console.log("👉 Clicking on Password field...");
        await this.locator.inputPassword.click();
        await this.driver.pause(1000);
        console.log("👉 Typing password...");
        await this.locator.inputPassword.setValue(password);
        await this.driver.pause(1000);

        // Hide keyboard if it is active to ensure the submit button is clickable and visible
        try {
            console.log("👉 Hiding the keyboard...");
            await this.driver.hideKeyboard();
            await this.driver.pause(1000);
        } catch (err) {
            console.log("👉 Keyboard hide skipped (already hidden or unsupported):", err.message);
        }

        // Click Log In
        console.log("👉 Clicking 'Log In' submit button...");
        await this.locator.btnSubmit.click();
        console.log("👉 Submit clicked. Waiting 5 seconds for navigation/API response...");
        await this.driver.pause(5000); // Wait for API response/navigation to start
    }
}

module.exports = LoginActions;
