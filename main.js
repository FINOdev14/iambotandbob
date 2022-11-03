//const Discord = require('discord.js');
//const client = new Discord.Client({ intents: 32767 });
const { Client, Intents } = require('discord.js');

//const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers] });

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on('ready', (int) => {
  console.log('ready');
  const chanel = client.channels.cache.get('1034132109587136655');
  chanel.send('fffff');
  // client.application.commands.set([
  //   {
  //     name: 'tom',
  //     description: 'Llamar a Tom!!',
  //     options: [],
  //   },
  // ]);
});

// client.on('interactionCreate', (int) => {
//   console.log('hola' + int);
//   if (int.isCommand() && int.commandName == 'tom') {
//     int.reply('Hola');
//   }
// });

// client.on('ready', async (interaction) => {
//   console.log("fdsgdsf"+JSON.stringify(interaction));

//   if (interaction.commandId == 'tom') {
//     await interaction.reply('Pong!');
//   }
// });

// client.on('messageCreate', (message) => {
//   console.log(message.content);

// });

client.login(
  'MTAzNTE5NDgyNDk2MzM5NTY0NA.GsTrN-.IcUdzjFiACRwo6_qyU_NfJhH5IOMS0JeHwLmCI'
);
