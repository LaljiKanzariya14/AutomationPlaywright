import { getBrowserVersion } from "../support/Helper";
import { page } from "../support/Hooks";
import { AbstractPageObject } from "./AbstractPageObject";
import PropertiesReader from 'properties-reader';
const propertiesPath = './config/appConfig.properties';
const properties = PropertiesReader(propertiesPath)

class CustomersPage extends AbstractPageObject {

    protected pagetTitleLocator = "//p";

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

    getPageTitle = async () => {
        await page.waitForSelector(this.pagetTitleLocator, { timeout: 15000 })
        const text = await page.textContent(this.pagetTitleLocator);
        return text;
    }

}

export default new CustomersPage();