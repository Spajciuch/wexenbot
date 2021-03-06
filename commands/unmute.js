const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
  var firebase = require('firebase')
await firebase.database().ref(`/ustawienia/${message.guild.id}/admin`).once('value')
.then(async admin => { if(admin.val() == false) return message.reply('Module is off.');
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You aren't permitted to do that");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Couldn't find user");
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
tomute.removeRole(muterole.id);
message.channel.send(`<@${tomute.id}> has been unmuted!`);

                     })
}

exports.conf = {
    aliases: [],
    permLevel: 2
};
module.exports.help = {
  name: "unmute",
  category: "util"
}
