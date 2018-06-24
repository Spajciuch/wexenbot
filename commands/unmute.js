const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
const member = message.mentions.members.first()
if(!member) return message.reply('You have to mention someone.');
return member.setMute(false)
 .then(message.reply('unmuted succesfully!'))
 .catch(error => message.reply("couldn't unmute, because: " + error.message));
}
module.exports.help = {
  name: "unmute",
  category: "util"
}
