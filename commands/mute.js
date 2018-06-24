const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
const member = message.mentions.members.first()
if(!member) return message.reply('You have to mention someone.');
const reason = args.slice(1).join(' ');
if(!reason) return message.reply('Give me a reason!');
return member.setMute(true, reason)
 .then(message.reply('Muted succesfully!'))
 .catch(error => message.reply("couldn't mute, because: " + error.message));
}
module.exports.help = {
  name: "mute",
  category: "util"
}
