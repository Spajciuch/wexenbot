
const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
 fs.readdir(`./commands/`,(err, files)=>{
   if(err) console.log(err)
   let jsfile = files.filter(f => f.split(".").pop() == "js")
 
    let help = new Discord.RichEmbed()
         .setAuthor("List of Commands")
         .setColor(config.embed_color)
         .addField("Total commands: ", jsfile.length - 1)
         .addField("Music", '`musichelp`')
         .addField("Info", `${client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
         .addField("Utility", `${client.commands.filter(cmd => cmd.help.category === 'util').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
         .addField("Fun", `${client.commands.filter(cmd => cmd.help.category === 'fun').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
    message.channel.send({embed: help})
})
}
module.exports.help = {
  name: "help",
  category: "fun"
}
