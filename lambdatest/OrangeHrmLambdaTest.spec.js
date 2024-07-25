const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it } = require('mocha');
const ltCap = require('../capabilities');

describe('OrangeHRM Test', async function () {

    let driver;

    // configure lambdatest tunnel
    const username = ltCap.capabilities['LT:Options'].username;
    const access_key = ltCap.capabilities['LT:Options'].accessKey;
    const grid_host = 'hub.lambdatest.com/wd/hub';
    const grid_url = 'https://' + username + ':' + access_key + '@' + grid_host;

    beforeEach(async function () {
        // set current test name
        ltCap.capabilities['LT:Options'].name = this.currentTest.title;

        // launch the browser
        driver = await new Builder().usingServer(grid_url).withCapabilities(ltCap.capabilities).build();

        // maximize the browser
        await driver.manage().window().maximize();

        // implicit wait
        await driver.manage().setTimeouts({ implicit: 15000 });
    });

    afterEach(async function () {
        // quit driver
        await driver.quit();
    });

    it('Login Test', async function () {
        // navigate to the application
        await driver.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // login to the application
        await driver.findElement(By.name('username')).sendKeys('Admin');
        await driver.findElement(By.name('password')).sendKeys('admin123');
        await driver.findElement(By.xpath('//button')).click();

        // capture dashboard tab name
        const dashboardTxt = await driver.findElement(By.xpath('//h6')).getText();

        // assertion
        assert.strictEqual(dashboardTxt, 'Dashboard', 'The dashboard tab name did not match');
    });

});