const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it } = require('mocha');

describe('Todo MVC Test', () => {

    it('Todo Test', async () => {
        // launch the browser
        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        // maximize the browser
        driver.manage().window().maximize();

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
        driver.quit();
    });

});