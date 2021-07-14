const express = require('express');
const app = express()
const path = require('path')
const router = express.Router();

// scrape
const browserObject = require('./src/browser')
const scrapperController = require('./src/pageController')

// cron
const cron = require('node-cron')

// telegram bot
const tele = require('./src/teleg')



// index page
const port = process.env.PORT || 3000;
router.get('/', (req, res) => {
    // index html page
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router)
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// listen bot telegram
tele.raven()


// here i wanna sent notification every minutes to my bot channel
// you can define as you need
// node cron
cron.schedule('* * * * *', () => {
    console.log('this mean run every minutes')
    // launch browser instance
    let browserInstance = browserObject.startBrowser();
    scrapperController(browserInstance);
})


