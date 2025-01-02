import { assert } from "console";
import { getBrowserVersion } from "../support/Helper";
import { page } from "../support/Hooks";
import { AbstractPageObject } from "./AbstractPageObject";
import PropertiesReader from 'properties-reader';
import { equal, strictEqual } from "assert";
const propertiesPath = './config/appConfig.properties';
const properties = PropertiesReader(propertiesPath);
import { test, expect } from "@playwright/test";


class FindACenterPage extends AbstractPageObject {

    constructor() {
        super(page);
    }

    protected locationFieldLocator = ".filters-container input#addressInput";
    protected centerCountLocator = ".center-results-container .resultsNumber";
    protected centerListLocator = ".track_center_select";
    protected centerPopUpHeaderLocator = ".mapTooltip span.mapTooltip__headline";
    protected centerPopUpAddressLocator = ".mapTooltip div.mapTooltip__address";
    protected centerHeaderLocator = ".track_center_select .centerResult__name";
    protected centerAddressLocator = ".track_center_select .centerResult__address";


    typeValueInLocationField = async (value: string) =>{
        await page.waitForSelector(this.centerListLocator, { timeout: 15000 });
        await page.waitForSelector(this.locationFieldLocator, { timeout: 15000 });
        await page.fill(this.locationFieldLocator, value);
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
    }

    verifyCenterCount = async () =>{
        await page.waitForTimeout(3000);
        const getCenterCount = await page.locator(this.centerCountLocator).innerText();
        const getCenterListCount = await page.locator(this.centerListLocator).count();
        await equal(getCenterCount, getCenterListCount);
    }

    clickOnFirstCenter = async () => {
        await page.locator(this.centerListLocator).nth(0).click();
        await page.waitForSelector(this.centerPopUpHeaderLocator, {timeout : 15000});
    }

    verifyCenterPopUpDetails = async () => {
        const centerHeaderName = await page.locator(this.centerHeaderLocator).nth(0).innerText();
        const centerAddressName =await page.locator(this.centerAddressLocator).nth(0).innerText();
        const centerPopUpHeaderName = await page.locator(this.centerPopUpHeaderLocator).innerText();
        const centerPopUpAddressName =await page.locator(this.centerPopUpAddressLocator).innerText();
        let stringReplace = centerPopUpAddressName.replace(/\+/, '').replace(/\+/, '');
        let mergeAddress = stringReplace.replace(/\s+/g, ' ').trim();
        await equal(centerHeaderName, centerPopUpHeaderName);
        await equal(centerAddressName, mergeAddress);
    }

}

export default new FindACenterPage();
