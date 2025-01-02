import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { page } from '../support/Hooks';
import HomePage from '../page_objects/HomePage';
import SearchResultPage from '../page_objects/SearchResultPage';

Given('Navigate to Bright Horizons home page', { timeout: 60 * 1000 }, async () =>{
    await HomePage.open();
    await page.click('button:has-text("Accept all")');
})

When('Click on search icon from top right corner', { timeout: 60 * 1000 }, async () =>{
    await HomePage.clickOnSearchIcon();
})

Then('Verify search field is visible on the page', { timeout: 60 * 1000 }, async () =>{
    assert.equal(await HomePage.verifySearchField(), true);
})

Then('Type {string} into the search field', { timeout: 60 * 1000 }, async (searchFieldValue) =>{
    await HomePage.typeValueInSearchField(searchFieldValue);
})

When('Click on the Search button', { timeout: 60 * 1000 }, async () =>{
    await HomePage.clickOnSearchButton();
})

When('Verify the first search result is {string}', { timeout: 60 * 1000 }, async (searchResult) =>{
    const result = await SearchResultPage.verifySearchResult();
    assert.strictEqual(result, searchResult);
})
