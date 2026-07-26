# mobileapp

Android mobile test automation project built with [WebdriverIO](https://webdriver.io/) and [Appium](https://appium.io/), using the Page Object pattern.

## Status / what's been done

- Scaffolded a WebdriverIO + Appium project (`@wdio/cli`, `@wdio/appium-service`, `@wdio/local-runner`, `@wdio/mocha-framework`, `appium-uiautomator2-driver`, `@wdio/visual-service`).
- Configured `wdio.conf.js` to run against an Android emulator (`sdk_gphone16k_x86_64`) via Appium's `UiAutomator2` automation engine, with `autoGrantPermissions` enabled.
- Added an `app/` folder to hold the APK under test (`app/app-release.apk`, referenced by the `appium:app` capability). The APK itself is **not** committed to the repo — see [Notes](#notes).
- Added Page Object classes for a login flow:
  - [test/pageobjects/page.js](test/pageobjects/page.js) — base page class.
  - [test/pageobjects/login.page.js](test/pageobjects/login.page.js) — login form selectors/actions.
  - [test/pageobjects/secure.page.js](test/pageobjects/secure.page.js) — post-login secure-area selectors.
- Added a starter spec at [test/specs/test.e2e.js](test/specs/test.e2e.js). It currently just launches the app and pauses; the full login test (fill credentials, submit, assert secure-area flash message) is scaffolded but commented out pending real app selectors.

## Project structure

```
mobileapp/
├── app/                     # APK(s) under test (not committed)
├── test/
│   ├── pageobjects/
│   │   ├── page.js
│   │   ├── login.page.js
│   │   └── secure.page.js
│   └── specs/
│       └── test.e2e.js
├── wdio.conf.js             # WebdriverIO / Appium configuration
└── package.json
```

## Prerequisites

- Node.js and npm
- Android SDK + emulator (or a connected device) matching the `appium:deviceName` capability in `wdio.conf.js`
- Appium (installed as a WebdriverIO service via `@wdio/appium-service`)
- The APK to test placed at `app/app-release.apk` (update the `appium:app` path in `wdio.conf.js` if you use a different name/location)

## Setup

```bash
npm install
```

## Running tests

```bash
npm run wdio
```

## Notes

- The APK file is intentionally excluded from version control (see `.gitignore`) due to its size and because it's a build artifact, not source. Place your own build at `app/app-release.apk` (or update `wdio.conf.js` to point elsewhere) before running tests.
