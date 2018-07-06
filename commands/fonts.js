const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
    let { installedFonts } = require('installed-fonts');
    installedFonts().then(fonts => message.channel.send(fonts));
}
module.exports.help = {
  name: "fonts",
  category: "info"
}
