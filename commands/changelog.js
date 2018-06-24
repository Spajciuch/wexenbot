const Discord = require("discord.js");
const send = require("quick.hook")
const config = require(`../config.json`)
module.exports.run = async (client, message, args) => {
  if(message.author.id !== '367390191721381890' && message.author.id !== '') return message.reply("You aren't permitted to do that!")
var channel = client.channels.get('460167167783206912')
var name ="weXen's Changelog"
var icon = client.user.avatarURL
var text = args.join(" ")
let embed = new Discord.RichEmbed()
.setColor(config.embed_color)
.setThumbnail(client.user.avatarURL)
.addField("Changelog", args.join(" ").split("/|/")[1])
.setDescription(args.join(" ").split("/|/")[0])
.setFooter("Changelog")
send(channel, embed, {
  name: name,
  icon: icon
})
message.delete()
}
module.exports.help = {
  name: "changelog"
}
