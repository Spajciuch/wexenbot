const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
message.author.send('https://discordapp.com/oauth2/authorize?&client_id=460153151073288202&scope=bot&permissions=8')
message.reply("Check DMs!")
.then(message => message.delete(5000));
}
module.exports.help = {
  name: "invite",
  category: "info"
}
