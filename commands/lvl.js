const Discord = require('discord.js')
const firebase = require('firebase')
module.exports.run = async (client, message, args, config) => {
const database = firebase.database();
database.ref("/" + message.author.id + '/xp').once("value").then(xp => {
  message.reply(xp.val() + ", Level: " + Math.floor(xp.val() / 400) + ". You need " + (((Math.floor(xp.val() / 400) + 1) * 400) - xp.val()) + " xp to reach level " + (Math.floor(xp.val() / 400) + 1) )
})
}
module.exports.help = {
  name: "lvl",
  category: "info"
}
