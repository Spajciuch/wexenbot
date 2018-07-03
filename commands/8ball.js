const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
var simple8ballOptions = require("@spyte-corp/simple-8ball-options")
let options = ["No", "Yes", "I don't know!", "Ask someone else!"]
message.channel.send(simple8ballOptions(options))
}
module.exports.help = {
  name: "8ball",
  category: "fun"
}
