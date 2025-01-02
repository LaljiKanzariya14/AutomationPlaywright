import { getBrowserVersion } from "../support/Helper";
import { page } from "../support/Hooks";
import { AbstractPageObject } from "./AbstractPageObject";
import PropertiesReader from 'properties-reader';
const propertiesPath = './config/appConfig.properties';
const properties = PropertiesReader(propertiesPath)

class SearchResultPage extends AbstractPageObject {

    protected searchResultLocator = ".search-result .title";

    constructor() {
        super(page);
    }

    verifySearchResult = async () => {
        await page.waitForSelector(this.searchResultLocator);
        const text = await page.locator(this.searchResultLocator).nth(0).textContent();
        return text;
    }
}

export default new SearchResultPage();