const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
const rrm = require('@spyte-corp/discord.js-remove-on-reaction')
if (!config.owner_ids.some(x=>x == message.author.id)) return message.reply('You can\'t do that!');
var input = args.join(" ");
var result = eval(input);
message.channel.send('Input:\n```js\n' + input + '\n```\nOutput:\n```\n' + result + '\n```').then(msg => rrm(message, msg, false))
}
module.exports.help = {
  name: "eval",
  category: "no"
}
