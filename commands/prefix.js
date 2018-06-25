const Discord = require("discord.js");
module.exports.run = async (client, message, args, config) =>{
 if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You haven't enough permissions.");
  if(!args[0] || args[0 == "help"]) return message.reply(`Usage: ${prefix}setprefix <new prefix>`);

  let prefixes = JSON.parse(fs.readFileSync("../prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("../prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor(config.embed_color)
  .setTitle("Prefix Set!")
  .setDescription(`Set to ${args[0]}`);

  message.channel.send(sEmbed);
}
module.exports.help = {
  name: "prefix",
  category: "util"
}
