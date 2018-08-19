const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args, config) => {
var firebase = require('firebase')
await firebase.database().ref(`/ustawienia/${message.guild.id}/admin`).once('value')
.then(async admin => { if(admin.val() == false) return message.reply('Module is off.');
      if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You aren't permitted to do that");
    let toban = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!toban) return message.reply("Couldn't find user.");
    let bantime = args[1];
    if (!bantime) return message.reply("You didn't specify a time!");
    await (message.guild.members.ban(toban.id));
    message.reply(`<@${toban.id}> has been banned for ${ms(ms(bantime))}`);

    setTimeout(function() {
        message.guild.members.unban(toban.id)
        message.channel.send(`<@${tomute.id}> has been unbanned!`);
    }, ms(bantime));
                     })
}

exports.conf = {
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    name: "tempban",
    category: "util"
}
