const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
String.prototype.reverse = String.split("").reverse().join("");
if (typeof String.prototype.reverse != 'function') {
    String.prototype.reverse = function (this) {
            return this.split("").reverse().join("")
    };
}
let reversed = args.join(" ").reverse
if(reversed.includes("@everyone") || reversed.includes("@here")) {
    const embed = {
        "title": "You won't do that...",
        "description": reversed,
        "color": 16750361,
        "footer": {
          "icon_url": "https://cdn.discordapp.com/avatars/460153151073288202/e6fb8a855d1a0646bf790cfe3022e69a.png?size=2048",
          "text": "weXen"
        }
      };
      message.channel.send({ embed });
}  else {
    message.channel.send(reversed)
}
}
module.exports.help = {
  name: "reverse",
  category: "fun"
}
