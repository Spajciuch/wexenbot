const Discord = require("discord.js"); //eslint-disable-line no-unused-vars
module.exports.run = async(client, message, args, config) => {
  const simple8ballOptions = require("@spyte-corp/simple-8ball-options");
  const options = ["No", "Yes", "I don't know!", "Ask someone else!"];
  message.channel.send(simple8ballOptions(options));
};
module.exports.help = {
  name: "8ball",
  category: "fun"
};
