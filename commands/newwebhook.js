const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
 let argi = args.join(" ").split(" | ")
message.channel.createWebhook(argi[0], argi[1])
}
module.exports.help = {
  name: "newwebhook",
  category: "util"
}