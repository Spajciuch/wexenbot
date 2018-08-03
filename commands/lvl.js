const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
const database = firebase.database();
database.ref("/" + message.author.id + '/xp').once(value).then(xp => {
  message.reply(xp)
})
}
message.reply(lvl)
module.exports.help = {
  name: "lvl",
  category: "info"
}
