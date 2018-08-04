const Discord = require('discord.js')
const firebase = require('firebase')
module.exports.run = async (client, message, args, config) => {
const database = firebase.database();
database.ref("/" + message.author.id + '/xp').once("value").then(xp => {
  message.reply(xp.val() + ", Poziom: " + Math.floor(xp.val() / 400))
})
}
module.exports.help = {
  name: "lvl",
  category: "info"
}
