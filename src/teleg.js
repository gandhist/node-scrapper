const TelegramBot = require('node-telegram-bot-api')
const https = require('https')

// get your own telegram bot token from botfather
const token = ''; // your bot telegram token
const chatid = '' // your chat id, you can get it on line 34
const fs = require('fs')
const path = require('path')

// create bot use pooling 
const bot = new TelegramBot(token, { polling: true })

const raven = () => {

    bot.onText(/\/cek/, (msg) => {
        console.log('msg', msg)
        let urls = [];
        const chatId = msg.chat.id;
        fs.readFile(path.join(__dirname, '../db.json'), (err, data) => {
            console.log('err', err)
            console.log('data', data)
            if (err) throw err
            let a = JSON.parse(data)
            urls = a;
            let message = `harga emas hari ini adalah ${urls[0].harga_terakhir}`

            // send message
            bot.sendMessage(chatId, message)
        })
    })

    bot.onText(/\/naikatauturun/, (msg) => {
        let urls = [];
        const chatId = msg.chat.id;
        fs.readFile(path.join(__dirname, '../db.json'), (err, data) => {
            if (err) throw err;
            let student = JSON.parse(data);
            urls = student;
            let harga = urls[1].perubahan.includes('-') ? `Turun ${urls[1].perubahan}` : `Naik ${urls[1].perubahan}`;
            // send a message to the chat acknowledging receipt of their message
            bot.sendMessage(chatId, `${harga} dari harga sebelumnya.`);
        });

    });
}

const sendNotif = (msg) => {
    const target = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&text=${msg}`
    https.get(target, (res) => {
        console.log('notif telegram sent')
    })
}

module.exports = { raven, sendNotif }