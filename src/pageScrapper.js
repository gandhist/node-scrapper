// scraping the page
const fs = require('fs')
const path = require('path')
const tele = require('./teleg')

const scrapperObject = {
    url: "https://www.logammulia.com/id/harga-emas-hari-ini",
    async scrapper(browser) {
        let page = await browser.newPage();
        console.log(`navigating to url ${this.url}`)
        await page.goto(this.url)
        await page.waitForSelector('.chart-info')
        let urls = await page.$$eval('.ci-child', links => {
            links = links.map(el => {
                let title = (el.querySelector('.title').innerText).toLowerCase().replace(" ", "_")
                let value = el.querySelector('.text').innerText
                return {
                    [title]: value
                }
            })
            return links
        })
        let date = new Date();
        let updown = urls[1].perubahan.includes('-') ? `penurunan sebesar ${urls[1].perubahan}` : `kenaikan sebesar ${urls[1].perubahan}`;
        let message = `Harga emas pada hari ini ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} adalah ${urls[0].harga_terakhir}, terjadi ${updown}, so were building this with node js`;
        tele.sendNotif(message)

        // store data to db.json for our bot
        let data = JSON.stringify(urls)
        fs.writeFileSync(path.join(__dirname, '../db.json'), data)
        console.log('data')
        console.log(urls)
        await browser.close();
    }
}

module.exports = scrapperObject