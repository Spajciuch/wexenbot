const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
message.reply("It's in build.")
var simple8ballOptions = require("@spyte-corp/simple-8ball-options")
let options = ["No", "Yes", "I don't know!", "Ask someone else!"]
console.log(simple8ballOptions(options))
}
module.exports.help = {
  name: "8ball",
  category: "fun"
}
