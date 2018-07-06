const Discord = require("discord.js"); //eslint-disable-line no-unused-vars
module.exports.run = async(client, message, args, config) => {
  const { installedFonts } = require("installed-fonts");
  installedFonts().then(fonts => message.channel.send(fonts));
};
module.exports.help = {
  name: "fonts",
  category: "info"
};