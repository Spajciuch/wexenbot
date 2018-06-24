const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
message.channel.send(args.join(" "));
}
module.exports.help = {
  name: "say",
  category: "fun"
}
