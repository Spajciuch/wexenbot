
const Discord = require("discord.js");
const config = require(`../config.json`)
module.exports.run = async (client, message, args) => {

  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Serwer stworzony • ${day}.${month}.${year}`)
   .setColor(config.embed_color)
   .addField("Nazwa", message.guild.name, true)
   .addField("Właściciel", `${message.guild.owner}`, true)
   .addField("Region", message.guild.region.replace('eu-central', 'Europa Centralna'), true)
   .addField("Kanały", message.guild.channels.size, true)
   .addField("Użytkownicy", message.guild.memberCount, true)
   .addField("Ludzie", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Boty", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Online", online.size, true)
   .addField("Role", message.guild.roles.size, true);
   message.channel.send(serverembed);

/* let info  = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setThumbnail(message.guild.iconURL)
  .setTitle(`Informacje o serwerze ${message.guild.name}`)
  .addField("Właściciel", `${message.guild.owner}`, inline = true)
  .addField("Data założenia", `${message.guild.createdAt}`, inline = true)
  .addField("Podstawowe statystyki",`Userzy: ${message.guild.members.size}\nKanały: ${message.guild.channels.size}`, inline = true)
  .addField("Poziom zabezpieczeń", `${message.guild.verificationLevel}`, inline = true)
  .addField("Liczba ról", `${message.guild.roles.size}`, inline = true)
  .addField("Strefa",`${message.guild.region}`, inline = true)
  .addField("Dodano bota", `${message.guild.joinedAt}`)
  message.channel.send({embed: info});
}
module.exports.help = {
  name: "server.info"
}
=======
const Discord = require("discord.js");
const config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
 let info  = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setThumbnail(message.guild.iconURL)
  .setTitle(`Informacje o serwerze ${message.guild.name}`)
  .addField("Właściciel", `${message.guild.owner}`, inline = true)
  .addField("Data założenia", `${message.guild.createdAt}`, inline = true)
  .addField("Podstawowe statystyki",`Userzy: ${message.guild.members.size}\nKanały: ${message.guild.channels.size}`, inline = true)
  .addField("Poziom zabezpieczeń", `${message.guild.verificationLevel}`, inline = true)
  .addField("Liczba ról", `${message.guild.roles.size}`, inline = true)
  .addField("Strefa",`${message.guild.region}`, inline = true)
  .addField("Dodano bota", `${message.guild.joinedAt}`)
  message.channel.send({embed: info});*/

}
module.exports.help = {
  name: "server.info"
}
