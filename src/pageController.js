// read page in browser
const pageScrapper = require('./pageScrapper')

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScrapper.scrapper(browser)
    } catch (err) {
        console.log(`error on resolve the browser instance`, err)
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)