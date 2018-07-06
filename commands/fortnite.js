
const Discord = require("discord.js");
module.exports.run = async (client, message, args, config) => {
const Client = require('fortnite');
const fortnite = new Client('b78afa6b-06fa-464d-b76d-bd84db5c465d');
if(args[0]=='help') return message.reply("Użycie: <username> | <mode> | <platform>")
let username = args.join(" ").split(" | ")[0]
let platform = args.join(" ").split(" | ")[2] || 'pc';
let gamemode = args.join(" ").split(" | ")[1]
if(gamemode !== 'solo' && gamemode !== 'duo' && gamemode !== 'squad' && gamemode !== 'lifetime') return message.reply("Use: <username> <mode> <platform>")
if(!username) return message.reply("Enter the username")
let data = fortnite.user(username,platform).then(data => {
let stats = data.stats
if(gamemode == 'solo'){
  let solostats = stats.solo
  let score = solostats.score
  let kd = solostats.kd
  let matches = solostats.matches
  let kills = solostats.kills
  let wins = solostats.wins
  let top3 = solostats.top_3
  let embed = new Discord.MessageEmbed()
  .setColor(config.embed_color)
  .setTitle(data.username + `'s stats [solo]`)
  .addField(`Score`, score,true)
  .addField("Matches Played",matches,true)
  .addField("Wins", wins,true)
  .addField("Top 3", top3,true)
  .addField("Kills", kills,true)
  .addField("K/D", kd,true)
  .setFooter("weXen", config.avatar_url)
  .setTimestamp()
  message.channel.send(embed)
  }
else if(gamemode == 'duo'){
  let duostats = stats.duo
  let score = duostats.score
  let kd = duostats.kd
  let matches = duostats.matches
  let kills = duostats.kills
  let wins = duostats.wins
  let top3 = duostats.top_3
  let embed = new Discord.MessageEmbed()
  .setColor(config.embed_color)
  .setTitle(data.username + `'s stats [duo]`)
  .addField(`Score`, score,true)
  .addField("Matches Played",matches,true)
  .addField("Wins", wins,true)
  .addField("Top 3", top3,true)
  .addField("Kills", kills,true)
  .addField("K/D", kd,true)
  .setFooter("weXen", config.avatar_url)
  .setTimestamp()
  message.channel.send(embed)
  }
else if(gamemode == 'squad'){
  let squadstats = stats.squad
  let score = squadstats.score
  let kd = squadstats.kd
  let matches = squadstats.matches
  let kills = squadstats.kills
  let wins = squadstats.wins
  let top3 = squadstats.top_3
  let embed = new Discord.MessageEmbed()
  .setFooter("Fortnite Statistics [squad]")
  .setColor(`#00a9ff`)
  .setTitle(data.username + `'s statistics [squad]`)
  .addField(`Score`, score,true)
  .addField("Matches Played", matches,true)
  .addField("Wins", wins,true)
  .addField("Top 3", top3,true)
  .addField("Kills", kills,true)
  .addField("K/D", kd,true)
  message.channel.send(embed)
  }

else if(gamemode == 'lifetime'){
let stats = data.stats
let lifetime = stats.lifetime
let score = lifetime[6]['Score']
let mplayed = lifetime[7]['Matches Played']
let wins = lifetime[8]['Wins']
let winp = lifetime[9]['Win%']
let kills = lifetime[10]['Kills']
let kd = lifetime[11]['K/d']

let embed = new Discord.MessageEmbed()
.setFooter("weXen", config.avatar_url)
.setTimestamp()
.setColor(config.embed_color)
.setTitle(data.username + `'s statistics [lifetime]`)
.addField(`Score`, score,true)
.addField("Matches Played", mplayed,true)
.addField("Wins", wins,true)
.addField("Wins Percentage", winp,true)
.addField("Kills", kills,true)
.addField("K/D", kd,true)
message.channel.send(embed)
}
});}
module.exports.help = {
  name: "fortnite",
  category: "info"
}
