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
      reason = "Not specified reason"

    await member.send("<a:banhammer:460519287191240714> You've been banned on **" + message.guild.name + "**, because " + reason + ". You've been banned by " + message.author.tag + " (id: " + message.author.id + ").")
    .then(member.ban(7, reason))
      .catch(error => message.reply(`<a:banhammer:460519287191240714> Sorry ${message.author} , i can't ban, because: ${error.code}`));
   let embed = new Discord.RichEmbed()
   .setTitle("Banned!")
   .setColor(config.embed_color)
   .addField("Member", member)
   .addField("Banned By",message.author)
   .addField("Reason",reason)
   message.channel.send({embed})
})
}
module.exports.help = {
  name: "ban",
  category: "util"
}
