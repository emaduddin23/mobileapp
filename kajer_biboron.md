# কাজের বিবরণী - অ্যান্ড্রয়েড লগইন অটোমেশন (Android Login Automation)

আমরা UAPP অ্যান্ড্রয়েড অ্যাপ্লিকেশনের স্বয়ংক্রিয় লগইন পরীক্ষা (Automated Login Test) সফলভাবে সম্পন্ন করেছি। নিচে আমরা কী কী কাজ করেছি তার একটি বিবরণ দেওয়া হলো:

## কী কী কাজ করা হয়েছে:

### ১. প্লেরাইট এবং এমুলেটর কানেকশন চেক করা (Playwright & Emulator Connection Verification)
- প্লেরাইট (Playwright) MCP সঠিকভাবে সংযুক্ত আছে কিনা তা পরীক্ষা করার জন্য ব্রাউজার ট্যাবগুলোর তালিকা চেক করা হয়।
- অ্যান্ড্রয়েড এমুলেটরটি (`emulator-5554`) সচল এবং সংযুক্ত রয়েছে কিনা তা `adb devices` কমান্ডের মাধ্যমে নিশ্চিত করা হয়।

### ২. APK সেটআপ (APK Setup)
- অ্যাপ্লিকেশন প্যাকেজটি (`app-release.apk`) ডাউনলোড ফোল্ডার থেকে প্রজেক্টের `app/app-release.apk` পাথে কপি করা হয়েছে যাতে এটি `wdio.conf.js` ফাইলের কনফিগারেশনের সাথে মিলে যায়।
- এমুলেটরে APK ফাইলটি ইনস্টল করে দেখা গেছে যে এর প্যাকেজ নাম হচ্ছে `uk.uapp.app` (UAPP)।

### ৩. ড্রাইভার এবং এনভায়রনমেন্ট কনফিগারেশন (Driver & Environment Configuration)
- Appium-এর জন্য প্রয়োজনীয় `uiautomator2` ড্রাইভারটি ইনস্টল করা হয়েছে।
- রানটাইমে সিগনেচার ভেরিফিকেশন ও রান নিশ্চিত করার জন্য প্রয়োজনীয় এনভায়রনমেন্ট ভেরিয়েবল যেমন— `ANDROID_HOME` (অ্যান্ড্রয়েড এসডিকে পাথ) এবং `JAVA_HOME` (অ্যান্ড্রয়েড স্টুডিওর এমবেডেড জেডিকে পাথ) কনফিগার করে দেওয়া হয়েছে।

### ৪. অনবোর্ডিং এবং ল্যান্ডিং স্ক্রিন হ্যান্ডেল করা (Onboarding & Landing Screen Handling)
- অ্যাপটি প্রথম চালু হওয়ার পর একটি অনবোর্ডিং স্ক্রিন দেখায়। সেখানে একটি স্ক্রিন-সাইজ নিরপেক্ষ সোয়াইপ/ড্র্যাগ জেসচার (`driver.performActions` ব্যবহার করে) যোগ করা হয়েছে যাতে বিমানের আইকন বিশিষ্ট স্লাইডারটি বাম থেকে ডানে টেনে অনবোর্ডিং পার করা যায়।
- এরপর ল্যান্ডিং পেজে এসে "Sign In" বাটনে ক্লিক করার লজিক দেওয়া হয়েছে।

### ৫. পেজ অবজেক্ট এবং টেস্ট স্ক্রিপ্ট আপডেট (Page Objects & Test Specs Update)
- **Login Folder ([login/](file:///Users/bluebayitlimited/Downloads/mobileapp/test/pageobjects/login/)):** এখানে লগইন পেজ অবজেক্টকে দুটি ফাইলে ভাগ করে একটি ফোল্ডারে রাখা হয়েছে:
  - **Login Locators ([login.locators.js](file:///Users/bluebayitlimited/Downloads/mobileapp/test/pageobjects/login/login.locators.js)):** এখানে সমস্ত এলিমেন্ট সিলেক্টর বা লোকেটর (যেমন— টেক্সট ইনপুট, সাবমিট বাটন) কনস্ট্রাক্টরের (`constructor(driver)`) মাধ্যমে ডিফাইন করা হয়েছে।
  - **Login Actions ([login.actions.js](file:///Users/bluebayitlimited/Downloads/mobileapp/test/pageobjects/login/login.actions.js)):** এখানে অনবোর্ডিং স্ক্রিন পার করা ও লগইন সম্পন্ন করার অ্যাকশন মেথডগুলো ইমপ্লিমেন্ট করা হয়েছে। এটি কনস্ট্রাক্টরের (`constructor(driver)`) মাধ্যমে `driver` কনটেক্সট গ্রহণ করে এবং `this.locator = new LoginLocators(driver)` ইনস্ট্যান্সিয়েট করে, যা প্লেরাইট (Playwright) অ্যাকশন পেজ প্যাটার্ন অনুসরণ করে।
- **Secure Page ([secure.page.js](file:///Users/bluebayitlimited/Downloads/mobileapp/test/pageobjects/secure.page.js)):** সফলভাবে লগইন হওয়ার পর স্ক্রিনে `"Welcome back"` এবং `"Majedul Islam"` টেক্সট সংবলিত ব্যানারটি আসছে কিনা তা কনস্ট্রাক্টরের মাধ্যমে চেক করার জন্য ভেরিফিকেশন এলিমেন্ট তৈরি করা হয়েছে।
- **Test Spec ([login.spec.js](file:///Users/bluebayitlimited/Downloads/mobileapp/test/specs/login.spec.js)):** টেস্ট রানটাইমে পেজ অবজেক্ট ক্লাসগুলোকে ইনস্ট্যান্সিয়েট (যেমন— `new LoginActions(driver)` ও `new SecurePage(driver)`) করে সফলভাবে লগইন অ্যাকশন ও ভেরিফিকেশন সম্পন্ন করার জন্য টেস্ট স্ক্রিপ্টটি সাজানো হয়েছে।

---

## টেস্ট রান ফলাফল (Test Execution Results)

অ্যান্ড্রয়েড এমুলেটরে নিচের কমান্ডটি চালিয়ে টেস্ট রান করা হয়েছে:
```bash
ANDROID_HOME=/Users/bluebayitlimited/Library/Android/sdk \
JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
PATH="/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin:$PATH" \
npx @wdio/cli run wdio.conf.js --spec ./test/specs/login.spec.js
```

### আউটপুট (Output):
```text
My Login application
   ✓ should login with valid credentials

Spec Files:	 1 passed, 1 total (100% completed) in 00:00:32
```
পরীক্ষাটি সম্পূর্ণ সফল হয়েছে এবং টেস্ট কেস পাস করেছে!
