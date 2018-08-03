const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
const database = firebase.database();
const lvl = await database.ref("/" + message.author.id + '/xp').once(value.val())
}
message.reply(lvl)
module.exports.help = {
  name: "invite",
  category: "info"
}
