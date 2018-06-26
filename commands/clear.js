const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
var firebase = require('firebase')
await firebase.database().ref(`/ustawienia/${message.guild.id}/admin`).once('value')
.then(async admin => { if(admin.val() == false) return message.reply('Module is off.');
if(message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You aren\'t permitted to do this!');
const deleteCount = args[0]
if (!deleteCount || deleteCount < 2 || deleteCount > 100 || isNaN(deleteCount))
return message.reply("Choose a number from 2 to 100.");
message.channel.bulkDelete(args[0])
.catch(error => message.reply('sorry, but couldn\'t delete: ' + error.message));
message.channel.send('Cleared `' + args[0] + '` messages.')
  .them(message => message.delete(5000));
})
}
module.exports.help = {
  name: "clear",
  category: "util"
}
