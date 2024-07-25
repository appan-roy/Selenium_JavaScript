const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it } = require('mocha');
const ltCap = require('../capabilities');

describe('Cross Browser Test', async function () {

    let driver;

    // configure lambdatest tunnel
    const username = ltCap.capabilities['LT:Options'].username;
    const access_key = ltCap.capabilities['LT:Options'].accessKey;
    const grid_host = 'hub.lambdatest.com/wd/hub';
    const grid_url = 'https://' + username + ':' + access_key + '@' + grid_host;

    // cross browser config
    browsers = [
        { browser: 'Chrome', browser_version: '125', os: 'Windows 11' },
        { browser: 'Firefox', browser_version: '124', os: 'Windows 10' },
        { browser: 'Edge', browser_version: '123', os: 'Windows 11' },
    ];

    browsers.forEach(({ browser, browser_version, os }) => {
        it(`Todo Test in ${browser} ${browser_version} - ${os}`, async function () {
            // set lambdatest config
            ltCap.capabilities.browserName = browser;
            ltCap.capabilities.browserVersion = browser_version;
            ltCap.capabilities['LT:Options'].platformName = os;
            ltCap.capabilities['LT:Options'].name = this.test.title;

            // launch the browser
            driver = await new Builder().usingServer(grid_url).withCapabilities(ltCap.capabilities).build();

            // maximize the browser
            await driver.manage().window().maximize();

            // implicit wait
            await driver.manage().setTimeouts({ implicit: 15000 });

            // navigate to the application
            await driver.get('https://lambdatest.github.io/sample-todo-app/');

            // enter a todo item
            await driver.findElement(By.id('sampletodotext')).sendKeys('Testing');
            await driver.findElement(By.id('addbutton')).click();

            // capture entered todo name
            const todoTxt = await driver.findElement(By.xpath('//li[last()]/span')).getText();

            // assertion
            assert.strictEqual(todoTxt, 'Testing', 'The todo item did not match');

            // quit driver
            await driver.quit();
        });
    });

});