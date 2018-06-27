const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
var firebase = require('firebase')
await firebase.database().ref(`/ustawienia/${message.guild.id}/admin`).once('value')
.then(async admin => { if(admin.val() == false) return message.reply('Module is off.');
    if (!message.member.hasPermission("BAN_MEMBERS", false, true, true))
      return message.reply("<a:banhammer:460519287191240714> You don't have enough permissions!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("<a:banhammer:460519287191240714> You have to mention someone.");
    if (!member.bannable)
      return message.reply("<a:banhammer:460519287191240714> I can't do that! Do I have enough permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason)
      return message.reply("<a:banhammer:460519287191240714> Give me a reason!");

    await member.send("<a:banhammer:460519287191240714> You've been banned on **" + message.guild.name + "**, because " + reason + ". You've been banned by " + message.author.tag + " (id: " + message.author.id + ").")
    .then(member.ban(7, reason))
      .catch(error => message.reply(`<a:banhammer:460519287191240714> Sorry ${message.author} , i can't ban, because: ${error.code}`));
    const embed = {
  "title": "Banned!",
  "color": 16750361,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/460153151073288202/e6fb8a855d1a0646bf790cfe3022e69a.png?size=2048",
    "text": "wexen"
  },
  "thumbnail": {
    "url": message.mentions.members.first().user.avatarURL
  },
   "fields": [
      {
        "name": "Member",
        "value": member.user.tag
      },
      {
          "name":"Banned By",
          "value": message.author
      },
       {
           "name": "Reason",
           "value": reason
       }
message.channel.send({ embed });
                     })
}
module.exports.help = {
  name: "ban",
  category: "util"
}
