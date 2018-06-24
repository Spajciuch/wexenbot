const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}
module.exports.help = {
  name: "ping",
  category: "info"
}
