import { getBrowserVersion } from "../support/Helper";
import { page } from "../support/Hooks";
import { AbstractPageObject } from "./AbstractPageObject";
import PropertiesReader from 'properties-reader';
const propertiesPath = './config/appConfig.properties';
const properties = PropertiesReader(propertiesPath)

class HomePage extends AbstractPageObject {

    protected pagetTitleLocator = "//p";
    protected searchFieldLocator = "//*[@id='subnav-search-desktop-top']//input[@id='search-field' and @placeholder='Type to Search']";

    constructor() {
        super(page);
    }

    open = async () => {
        const pageUrl = String(properties.get("BASE_URL"));
        properties.set("BROWSER_VERSION", getBrowserVersion())
        properties.save(propertiesPath);
        try {
            await page.goto(pageUrl, {
                timeout: 60 * 1000,
                waitUntil: 'load',
            })
        } catch (error) {
            console.error('Navigation error:', error);
        }
        return this;
    }

    clickOnSearchIcon = async () => {
        await page.locator('.nav-list-wrap .nav-link-search .icon-search').locator('nth=1').click();
    }

    clickOnFindACenterOption = async () => {
        await page.locator('.nav-list-wrap li.nav-item a.global_header_findcenter').locator('nth=3').click();
    }

    verifySearchField = async () => {
        await page.waitForSelector(this.searchFieldLocator, { timeout: 15000 })
        const field = await page.isVisible(this.searchFieldLocator);
        return field;
    }

    typeValueInSearchField = async (value: string) =>{
        await page.waitForSelector(this.searchFieldLocator, { timeout: 15000 })
        await page.fill(this.searchFieldLocator, value);
    }

    clickOnSearchButton = async () => {
        await page.locator('#subnav-search-desktop-top .js-nav-search-form button').click();
    }
}

export default new HomePage();