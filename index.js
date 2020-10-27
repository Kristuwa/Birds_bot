require('https').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
  res.end('')
});

process.env["NTBA_FIX_319"] = 1;
process.env['TELEGRAM_API_TOKEN'] = '1141579917:AAGoLMcdHD88bmYoSSqCdHjww3wYJWm0f-Y';
const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather

 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {polling: true});

bot.onText(/\/start/, function (msg) {
  
    let startMessage = 'Привіт! Вітаю на сервері сбору данних щодо пташиних гнізд на лініях електропередачі';
    let keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                  text: 'Завантажи гніздо',
              callback_data: 'load'
            }, {
                text: 'Перейти на сайт',
                url: 'https://skrypnykov.github.io/bird-nest/' //внешняя ссылка
              }
            ]
          ]
        } };
        bot.sendMessage(msg.chat.id, startMessage, keyboard);
    });

bot.on('callback_query', (query) => {
    let id = query.message.chat.id;
    switch (query.data) {
        case 'load':
            bot.sendMessage(id, 'Завантажте фото');
    }
});

 bot.on('photo', function (msg) {
     const oneMessage = 'Завантажте локацію, натиснув Location';
      const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'Location', request_location: true}],
              ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(msg.chat.id, oneMessage, opts);
});

bot.on('location', function (msg) {
  var loclat = msg.location.latitude;
  var loclong = msg.location.longitude;
  console.log(loclat);
  console.log(loclong);
  const twoMessage = 'Ваші координати: ' + loclat + ', ' + loclong + '. Додайте свій контактний телефон, натиснув на клавіатурі Contact ';
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Contact', request_contact: true }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(msg.chat.id, twoMessage, opts);
});

bot.on('contact', (msg) => {
  bot.sendMessage(msg.chat.id, 'Дякуємо за звернення! Щоб зареєструвати ще одне звернення натисніть /start');
});