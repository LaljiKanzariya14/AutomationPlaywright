import { Given, Then, When } from '@cucumber/cucumber';
import CustomersPage from '../page_objects/customersPage';
import assert from 'assert';
import { page } from '../support/Hooks';

Given('the user is on the page', { timeout: 60 * 1000 }, async () => {
    await CustomersPage.open();
});

When("Page title should be", { timeout: 60 * 1000 }, async () => {
    const messageText = await CustomersPage.getPageTitle();
    assert.strictEqual(messageText, "Welcome to google search page");
    await page.waitForTimeout(15000)
})
