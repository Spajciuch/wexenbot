const Discord = require('discord.js');
const moment = require("moment");

module.exports.run = async (client, message, args, config) => {
	let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);

    const embed = new Discord.RichEmbed()
		.setColor(config.embed_color)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("ID:", `${user.id}`, true)
		.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
		.addField("Created At:", `${moment.utc(user.createdAt).format('dd, MM Do YYYY')}`, true)
		.addField("Joined Server:", `${moment.utc(member.joinedAt).format('dd, MM Do YYYY')}`, true)
		.addField("Bot:", `${user.bot}`, true)
		.addField("Status:", `${user.presence.status.replace("dnd", "Do Not Distrub")}`, true)
		.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
		.addField("Nitro:", `${user.premium}`, true)
		.addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '))
		.setFooter(`User Info`)
     message.channel.send({embed});
    }
module.exports.help = {
  name: "userinfo",
  category: "info"
}
