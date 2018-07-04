const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
const sys = require('computer-info')
var guilds = client.guilds.size
var users = client.users.size
var channels = client.channels.size
const embed = {
  "title": "weXen info!",
  "description": "Here you can learn fancy info about bot!",
  "color": config.neoney_color,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/460153151073288202/e6fb8a855d1a0646bf790cfe3022e69a.png?size=2048",
    "text": "weXen"
  },
  "fields": [
    {
      "name": "My users:",
      "value": users
    },
    {
      "name": "I'm on that much guilds:",
      "value": guilds + "\nCheck them by `guilds` command!"
    },
    {
      "name": "And channels:",
      "value": channels
    },
    {
     "name": "PC info:",
      "value": "System: " + sys().osystem + "\nRAM:\n ● Full: " + sys().ram + "\n ● Free: " + sys().freeram
    }
  ]
};
message.channel.send({ embed })
}
module.exports.help = {
  name: "info",
  category: "info"
}
