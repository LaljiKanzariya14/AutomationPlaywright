import { Given, Then, When } from '@cucumber/cucumber';
import HomePage from '../page_objects/HomePage';
import FindACenterPage from '../page_objects/FindACenterPage';
import { test, expect } from "@playwright/test";
import { page } from '../support/Hooks';

When('Click on Find a Center option from top header', { timeout: 60 * 1000 }, async () =>{
    await HomePage.clickOnFindACenterOption();
})

Then('Verify that the newly opened page contains child-care-locator as a part of its URL',{ timeout: 60 * 1000 }, async () => {
    await expect(page).toHaveURL(/.*child-care-locator/);
})

When('Type {string} into search box and press Enter', async (locationName) =>{
    await FindACenterPage.typeValueInLocationField(locationName);
})

Then('verify if a number of found centers is the same as a number of centers displayed on the below list', { timeout: 60 * 1000 }, async () =>{
    await FindACenterPage.verifyCenterCount();
})

When('Click on the first center on the list', { timeout: 60 * 1000 }, async () =>{
    await FindACenterPage.clickOnFirstCenter();
})

Then('Verify if center name and address are the same on pop up', async () =>{
    await FindACenterPage.verifyCenterPopUpDetails();
})