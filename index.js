const token = '1141579917:AAGoLMcdHD88bmYoSSqCdHjww3wYJWm0f-Y';
const TelegramBot = require('node-telegram-bot-api');
 
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function (msg) {
  
    let startMessage = `Привіт, ${msg.from.first_name} ! Вітаю на сервері сбору данних щодо пташиних гнізд на лініях електропередачі`;
    let keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                  text: 'Завантажити гніздо',
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
     const oneMessage = 'Завантажте локацію, натиснув Геолокація';
      const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'Геолокація', request_location: true}],
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
  const twoMessage = 'Ваші координати: ' + loclat + ', ' + loclong + '. Додайте свій контактний телефон, натиснув на клавіатурі Передати контакт ';
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Передати контакт', request_contact: true }],
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
