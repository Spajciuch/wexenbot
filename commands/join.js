var Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
}
module.exports.help = {
  name: "join",
  category: "no"
}
