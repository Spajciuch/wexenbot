
const Discord = require("discord.js"); //eslint-disable-line no-unused-vars
module.exports.run = async(client, message, args, config) => {
  const Client = require("fortnite");
  const fortnite = new Client("b78afa6b-06fa-464d-b76d-bd84db5c465d");
  if (args[0] === "help") return message.reply("Użycie: <username> | <mode> | <platform>");
  const username = args.join(" ").split(" | ")[0];
  const platform = args.join(" ").split(" | ")[2] || "pc";
  const gamemode = args.join(" ").split(" | ")[1];
  if (gamemode !== "solo" && gamemode !== "duo" && gamemode !== "squad" && gamemode !== "lifetime") return message.reply("Use: <username> <mode> <platform>");
  if (!username) return message.reply("Enter the username");
  fortnite.user(username, platform).then(data => {
    const stats = data.stats;
    if (gamemode === "solo") {
      const solostats = stats.solo;
      const score = solostats.score;
      const kd = solostats.kd;
      const matches = solostats.matches;
      const kills = solostats.kills;
      const wins = solostats.wins;
      const top3 = solostats.top_3;
      const embed = new Discord.MessageEmbed()
        .setColor(config.embed_color)
        .setTitle(data.username + "'s stats [solo]")
        .addField("Score", score, true)
        .addField("Matches Played", matches, true)
        .addField("Wins", wins, true)
        .addField("Top 3", top3, true)
        .addField("Kills", kills, true)
        .addField("K/D", kd, true)
        .setFooter("weXen", config.avatar_url)
        .setTimestamp();
      message.channel.send(embed);
    } else if (gamemode === "duo") {
      const duostats = stats.duo;
      const score = duostats.score;
      const kd = duostats.kd;
      const matches = duostats.matches;
      const kills = duostats.kills;
      const wins = duostats.wins;
      const top3 = duostats.top_3;
      const embed = new Discord.RichEmbed()
        .setColor(config.embed_color)
        .setTitle(data.username + "'s stats [duo]")
        .addField("Score", score, true)
        .addField("Matches Played", matches, true)
        .addField("Wins", wins, true)
        .addField("Top 3", top3, true)
        .addField("Kills", kills, true)
        .addField("K/D", kd, true)
        .setFooter("weXen", config.avatar_url)
        .setTimestamp();
      message.channel.send(embed);
    } else if (gamemode === "squad") {
      const squadstats = stats.squad;
      const score = squadstats.score;
      const kd = squadstats.kd;
      const matches = squadstats.matches;
      const kills = squadstats.kills;
      const wins = squadstats.wins;
      const top3 = squadstats.top_3;
      const embed = new Discord.RichEmbed()
        .setFooter("Fortnite Statistics [squad]")
        .setColor("#00a9ff")
        .setTitle(data.username + "'s statistics [squad]")
        .addField("Score", score, true)
        .addField("Matches Played", matches, true)
        .addField("Wins", wins, true)
        .addField("Top 3", top3, true)
        .addField("Kills", kills, true)
        .addField("K/D", kd, true);
      message.channel.send(embed);
    } else if (gamemode === "lifetime") {
      const stats = data.stats;
      const lifetime = stats.lifetime;
      const score = lifetime[6]["Score"];
      const mplayed = lifetime[7]["Matches Played"];
      const wins = lifetime[8]["Wins"];
      const winp = lifetime[9]["Win%"];
      const kills = lifetime[10]["Kills"];
      const kd = lifetime[11]["K/d"];

      const embed = new Discord.RichEmbed()
        .setFooter("weXen", config.avatar_url)
        .setTimestamp()
        .setColor(config.embed_color)
        .setTitle(data.username + "'s statistics [lifetime]")
        .addField("Score", score, true)
        .addField("Matches Played", mplayed, true)
        .addField("Wins", wins, true)
        .addField("Wins Percentage", winp, true)
        .addField("Kills", kills, true)
        .addField("K/D", kd, true);
      message.channel.send(embed);
    }
  });
};
module.exports.help = {
  name: "fortnite",
  category: "info"
};
