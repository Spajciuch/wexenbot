const Discord = require("discord.js");
const config = require(`../config.json`)
const reactionrem = require('@spyte-corp/discord.js-remove-on-reaction')
module.exports.run = async (client, message, args) => {

  let pages = [`**Prefix: >**\nNeed help? Come here -> https://discord.gg/jjNfaHM`, `**Info commands:**\n${client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => `\${cmd.help.name}\`).join("\n")}`, `**Util commands:**\n${client.commands.filter(cmd => cmd.help.category === 'util').map(cmd => `\${cmd.help.name}\`).join("\n")}`, `**Fun commands:**\n${client.commands.filter(cmd => cmd.help.category === 'fun').map(cmd => `\${cmd.help.name}\`).join(", ")}`, '**Music**\nmusichelp'];
  let page = 1;

  const embed = new Discord.RichEmbed()
    .setColor(config.embed_color)
    .setFooter(`Strona ${page} z ${pages.length}`)
    .setDescription(pages[page-1])

  message.channel.send(embed).then(msg => {

    msg.react('⏪').then( r => {
      msg.react('⏩')

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter);
      const forwards = msg.createReactionCollector(forwardsFilter);


      backwards.on('collect', r => {
        if (page === 1) return;
        r.remove
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Strona ${page} z ${pages.length}`);
        msg.edit(embed)

      })

      forwards.on('collect', r => {
        if (page === pages.length) return;
        r.remove
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Strona ${page} z ${pages.length}`);
        msg.edit(embed)
      })

    })

  })
}
module.exports.help = {
  name: "help"
}
