const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args, config) => {

      if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You aren't permitted to do that");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Couldn't find user.");
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    if(tomute.highestRole.position > message.member.highestRole.position) return message.reply('He/She has a higher role than you!');

    await (tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted`);
}

exports.conf = {
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    name: "mute",
    category: "util"
}
