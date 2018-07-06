
const Discord = require("discord.js");
const config = require(`../config.json`)
module.exports.run = async (client, message, args, config) => {

  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.MessageEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Guild Created at • ${day}.${month}.${year}`, config.avatar_url)
   .setColor(config.embed_color)
   .addField("Name", message.guild.name, true)
   .addField("Owner", `${message.guild.owner}`, true)
   .addField("Region", message.guild.region, true)
   .addField("Channels", message.guild.channels.size, true)
   .addField("Users", message.guild.memberCount, true)
   .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Online", online.size, true)
   .addField("Roles", message.guild.roles.size, true);
   message.channel.send(serverembed);



}
module.exports.help = {
  name: "guildinfo",
  category: "info"
}
