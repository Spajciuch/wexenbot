const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
message.reply("It's in build.")
const eightball = require('@spyte-corp/simple-8ball-options')
const options = ["Yes", "No", "I don't know!", "Ask Spyte!", "Ask neoney!", "Maybe", "It's possible!"]
message.reply(eightball(options))
}
module.exports.help = {
  name: "8ball",
  category: "fun"
}
