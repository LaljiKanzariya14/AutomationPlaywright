import { chromium, Browser, Page, BrowserContext } from 'playwright';

import { setBrowserVersion } from '../support/Helper';

let browser: Browser;
let page: Page;
let context: BrowserContext;

// Set the browser instance
export function setBrowser(_browser: Browser) {
    browser = _browser;
}

// Get the browser instance
export function getBrowser(): Browser {
    return browser;
}

// Set the page instance
export function setPage(_page: Page) {
    page = _page;
}

// Get the page instance
export function getPage(): Page {
    return page;
}

export async function launchBrowser(headless: boolean = false): Promise<Page> {
    if (!browser) {
        browser = await chromium.launch({
            headless: headless,
            args: ['--incognito'],
        });
        context = await browser.newContext({
            permissions: ['notifications'],
            // viewport: { width: 1920, height: 1080 },
        });
    }
    if (!page) {
        page = await context.newPage();
    }

    const browserVersion: string = browser.version();
    setBrowserVersion(browserVersion)
    return page;
}

// Close the browser and page
export async function closeBrowser() {
    try {
        await page.close();
        await context.close();
        await browser.close();
        console.log('Browser closed successfully.');
    } catch (error) {
        console.error('Error closing browser:', error);
    }
}