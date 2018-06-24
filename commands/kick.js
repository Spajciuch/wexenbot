const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS", false, true, true))
      return message.reply("You don't have enough permissions!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("You have to mention someone.");
    if (!member.kickable)
      return message.reply("I can't do that! Do I have enough permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason)
      return message.reply("Give me a reason!");

member.send("You've been kicked from **" + message.guild.name + "**, because " + reason + ". You've been kicked by " + message.author.tag + " (id: " + message.author.id + ").")
    .then(member.kick(reason))
      .catch(error => message.channel.send(`Sorry ${message.author} , i couldn't notify him/her, because: ${error.message}`));
    const embed = {
  "title": "Kicked!",
  "description": `${member.user.tag} (id: ${member.user.id}) has been kicked by ${message.author.tag} (id: ${message.author.id}), because: ${reason}`,
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
  name: "kick",
  category: "util"
}
