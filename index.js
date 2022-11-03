//telegraf.js - v4.10.0, API de Telegram Bot
const { Telegraf } = require('telegraf');

//módulo nativo de Node, parainteractuar con los archivos del sistema
const fs = require('fs');
// Cliente HTTP basado en promesas para node
const axios = require('axios');
//discord.js - ^13.12.0, módulo de node que permite interactuar con la API de Discord
const { Client, Intents } = require('discord.js');

//Client es en parte cómo interactúa con la API de Discord y cómo le notificará eventos
//Llamamos los eventos que vamos a utilizar del Gateway Intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// Crea tu bot y agregamos el token de telegram
const bot = new Telegraf('5628688765:AAHFttOtzqagrImAxSoKLsZyKuAyeCuSXRA');
//creamos una promesa para provar el token Devuelve información básica sobre el bot
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});

//creamos un msg de informacion ayuda sobre el bot
const helpMsg =
  'Este es un bot de pruebas para crear un bot de telegram en java script con Node que pueda escucar y responder';

//cramos una funcion para descargar una imagen
const dowloadImage = (url, image_path, ctx) =>
  axios({ url, responseType: 'stream' }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => {
            ctx.reply('Almacenada Corectamente');
            resolve();
          })
          .on('error', (e) => {
            ctx.reply('No puedo almacenarla correctamente');
            reject(e);
          });
      })
  );

//creamos una funcion para generar un numero randon
function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

//creamos  un comando para realizar una respuesta programada del bot
bot.start((ctx) => {
  ctx.reply('hola');
});

//creamos un comando para imprimir el msg de ayuda instaciado en la linea 28
bot.help((ctx) => {
  ctx.reply(helpMsg);
});

//creamos un comando random para probar la comunicacion con el bot
bot.command('random', (ctx) => {
  console.log(ctx.update);
  ctx.reply(random(100).toString());
});

//creamos un comando advancerandom para provar validaciones le enviamos un
//parametro para que la funncion ramdon busque un numero del 1 al numero enviado
bot.command('advancerandom', (ctx) => {
  const message = ctx.update.message.text;
  const randomNumber = Number(message.split(' ')[1]);
  if (isNaN(randomNumber) || randomNumber <= 0) {
    ctx.reply(
      'profavor escribe /advancerandom seguido de un numero mayor de 0, por ejemplo: /advancerandom 10'
    );
  } else {
    ctx.reply(random(randomNumber).toString());
  }
  console.log(message);
});

bot.on('animation', (ctx) => {
  console.log('sfsdfs' + ctx.update.message.animation.file_id);
  let gitId = ctx.update.message.animation.file_id;

  ctx.telegram.getFileLink(gitId).then((response) => {
    console.log(response.href);
    let gitHref = response.href;
    const chanel = client.channels.cache.get('1034132109587136655');
    chanel.send(gitHref);
  });
});

//cremos una funcion para comunicar discord y telegram
client.on('ready', async (int) => {
  //creamos una funciaon para escuchar todo lo que ingrese como string
  bot.on('message', (ctx) => {
    //capturamos el nombre del usuario
    let nameUser = 'user:' + ctx.update.message.from.first_name + '#Bot\n';
    //cremos una constate para identificar a que canal de discord se enviara la data capturada
    const chanel = client.channels.cache.get('1034132109587136655');
    //imprimimos el nombre del usuario y el mensaje
    chanel.send(nameUser + ctx.update.message.text);
  });
});

bot.on('photo', (ctx) => {
  //console.log('hola desde  fuera', ctx.update.message.photo[1].file_id);
  let idfoto = ctx.update.message.photo[1].file_id;
  //capturamos el nombre del usuario
  let nameUser = 'user:' + ctx.update.message.from.first_name + '#Bot\n';
  ctx.telegram.getFileLink(idfoto).then((response) => {
    let photoHref = response.href;
    const chanel = client.channels.cache.get('1034132109587136655');
    chanel.send(nameUser + photoHref);
  });
});

bot.on('sticker', async (ctx) => {
  console.log(ctx.update.message.sticker);
  let nom = ctx.update.message.sticker.thumb.file_id;
  // ctx.reply(nom.file_unique_id);
  // console.log(JSON.stringify(nom));
  // let stickerId = await ctx.telegram
  //   .getCustomEmojiStickers([nom.file_unique_id])
  //   .then((s) => {
  //     //console.log(s);
  //   });
  //console.log(stickerId);
  

  ctx.telegram.getFileLink(nom).then(async (response) => {
    console.log(response.href);

    let stickerHref = response.href;
    const chanel = client.channels.cache.get('1034132109587136655');
    chanel.send(stickerHref);
  });
});

bot.on('voice', (ctx) => {
  //console.log(ctx.update.message.voice.file_id);
  let voiceID = ctx.update.message.voice.file_id;

  ctx.telegram.getFileLink(voiceID).then(async (response) => {
    console.log(response);

    let voiceHref = response.href;
    const chanel = client.channels.cache.get('1034132109587136655');
    chanel.send('audio:\n' + voiceHref);
  });
});

//--------------------*********************--------------------------------

//el método login en client para iniciar sesión en el bot de Discord que creó, usando el token en el archivo
client.login(
  'MTAzNTE5NDgyNDk2MzM5NTY0NA.GsTrN-.IcUdzjFiACRwo6_qyU_NfJhH5IOMS0JeHwLmCI'
);
//inicializamos el bot de telegram
bot.launch();