const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS", false, true, true))
      return message.reply("You don't have enough permissions!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Oznacz kogoś.");
    if (!member.bannable)
      return message.reply("I can't do that! Do I have enough permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason)
      return message.reply("Give me a reason!");

    await member.send("You've been banned on **" + message.guild.name + "**, because " + reason + ". You've been banned by " + message.author.tag + " (id: " + message.author.id + ").")
    .then(member.ban(7, reason))
      .catch(error => message.reply(`Sorry ${message.author} , i can't ban, because: ${error.code}`));
    const embed = {
  "title": "Banned!",
  "description": `${member.user.tag} (id: ${member.user.id}) has been banned by ${message.author.tag} (id: ${message.author.id}), because: ${reason}`,
  "color": 16750361,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/460153151073288202/e6fb8a855d1a0646bf790cfe3022e69a.png?size=2048",
    "text": "wexen"
  },
  "thumbnail": {
    "url": message.mentions.members.first().user.avatarURL
  }
};
message.channel.send({ embed });
}
module.exports.help = {
  name: "ban",
  category: "util"
}
