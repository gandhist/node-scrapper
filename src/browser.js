// for launching browser

const puppeteer = require('puppeteer')

async function startBrowser() {
    let browser;
    try {
        console.log('starting the browser')
        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sanbox"],
            ignoreHTTPSErrors: true
        })
    } catch (err) {
        console.log('error launching browser => ', err)
    }
    return browser;
}

module.exports = { startBrowser }