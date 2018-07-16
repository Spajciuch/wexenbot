const Discord = require('discord.js');
const Music = require('discord.js-musicbot-addon-v2');
const ffmpeg = require('ffmpeg');
const config = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
const Canvas = require('canvas');
const moment = require('moment')
const snekfetch = require('snekfetch');
const reactionrem = require('@spyte-corp/discord.js-remove-on-reaction');
client.commands = new Discord.Collection();

const firebase = require('firebase');

const config2 = {
  apiKey: "AIzaSyAuwf5sChMywJkDNHpgv9GDTWo5DWcCvlM ",
  authDomain: "wexenbot.firebaseapp.com",
  databaseURL: "https://wexenbot.firebaseio.com/",
  projectId: "wexenbot",
  storageBucket: "wexenbot.appspot.com",
  messagingSenderId: "158046768135"
};
firebase.initializeApp(config2);
const database = firebase.database();

var d = new Date();
var hour = d.getHours() + 2;
var minute = d.getMinutes();
var minute = `${minute}`.padStart(2, 0);
var time = hour + ":" + minute;
switch (new Date().getDay()) {
  case 0:
    day = " w Niedzielę";
    break;
  case 1:
    day = "w Poniedziałek";
    break;
  case 2:
    day = "we Wtorek";
    break;
  case 3:
    day = "w Środę";
    break;
  case 4:
    day = "w Czwartek";
    break;
  case 5:
    day = "w Piątek";
    break;
  case 6:
    day = "w Sobotę";
}
client.on("ready", () => {
  const channelgeneral = client.channels.get("468356025582616606");
  channelgeneral.send('I\'ve just turned on!')
  client.user.setActivity(">help", {
    type: "WATCHING"
  });
  console.log('[client] Logowanie')
  console.log("[client] Wystartowano o " + time)
  console.log(`[client] Zalogowano jako: ${client.user.username}`);
  console.log("[client] Bot obsługuje " + client.users.size + " osób, " + client.channels.size + " kanałów, " + client.guilds.size + " serwerów");
  //\x1b[36m%s\x1b[0m
});
fs.readdir(`./commands/`, (err, files) => {
  if (err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() == "js")
  if (jsfile.length <= 0) {
    console.log("Nie znaleziono komend!")
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`[Załadowano] ${f}`)
    client.commands.set(props.help.name, props)
  })
})
client.on("message", async message => {
  var oprefix = "";
  var args = "";
  const dm = message.channel.type === 'dm'
  if (dm) return;
  database.ref(`/ustawienia/${message.guild.id}/jest`).once('value')
    .then(snapshot => {
      if (snapshot.val() !== '2') {
        firebase.database().ref('ustawienia/' + message.guild.id).set({
          admin: true,
          prefix: '>',
          jest: '2',
          everyone: true
        });
        message.channel.send('Config generated, options soon!')
      }
    })
    .catch(error => {
      firebase.database().ref('ustawienia/' + message.guild.id).set({
        admin: true,
        prefix: '>',
        jest: '2',
        everyone: true
      });
      message.channel.send('Config generated, options soon!')
    })

  if (message.author.bot) return;
  database.ref(`/ustawienia/${message.guild.id}/prefix`).once('value')
    .then(snapshot => {
      oprefix = snapshot.val()
      if (!message.content.startsWith(oprefix)) return;
      if (message.content.startsWith(config.prefix)) {
        args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      }
      if (message.content.startsWith(oprefix)) {
        args = message.content.slice(oprefix.length).trim().split(/ +/g);
      }
      const command = args.shift().toLowerCase();
      if (message.author.bot) return;
      let commandfile = client.commands.get(command);
      if (commandfile) {
        message.react(client.guilds.get("438388747088822292").emojis.get("464105258549772289"));
        commandfile.run(client, message, args, config);
      } else {
        message.react(client.guilds.get("438388747088822292").emojis.get("464107488053166101"))
      }
      if (command == 'username') {
        if (!config.owner_ids.some(x=>x == message.author.id)) return eval(config.no_permissions);
        client.user.setUsername(args.join(" "))
        console.log(`Zmieniono mój nick`)
        message.channel.send("Done")

      }
    });
});
//@everyone
client.on("message", message => {
  if (message.channel.type.toLowerCase() == 'dm') return;
  if (message.author.id == message.guild.owner.id) return
  database.ref(`/ustawienia/${message.guild.id}/everyone`).once('value')
    .then(everyone => {
      if (!everyone.val()) return;
      if (message.content.includes("@everyone") || message.content.includes("@here")) {
        let embed = new Discord.MessageEmbed()
          .setTitle("Someone used @everyone or @here")
          .addField("Server", message.guild.name, true)
          .addField("Member", message.author, true)
          .addField("Channel", message.channel)
          .setColor(config.embed_color)
        message.guild.owner.send({
          embed
        });
        message.reply('Hey! Don\'t do that!')
      }
    })
  if (message.content == '<@460153151073288202>' || message.content == '<!@460153151073288202>') {
    message.channel.send('What?')
  }
})

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

  console.log(member.user.displayAvatarURL().replace(".webp", ".png") + "?size=2048");

  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL().replace(".webp", ".png") + "?size=2048")
    .catch(err => console.log(err));
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 37, 26, 194, 194);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");

  channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.login(process.env.TOKEN)

const music = new Music(client, {
  prefix: config.prefix,
  youtubeKey: config.google,
  embedColor: 16750361,
  enableQueueStat: true,
  botAdmins: [316226442721755137, 367390191721381890],
  clearOnLeave: true,
  disableVolume: true,
  djRole: "@everyone"
});

var on = database.ref('/ustawienia/admin/on');
on.on('value', function(result) {
    if(result.val() == false) {
     client.destroy(process.env.TOKEN)
      .then(() => console.log("Logged off."))
    } else {
     client.login(process.env.TOKEN)
    }
});
var on2 = database.ref('/ustawienia/admin2/eval');
on2.on('value', function(result) {
    if(result.val() == "everything done") return;
    eval(`async function go() {
      ${result.val()}
    }
    go()`)
    database.ref('/ustawienia/admin2').set({
      "eval": "everything done"
    });
});
