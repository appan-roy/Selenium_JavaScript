const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const ltCap = require('../capabilities');

async function debug() {
    // launch the browser
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    // maximize the browser
    driver.manage().window().maximize();

    // implicit wait
    await driver.manage().setTimeouts({ implicit: 15000 });

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

    // quit driver
    driver.quit();
}

// run test
debug();