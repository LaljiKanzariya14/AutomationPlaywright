import { After, AfterAll, BeforeAll, Status } from '@cucumber/cucumber';
import { launchBrowser, closeBrowser, setPage } from '../Utils/BrowserManager';

import { Page } from 'playwright';

let page: Page;

BeforeAll(async function () {
    page = await launchBrowser()
    setPage(page)
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await page.screenshot();
        this.attach(screenshot, 'image/png');
    }
});

AfterAll(async function () {
    try {
        await closeBrowser();
    } catch (error) {
        console.error('Error during report browser closing:', error);
    }
});

export { page };