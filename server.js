const Discord = require("discord.js");
const Music = require("discord.js-musicbot-addon-v2");
const config = require("./config.json");
const client = new Discord.Client();
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const fs = require("fs");
const reactionrem = require("@spyte-corp/discord.js-remove-on-reaction");
client.commands = new Discord.Collection();
const moment = require("moment");

const firebase = require("firebase");

const config2 = {
  apiKey: "AIzaSyASb3EFbgin_e8_sGfxx6YcEvTuATh2pWg",
  authDomain: "wexen-canary.firebaseapp.com",
  databaseURL: "https://wexen-canary.firebaseio.com",
  projectId: "wexen-canary",
  storageBucket: "wexen-canary.appspot.com",
  messagingSenderId: "130335289280"
};
firebase.initializeApp(config2);
const database = firebase.database();

const d = new Date();
const hour = d.getHours() + 2;
let minute = d.getMinutes();
minute = `${minute}`.padStart(2, 0);
const time = hour + ":" + minute;
let day;
switch (new Date().getDay()) {
case 0:
  day = " w Niedzielę";
  break;
case 1:
  day = " w Poniedziałek";
  break;
case 2:
  day = " we Wtorek";
  break;
case 3:
  day = " w Środę";
  break;
case 4:
  day = " w Czwartek";
  break;
case 5:
  day = " w Piątek";
  break;
case 6:
  day = " w Sobotę";
}
client.on("ready", () => {
  const channelgeneral = client.channels.find("id", "460167148883410964");
  channelgeneral.send("I\"ve just turned on!");
  client.user.setActivity(">help", {type: "WATCHING"});
  console.log("\x1b[36m [client] Logowanie\x1b[0m");
  console.log("\x1b[36m [client] Wystartowano o " + time + day + "\x1b[0m");
  console.log(`\x1b[36m [client] Zalogowano jako: ${client.user.username}\x1b[0m`);
  console.log("\x1b[36m%s\x1b[0m [client] Bot obsługuje " + client.users.size + " osób, " + client.channels.size + " kanałów, " + client.guilds.size + " serwerów");
});
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  const jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Nie znaleziono komend!");
  }
  jsfile.forEach((f, i) => {
    const props = require(`./commands/${f}`);
    console.log(`[Załadowano] ${f}`);
    client.commands.set(props.help.name, props);
  });
});
client.on("message", async message => {
  let oprefix = "";
  let args = "";
  const dm = message.channel.type === "dm";
  if (dm) return;
  database.ref(`/ustawienia/${message.guild.id}/jest`).once("value")
    .then(snapshot => {
      if (snapshot.val() !== "2") {
        firebase.database().ref("ustawienia/" + message.guild.id).set({
          admin: true,
          prefix: ">",
          jest: "2",
          everyone: true
        });
        message.channel.send("Config generated, options soon!");
      }
    })
    .catch(() => {
      firebase.database().ref("ustawienia/" + message.guild.id).set({
        admin: true,
        prefix: ">",
        jest: "2",
        everyone: true
      });
      message.channel.send("Config generated, options soon!");
    });

  if (message.author.bot) return;
  database.ref(`/ustawienia/${message.guild.id}/prefix`).once("value")
    .then(snapshot => {
      oprefix = snapshot.val();
      if (!message.content.startsWith(oprefix)) return;
      if (message.content.startsWith(config.prefix)) {
        args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      }
      if (message.content.startsWith(oprefix)) {
        args = message.content.slice(oprefix.length).trim().split(/ +/g);
      }
      const command = args.shift().toLowerCase();
      if (message.author.bot) return;
      const commandfile = client.commands.get(command);
      if (commandfile) {
        message.react(client.guilds.get("438388747088822292").emojis.get("464105258549772289"));
        commandfile.run(client, message, args, config);
      } else if (!commandfile && command !== "settings" && command !== "oldhelp") {
        message.react(client.guilds.get("438388747088822292").emojis.get("464107488053166101"));
      }
      if (command === "oldhelp") {
        fs.readdir("./commands/", (err, files) => {
          if (err) console.log(err);
          const jsfile = files.filter(f => f.split(".").pop() === "js");

          const help = new Discord.RichEmbed()
            .setAuthor("List of Commands")
            .setFooter("weXen", config.avatar_url)
            .setTimestamp()
            .setColor(config.embed_color)
            .addField("Total commands: ", jsfile.length - 1)
            .addField("Music", "`musichelp`")
            .addField("Info", `${client.commands.filter(cmd => cmd.help.category === "info").map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
            .addField("Utility", `${client.commands.filter(cmd => cmd.help.category === "util").map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
            .addField("Fun", `${client.commands.filter(cmd => cmd.help.category === "fun").map(cmd => `\`${cmd.help.name}\``).join(", ")}`);
          message.channel.send({embed: help})
            .then(botmessage => reactionrem(message, botmessage));
        });
      }

      if (command === "username") {
        if (!config.owner_ids.some(x => x === message.author.id)) return eval(config.no_permissions);
        client.user.setUsername(args.join(" "));
        console.log("Zmieniono mój nick");
        message.channel.send("Done");

      }
    });
});
//@everyone
client.on("message", message => {
  if (message.channel.type.toLowerCase() === "dm") return;
  if (message.author.id === message.guild.owner.id) return;
  database.ref(`/ustawienia/${message.guild.id}/everyone`).once("value")
    .then(everyone => {
      if (!everyone.val()) return;
      if (message.content.includes("@everyone") || message.content.includes("@here")) {
        const embed = new Discord.RichEmbed()
          .setTitle("Someone used @everyone or @here")
          .addField("Server", message.guild.name, true)
          .addField("Member", message.author, true)
          .addField("Channel", message.channel)
          .setColor(config.embed_color);
        message.guild.owner.send({embed});
        message.reply("Hey! Don\"t do that!");
      }
    });
  if (message.content === "<@464388330625171476>" || message.content === "<!@464388330625171476>") {
    message.channel.send("What?");
  }
});
// Pass the entire Canvas object because you"ll need to access its width, as well its context
const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 130;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    ctx.font = `${fontSize -= 10}px Dosis`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 310);

  // Return the result to use in the actual canvas
  return ctx.font;
};

client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find(ch => ch.name === "member-log");
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  function drawStroked(canvas, text, x, y, baseline) {
    ctx.font = applyText(canvas, text);
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.lineWidth = 3;
    ctx.textBaseline = baseline;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }
  function drawStroked2(canvas, text, x, y, baseline) {
    ctx.font = "45px Dosis";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.lineWidth = 3;
    ctx.textBaseline = baseline;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }

  const background = await Canvas.loadImage("./welcome-image.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member"s display name
  ctx.font = "30px Dosis";
  ctx.fillStyle = "#ffffff";
  drawStroked2(canvas, "joined at\n" + moment.utc(member.joinedAt).format("DD.MM.YYYY"), 380, 159, "bottom");

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, member.displayName);
  ctx.fillStyle = "#ffffff";
  drawStroked(canvas, member.displayName, 450, 120, "bottom");

  ctx.beginPath();
  ctx.arc(135, 124, 93, 0, Math.PI * 2, false);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 9;
  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 37, 26, 194, 194);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "welcome-image.png");

  channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.login("NDY0Mzg4MzMwNjI1MTcxNDc2.Dh-W0Q.adVYvAlAaOIG_Z4f_gaEl5C8Vq8");

new Music(client, { //eslint-disable-line no-new
  prefix: config.prefix,
  youtubeKey: config.google,
  embedColor: 16750361,
  enableQueueStat: true,
  botAdmins: [316226442721755137, 367390191721381890],
  clearOnLeave: true,
  disableVolume: true,
  djRole: "@everyone"
});
