const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it } = require('mocha');
const ltCap = require('../capabilities');

describe('Todo MVC Test', async function () {

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

    it('Todo Test', async function () {
        // navigate to the application
        await driver.get('https://lambdatest.github.io/sample-todo-app/');

        // enter a todo item
        await driver.findElement(By.id('sampletodotext')).sendKeys('Testing');
        await driver.findElement(By.id('addbutton')).click();

        // capture entered todo name
        const todoTxt = await driver.findElement(By.xpath('//li[last()]/span')).getText();

        // assertion
        assert.strictEqual(todoTxt, 'Testing', 'The todo item did not match');
    });

});