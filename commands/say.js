const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
if(args.join(" ").includes("@everyone") || args.join(" ").includes("@here")) return message.channel.send("You won't fool me in that...");
message.channel.send(args.join(" "));
message.delete()
}
module.exports.help = {
  name: "say",
  category: "fun"
}
